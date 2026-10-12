# 🌸 Rongon Luxury Women Collection - Backend & Database Architecture

Production-grade, enterprise-ready Node.js, Express, and MongoDB Atlas architecture for the **Rongon** luxury e-commerce platform.

---

## 🔒 1. Credential Security (Industry Standard)

In accordance with strict security standards:
- Real database credentials (`RonGon` / `ZlHMr4T9HWFTUqGW`) are stored **strictly** in `.env` files.
- `.env` and `.env.*` are ignored by `.gitignore` in both frontend and backend.
- A public `.env.example` template is provided for team collaboration without exposing secrets.

### Backend `.env` Structure:
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Credentials
DB_USER=RonGon
DB_PASS=ZlHMr4T9HWFTUqGW
DB_NAME=rongon_db

# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://RonGon:ZlHMr4T9HWFTUqGW@<YOUR_CLUSTER_HOST>/rongon_db?retryWrites=true&w=majority

# JWT & API Secrets
JWT_SECRET=rongon_super_secret_jwt_key_2026_luxury_secure
JWT_EXPIRE=30d
```

---

## 🗄️ 2. Database & Collections Design

- **Database Name:** `rongon_db`
- **Collections:**
  - `rongon_products` — 61 luxury products with multi-image galleries, SKU, pricing, stock count, fabric attributes, and full-text search index.
  - `rongon_categories` — 8 primary ethnic & fusion categories with banner images.
  - `rongon_banners` — 3 responsive hero slider banners and 2 promotional campaign cards.
  - `rongon_orders` — Enterprise order model ready for checkout, delivery address, and payment gateways (bKash, Nagad, SSLCommerz, COD).
  - `rongon_reviews` — Verified customer reviews and rating testimonials.

---

## 🚀 3. How to Seed the Database to MongoDB Atlas

1. Make sure your IP is whitelisted in **MongoDB Atlas Network Access** (`0.0.0.0/0` or current IP).
2. Ensure `MONGODB_URI` in `backend/.env` contains your active cluster URL (e.g. `cluster0.xxxx.mongodb.net`).
3. Run the seeder:
   ```bash
   cd backend
   npm run seed
   ```
4. To test without connecting to MongoDB:
   ```bash
   npm run seed:dry-run
   ```

---

## ⚡ 4. REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck & database connection status |
| `GET` | `/api/categories` | Retrieve all 8 categories |
| `GET` | `/api/banners` | Retrieve hero slider slides & promo banners |
| `GET` | `/api/products` | Query products with category, price filter, sorting & pagination |
| `GET` | `/api/products/:identifier` | Get single product by SKU or slug |
| `GET` | `/api/reviews` | Retrieve customer testimonials |
| `POST` | `/api/orders` | Place new customer order |

---

## 💻 5. Running the API Server

```bash
cd backend
npm run dev
# Server will run at http://localhost:5000
```
