# Cleantech Ventures — Website

Bilingual (TR / EN) website for Cleantech Ventures (Cleantech GSYF, Borsa İstanbul: NPCLN), built with Next.js (App Router), TypeScript and Tailwind CSS v4. Every page is statically generated.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # type check
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/app/[locale]/` | Routes: home, `about`, `founders`, `investors`, `portfolio`, `team`, `news`, `insights`, `contact` |
| `src/content/copy.ts` | Page copy and UI strings for both languages |
| `src/content/fund.ts` | Fund data: partners, focus sectors, criteria, impact targets, SDGs, FAQ, tax table, contact links |
| `src/content/portfolio.ts` | Portfolio companies |
| `src/content/team.ts` | Management team and investment committee |
| `src/content/posts.json` | News and insights articles (imported from the previous WordPress site) |
| `src/components/` | Header, footer, hero illustration and shared sections |
| `public/` | Logos, team photos, SDG icons and article images |

## Editing content

- **New portfolio company:** add an entry to `src/content/portfolio.ts` and put its logo in `public/portfolio/`.
- **Team change:** edit `src/content/team.ts`; photos go in `public/team/`.
- **New article:** add an object to `src/content/posts.json` with `lang` (`tr`/`en`), `type` (`news`/`insights`), `slug`, `title`, `date`, `excerpt`, `image` and a Markdown `body`. Set `translationSlug` to link it to its counterpart in the other language.

## Redirects

`next.config.ts` permanently redirects the old WordPress URLs (pages and every article) to their new locations, so existing links and search rankings carry over.
