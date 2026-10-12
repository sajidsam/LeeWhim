# রংগন (Rongon) — Luxury Women's Fashion & Heritage Drapes Atelier

<div align="center">

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas%20Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Proprietary-72383D?style=for-the-badge)]()

**An ultra-premium, high-performance e-commerce storefront for Rongon (রংগন)**  
*Exclusive Salwar Kameez, Heritage Sarees, Single Kameez, Tunics & Contemporary Ethnic Drapes*

</div>

---

## ⚡ High-Speed Architecture & Performance Optimization

To achieve instant page loads, sub-second responses, and featherweight DOM rendering across 969+ products, the platform employs a dual in-memory caching and pagination pipeline:

```mermaid
graph TD
    Client[Browser / React App] -->|1. Client Memory Cache Check| CCache{Client Cache Hit?}
    CCache -- Yes (0ms) --> Render[Instant Instant UI Render]
    CCache -- No --> Proxy[Vite Proxy / Express API :5000]
    Proxy -->|2. Server In-Memory Cache Check| SCache{Server Cache Hit?}
    SCache -- Yes (<2ms) --> ReturnAPI[Return JSON with X-Cache: HIT]
    SCache -- No --> Mongo[(MongoDB Atlas)]
    Mongo -->|Mongoose .lean() + Index Query| DBRes[Fetch Paginated Batch]
    DBRes --> SetSCache[Store in Server Cache 5-min TTL]
    SetSCache --> ReturnAPI
    ReturnAPI --> SetCCache[Store in Client Cache 3-min TTL]
    SetCCache --> Render
```

### 1. Dual-Layer In-Memory Caching (Ultra-Fast Connection)
- **Server-Side In-Memory Cache (`backend/server.js`)**:
  - Implements an automated high-throughput `Map` cache with 5-minute TTL (Time-To-Live).
  - Caches categories, hero banners, client reviews, and paginated product queries.
  - Returns responses with `X-Cache: HIT` header in **1–2 milliseconds**, eliminating unnecessary Atlas cloud network roundtrips.
  - Employs Mongoose `.lean()` to strip heavy object hydration overhead, reducing JSON serialization latency by ~70%.
- **Client-Side In-Memory Cache (`src/services/api.js`)**:
  - Maintains an active client memory cache with 3-minute TTL.
  - When switching categories or toggling between catalogue pages (e.g., Page 1 ↔ Page 2), data is served in **0ms** from memory.

### 2. Targeted 2-Row Curated Layouts
Instead of dumping hundreds of items onto the homepage simultaneously (which previously resulted in a massive 195,000px DOM height and mobile lag):
- **Exclusive Sarees Showcase**: Strictly **2 rows** (10 items on 5-column desktop, 8 on tablet, 4 on mobile).
- **Festive Kurtis & Salwar Kameez Showcase**: Strictly **2 rows** (10 items) of signature Joom, Crepe, and Cotton A-lines.
- **Artisanal Handbags & Crossbody Showcase**: Strictly **2 rows** (10 items) highlighting top trending luxury commuter and croissant bags.
- **Initial Payload Reduction**: Homepage initial product load was slashed from ~1,000 items (~500KB) down to ~40 curated items (~30KB), speeding up First Contentful Paint (FCP) significantly.

### 3. Server-Side Catalogue Pagination
- The full catalogue ([`CatalogSection.jsx`](./src/Components/home/CatalogSection.jsx)) loads **15 products per page** (3 rows × 5 columns).
- Interactive navigation bar with smart page-windowing (`1`, `2`, `3`, `4`, `...`, `65`), item range indicators (`Showing 1–15 of 969 products`), and Next/Previous controls.
- Smooth automatic scroll to `#catalog-section` on page transition.

---

## 🎨 Design & Aesthetics

The storefront embodies timeless South Asian luxury, warmth, and modern minimalism.

| Color Token | Hex | Role |
| :--- | :--- | :--- |
| **Deep Crimson / Maroon** | `#72383D` | Primary luxury accent, CTA buttons, active badges, highlights |
| **Warm Espresso / Dark Charcoal** | `#322D29` | Deep contrast backgrounds, brand typography, secondary buttons |
| **Silk Cream / Off-White** | `#EFE9E1` | Soft page background, elegant card contrast, light surface fills |
| **Muted Taupe / Sand** | `#AC9C8D` | Subtitles, borders, subtle text, rating and metadata tags |
| **Warm Canvas Light** | `#F8F6F2` | Product card surfaces, input fields, header background |

- **Typography**:
  - `Playfair Display` & `Cinzel` for editorial luxury serif headings.
  - `Plus Jakarta Sans` / `Outfit` for crisp, ultra-legible numerals and interface text.
  - Authentic Bengali typography for the brand mark: **রংগন**.

---

## 🚀 Key Features

### 🛍️ Comprehensive E-Commerce Experience
- **Interactive Hero Carousel**:
  - Auto-advance rotation with touch swipe support (`onTouchStart` / `onTouchEnd`).
  - Desktop: Rich subtitles, descriptions, and category CTA buttons.
  - Mobile: Clean 2-layer headline (*"Festive & Contemporary Elegance"*) with instant *"Shop Now"* action.
- **Dynamic Category Navigation**:
  - Multi-tier dropdown menus for Salwar Kameez, Sarees, Kameez, Tunics, Tops, Shirts, Shrugs, Bottom Wear, and Bags.
  - Smooth horizontal scroll buttons with overflow indicators.
