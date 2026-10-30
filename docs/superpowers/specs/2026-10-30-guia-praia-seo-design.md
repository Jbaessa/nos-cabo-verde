# Guia da Praia para SEO — design

Estado: por aprovar. Data: 2026-10-30.

## Intenção

Pôr o Nós Cabo Verde entre os 10 primeiros resultados de pesquisa de quem planeia viajar para Cabo Verde, com forte incidência em Angola, mas não só. A Praia é o primeiro destino porque a TAAG começa a voar Luanda–Praia a 12 de Dezembro de 2026, com dois voos por semana.

O site dá dicas e as melhores opções em cada tema. Esta confiança e este tráfego são a base de um futuro guia turístico personalizado para cada viajante.

## Objectivos

- Responder a três perguntas sobre a Praia: onde ficar, o que fazer e onde comer.
- Ter uma página para quem parte de Angola: voos, datas, visto e dinheiro.
- Publicar em PT e EN.
- Criar um modelo que se repita nas outras ilhas sem novo desenho.
- Guardar os locais em dados estruturados que o guia personalizado possa usar mais tarde.

## Fora de âmbito

- O guia personalizado.
- Reservas, pagamentos e contas de utilizador.
- Outras ilhas, até a Praia mostrar resultados.
- Redesenho do resto do site.

## O que seria um fracasso

- Publicar um local inventado, fechado ou não confirmado.
- Mostrar o selo "verified" sem verificação real.
- Fingir visitas ou experiência pessoal que não existiram.
- Copiar textos de reviews ou de outros guias.
- Usar fotos genéricas como se fossem do local.
- Gerar muitas páginas finas só para apanhar pesquisas.

## Decisões do José

- Pesquisas-alvo: onde ficar, o que fazer e onde comer, a começar pela Praia.
- Assinatura: a marca Nós Cabo Verde.
- Recomendações: pesquisadas pelas melhores reviews, por tema.
- Domínio: `noscaboverde.cv`, já ligado, com redireccionamentos e Search Console prontos.

## Páginas

| Página | URL PT | URL EN | Pesquisa principal |
|---|---|---|---|
| Guia da Praia | `/guia/praia` | `/en/guia/praia` | guia da Praia, Cabo Verde |
| Onde ficar | `/guia/praia/onde-ficar` | `/en/guia/praia/onde-ficar` | onde ficar na Praia, Cabo Verde |
| O que fazer | `/guia/praia/o-que-fazer` | `/en/guia/praia/o-que-fazer` | o que fazer na Praia, Cabo Verde |
| Onde comer | `/guia/praia/onde-comer` | `/en/guia/praia/onde-comer` | onde comer na Praia, Cabo Verde |
| De Luanda à Praia | `/guia/luanda-praia` | `/en/guia/luanda-praia` | voos Luanda Praia, viajar de Angola para Cabo Verde |

Todas as páginas ligam entre si. A página de Santiago (`/ilhas/santiago`), a navegação e o rodapé ligam ao guia.

## Conteúdo

**Cada página temática** abre com a resposta directa, seguida da selecção de locais e de dicas práticas.

- Onde ficar: zonas (Platô, Prainha, Quebra Canela, Achada Santo António) e para quem serve cada uma; hotéis por orçamento.
- O que fazer: o essencial na cidade e passeios de um dia, como a Cidade Velha e o Tarrafal.
- Onde comer: cozinha cabo-verdiana, peixe e marisco, opções económicas, mercados.

**Cada local** indica nome, zona, para quem é, porque foi escolhido, faixa de preço, ligação oficial ou de reserva, e nota com fonte e data.

**De Luanda à Praia:** voos e horários, visto, moeda e pagamentos, época para viajar, e uma estadia sugerida conforme os dias dos voos. O visto, os horários e os preços só entram com fonte oficial e data de verificação. Se não houver fonte oficial, a página manda confirmar junto do consulado ou da companhia, em vez de afirmar.

