---
# ─── Obrigatórios ────────────────────────────────────────────────────────────
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
slug: "{{ .File.ContentBaseName }}"   # parte final do endereço: /textos/<slug>/
date: {{ .Date }}
draft: true              # rascunho: só aparece com `hugo server -D`. Apague a linha para publicar.

description: ""          # uma frase; aparece abaixo do título, nas listas e no compartilhamento
pergunta: ""             # a pergunta que o texto tenta responder; agrupa os textos na home
interesses: []           # um ou mais; podem ser livres:
{{- range hugo.Data.interesses }}
#   - "{{ .nome }}"
{{- end }}

# ─── Opcionais ───────────────────────────────────────────────────────────────
local: "Aracaju"         # aparece antes da data
estado: "rascunho em público"   # rascunho em público | revisado | superado
toc: false               # true = sumário (precisa de 2+ subtítulos ##)
# superadoPor: "/textos/outro-texto/"   # com estado: "superado", mostra o aviso "Mudei de ideia"
# errata:                               # correções em destaque no topo do texto
#   - data: 2026-01-31
#     texto: "O que foi corrigido e por quê."
# imagem: "/caminho/imagem.png"         # substitui a imagem de compartilhamento gerada automaticamente
# revisar: true                         # bloqueia o deploy até você apagar a linha

# ─── Recursos no corpo do texto ──────────────────────────────────────────────
# Subtítulo ............ ## Título da seção
# Nota na margem ....... frase.[^1]   e, no fim do texto:  [^1]: O conteúdo da nota.
# Termo do glossário ... {{"{{"}}< termo "alinhamento" >{{"}}"}}  ou  {{"{{"}}< termo "lei de Goodhart" "texto exibido" >{{"}}"}}
#                        (termos ficam em data/glossario.yaml)
# Figura ............... {{"{{"}}< figura src="imagem.png" alt="Descrição" legenda="Legenda" >{{"}}"}}
#                        (imagem na mesma pasta do texto: textos/<slug>/index.md + imagem.png)
# Caixa de destaque .... {{"{{"}}< nota titulo="Atenção" >{{"}}"}}Texto em **Markdown**.{{"{{"}}< /nota >{{"}}"}}
# Vídeo do YouTube ..... {{"{{"}}< youtube ID_DO_VIDEO >{{"}}"}}
# Citação em destaque .. > Uma frase importante.
#
# Exemplo completo, com tudo isso funcionando: content/textos/exemplo-de-texto/
---
