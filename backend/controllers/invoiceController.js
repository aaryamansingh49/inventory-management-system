const pool = require("../config/db");

const PDFDocument = require("pdfkit");

const path = require("path");

const generateInvoice = async (
  req,
  res
) => {

  try {

    const { orderId } = req.params;

    // Fetch order
    const orderResult =
      await pool.query(
        `
        SELECT *
        FROM orders
        WHERE id = $1
        `,
        [orderId]
      );

    if (
      orderResult.rows.length === 0
    ) {

      return res.status(404).json({
        message: "Order not found"
      });

    }

    const order =
      orderResult.rows[0];

    // Fetch order items
    const itemsResult =
      await pool.query(
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
const doc =
new PDFDocument({

  margin: 50,

  size: "A4"

});

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

// COLORS

const primaryColor =
"#2563eb";

const grayColor =
"#6b7280";

const borderColor =
"#dbeafe";

// HEADER

doc
.rect(0, 0, 650, 120)
.fill(primaryColor);

doc
.fillColor("white")
.fontSize(28)
.font("Helvetica-Bold")
.text(
  "INVENTORY INVOICE",
  50,
  40
);

doc
.fontSize(13)
.font("Helvetica")
.text(
  "Thank you for your business!",
  50,
  78
);

// PAID BADGE

doc
.roundedRect(
  460,
  40,
  90,
  35,
  20
)
.fill("white");

doc
.fillColor(primaryColor)
.fontSize(15)
.font("Helvetica-Bold")
.text(
  "PAID",
  485,
  50
);

// RESET COLOR

doc.fillColor("black");

// INVOICE DETAILS

doc
.fontSize(18)
.font("Helvetica-Bold")
.text(
  `Invoice #INV-${order.id}`,
  50,
  150
);

doc
.fontSize(12)
.font("Helvetica")
.fillColor(grayColor)
.text(
  `Order Date: ${new Date(order.order_date).toLocaleDateString()}`,
  50,
  185
);

doc.text(
`Customer: ${order.customer_name}`,
50,
205
);

// TOTAL CARD

doc
.roundedRect(
  380,
  145,
  170,
  90,
  10
)
.stroke(borderColor);

doc
.fillColor(primaryColor)
.fontSize(14)
.font("Helvetica-Bold")
.text(
  "TOTAL AMOUNT",
  398,
  170
);

doc
.fontSize(20)
.font("Helvetica-Bold")
.text(
  `Rs. ${order.total_amount}`,
  390,
  200,
  {
    width: 150,
    align: "center"
  }
);

// TABLE HEADER

const tableTop = 300;

doc
.rect(
  50,
  tableTop,
  500,
  35
)
.fill(primaryColor);

doc
.fillColor("white")
.fontSize(12)
.font("Helvetica-Bold");

doc.text(
"#",
65,
tableTop + 10
);

doc.text(
"PRODUCT",
110,
tableTop + 10
);

doc.text(
"QTY",
330,
tableTop + 10
);

doc.text(
"PRICE",
400,
tableTop + 10
);

doc.text(
"TOTAL",
485,
tableTop + 10
);

// TABLE ROWS

let y = tableTop + 45;

itemsResult.rows.forEach(
(item, index) => {

  const total =
    item.quantity *
    item.price;

  doc
    .fillColor("black")
    .font("Helvetica")
    .fontSize(11);

  doc.text(
    index + 1,
    65,
    y
  );

  doc.text(
    item.name,
    110,
    y,
    {
      width: 180
    }
  );

  doc.text(
    item.quantity,
    340,
    y
  );

  doc.text(
    `Rs. ${item.price}`,
    390,
    y
  );

  doc.text(
    `Rs. ${total}`,
    480,
    y
  );

  // ROW LINE

  doc
    .moveTo(50, y + 25)
    .lineTo(550, y + 25)
    .strokeColor("#e5e7eb")
    .stroke();

  y += 28;

}
);

// GRAND TOTAL

doc
.roundedRect(
  360,
  y + 30,
  190,
  70,
  10
)
.fill("#eff6ff");

doc
.fillColor(primaryColor)
.fontSize(16)
.font("Helvetica-Bold")
.text(
  "GRAND TOTAL",
  385,
  y + 50
);

doc
.fontSize(20)
.font("Helvetica-Bold")
.text(
  `Rs. ${order.total_amount}`,
  375,
  y + 72,
  {
    width: 150,
    align: "center"
  }
);

// FOOTER POSITION

const footerY =
y + 120;

// FOOTER LINE

doc
.moveTo(50, footerY)
.lineTo(550, footerY)
.strokeColor(primaryColor)
.stroke();

// LEFT FOOTER

doc
.fillColor("black")
.fontSize(14)
.font("Helvetica-Bold")
.text(
  "Inventory Management System",
  50,
  footerY + 20
);

doc
.fontSize(11)
.font("Helvetica")
.fillColor(grayColor)
.text(
  "Smart Inventory. Better Business.",
  50,
  footerY + 40
);

doc.text(
"support@inventory.com",
50,
footerY + 58
);

doc.text(
"+91 98765 43210",
50,
footerY + 75
);

// RIGHT FOOTER

doc
.fillColor(primaryColor)
.fontSize(16)
.font("Helvetica-Bold")
.text(
  "Thank you!",
  420,
  footerY + 28
);

doc
.fontSize(10)
.fillColor(grayColor)
.text(
  "Computer generated invoice.",
  370,
  footerY + 52
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