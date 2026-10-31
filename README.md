# candidovieira.org

Site pessoal em português, feito com [Hugo](https://gohugo.io) e um tema próprio
(direção visual "Editorial"). Sem dependências de JavaScript, sem serviços externos.

## Estrutura

```
.
├── hugo.toml                configuração
├── content/
│   ├── textos/              ensaios          → /textos/<slug>/
│   ├── notas/               notas curtas     → /notas/<slug>/
│   ├── projetos/            projetos         → /projetos/<slug>/
│   ├── sobre.md             → /sobre/
│   └── agora.md             → /agora/
├── layouts/                 o tema (templates, partials, shortcodes, render hooks)
├── assets/css/              main.css (tokens + componentes) e syntax.css (gerado)
├── assets/js/main.js        tema claro/escuro, menu, busca, sumário, copiar código
├── static/fonts/            Instrument Sans e Source Sans 3 (OFL), hospedadas no site
├── archetypes/              modelos para conteúdo novo
└── .github/workflows/       deploy no GitHub Pages
```

## Design system

A identidade visual se chama **Parágrafo**. Ela combina uma barra lateral
azul-marinho, conteúdo sobre papel claro e uma marca C de traço variável. O
layout é mobile first: no celular a barra lateral vira uma barra superior; a
partir de `60rem` ela fica fixa à esquerda.

### Cores

Os tokens ficam em `assets/css/main.css`. Toda alteração de cor deve ser feita
no bloco claro (`:root`), no bloco explícito de escuro
(`:root[data-theme="dark"]`) e no fallback de preferência do sistema
(`@media (prefers-color-scheme: dark)`).

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--marinho` | `#15213A` | `#0B1220` | Barra lateral, títulos e superfícies de destaque |
| `--marinho-ativo` | `#24324F` | `#1C2842` | Item ativo e interação na barra |
| `--papel` | `#FFFFFF` | `#111A2E` | Fundo principal |
| `--superficie` | `#F3F5F8` | `#18233B` | Código, busca e caixas |
| `--texto` | `#15213A` | `#E6E9F0` | Texto principal |
| `--texto-2` | `#46506A` | `#B3BACB` | Descrições e texto secundário |
| `--meta` | `#5B6479` | `#98A1B5` | Datas, contagens e legendas |
| `--divisoria` | `#D5D9E2` | `#26324D` | Separadores |
| `--acento` | `#7D1D3F` | `#E9A3B8` | Links, foco, notas e avisos |
| `--grifo` | `#F3DCE4` | `#4A2434` | Seleção e resultados da busca |

### Tipografia

- **Instrument Sans** (`--display`): marca, títulos, perguntas, navegação e
  rótulos de componentes; pesos 400–700.
- **Source Sans 3** (`--text`): corpo, descrições, metadados e interface; pesos
  200–900, com itálico local.
- **Monoespaçada** (`--mono`): código inline e blocos de código.
- O corpo começa em `1.125rem` com entrelinha `1.55`; a prosa usa entrelinha
  `1.65` e largura máxima de `44rem`.
- Títulos usam `clamp()` para manter leitura confortável entre 390px e desktop.
  Não use caixa alta espaçada como recurso de hierarquia.

### Escala e estrutura

- Espaçamento base: múltiplos de `0.25rem`, com `--pad` de `1.375rem` no
  celular e `4rem` no desktop.
- Conteúdo de leitura: `--measure: 44rem`; listas e cabeçalhos podem chegar a
  `47.5rem`.
- Barra superior no celular: `4.5rem`; barra lateral no desktop: `15rem`.
- Listas são delimitadas por filete superior de `2px` e divisórias de `1px`.
- O breakpoint estrutural é `60rem`; anotações passam à margem em `85rem`.
- A interface respeita `prefers-reduced-motion` e todos os controles devem ter
  estado `:focus-visible` perceptível.

### Marca

A marca é um único `<path>` SVG em `layouts/_partials/marca.html`, preenchido
com `currentColor`. O mesmo desenho aparece em `static/favicon.svg`,
`static/apple-touch-icon.png` e `assets/og/base.png`; se o path mudar, regenere
as imagens rasterizadas. A versão atual usa abertura maior, com as pontas do C
aproximadamente em 18% e 82% da altura.

### Componentes

| Componente | Classes ou arquivo | Regra visual |
|---|---|---|
| Barra lateral/superior | `.sidebar`, `.site-name`, `.nav-links` | Marca e nome sempre visíveis; menu recolhe no celular |
| Item de lista | `.lista`, `.item` | Título em Instrument Sans, descrição abaixo, meta discreta |
| Pergunta da home | `.perguntas`, `.pergunta` | Pergunta é o elemento dominante; textos relacionados vêm abaixo |
| Ficha | `.ficha` em `doc-info.html` | Metadados e sumário na barra lateral apenas no desktop |
| Anotação na margem | `.sidenote` | Caixa abaixo do texto em telas menores; margem direita a partir de `85rem` |
| Aviso/errata | `.aviso` | Superfície neutra com filete bordô à esquerda |
| Caixa de destaque | `.callout` | Superfície neutra, cantos discretos e título opcional |
| Termo do glossário | `.termo` | Sublinhado pontilhado e definição contextual acessível ao foco |
| Citação | `.citar` | Separada por divisória, com referência copiável |
| Busca | `.search` | Diálogo com filete superior marinho e resultados navegáveis por teclado |

Ao criar um componente novo, reutilize os tokens e as famílias tipográficas
existentes. Evite introduzir cor, fonte, seta decorativa ou numeração que não
tenha função estrutural.

## Uso

Requer Hugo **extended** ≥ 0.160.

```bash
hugo server -D                          # http://localhost:1313, inclui rascunhos
hugo new content textos/meu-texto.md    # novo ensaio (rascunho)
hugo new content notas/minha-nota.md
hugo new content projetos/meu-projeto.md
hugo --gc --minify                      # build de produção em ./public
```

### Escrevendo

O jeito mais rápido de aprender é abrir o **texto de exemplo**, que usa todos os
recursos e mostra o código de cada um: rode `hugo server -D` e acesse
http://localhost:1313/textos/exemplo-de-texto/ (o arquivo fica em
`content/textos/exemplo-de-texto/index.md`). Ele é um rascunho e nunca vai para o ar.

