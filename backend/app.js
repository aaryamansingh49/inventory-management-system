const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const {authLimiter,apiLimiter,} = require("./middlewares/rateLimitMiddleware");

const app = express();
app.use(apiLimiter);

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", apiLimiter, productRoutes);
app.use("/api/suppliers", apiLimiter, supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/orders", apiLimiter, orderRoutes);
app.use("/api/dashboard", apiLimiter, dashboardRoutes);
app.use("/api/invoices",  invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Inventory Management API Running...");
});

module.exports = app;
