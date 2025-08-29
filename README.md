Yatri Frontend Task - Mini E‑Commerce Store built with Next.js 15, Tailwind, Redux Toolkit, Typescript, Mantine, Redux Persist, and NextAuth.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Create a .env.local file with OAuth credentials

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-random-string

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...
```

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Features

- OAuth login (Google/GitHub) via NextAuth
- Protected checkout route; unauthenticated users redirected to /login
- Product list from Fake Store API with grid, images, prices
- Product detail page with Add to Cart and toast
- Cart with add/remove/update quantity, totals, persisted across refresh
- Responsive Sidebar and Mobile navigation with active highlighting
- Toast notifications via react-hot-toast
  -Handle form using react hook form
- Add typsescript for type saftey
  -Mantine for componant library

##used Tech Stack are

Nextjs
TypeScript
Tailwind
NextAuth
Redux
Mantine
React hook form

## Structure

```
src/
  app/
    (public)/
      cart/
      login/
      products/[id]/
      checkout/
    api/auth/[...nextauth]/route.ts
    layout.tsx, page.tsx
  components/
    layout/Sidebar.tsx, MobileNav.tsx
    Providers.tsx
    ui/molecules/{ProductCard,Skeleton,Loader}.tsx
  store/{index.ts,cartSlice.ts}
  services/products.ts
  hooks/useProtectedRoute.ts
```

## Deploy

- Push to a GitHub repo named `yatri-frontend-task-ecommerce`
- Deploy to Vercel; set the same env vars in the Vercel project

## Notes

- Tailwind v4 via @import "tailwindcss" in globals.css
- No database required; products come from fakestoreapi.com
