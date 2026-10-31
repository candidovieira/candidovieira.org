---
# Texto de exemplo. Mostra todos os recursos disponíveis e como escrevê-los.
# É um rascunho (draft: true): aparece em `hugo server -D` e nunca vai para o ar.
# Para começar um texto novo, use: hugo new content textos/meu-texto.md
title: "Exemplo de texto"
slug: "exemplo-de-texto"
date: 2026-10-31
draft: true
description: "Um modelo que mostra cada recurso disponível para escrever neste site, e como usá-lo."
pergunta: "Como usar os recursos de um texto neste site?"
interesses: ["Desvios"]
local: "Aracaju"
estado: "rascunho em público"
toc: true
errata:
  - data: 2026-10-31
    texto: "Assim aparece uma errata: a data e o que foi corrigido. Use o campo `errata` no front matter."
---

Este é o primeiro parágrafo. Ele aparece no topo da página e, se o texto for o
mais recente, também na home. Escreva em parágrafos de verdade, com três a seis
frases. Frases soltas, uma por parágrafo, deixam o texto difícil de ler.

Acima do título ficam a data, o local, o tempo de leitura e o estado do texto.
No desktop, essas informações e o sumário ficam na barra lateral. A caixa de
errata, logo acima, aparece porque o campo `errata` está preenchido.

## Subtítulos e sumário

Cada `##` cria uma seção. Com `toc: true` e pelo menos dois subtítulos, o texto
ganha um sumário: na barra lateral (desktop) ou numa caixa recolhível (celular).

```markdown
## Título da seção
### Subtítulo dentro da seção
```

## Anotações na margem

Uma nota de rodapé vira uma anotação ao lado do texto em telas largas.[^margem]
No celular, ela abre logo abaixo do parágrafo quando o leitor toca no número.

```markdown
Uma frase com nota.[^nome-da-nota]

[^nome-da-nota]: O conteúdo da nota, escrito no fim do texto.
```

## Termos do glossário

Um termo com sublinhado pontilhado, como {{< termo "alinhamento" >}}, mostra a
definição ao passar o mouse e leva ao glossário ao tocar. O texto exibido pode
ser diferente do nome do termo, como em
{{< termo "lei de Goodhart" "quando uma medida vira meta" >}}.

```markdown
{{</* termo "alinhamento" */>}}
{{</* termo "lei de Goodhart" "quando uma medida vira meta" */>}}
```

Os termos e as definições ficam em `data/glossario.yaml`. Usar um termo que não
está lá impede o site de compilar, com uma mensagem dizendo qual termo faltou.

## Figuras

Para usar uma imagem, transforme o texto numa pasta: `textos/meu-texto/index.md`,
com a imagem ao lado. Imagens grandes são reduzidas automaticamente.

{{< figura src="diagrama.png" alt="Dois círculos sobrepostos: o que pedimos e o que queremos; a sobreposição é o que obtemos" legenda="A legenda aceita *Markdown*." >}}

```markdown
{{</* figura src="diagrama.png" alt="Descrição para leitores de tela" legenda="Legenda opcional" */>}}
```

O `alt` descreve a imagem para quem não pode vê-la. Escreva o que ela mostra,
não "imagem de".

## Caixa de destaque

{{< nota titulo="Use com moderação" >}}
Uma caixa como esta chama atenção para algo que o leitor não pode perder. Se
todo texto tiver uma, nenhuma chama atenção.
{{< /nota >}}

```markdown
{{</* nota titulo="Título opcional" */>}}
Texto em **Markdown**.
{{</* /nota */>}}
```

## Citações

> Uma citação em destaque serve para a frase que resume o argumento.

```markdown
> Uma citação em destaque.
```

## Código

Blocos de código ganham cores e um botão de copiar.

```python
def otimizar(objetivo, dados):
    """Faz exatamente o que foi pedido, nem mais, nem menos."""
    return max(dados, key=objetivo)
```

Para código no meio da frase, use crases: `objetivo`.

## Tabelas

| Campo        | Para que serve                                |
|--------------|-----------------------------------------------|
| `pergunta`   | Agrupa o texto na home                        |
| `estado`     | Mostra se o texto é rascunho, revisado ou superado |
| `errata`     | Lista correções no topo do texto              |

Em telas estreitas, tabelas largas ganham rolagem horizontal.

## Vídeo

Vídeos do YouTube entram no modo de privacidade aumentada, sem cookies de
rastreamento até o leitor apertar o play.

```markdown
{{</* youtube ID_DO_VIDEO */>}}
```

## Antes de publicar

1. Apague a linha `draft: true`.
2. Confira `description`, `pergunta` e `interesses`.
3. Se o texto foi escrito ou traduzido com ajuda de IA e ainda não foi revisado,
   use `revisar: true`: o deploy fica bloqueado até você apagar a linha.

No fim de cada texto aparecem o bloco "Como citar", no padrão ABNT, e os links
para o texto anterior e o próximo. Os dois são automáticos.

[^margem]: Esta é uma anotação na margem. Use para referências, ressalvas e
comentários que interromperiam o raciocínio se estivessem no meio do parágrafo.
