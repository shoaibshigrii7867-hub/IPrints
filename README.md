# IPrints Commerce

A full-stack modern eCommerce starter built with **Next.js (frontend)** and **Node.js/Express (backend)**.

## Tech Stack
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, JWT auth
- **Database:** MongoDB (with in-memory fallback for local demo)
- **Payments:** Stripe-ready checkout endpoint scaffold

## Folder Structure

```txt
IPrints/
├── client/                    # Next.js storefront + dashboards
│   ├── app/                   # App router pages
│   ├── components/            # UI components
│   ├── context/               # Cart/Auth/Wishlist state
│   ├── lib/                   # API client + seed data types
│   └── public/                # static assets
├── server/
│   ├── src/
│   │   ├── config/            # DB config
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth/role middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Helpers
│   │   └── index.js           # Express app entry
│   └── data/products.json     # Example data and fallback store
└── package.json               # root scripts
```

## Features Implemented

### Storefront
- Hero, featured, trending, categories, promos, testimonials, newsletter, footer
- Product listing with search, category filter, sort, pagination
- Product detail with image gallery, variations, reviews, related products
- Cart (add/remove/update qty), coupon support, totals
- Checkout flow with shipping + payment selection + order confirmation
- Wishlist and autocomplete search

### Accounts
- Signup/login with JWT
- Profile dashboard with order history + saved addresses + wishlist

### Admin Dashboard
- Product CRUD UI
- Order list
- User list
- Inventory and analytics cards

### Backend APIs
- Auth (signup/login/profile)
- Products (list/search/single/create/update/delete)
- Orders (create/list)
- Reviews (create)
- Admin analytics

## Run Locally

### 1) Install dependencies
```bash
npm install
npm run install:all
```

### 2) Configure env files
Create `server/.env`:
```env
PORT=5000
JWT_SECRET=super-secret
MONGO_URI=
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> If `MONGO_URI` is empty, backend runs with JSON/in-memory fallback for demo usage.

### 3) Start app
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Routes (Express)
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/products`
- `GET /api/products/autocomplete?q=...`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders` (admin)
- `POST /api/reviews`
- `GET /api/admin/analytics` (admin)

## Notes
- Stripe checkout intent endpoint can be added in `server/src/routes/orderRoutes.js` (scaffold in place).
- SEO metadata is configured in Next.js `app/layout.tsx`.
