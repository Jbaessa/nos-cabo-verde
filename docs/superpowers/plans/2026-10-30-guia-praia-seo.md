# Guia da Praia para SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar em PT e EN o guia da Praia (onde ficar, o que fazer, onde comer), a página De Luanda à Praia e a página Como escolhemos, com dados verificados e SEO completo.

**Architecture:** Dados tipados em `src/lib/guide.ts`, separados de `partners`. Rotas genéricas `guia/[destino]` e `guia/[destino]/[categoria]`, para repetir o modelo noutras ilhas só com dados. Só locais validados pelo José aparecem no site.

**Tech Stack:** Next 16, next-intl (`localePrefix: "as-needed"`), TypeScript, Vitest (novo, só para lógica pura).

**Spec:** `docs/superpowers/specs/2026-10-30-guia-praia-seo-design.md`

## Global Constraints

- Ler o guia relevante em `node_modules/next/dist/docs/` antes de escrever código (`AGENTS.md`).
- Regra de entrada de um local: nota ≥ 4,0 em duas fontes; ≥ 50 reviews na fonte principal (≥ 20 em categorias com poucos locais, indicado na ficha); reviews dos últimos 12 meses; aberto e com contacto ou site.
- 5 a 10 locais por categoria.
- Guardar números e referências, nunca textos de reviews.
- Sem `AggregateRating` com notas de terceiros. Sem foto de local sem direitos claros.
- Visto, horários e preços só com fonte oficial e data; sem fonte, mandar confirmar junto do consulado ou da companhia.
- Português de norma europeia, sem brasileirismos. A marca Nós Cabo Verde assina.
- Nenhum local inventado. Publicar locais e remover parceiros só depois de o José validar a lista.
- URL de base: `https://noscaboverde.cv`. URLs em português também em EN (`/en/guia/...`).
- Push para `master` publica. Só fazer push na Task 7.

## Review Focus

- Categoria sem locais validados: a página dá 404 e sai do sitemap e das ligações, em vez de aparecer vazia. Teste na Task 1.
- Ficha sem tradução EN: não é publicada a meio em PT na versão inglesa; a validação falha. Teste na Task 1.
- Destino ou categoria desconhecidos no URL: 404, nunca uma página vazia com canonical. Teste na Task 1 (`getCategory`).
- Dados de voos desactualizados depois de a TAAG mudar horários: a página mostra a data de verificação e manda confirmar. Teste na Task 1 (`validateFact`).
- Telemóvel em rede lenta: fichas legíveis a 360 px, sem scroll horizontal, sem imagens por optimizar. Verificação no browser na Task 7.

---

### Task 1: Modelo de dados e regras do guia

**Files:**
- Create: `src/lib/guide.ts`, `src/lib/guide.test.ts`, `vitest.config.ts`
- Modify: `package.json` (script `"test": "vitest run"`, dependência `vitest`)
- Add ao commit: o spec e este plano

**Interfaces:**
- Produces:
  - `type CategoryId = "onde-ficar" | "o-que-fazer" | "onde-comer"`
  - `type Localized = { pt: string; en: string }`
  - `type Rating = { source: string; score: number; reviews: number; url: string; checkedAt: string }`, com `score` normalizado para a escala de 5
  - `type Place = { id; category: CategoryId; name: string; zone: Localized; bestFor: Localized; why: Localized; priceBand: 1|2|3|4; tags: string[]; ratings: Rating[]; lastReviewAt: string; website?: string; bookingUrl?: string; lowReviewCategory?: boolean; validatedAt: string | null; image?: { src: string; credit: string } }`
  - `type Fact = { id; label: Localized; value: Localized; sourceUrl: string; checkedAt: string; official: boolean }`
  - `type Destination = { id: string; name: string; intro: Localized; categories: Record<CategoryId, { title: Localized; description: Localized; intro: Localized; tips: Localized[] }> }`
  - `validatePlace(place: Place, today: Date): string[]`, que devolve a lista de erros
  - `validateFact(fact: Fact, today: Date): string[]`
  - `getDestination(id: string): Destination | undefined`
  - `getPublishedPlaces(destinationId: string, category: CategoryId): Place[]`, só com `validatedAt` preenchido
  - `getCategory(destinationId: string, category: string): { destination: Destination; category: CategoryId; places: Place[] } | undefined`, `undefined` se o id for desconhecido ou não houver locais publicados
  - `getPublishedCategories(destinationId: string): CategoryId[]`
  - `guidePaths(): { path: string; lastModified: string }[]`, com os caminhos sem locale das páginas com conteúdo publicado

