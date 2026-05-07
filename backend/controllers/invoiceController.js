const pool = require("../config/db");

const PDFDocument = require("pdfkit");

const generateInvoice = async (req, res) => {

  try {

    const { orderId } = req.params;

    // Fetch order
    const orderResult = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE id = $1
      `,
      [orderId]
    );

    if (orderResult.rows.length === 0) {

      return res.status(404).json({
        message: "Order not found"
      });

    }

    const order = orderResult.rows[0];

    // Fetch order items
    const itemsResult = await pool.query(
      `
      SELECT
        order_items.quantity,
        order_items.price,
        products.name

      FROM order_items

      LEFT JOIN products
      ON order_items.product_id = products.id

      WHERE order_items.order_id = $1
      `,
      [orderId]
    );

    // Create PDF
    const doc = new PDFDocument();

    // Response headers
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${orderId}.pdf`
    );

    doc.pipe(res);

    // Title
    doc.fontSize(22).text(
      "Inventory Invoice",
      {
        align: "center"
      }
    );

    doc.moveDown();

    // Order info
    doc.fontSize(14).text(
      `Invoice ID: INV-${order.id}`
    );

    doc.text(
      `Customer Name: ${order.customer_name}`
    );

    doc.text(
      `Order Date: ${order.order_date}`
    );

    doc.text(
      `Total Amount: ₹${order.total_amount}`
    );

    doc.moveDown();

    // Product list
    doc.fontSize(16).text("Products:");

    doc.moveDown();

    itemsResult.rows.forEach((item, index) => {

      doc.fontSize(12).text(
        `${index + 1}. ${item.name}
         | Qty: ${item.quantity}
         | Price: ₹${item.price}`
      );

    });

    doc.moveDown();

    doc.fontSize(16).text(
      `Grand Total: ₹${order.total_amount}`
    );

    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

module.exports = {
  generateInvoice
};