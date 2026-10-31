/* candidovieira.org — interações. Sem dependências. */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* modo privado */ } },
  };

  /* ── Tema claro/escuro ─────────────────────────────────────────────── */
  // O <head> já aplicou o tema antes de desenhar. Aqui só tratamos o botão
  // e acompanhamos o sistema enquanto a pessoa não escolheu um tema.
  const dark = matchMedia("(prefers-color-scheme: dark)");
  dark.addEventListener("change", (e) => {
    if (!store.get("tema")) root.dataset.theme = e.matches ? "dark" : "light";
  });
  $$("[data-theme-toggle]").forEach((btn) => {
    const label = () => btn.setAttribute("aria-label",
      root.dataset.theme === "dark" ? "Mudar para o modo claro" : "Mudar para o modo escuro");
    label();
    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      store.set("tema", next);
      label();
    });
  });

  /* ── Menu no celular ───────────────────────────────────────────────── */
  const menuBtn = $("[data-menu-toggle]");
  const menu = $("#menu");
  if (menuBtn && menu) {
    const setMenu = (open) => {
      menu.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("is-open") && !e.target.closest(".sidebar")) setMenu(false);
    });
    matchMedia("(min-width: 48rem)").addEventListener("change", () => setMenu(false));
  }

  /* ── Busca ─────────────────────────────────────────────────────────── */
  const dialog = $("#busca");
  if (dialog && typeof dialog.showModal === "function") {
    const input = $(".search__input", dialog);
    const list = $(".search__results", dialog);
    let index = null;

    // "relatório" e "relatorio" encontram a mesma coisa
    const norm = (s) => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    // Destaca os termos no texto original, comparando sem acentos
    const highlight = (text, terms) => {
      const n = norm(text);
      const marks = new Array(text.length).fill(false);
      terms.forEach((t) => {
        let i = n.indexOf(t);
        while (t && i !== -1) { for (let j = i; j < i + t.length; j++) marks[j] = true; i = n.indexOf(t, i + t.length); }
      });
      let out = "", open = false;
      for (let i = 0; i < text.length; i++) {
        if (marks[i] && !open) { out += "<mark>"; open = true; }
        if (!marks[i] && open) { out += "</mark>"; open = false; }
        out += esc(text[i]);
      }
      return open ? out + "</mark>" : out;
    };

    const excerpt = (text, term) => {
      const i = norm(text).indexOf(term);
      if (i < 0) return text.slice(0, 140) + (text.length > 140 ? "…" : "");
      const start = Math.max(0, i - 50);
      return (start ? "…" : "") + text.slice(start, start + 160).trim() + "…";
    };

    const load = async () => {
      if (index) return;
      try {
        const res = await fetch(dialog.dataset.index);
        index = (await res.json()).map((p) => ({
          ...p,
          _t: norm(p.titulo), _d: norm(p.descricao), _g: norm((p.interesses || []).join(" ")), _c: norm(p.conteudo),
        }));
      } catch { index = []; }
    };

    const SECAO = { textos: "Texto", notas: "Nota", projetos: "Projeto" };

    const run = () => {
      const terms = norm(input.value).split(/\s+/).filter(Boolean);
      if (!terms.length || !index) { list.innerHTML = ""; return; }
      const hits = index
        .map((p) => {
          let score = 0;
          for (const t of terms) {
            const s = (p._t.includes(t) ? 10 : 0) + (p._g.includes(t) ? 5 : 0) + (p._d.includes(t) ? 3 : 0) + (p._c.includes(t) ? 1 : 0);
            if (!s) return null;          // todos os termos precisam aparecer
            score += s;
          }
          return { p, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      if (!hits.length) {
        list.innerHTML = `<li class="search__empty">Nada encontrado para “${esc(input.value.trim())}”.</li>`;
        return;
      }
      list.innerHTML = hits.map(({ p }) => `
        <li><a href="${p.url}">
          <span class="search__title">${highlight(p.titulo, terms)}</span>
          <span class="search__info">${SECAO[p.secao] || ""} · ${esc(p.data)}</span>
          <span class="search__excerpt">${highlight(excerpt(p.conteudo || p.descricao || "", terms[0]), terms)}</span>
        </a></li>`).join("");
    };

    const open = () => {
      if (dialog.open) return;
      dialog.showModal();
      input.focus();
      load().then(run);
    };
    const close = () => dialog.close();

    dialog.addEventListener("close", () => { input.value = ""; list.innerHTML = ""; });
    dialog.addEventListener("click", (e) => { if (e.target === dialog) close(); }); // clique fora
    input.addEventListener("input", run);
    $$("[data-search-open]").forEach((b) => b.addEventListener("click", open));
    $$("[data-search-close]", dialog).forEach((b) => b.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      const typing = e.target.closest("input, textarea, select, [contenteditable]");
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        open();
      }
    });
  }

  /* ── Sumário (no corpo e na ficha da barra lateral) ───────────────── */
  const toc = $("[data-toc]");
  const tocLinks = $$("[data-toc] a, [data-toc-links] a");
  if (tocLinks.length) {
    const ids = [...new Set(tocLinks.map((a) => decodeURIComponent(a.hash.slice(1))))];
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if ("IntersectionObserver" in window && targets.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          tocLinks.forEach((a) => a.classList.toggle("is-active", decodeURIComponent(a.hash.slice(1)) === en.target.id));
        });
      }, { rootMargin: "0px 0px -70% 0px" });
      targets.forEach((t) => io.observe(t));
    }
    if (toc) $$("a", toc).forEach((a) => a.addEventListener("click", () => { toc.open = false; }));
  }

  /* ── Anotações na margem ───────────────────────────────────────────── */
  // Cada nota de rodapé vira uma anotação ao lado do parágrafo (telas largas)
  // ou abre logo abaixo dele ao tocar no número (celular).
  const prose = $(".prose");
  const notas = prose && $(".footnotes", prose);
  if (notas) {
    const largo = matchMedia("(min-width: 85rem)");
    $$("sup[id^='fnref'] a, a.footnote-ref", prose).forEach((ref, i) => {
      if (ref.dataset.anotacao) return;
      const alvo = document.getElementById(decodeURIComponent(ref.hash.slice(1)));
      if (!alvo) return;
      const copia = alvo.cloneNode(true);
      $$(".footnote-backref", copia).forEach((b) => b.remove());
      const nota = document.createElement("span");
      nota.className = "sidenote";
      nota.id = "anotacao-" + (i + 1);
      nota.setAttribute("role", "note");
      nota.innerHTML = `<span class="sidenote__n">${ref.textContent}</span>` +
        $$("p", copia).map((p) => p.innerHTML.trim()).join(" ");
      (ref.closest("sup") || ref).after(nota);
      ref.dataset.anotacao = "1";
      ref.setAttribute("aria-controls", nota.id);
      ref.setAttribute("aria-expanded", "false");
      ref.addEventListener("click", (e) => {
        e.preventDefault();
        if (largo.matches) return;          // já está visível na margem
        const aberta = nota.classList.toggle("is-open");
        ref.setAttribute("aria-expanded", String(aberta));
      });
    });
    prose.classList.add("tem-anotacoes");
  }

  /* ── Como citar ────────────────────────────────────────────────────── */
  const ref = $("[data-citar]");
  if (ref) {
    const meses = ["jan.", "fev.", "mar.", "abr.", "maio", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
    const hoje = new Date();
    const acesso = $("[data-acesso]", ref);
    if (acesso) acesso.textContent = `${hoje.getDate()} ${meses[hoje.getMonth()]} ${hoje.getFullYear()}`;
    const btn = $("[data-copiar-citacao]");
    if (btn && navigator.clipboard) {
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(ref.textContent.replace(/\s+/g, " ").trim());
          btn.textContent = "Referência copiada";
        } catch {
          btn.textContent = "Não foi possível copiar";
        }
        setTimeout(() => { btn.textContent = "Copiar referência"; }, 2500);
      });
    } else if (btn) {
      btn.hidden = true;
    }
  }

  /* ── Copiar código ─────────────────────────────────────────────────── */
  if (navigator.clipboard) {
    $$(".prose .highlight").forEach((block) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copiar";
      btn.setAttribute("aria-label", "Copiar código");
      block.appendChild(btn);
      btn.addEventListener("click", async () => {
        const code = $("code", block);
        try {
          await navigator.clipboard.writeText(code ? code.innerText : "");
          btn.textContent = "Copiado!";
        } catch {
          btn.textContent = "Erro";
        }
        setTimeout(() => { btn.textContent = "Copiar"; }, 2000);
      });
    });
  }
})();