Para começar um texto novo:

```bash
hugo new content textos/meu-texto.md            # texto simples
hugo new content textos/meu-texto/index.md      # texto com imagens na mesma pasta
hugo new content notas/minha-nota.md
hugo new content projetos/meu-projeto.md
```

O arquivo novo já vem com todos os campos comentados, inclusive os interesses.

#### Campos de um texto

| Campo | Obrigatório | Para que serve |
|---|---|---|
| `title` | sim | Título. |
| `slug` | sim | Final do endereço: `/textos/<slug>/`. |
| `date` | sim | Data de publicação. |
| `draft` | não | `true` = rascunho, só aparece com `hugo server -D`. Apague para publicar. |
| `description` | recomendado | Uma frase: abaixo do título, nas listas e no compartilhamento. |
| `pergunta` | recomendado | A pergunta que o texto tenta responder; agrupa os textos na home. |
| `interesses` | sim | Um ou mais interesses que ajudam a situar o texto. Podem ser novos e não precisam estar numa lista fechada. |
| `local` | não | Aparece antes da data (ex.: Aracaju). |
| `estado` | não | `rascunho em público`, `revisado` ou `superado`. |
| `superadoPor` | não | Com `estado: superado`, link para o texto que substitui este. |
| `errata` | não | Lista de `{data, texto}`; aparece em destaque no topo. |
| `toc` | não | `true` = sumário (precisa de 2 ou mais subtítulos `##`). |
| `imagem` | não | Imagem de compartilhamento própria; sem ela, uma é gerada com o título. |
| `revisar` | não | `true` bloqueia o deploy até você apagar a linha. |

A data de revisão vem do git: qualquer commit que altere o texto depois da
publicação faz aparecer "Revisado em…" com um link para o histórico.

#### Recursos no corpo

| Recurso | Como escrever |
|---|---|
| Nota na margem | `frase.[^nome]` e, no fim, `[^nome]: conteúdo` |
| Termo do glossário | `{{< termo "alinhamento" >}}` (termos em `data/glossario.yaml`) |
| Figura | `{{< figura src="imagem.png" alt="…" legenda="…" >}}` |
| Caixa de destaque | `{{< nota titulo="…" >}}…{{< /nota >}}` |
| Vídeo | `{{< youtube ID >}}` |

#### Onde ficam as listas

- **Interesses:** `data/interesses.yaml` (nomes e descrições sugeridos; alimenta `/interesses/` e a página Sobre). A lista não é fechada.
- **Glossário:** `data/glossario.yaml` (termo, original em inglês e definição)
- **Menu:** `hugo.toml`, em `[menus]`

### Realce de sintaxe

`assets/css/syntax.css` é gerado com `hugo gen chromastyles` (estilos `github` e
`github-dark`). Para trocar o estilo, gere de novo com outro `--style`.

## Deploy

Cada push no `main` publica o site via GitHub Actions. O `HUGO_VERSION` do
workflow deve acompanhar a versão local (`hugo version`).
