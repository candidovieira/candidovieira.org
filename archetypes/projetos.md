---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
slug: "{{ .File.ContentBaseName }}"   # endereço: /projetos/<slug>/
date: {{ .Date }}
draft: true              # apague a linha para publicar
description: ""          # uma frase sobre o projeto
interesses: []           # um ou mais; podem ser livres:
{{- range hugo.Data.interesses }}
#   - "{{ .nome }}"
{{- end }}
status: "em andamento"   # em andamento | concluído | arquivado
link: ""                 # site ou demonstração (opcional)
repositorio: ""          # ex.: https://github.com/candidovieira/projeto (opcional)
---
