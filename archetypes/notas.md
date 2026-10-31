---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
slug: "{{ .File.ContentBaseName }}"   # endereço: /notas/<slug>/
date: {{ .Date }}
draft: true              # apague a linha para publicar
interesses: []           # um ou mais; podem ser livres:
{{- range hugo.Data.interesses }}
#   - "{{ .nome }}"
{{- end }}
# description: ""        # opcional; aparece na lista
# estado: "rascunho em público"
---
