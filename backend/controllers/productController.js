const pool = require("../config/db");


//Add Products
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


//Get Products
const getAllProducts = async (req, res) => {

    try {
  
      // Pagination
      const page = parseInt(req.query.page) || 1;
  
      const limit = parseInt(req.query.limit) || 5;
  
      const offset = (page - 1) * limit;
  
      // Search
      const search = req.query.search || "";
  
      // Total count
      const totalProducts = await pool.query(
        `
        SELECT COUNT(*) FROM products
        WHERE name ILIKE $1
        `,
        [`%${search}%`]
      );
  
      // Fetch products
      const products = await pool.query(
        `
        SELECT
          products.id,
          products.name,
          products.sku,
          products.description,
          products.price,
          products.stock,
          categories.category_name
  
        FROM products
  
        LEFT JOIN categories
        ON products.category_id = categories.id
  
        WHERE products.name ILIKE $1
  
        ORDER BY products.id DESC
  
        LIMIT $2 OFFSET $3
        `,
        [
          `%${search}%`,
          limit,
          offset
        ]
      );
  
      res.status(200).json({
  
        total: parseInt(totalProducts.rows[0].count),
  
        currentPage: page,
  
        totalPages: Math.ceil(
          totalProducts.rows[0].count / limit
        ),
  
        products: products.rows
  
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };


  //Update Products
  const updateProduct = async (req, res) => {

    try {
  
      const { id } = req.params;
  
      const {
        name,
        sku,
        description,
        price,
        stock,
        category_id
      } = req.body;
  
      // Check product exists
      const existingProduct = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
  
      if (existingProduct.rows.length === 0) {
  
        return res.status(404).json({
          message: "Product not found"
        });
  
      }
  
      // Update product
      const updatedProduct = await pool.query(
        `
        UPDATE products
  
        SET
          name = $1,
          sku = $2,
          description = $3,
          price = $4,
          stock = $5,
          category_id = $6
  
        WHERE id = $7
  
        RETURNING *
        `,
        [
          name,
          sku,
          description,
          price,
          stock,
          category_id,
          id
        ]
      );
  
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct.rows[0]
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };

  //Delete Products

  const deleteProduct = async (req, res) => {

    try {
  
      const { id } = req.params;
  
      // Check product exists
      const existingProduct = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
  
      if (existingProduct.rows.length === 0) {
  
        return res.status(404).json({
          message: "Product not found"
        });
  
      }
  
      // Delete product
      await pool.query(
        "DELETE FROM products WHERE id = $1",
        [id]
      );
  
      res.status(200).json({
        message: "Product deleted successfully"
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server Error"
      });
  
    }
  
  };

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};