- [ ] **Step 1: Instalar o Vitest e escrever os testes que falham**

Com um local válido de teste, verificar com `expect`:
- `validatePlace` devolve `[]` para o local válido.
- Devolve erro para: uma só fonte; nota 3,9; 49 reviews sem `lowReviewCategory`; 19 reviews com `lowReviewCategory`; `lastReviewAt` com mais de 12 meses; sem `website` nem `bookingUrl`; campo EN vazio.
- `getPublishedPlaces` exclui `validatedAt: null`.
- `getCategory("praia", "onde-ficar")` é `undefined` sem locais publicados; `getCategory("praia", "nada")` e `getCategory("nada", "onde-ficar")` são `undefined`.
- `validateFact` devolve erro se `checkedAt` tiver mais de 6 meses ou se faltar `sourceUrl`.
- `guidePaths()` não inclui categorias vazias.
- Todos os itens de dados reais passam em `validatePlace` e `validateFact`.

- [ ] **Step 2: Correr e confirmar a falha**

Run: `npm test`
Expected: FAIL, módulo `./guide` não encontrado.

- [ ] **Step 3: Implementar `src/lib/guide.ts` com a estrutura da Praia e `places: []`**

- [ ] **Step 4: Correr e confirmar que passa**

Run: `npm test && npx tsc --noEmit`
Expected: tudo PASS, sem erros de tipos.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/guide.ts src/lib/guide.test.ts docs/superpowers
git commit -m "feat(guia): add guide data model and publication rules"
```

### Task 2: Páginas do guia e Como escolhemos

**Files:**
- Create: `src/app/[locale]/guia/[destino]/page.tsx`, `src/app/[locale]/guia/[destino]/[categoria]/page.tsx`, `src/app/[locale]/guia/como-escolhemos/page.tsx`, `src/components/guide/PlaceCard.tsx`, `src/components/guide/GuideNav.tsx`, `src/lib/guide-seo.ts`, `src/lib/guide-seo.test.ts`
- Modify: `messages/pt.json`, `messages/en.json` (namespace `guide`)

**Interfaces:**
- Consumes: Task 1, `StructuredData`, `Breadcrumbs`, `Navbar`, `Footer`
- Produces:
  - `guideAlternates(path: string, locale: string): Metadata["alternates"]`
  - `guideArticleJsonLd(args: { title: string; description: string; path: string; locale: string; updatedAt: string }): Record<string, unknown>`, com `author` e `publisher` do tipo `Organization` e nome `Nós Cabo Verde`
  - `placesItemListJsonLd(places: Place[], locale: string): Record<string, unknown>`

- [ ] **Step 1: Escrever os testes que falham em `guide-seo.test.ts`**

- `guideAlternates("/guia/praia/onde-ficar", "en").canonical` é `https://noscaboverde.cv/en/guia/praia/onde-ficar`; `languages.pt` não leva `/en`.
- `guideArticleJsonLd` tem `author.name === "Nós Cabo Verde"`.
- `JSON.stringify(placesItemListJsonLd(...))` não contém `aggregateRating`.

- [ ] **Step 2: Correr e confirmar a falha**

Run: `npm test`
Expected: FAIL, `./guide-seo` não encontrado.

- [ ] **Step 3: Implementar `guide-seo.ts`**

- [ ] **Step 4: Implementar as páginas**

