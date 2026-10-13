# RAWG — Game Collection & Inventory Management (`ea16712u20241b962`)

## Overview
Web application to organize videogames.

## Authorship
- Author: Carolina Navarro Aldoradin (u20241b962)
- Repository: https://github.com/genixmp/ea16712u20241b962

## Tech Stack
Vue 3 (Composition API) · Vite · Pinia · Vue Router · vue-i18n · PrimeVue (Material preset) · PrimeFlex · PrimeIcons · axios · json-server 0.17.4

## Bounded Contexts
- **shared**: base API classes, layout, home and page-not-found.
- **storage**
- **catalog**

## Configuration
1. `npm install`
2. Fake API: `cd server` → `json-server --watch db.json` (http://localhost:3000)
3. Set `VITE_LOGO_DEV_PUBLISHABLE_KEY` in `.env.development`.
4. `npm run dev` → http://localhost:5173
