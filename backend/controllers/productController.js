const pool = require("../config/db");

const addProduct = async (req, res) => {

  try {

    const {
      name,
      sku,
      description,
      price,
      stock,
      category_id
    } = req.body;

    // Check SKU already exists
    const existingProduct = await pool.query(
      "SELECT * FROM products WHERE sku = $1",
      [sku]
    );

    if (existingProduct.rows.length > 0) {

      return res.status(400).json({
        message: "SKU already exists"
      });

    }

    // Insert product
    const newProduct = await pool.query(
      `
      INSERT INTO products
      (name, sku, description, price, stock, category_id)

      VALUES($1, $2, $3, $4, $5, $6)

      RETURNING *
      `,
      [
        name,
        sku,
        description,
        price,
        stock,
        category_id
      ]
    );

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

module.exports = {
  addProduct
};