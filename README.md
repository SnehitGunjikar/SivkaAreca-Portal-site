# Sivka Areca Enterprises — Portfolio

Modern, responsive single-page application showcasing Sivka Areca’s services, products, projects, and contact information. Built with React, Vite, Tailwind CSS, Framer Motion, and Chakra UI.

## Highlights

- Responsive UI with clean typography and accessible interactions
- Smooth page transitions and reveal animations (Framer Motion)
- Lazy-loaded routes for performant navigation
- Interactive components like SpotlightCard and GooeyNav
- Projects and Product detail pages with image galleries (WebP-first)
- Contact form integrated with Web3Forms (no backend required)
- Production-ready static build and hosting configs for Hostinger/Apache

## Tech Stack

- React 19 + React Router 7
- Vite 7 (bundler/dev server)
- Tailwind CSS 3 (utility-first styling)
- Chakra UI (component primitives)
- Framer Motion (animations)
- PostCSS + Autoprefixer

## Project Structure

```
sivka-areca-portfolio/
├── index.html
├── public/
│   ├── .htaccess       # SPA rewrite for Apache/Hostinger
│   ├── _redirects      # SPA fallback for Netlify/Cloudflare Pages
│   └── vite.svg
├── src/
│   ├── App.jsx         # Route definitions and layout (Navbar/Footer)
│   ├── main.jsx        # App entry with BrowserRouter
│   ├── index.css       # Tailwind layers and global styles
│   ├── components/     # UI components (Navbar, Footer, SpotlightCard, etc.)
│   ├── pages/          # Home, Products, ProductDetail, Projects, ProjectDetail,
│   │                   # Manufacturing, ServiceDetail, Contact, TermsOfService, PrivacyPolicy
│   └── data/           # Static data (products/projects)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js LTS (v18+) or Current (v20+)
- npm (comes with Node) or pnpm/yarn

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server with hot reloading. Open the printed local URL in your browser.

### Build for Production

```bash
npm run build
```

Artifacts are emitted to `dist/`. To preview the production build locally:

```bash
npm run preview
```

## Configuration

### Web3Forms (Contact Form)

The contact page submits via Web3Forms API. You need an access key:

1. Create a form at https://web3forms.com/
2. Copy your `access_key`
3. In `src/pages/Contact.jsx`, set the `access_key` in the `handleSubmit` payload.

Fields sent include `name`, `email`, `message`, `subject`, `from_name`, and `reply_to`. The UI already includes a spinner and success/error states.

### Tailwind CSS

- Global layers and utility classes live in `src/index.css`.
- If your editor flags `@tailwind` or `@apply` as unknown at-rules, this is an editor lint issue. We include `.vscode/settings.json` to silence those warnings.

## Deployment

### Hostinger (Apache)

Hostinger shared hosting uses Apache. For SPA routing (so refresh on deep routes works), we ship an `.htaccess` file in `public/` that rewrites all non-file requests to `index.html`.

Steps:

1. Build: `npm run build`
2. Upload the contents of `dist/` to your `public_html` (or subdomain root)
3. Ensure `public_html/.htaccess` exists (copied from `dist/.htaccess`)

Subfolder deployment:

- If deploying under `/subfolder/`, update the `.htaccess`:
  - `RewriteBase /subfolder/`
  - `RewriteRule . /subfolder/index.html [L]`
- Optionally set Vite base in `vite.config.js`:
  - `export default defineConfig({ base: '/subfolder/', plugins: [react()] })`

### Other Hosts

- Netlify / Cloudflare Pages: use `_redirects` with `/* /index.html 200`
- Vercel: add `vercel.json` with a rewrite to `/index.html`
- GitHub Pages: add `404.html` that mirrors `index.html` or use `HashRouter`
- Nginx: `try_files $uri $uri/ /index.html;`
- Apache: use `.htaccess` rewrite rules (included)

## Useful Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint (JS/JSX)
- `npm run optimize-images` — optimize images via `sharp` (requires Node addons)

## Troubleshooting

- Refresh 404 on deep routes:
  - Ensure `.htaccess` (Apache) or `_redirects` (Netlify/Cloudflare) is deployed
  - For subpaths, set `base` in `vite.config.js`

- Tailwind at-rule warnings in editor:
  - We include `.vscode/settings.json` to ignore unknown at-rule lints

- PowerShell blocks `npm.ps1` when running scripts:
  - Use `npm.cmd run build` on Windows if you hit execution policy errors

- Vite deprecation warnings for `import.meta.glob({ as: 'url' })`:
  - These are non-blocking; future updates will migrate to `query: '?url', import: 'default'`

## Accessibility & UX Notes

- Typography and color contrast aim to be readable on light backgrounds
- Touch interactions tuned and double-tap zoom mitigated on mobile
- Keyboard focus states preserved; animations prefer reduced motion where possible

## Acknowledgements

- Built with love and attention to performance, accessibility, and maintainability.
- Libraries: React, Vite, Tailwind CSS, Chakra UI, Framer Motion, React Router.
