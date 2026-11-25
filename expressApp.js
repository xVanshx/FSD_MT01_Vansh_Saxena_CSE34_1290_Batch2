const express = require('express');

const app = express();
app.use(express.json());

// In-memory product store
const products = [
  { id: 301, name: 'Wireless Mouse', category: 'Electronics', price: 799, quantity: 25, inStock: true },
  { id: 302, name: 'Notebook', category: 'Stationery', price: 60, quantity: 100, inStock: true },
  { id: 303, name: 'USB Keyboard', category: 'Electronics', price: 999, quantity: 0, inStock: false }
];

let nextId = 304;

// GET all records
app.get('/api/products', (req, res) => {
  return res.status(200).json(products);
});

// Filter records (declared before /:id so 'filter' is not treated as an ID)
app.get('/api/products/filter', (req, res) => {
  const category = req.query.category;
  if (category === undefined) {
    return res.status(200).json(products);
  }
  const matches = products.filter(
    (p) => p.category.toLowerCase() === String(category).toLowerCase()
  );
  return res.status(200).json(matches);
});

// GET record by ID
app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
});

// POST a new record
app.post('/api/products', (req, res) => {
  const body = req.body || {};
  const { name, category, price, quantity, inStock } = body;

  const errors = [];
  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('name must be a non-empty string');
  }
  if (typeof category !== 'string' || category.trim() === '') {
    errors.push('category must be a non-empty string');
  }
  if (typeof price !== 'number' || !Number.isFinite(price)) {
    errors.push('price must be a number');
  }
  if (typeof quantity !== 'number' || !Number.isFinite(quantity)) {
    errors.push('quantity must be a number');
  }
  if (typeof inStock !== 'boolean') {
    errors.push('inStock must be a boolean');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request body', errors });
  }

  const newProduct = {
    id: nextId++,
    name: name.trim(),
    category: category.trim(),
    price,
    quantity,
    inStock
  };

  products.push(newProduct);
  return res.status(201).json(newProduct);
});

// PUT / update a record
app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const body = req.body || {};
  const errors = [];

  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim() === '') {
      errors.push('name must be a non-empty string');
    }
  }
  if (body.category !== undefined) {
    if (typeof body.category !== 'string' || body.category.trim() === '') {
      errors.push('category must be a non-empty string');
    }
  }
  if (body.price !== undefined) {
    if (typeof body.price !== 'number' || !Number.isFinite(body.price)) {
      errors.push('price must be a number');
    }
  }
  if (body.quantity !== undefined) {
    if (typeof body.quantity !== 'number' || !Number.isFinite(body.quantity)) {
      errors.push('quantity must be a number');
    }
  }
  if (body.inStock !== undefined) {
    if (typeof body.inStock !== 'boolean') {
      errors.push('inStock must be a boolean');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request body', errors });
  }

  const product = products[idx];
  if (body.name !== undefined) product.name = body.name.trim();
  if (body.category !== undefined) product.category = body.category.trim();
  if (body.price !== undefined) product.price = body.price;
  if (body.quantity !== undefined) product.quantity = body.quantity;
  if (body.inStock !== undefined) product.inStock = body.inStock;

  return res.status(200).json(product);
});

// DELETE a record
app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products.splice(idx, 1);
  return res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = app;
