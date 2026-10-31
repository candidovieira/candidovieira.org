---
title: "O problema do gênio"
slug: "o-problema-do-genio"
date: 2026-06-06
description: "Uma máquina pode fazer exatamente o que você pede e ainda assim produzir o resultado errado."
interesses: ["Alinhamento, justiça algorítmica e viés", "Tecnologia, instituições e sociedade"]
local: "Aracaju"
pergunta: "O que estamos realmente tentando otimizar?"
estado: "revisado"        # rascunho em público | revisado | superado
toc: true
---

Eu costumava achar que a parte mais difícil de construir sistemas inteligentes
era torná-los capazes. Treinar um modelo melhor. Reunir mais dados. Melhorar a
arquitetura. Reduzir erros. A capacidade parecia ser o problema.

*Não é.*

Um sistema pode ser extraordinariamente capaz e ainda assim fazer a coisa
errada. A pergunta não é apenas se a máquina consegue fazer o que pedimos. A
pergunta mais difícil é se pedimos a coisa certa, para começo de conversa.

Esse é o problema do {{< termo "alinhamento" >}}.

## O que pedimos e o que queremos

No fundo, alinhamento é a distância entre o que queremos e o que mandamos a
máquina otimizar, a sua {{< termo "função objetivo" >}}. Computadores não entendem intenções; entendem objetivos. Se o
objetivo captura a intenção perfeitamente, está tudo bem. O problema começa
quando não captura. E raramente captura.

## O gênio

Quando eu era criança, havia um filme de terror chamado
[*O Mestre dos Desejos*](https://www.imdb.com/title/tt0120524/) (*Wishmaster*).
A premissa era simples: um gênio maligno realizava os desejos das pessoas, mas
nunca do jeito que elas pretendiam.

Alguém pedia riqueza e a recebia por meio de um acidente terrível. Alguém
desejava beleza eterna e descobria que as palavras podem ser interpretadas de
formas desconfortáveis. O gênio seguia o pedido à risca enquanto violava a
intenção por trás dele.

Quando criança, eu achava que o poder do vilão era mágica. Olhando para trás,
era otimização. O gênio não estava interessado no que as pessoas queriam dizer.
Estava interessado no que elas diziam.

Isso é surpreendentemente parecido com o problema do alinhamento. As máquinas
não entendem nossas intenções mais do que o gênio entendia. Elas operam sobre
os objetivos que fornecemos. Se esses objetivos são incompletos, ambíguos ou mal
especificados, um sistema suficientemente capaz pode encontrar uma solução que
satisfaz a letra do pedido enquanto viola o seu propósito.

A diferença entre *o que queremos* e *o que pedimos* é onde muitas falhas de
alinhamento começam.

## Quando a métrica vence

Pense numa rede social. Suponha que o objetivo seja aumentar o engajamento, e a
métrica é simples: maximizar o tempo que as pessoas passam na plataforma.

O sistema tem sucesso. As pessoas rolam a tela por mais tempo, clicam mais,
reagem com mais frequência. Do ponto de vista da métrica, é uma vitória.

Mas engajamento não é a mesma coisa que valor. Um sistema de recomendação pode
descobrir que a indignação funciona melhor que a compreensão. Que o conflito
gera mais interação que a nuance. Que é mais fácil capturar a atenção do que
conquistar a confiança. A máquina fez exatamente o que pediram. O problema era o
objetivo.

Ou pense num assistente de atendimento ao cliente, cujo objetivo é reduzir o
tempo necessário para resolver chamados. De novo, o sistema tem sucesso: as
respostas ficam mais rápidas, os chamados são fechados mais depressa, os números
melhoram.

Até que alguém percebe que os casos difíceis estão sendo descartados. Perguntas
ambíguas são marcadas como resolvidas. Os clientes saem frustrados, embora o
painel diga que está tudo funcionando.

O objetivo era resolver chamados. A intenção era a satisfação do cliente. Não
são a mesma coisa.

## Falhas que parecem sucesso

O curioso das falhas de alinhamento é que, no começo, elas costumam parecer
sucesso. As métricas melhoram. Os gráficos andam na direção certa. O relatório
trimestral fica excelente. Só mais tarde alguém percebe que o sistema encontrou
um atalho que ninguém pretendia.

Isso não é exclusividade da inteligência artificial. Humanos fazem o mesmo.
Quem já trabalhou numa grande organização viu o que acontece quando
{{< termo "lei de Goodhart" "uma métrica vira meta" >}}: as pessoas otimizam a medida em vez do propósito por trás dela.

As máquinas são apenas mais literais. Elas não sabem o que quisemos dizer. Só
sabem o que especificamos.

## Por que isso importa

À medida que os sistemas de IA ficam mais capazes, fica mais difícil ignorar
essa distinção. Um corretor ortográfico que entende mal um objetivo é irritante.
Um sistema de recomendação que entende mal um objetivo pode influenciar milhões
de pessoas. Um sistema de saúde que entende mal um objetivo pode afetar vidas
reais. O risco cresce junto com a capacidade.

É por isso que alinhamento não é uma curiosidade filosófica. É um problema de
engenharia. Todo sistema carrega um conjunto de metas, pressupostos e
incentivos, e o desafio é garantir que esses incentivos apontem para aquilo que
realmente nos importa.

A parte difícil é que muitas vezes não sabemos exatamente o que é isso. Os
valores humanos são bagunçados. Nossos objetivos são incompletos. Nossas
instruções são ambíguas. O alinhamento nos obriga a encarar essa ambiguidade em
vez de fingir que ela não existe.

## Um espelho

O problema do alinhamento é, de certo modo, um espelho. Ele faz uma pergunta
surpreendentemente difícil de responder:

> O que estamos realmente tentando otimizar?

A máquina não pode decidir isso por nós. Precisamos decidir primeiro.[^alinhamento]

[^alinhamento]: O desafio fica mais importante à medida que os sistemas ficam
mais capazes. Quanto mais influência um sistema tem sobre o mundo, mais caro se
torna otimizar o objetivo errado.
