-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- CATEGORIES TABLE
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- SUPPLIERS TABLE
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- PRODUCTS TABLE
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK(price >= 0),
    stock INTEGER DEFAULT 0 CHECK(stock >= 0),
    image TEXT,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- PURCHASES TABLE
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id) ON DELETE CASCADE,
    total_amount NUMERIC(12,2) NOT NULL CHECK(total_amount >= 0),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- PURCHASE ITEMS TABLE
CREATE TABLE purchase_items (
    id SERIAL PRIMARY KEY,
    purchase_id INTEGER REFERENCES purchases(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    price NUMERIC(10,2) NOT NULL CHECK(price >= 0)
);



-- ORDERS TABLE
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL CHECK(total_amount >= 0),
    status VARCHAR(30) DEFAULT 'completed',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- ORDER ITEMS TABLE
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    price NUMERIC(10,2) NOT NULL CHECK(price >= 0)
);



-- INVENTORY LOGS TABLE
CREATE TABLE inventory_logs (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    action VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- INVOICES TABLE
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    total NUMERIC(12,2) NOT NULL CHECK(total >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- INDEXES

CREATE INDEX idx_products_name
ON products(name);

CREATE INDEX idx_products_sku
ON products(sku);

CREATE INDEX idx_orders_date
ON orders(order_date);

CREATE INDEX idx_inventory_logs_product
ON inventory_logs(product_id);