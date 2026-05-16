# Inventory Management System

A full-stack Inventory Management System built using React.js, Node.js, Express.js, PostgreSQL, and Redis.

This application helps businesses manage:

* Products
* Inventory
* Orders
* Purchases
* Suppliers
* Invoices
* Analytics
* User Authentication
* Role-Based Access Control

The project includes advanced backend concepts like:

* JWT Authentication
* Redis Caching
* PostgreSQL Transactions
* Row-Level Locking
* Invoice PDF Generation
* Rate Limiting
* Role-Based Authorization
* Inventory Logging
* Dashboard Analytics

---

# 🚀 Features

## Admin Features

* Add/Edit/Delete Products
* Manage Suppliers
* Create Purchases
* Create Orders
* Download Invoices
* View Dashboard Analytics
* Monitor Inventory Logs
* Access Complete System
* View Low Stock Products

---

## 👨‍💼 Staff Features

* View Products
* Create Orders
* Create Purchases
* Download Invoices
* View Inventory Logs
* Access Dashboard

### Restrictions

Staff cannot:

* Add/Delete Products
* Add Suppliers
* Access Admin-only Controls

---

#  Tech Stack

## Frontend

* React.js
* Vite
* Axios
* Recharts
* CSS

---

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* PDFKit
* Redis
* Express Rate Limit

---

## Database

* PostgreSQL

---

## Cache

* Redis

---

# 📁 Project Structure

```bash
Inventory_Management/
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── inventoryController.js
│   │   ├── invoiceController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── purchaseController.js
│   │   └── supplierController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── rateLimiter.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── invoiceRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── purchaseRoutes.js
│   │   └── supplierRoutes.js
│   │
│   ├── utils/
│   │   └── generateInvoice.js
│   │
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Purchases.jsx
│   │   │   ├── Suppliers.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── form.css
│   │   │   ├── layout.css
│   │   │   └── table.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔐Authentication & Security Features

* JWT Authentication
* Password Hashing
* Token-based Authentication
* Protected APIs & Routes
* Role-Based Authorization
* Rate Limiting
* Secure Middleware Structure

---

#  Roles

## Admin

Admins have complete access to the system.

### Permissions

* Manage Products
* Manage Suppliers
* Create Orders
* Create Purchases
* Download Invoices
* View Dashboard Analytics
* Access Inventory Logs

---

## Staff

Staff users have limited access.

### Permissions

* Create Orders
* Create Purchases
* View Products
* Download Invoices
* View Inventory Logs

### Restrictions

* Cannot Delete Products
* Cannot Add Suppliers
* Cannot Access Admin Controls

---

#  Product Management

## Features

* Add Product
* Edit Product
* Delete Product
* Product Search
* Pagination
* SKU Management
* Category Management

## Product Fields

* Product Name
* SKU
* Description
* Price
* Stock
* Category

---

# 🛒 Orders Module

## Features

* Create Orders
* Multiple Products Per Order
* Automatic Total Calculation
* Invoice Generation
* Stock Reduction
* Inventory Logging
* Recent Orders Tracking

---

## Advanced Backend Features

### PostgreSQL Transactions

Used to ensure data consistency while creating orders.

### Row-Level Locking

```sql
FOR UPDATE
```

Prevents race conditions during stock updates.

### Validations

* Empty Product Validation
* Duplicate Product Validation
* Stock Validation
* Quantity Validation

---

#  Purchases Module

## Features

* Create Purchases
* Select Suppliers
* Add Products
* Automatic Stock Increase
* Inventory Tracking

---

# Supplier Module

## Features

* Add Supplier
* View Suppliers
* Store Contact Information

## Supplier Fields

* Supplier Name
* Phone Number
* Address

---

#  Dashboard & Analytics

## Dashboard Includes

* Total Products
* Total Orders
* Total Suppliers
* Total Revenue
* Low Stock Items
* Sales Analytics Chart

---

## Analytics

Implemented using:

```bash
Recharts
```

### Chart Type

* Line Chart

---

#  Inventory Logs

Tracks all inventory movements.

## Actions

* SALE
* PURCHASE

## Features

* Quantity Tracking
* Timestamp Tracking
* Product History
* Inventory Audit System

---

# 🧾 Invoice System

Invoices are generated dynamically in PDF format.

## Features

* PDF Invoice Generation
* Download Invoice
* Order-wise Invoice

## Technology

```bash
PDFKit
```

---

# ⚡ Redis Caching

Redis is used for:

* Dashboard Stats Caching
* Faster API Responses
* Reduced Database Load



# 🗄️ Database Tables

```bash
users
products
categories
orders
order_items
suppliers
purchases
purchase_items
inventory_logs
```

---

# 🔄 Order Workflow

```bash
Create Order
    ↓
Validate Products
    ↓
Check Stock
    ↓
Lock Product Rows
    ↓
Create Order
    ↓
Insert Order Items
    ↓
Reduce Stock
    ↓
Create Inventory Logs
    ↓
Generate Invoice
```

---

# 🔄 Purchase Workflow

```bash
Create Purchase
    ↓
Select Supplier
    ↓
Add Products
    ↓
Increase Product Stock
    ↓
Create Inventory Logs
```

#  API Endpoints

## Authentication

```bash
POST /api/auth/login
```

---

## Products

```bash
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Orders

```bash
POST /api/orders
```

---

## Purchases

```bash
POST /api/purchases
```

---

## Suppliers

```bash
GET  /api/suppliers
POST /api/suppliers
```

---

## Dashboard

```bash
GET /api/dashboard/stats
GET /api/dashboard/sales-analytics
GET /api/dashboard/recent-orders
GET /api/dashboard/recent-purchases
```

---

## Inventory

```bash
GET /api/inventory/history
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url
```

---

#  Installation Guide

# 1️⃣ Clone Repository

```bash
git clone <repository_url>
```

---

# 2️⃣ Backend Setup

```bash
cd backend
npm install
nodemon server.js
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 4️⃣ Open Application

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:5000
```

---

#  Project Level

This project is more advanced than a basic CRUD application because it includes:

* Authentication
* Role-Based Access Control
* Redis Caching
* Transactions
* Invoice Generation
* Analytics Dashboard
* Inventory Tracking
* Rate Limiting
* Modern SaaS UI

---
## Demo Credentials

```
Staff Login
Email: staff@gmail.com
Password: 123456
```

# 👨‍💻 Author

Developed by ASR 