- Seguir o padrão de `ilhas/[id]/page.tsx`: `generateStaticParams` para `pt` e `en`, `generateMetadata`, `notFound()`.
- `[categoria]`: resposta directa, fichas, dicas, ligações às outras categorias e a `/guia/luanda-praia`, ligação a `/guia/como-escolhemos`.
- `PlaceCard`: nome, zona, para quem é, porque foi escolhido, faixa de preço, cada nota com fonte e data, ligação externa com `rel="nofollow noopener"`. Sem imagem quando `image` não existe.
- `como-escolhemos`: regra de entrada do spec, frequência de revisão de 6 em 6 meses, e a declaração de que a selecção se baseia em avaliações públicas.

- [ ] **Step 5: Verificar**

Run: `npm test && npx tsc --noEmit && npm run lint && npm run build`
Expected: testes PASS, 0 erros, build concluída. Em `npm run dev`, `/guia/praia/onde-ficar` dá 404 enquanto não houver locais, e `/guia/como-escolhemos` e `/en/guia/como-escolhemos` dão 200.

- [ ] **Step 6: Commit**

```bash
git add src messages
git commit -m "feat(guia): add guide pages, selection method page and SEO metadata"
```

### Task 3: De Luanda à Praia

**Files:**
- Create: `src/app/[locale]/guia/luanda-praia/page.tsx`
- Modify: `src/lib/guide.ts` (`luandaFacts: Fact[]`), `messages/pt.json`, `messages/en.json`

**Interfaces:**
- Consumes: `Fact`, `validateFact`, `guide-seo.ts`

- [ ] **Step 1: Recolher os factos**

Confirmar voos, dias e horários no site da TAAG; visto e entrada para cidadãos angolanos em fonte oficial de Cabo Verde ou Angola; moeda e pagamentos em fonte oficial. A notícia da Ver Angola de 28-10-2026 (início a 12-12, partidas de Luanda à segunda e ao sábado, da Praia à terça e ao domingo) é ponto de partida, não fonte final. Um facto sem fonte oficial fica com `official: false` e o texto manda confirmar.

- [ ] **Step 2: Acrescentar um teste que falha**

`luandaFacts` inclui os ids `voos`, `visto`, `moeda` e `epoca`, e cada um passa em `validateFact`.

- [ ] **Step 3: Correr e confirmar a falha**

Run: `npm test`
Expected: FAIL, ids em falta.

- [ ] **Step 4: Preencher os dados e criar a página**

Cada facto mostra a fonte e a data de verificação. A estadia sugerida parte dos dias reais dos voos.

- [ ] **Step 5: Verificar**

Run: `npm test && npm run build`
Expected: PASS e build concluída.

- [ ] **Step 6: Commit**

```bash
git add src messages
git commit -m "feat(guia): add Luanda to Praia travel page"
```

### Task 4: Sitemap completo e ligações internas

