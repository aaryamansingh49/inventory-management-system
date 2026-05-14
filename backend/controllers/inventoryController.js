const pool = require("../config/db");

const getInventoryHistory = async (
    req,
    res
  ) => {
  
    try {
  
      // Current page
  
      const page =
        parseInt(req.query.page) || 1;
  
      // Records per page
  
      const limit = 10;
  
      // Skip records
  
      const offset =
        (page - 1) * limit;
  
      // Fetch history
  
      const history = await pool.query(
        `
        SELECT
          inventory_logs.id,
  
          products.name AS product_name,
  
          inventory_logs.action,
  
          inventory_logs.quantity,
  
          inventory_logs.created_at
  
        FROM inventory_logs
  
        JOIN products
        ON inventory_logs.product_id = products.id
  
        ORDER BY inventory_logs.created_at DESC
  
        LIMIT $1 OFFSET $2
        `,
        [limit, offset]
      );
  
      // Total logs count
  
      const totalLogs = await pool.query(
        `
        SELECT COUNT(*)
        FROM inventory_logs
        `
      );
  
      // Total pages
  
      const totalPages = Math.ceil(
        totalLogs.rows[0].count / limit
      );
  
      res.status(200).json({
  
        history: history.rows,
  
        totalPages,
  
        currentPage: page
  
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };

module.exports = {
  getInventoryHistory
};