- **Live MongoDB Atlas Integration (969+ Products)**:
  - Real-time cloud database storage with SKU references, multi-variant sizing, stock tracking, and BDT (৳) pricing.
- **Minimalist Product Cards**:
  - Stripped of cluttered stickers for a high-end designer look.
  - Hover zoom transitions, wishlist heart toggle, stock indicators, and dual CTA (*Add to Cart* and *Order Now*).
- **Interactive Cart & Wishlist System**:
  - Sliding Cart Drawer with live item increment/decrement and removal.
  - Free nationwide delivery progress threshold (৳2,500 target).
  - Real-time subtotal calculation in Bangladeshi Taka (৳).
- **Curated 2-Row Showcase Rows**:
  - 2 rows of Heritage Sarees.
  - 2 rows of Festive Kurtis & Salwar Kameez.
  - 2 rows of Artisanal Handbags.
- **Instant Search Modal**:
  - Global hotkey shortcut (`⌘K` / `Ctrl+K`) with live query suggestions and keyboard navigation.
- **Social Proof & Reviews**:
  - Verified buyer feedback from Dhaka, Chittagong, and Sylhet.
  - Instagram community showcase grid.
- **Persistent Mobile Bottom Bar**:
  - Fast access to Home, Wishlist (with badge counter), Cart Drawer, and Customer Account.

---

## 💻 Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend API**: [Node.js](https://nodejs.org/) & [Express 4](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/) via [Mongoose 8](https://mongoosejs.com/)
- **Process Orchestration**: [Concurrently](https://github.com/open-cli-tools/concurrently) for running API & Vite in tandem
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [FontAwesome](https://fontawesome.com/)
- **State Management**: React Context API (`ShopContext`) with `localStorage` persistence.

---

## 📂 Project Architecture

```plaintext
leeswhim/
├── backend/                      # Node.js & Express REST API
│   ├── config/                   # MongoDB connection logic (db.js)
│   ├── models/                   # Mongoose schemas (Product, Category, Banner, Review, Order)
│   ├── scripts/                  # Data seeding & scraping utilities
│   ├── .env                      # Database credentials (MONGODB_URI)
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server with in-memory caching engine
├── src/
│   ├── assets/                   # Brand logos, hero banners, and visual media
│   ├── Components/
│   │   ├── common/
│   │   │   ├── CartDrawer.jsx    # Sliding cart drawer with subtotal
│   │   │   ├── ProductCard.jsx   # Minimalist luxury product card
│   │   │   ├── SearchModal.jsx   # Ctrl+K instant search modal
│   │   │   └── QuickOrderModal.jsx # Single-click checkout modal
│   │   ├── home/
│   │   │   ├── HeroSlider.jsx    # Campaign hero carousel
│   │   │   ├── CategoryBar.jsx   # Curations horizontal carousel
│   │   │   ├── SareeRowSection.jsx # 2-row exclusive Sarees showcase
│   │   │   ├── KurtiRowSection.jsx # 2-row festive Kurtis showcase
│   │   │   ├── PromoBanners.jsx  # Dual promotion cards
│   │   │   ├── BagsRowSection.jsx# 2-row artisanal bags showcase
│   │   │   ├── CatalogSection.jsx# Paginated 15-item boutique catalogue
│   │   │   ├── CustomerReviews.jsx # Verified customer testimonials
│   │   │   ├── InstagramShowcase.jsx # Social styling inspiration grid
│   │   │   └── TrustBadges.jsx   # Nationwide delivery & guarantee perks
│   │   └── layout/
│   │       ├── Navbar.jsx        # Top announcement, search, categories
│   │       ├── Footer.jsx        # Editorial atelier footer & newsletter
│   │       └── MobileBottomNav.jsx # Bottom dock navigation for phones
│   ├── Context/
│   │   └── ShopContext.jsx       # Cart, wishlist, filters, and live database state
│   ├── services/
│   │   └── api.js                # API service with client-side in-memory caching
│   ├── pages/
│   │   ├── Home.jsx              # Main atelier landing page
│   │   ├── Cart.jsx              # Full page cart review
│   │   ├── Checkout.jsx          # Secure checkout order form
│   │   └── ProductDetail.jsx     # Detailed product view with zoom
│   ├── App.jsx                   # Route configurations and layout wrapper
│   ├── index.css                 # Custom font imports & Tailwind rules
│   └── main.jsx                  # Application entry point
├── package.json                  # Root dependencies & concurrent dev script
└── vite.config.js                # Vite build & proxy configuration
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18.x, 20.x, or later recommended)
- `npm` or `yarn` / `pnpm`

### Installation & Running

1. **Clone or navigate to the repository**:
   ```bash
   cd "Lee's Whim/Lee's Whim Frontend/leeswhim"
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the full-stack development environment**:
   ```bash
   npm run dev
   ```
   > Running `npm run dev` starts **both** the Express MongoDB Atlas API (`http://localhost:5000`) and the Vite storefront (`http://localhost:5173`) in parallel.

4. Open `http://localhost:5173/` in your browser.

---

## 🛠️ Scripts & Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs both Backend API (:5000) and Vite Storefront (:5173) concurrently |
| `npm run dev:client` | Runs only Vite frontend development server |
| `npm run dev:server` | Runs only Node.js Express backend server |
| `npm run build` | Compiles optimized production bundle into `/dist` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint analysis across codebase |

---

## 📄 License

© 2026 **রংগন (Rongon)**. All rights reserved. Proprietary and confidential.
