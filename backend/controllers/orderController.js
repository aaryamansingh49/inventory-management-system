const pool = require("../config/db");

const createOrder = async (req, res) => {

  const client = await pool.connect();

  try {

    const {
      customer_name,
      items
    } = req.body;

   

    // Start transaction
    await client.query("BEGIN");

    let totalAmount = 0;

    // Lock products & validate stock
    for (const item of items) {

      const productResult = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1
        FOR UPDATE
        `,
        [item.product_id]
      );

      const product = productResult.rows[0];

      if (!product) {

        throw new Error("Product not found");

      }

      // Check stock
      if (product.stock < item.quantity) {

        throw new Error(
          `Insufficient stock for ${product.name}`
        );

      }

      totalAmount += item.quantity * item.price;

    }

    // Create order
    const orderResult = await client.query(
      `
      INSERT INTO orders
      (customer_name, total_amount)

      VALUES($1, $2)

      RETURNING *
      `,
      [
        customer_name,
        totalAmount
      ]
    );

    const orderId = orderResult.rows[0].id;

    // Process items
    for (const item of items) {

      // Insert order item
      await client.query(
        `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)

        VALUES($1, $2, $3, $4)
        `,
        [
          orderId,
          item.product_id,
          item.quantity,
          item.price
        ]
      );

      // Reduce stock
      await client.query(
        `
        UPDATE products

        SET stock = stock - $1

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
          "SALE",
          item.quantity
        ]
      );

    }

    // Commit transaction
    await client.query("COMMIT");

    res.status(201).json({
      message: "Order created successfully"
    });

  } catch (error) {

    // Rollback
    await client.query("ROLLBACK");

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  } finally {

    client.release();

  }

};

module.exports = {
  createOrder
};