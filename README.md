# Product Inventory Management API (Set C)

REST API built with Node.js and Express.js. Records are stored in an in-memory JavaScript array (no database).

## Setup

```bash
npm install
```

## Run

```bash
node httpServer.js
# or
npm start
```

Server starts on port 3000.

## Endpoints

- GET /api/products
- POST /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/products/filter?category=value
```