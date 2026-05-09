const pool = require("../config/db");

const getInventoryHistory = async (
  req,
  res
) => {

  try {

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
      `
    );

    res.status(200).json({
      history: history.rows
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