**Files:**
- Modify: `src/app/sitemap.ts`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/IslandDetail.tsx`, `messages/pt.json`, `messages/en.json`
- Create: `src/app/sitemap.test.ts`

**Interfaces:**
- Consumes: `guidePaths()`

- [ ] **Step 1: Escrever os testes que falham**

- Cada entrada tem `alternates.languages.pt` e `.en`.
- Há uma entrada `/en/...` para cada página PT.
- Nenhum URL contém `/agenda`.
- Inclui `/guia/como-escolhemos` e `/guia/luanda-praia`.
- As entradas do guia usam `lastModified` igual à data dos dados, e não a data da build.

- [ ] **Step 2: Correr e confirmar a falha**

Run: `npm test`
Expected: FAIL nas asserções de EN e alternates.

- [ ] **Step 3: Implementar**

As outras secções do site deixam de usar `new Date()`: usar uma constante `SITE_UPDATED_AT`. Acrescentar a ligação "Guia" a `Navbar` e `Footer`, e à página de Santiago uma ligação para `/guia/praia`.

- [ ] **Step 4: Verificar**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: PASS, 0 erros.

- [ ] **Step 5: Commit**

```bash
git add src messages
git commit -m "feat(seo): add English URLs and guide pages to sitemap, link the guide"
```

### Task 5: Verificar parceiros — precisa da aprovação do José

**Files:**
- Create: `docs/superpowers/reviews/2026-10-30-parceiros.md`
- Modify: `src/lib/data.ts`, `src/lib/data.test.ts` (novo)

- [ ] **Step 1: Verificar cada entrada de `partners`**

Procurar na web o nome, a ilha e o site. Registar no relatório, para cada um: existe / não confirmado, provas e acção proposta.

- [ ] **Step 2: Parar e mostrar o relatório ao José. Só continuar com a decisão dele.**

- [ ] **Step 3: Escrever um teste que falha**

Todo o parceiro com `verified: true` tem `verifiedAt` e `verificationSource`.

- [ ] **Step 4: Aplicar a decisão e correr**

Run: `npm test && npm run build`
Expected: PASS. `/parceiros` funciona mesmo com menos entradas ou sem nenhuma.

- [ ] **Step 5: Commit**

```bash
git add src docs/superpowers/reviews
git commit -m "fix(parceiros): keep only partners with real verification"
```

### Task 6: Pesquisar e validar os locais — precisa da aprovação do José

**Files:**
- Create: `docs/superpowers/reviews/2026-10-30-locais-praia.md`
- Modify: `src/lib/guide.ts` (`places`, textos), `messages/*.json` se preciso

- [ ] **Step 1: Pesquisar candidatos**

Para cada categoria, recolher notas, número de reviews e data da review mais recente nas fontes, para candidatos reais. Se as ferramentas não conseguirem ler uma fonte, registar isso e não estimar.

- [ ] **Step 2: Aplicar a regra de entrada e escrever o relatório**

5 a 10 locais por categoria, com os excluídos e o motivo. Se uma categoria não chegar a 5, dizê-lo.

- [ ] **Step 3: Parar e pedir ao José que valide a lista. Só continuar com a decisão dele.**

- [ ] **Step 4: Preencher `places` com `validatedAt` e os textos PT e EN**

Textos escritos de raiz, sem frases de reviews ou de outros guias.

- [ ] **Step 5: Verificar**

Run: `npm test && npm run build`
Expected: PASS. Todos os locais passam em `validatePlace`. As três páginas temáticas de `/guia/praia` dão 200 em `npm run dev`.

- [ ] **Step 6: Commit**

```bash
git add src messages docs/superpowers/reviews
git commit -m "feat(guia): add validated Praia places and guide copy"
```

### Task 7: Publicar e preparar a divulgação

**Files:**
- Create: `docs/superpowers/reviews/2026-10-30-textos-divulgacao.md`

- [ ] **Step 1: Verificar no browser antes de publicar**

Com `npm run build && npm run start`: percorrer as páginas em PT e EN a 360 px e 1280 px. Sem scroll horizontal, sem erros na consola e todas as ligações a funcionar.

- [ ] **Step 2: Pedir confirmação e fazer push**

Run: `git fetch && git status -sb && git push origin master`
Expected: `master` sem divergência e push aceite.

- [ ] **Step 3: Verificar em produção**

Confirmar 200 em todos os URLs de `https://noscaboverde.cv/sitemap.xml`; canonical e `hreflang` correctos numa página PT e numa EN; JSON-LD válido no teste de resultados melhorados do Google, feito pelo José ou por ferramenta disponível.

- [ ] **Step 4: Escrever os textos de divulgação**

Um pedido de ligação para meios angolanos e cabo-verdianos, um para agências de viagens e entidades de turismo, e publicações para redes sociais perto de 12-12-2026. Sem envio: o José é quem os envia.

- [ ] **Step 5: Passar ao José os passos do Search Console**

Reenviar o sitemap e pedir indexação das cinco páginas PT. Registar a data como início da medição mensal por Angola, Portugal e todos os países.

- [ ] **Step 6: Commit e actualizar o registo**

```bash
git add docs/superpowers/reviews
git commit -m "docs(guia): add outreach copy"
git push origin master
```

Actualizar o registo JARVIS com a skill `updating-project-registry`.