**Tom:** português de norma europeia, compreensível em Angola, sem brasileirismos. O inglês é adaptado para quem pesquisa em inglês, não traduzido à letra.

## Selecção de locais

Regra de entrada:

- Nota de pelo menos 4,0 em duas fontes (por exemplo, Google Maps, Tripadvisor ou Booking).
- Pelo menos 50 reviews na fonte principal; em categorias com poucos locais, o mínimo pode descer para 20, com indicação na ficha.
- Actividade recente: reviews dos últimos 12 meses.
- Local confirmado como aberto, com contacto ou site.

São 5 a 10 locais por categoria. O José valida a lista antes de publicar. Uma página **"Como escolhemos"** explica esta regra, ligada a partir de cada página do guia, e declara que a selecção se baseia em avaliações públicas. Cada ficha guarda a data da última verificação, e os dados são revistos de 6 em 6 meses.

Guardam-se números e referências, nunca textos de reviews.

## Dados

- Novo ficheiro `src/lib/guide.ts`, separado de `partners`, com tipos para destino, categoria e local.
- Campos em PT e EN seguindo o padrão de `localizeIsland`.
- Id estável em cada local e etiquetas (orçamento, perfil, zona), para o futuro guia personalizado poder filtrar sem migração.

## SEO técnico

- Rotas em `src/app/[locale]/guia/`, com `generateMetadata`, canonical e `hreflang` como nas páginas de ilhas.
- Título, descrição e H1 próprios por página e por língua.
- Dados estruturados com o `StructuredData` existente: `Article` com a marca como autora, `BreadcrumbList`, `ItemList` e `Organization`.
- Sem `AggregateRating` com notas de terceiros, porque as regras do Google não o permitem.
- Sitemap: incluir `/en/...` em todas as páginas do site, com `alternates`, e usar a data real de actualização em vez de `new Date()`.
- Páginas renderizadas no servidor, com bom desempenho em telemóvel e redes lentas, já que grande parte do público deve estar em Angola.

## Parceiros existentes

`partners` em `src/lib/data.ts` tem locais com `verified: true` que parecem inventados, com endereços suspeitos como `mindelorestoa.rt` e `atlantisdiiecv.com`.

Antes de publicar o guia, verificar cada um. Os que não se confirmarem saem do site, e o selo fica reservado a verificação real. A lista segue para o José antes de ser publicada.

## Autoridade fora do site

O conteúdo sozinho dificilmente chega ao top 10 nas pesquisas mais disputadas. Depende do José, com textos preparados:

- Pedir ligações a meios e parceiros angolanos e cabo-verdianos, como Ver Angola, agências de viagens e entidades de turismo.
- Partilhar o guia nas redes sociais e em comunidades de viagem em Angola, por altura do arranque da rota.

## Calendário

- Publicar até 30 de Novembro de 2026 (decisão minha), para o Google ter tempo de indexar antes de 12 de Dezembro.
- O top 10 não é garantido e não deve acontecer logo: conta-se com vários meses.

## Como medir

No Search Console, filtrando por Angola, Portugal e todos os países:

- Indexação das páginas do guia ao fim de 2 semanas.
- Posição média e cliques por pesquisa-alvo, com revisão mensal.
- Meta aos 6 meses: top 10 em "o que fazer" e "onde comer" e em "voos Luanda Praia"; top 20 em "onde ficar", que tem mais concorrência de motores de reserva.

As outras ilhas só avançam depois de as páginas da Praia estarem indexadas e a ganhar impressões.

## Decisões minhas, para rever

- URLs em português também na versão EN, como o resto do site.
- Página própria "De Luanda à Praia" em vez de secção.
- Critérios de selecção, prazos e metas acima.
- Fotografias: só com direitos claros e identificadas; sem foto verdadeira, a ficha fica sem foto.

## A cargo de quem constrói

Componentes, desenho das páginas dentro do estilo do site, e textos finais. Antes de escrever código, ler os guias em `node_modules/next/dist/docs/`, como pede `AGENTS.md`.
