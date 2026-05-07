const pool = require("../config/db");
const redisClient = require("../config/redis");

const getDashboardStats = async (req, res) => {

    try {
  
      // Check cache first
      const cachedData = await redisClient.get(
        "dashboard_stats"
      );
  
      if (cachedData) {
  
        return res.status(200).json({
          source: "redis cache",
          data: JSON.parse(cachedData)
        });
  
      }
  
      // Total products
      const totalProducts = await pool.query(
        `SELECT COUNT(*) FROM products`
      );
  
      // Total orders
      const totalOrders = await pool.query(
        `SELECT COUNT(*) FROM orders`
      );
  
      // Revenue
      const totalRevenue = await pool.query(
        `
        SELECT COALESCE(SUM(total_amount), 0)
        AS revenue
        FROM orders
        `
      );
  
      // Low stock
      const lowStock = await pool.query(
        `
        SELECT COUNT(*)
        FROM products
        WHERE stock < 10
        `
      );
  
      const stats = {
  
        totalProducts:
          parseInt(totalProducts.rows[0].count),
  
        totalOrders:
          parseInt(totalOrders.rows[0].count),
  
        totalRevenue:
          parseFloat(totalRevenue.rows[0].revenue),
  
        lowStockItems:
          parseInt(lowStock.rows[0].count)
  
      };
  
      // Save in Redis cache
      await redisClient.set(
        "dashboard_stats",
        JSON.stringify(stats),
        {
          EX: 60
        }
      );
  
      res.status(200).json({
        source: "postgresql",
        data: stats
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };

//Recent Orders
const getRecentOrders = async (req, res) => {

    try {
  
      const recentOrders = await pool.query(
        `
        SELECT
          id,
          customer_name,
          total_amount,
          status,
          order_date
  
        FROM orders
  
        ORDER BY order_date DESC
  
        LIMIT 5
        `
      );
  
      res.status(200).json({
        recentOrders: recentOrders.rows
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };

  //Recent Purchases
  const getRecentPurchases = async (req, res) => {

    try {
  
      const recentPurchases = await pool.query(
        `
        SELECT
          purchases.id,
          suppliers.supplier_name,
          purchases.total_amount,
          purchases.purchase_date
  
        FROM purchases
  
        LEFT JOIN suppliers
        ON purchases.supplier_id = suppliers.id
  
        ORDER BY purchases.purchase_date DESC
  
        LIMIT 5
        `
      );
  
      res.status(200).json({
        recentPurchases: recentPurchases.rows
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };


  //Low Stock Products
  const getLowStockProducts = async (req, res) => {

    try {
  
      const lowStockProducts = await pool.query(
        `
        SELECT
          products.id,
          products.name,
          products.stock,
          categories.category_name
  
        FROM products
  
        LEFT JOIN categories
        ON products.category_id = categories.id
  
        WHERE products.stock < 10
  
        ORDER BY products.stock ASC
        `
      );
  
      res.status(200).json({
        lowStockProducts: lowStockProducts.rows
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getRecentPurchases,
  getLowStockProducts
};