const pool = require("../config/db");

const createPurchase = async (req, res) => {

  const client = await pool.connect();

  try {

    const {
      supplier_id,
      items
    } = req.body;

    // Start transaction
    await client.query("BEGIN");

    // Calculate total amount
    let totalAmount = 0;

    items.forEach(item => {
      totalAmount += item.quantity * item.price;
    });

    // Create purchase
    const purchaseResult = await client.query(
      `
      INSERT INTO purchases
      (supplier_id, total_amount)

      VALUES($1, $2)

      RETURNING *
      `,
      [
        supplier_id,
        totalAmount
      ]
    );

    const purchaseId = purchaseResult.rows[0].id;

    // Loop items
    for (const item of items) {

      // Insert purchase items
      await client.query(
        `
        INSERT INTO purchase_items
        (purchase_id, product_id, quantity, price)

        VALUES($1, $2, $3, $4)
        `,
        [
          purchaseId,
          item.product_id,
          item.quantity,
          item.price
        ]
      );

      // Increase stock
      await client.query(
        `
        UPDATE products

        SET stock = stock + $1

        WHERE id = $2
        `,
        [
          item.quantity,
          item.product_id
        ]
      );

      // Inventory log
      await client.query(
        `
        INSERT INTO inventory_logs
        (product_id, action, quantity)

        VALUES($1, $2, $3)
        `,
        [
          item.product_id,
          "PURCHASE",
          item.quantity
        ]
      );

    }

    // Commit transaction
    await client.query("COMMIT");

    res.status(201).json({
      message: "Purchase created successfully"
    });

  } catch (error) {

    // Rollback if error
    await client.query("ROLLBACK");

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  } finally {

    client.release();

  }

};

module.exports = {
  createPurchase
};