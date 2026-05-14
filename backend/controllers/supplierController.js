const pool = require("../config/db");


// ADD SUPPLIER
const addSupplier = async (req, res) => {

  try {

    const {
      supplier_name,
      phone,
      address
    } = req.body;

    // Check existing supplier
    const existingSupplier = await pool.query(
      "SELECT * FROM suppliers WHERE phone = $1",
      [phone]
    );

    if (existingSupplier.rows.length > 0) {

      return res.status(400).json({
        message: "Supplier already exists"
      });

    }

    // Insert supplier
    const newSupplier = await pool.query(
      `
      INSERT INTO suppliers
      (supplier_name, phone, address)

      VALUES($1, $2, $3)

      RETURNING *
      `,
      [
        supplier_name,
        phone,
        address
      ]
    );

    res.status(201).json({
      message: "Supplier added successfully",
      supplier: newSupplier.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// GET ALL SUPPLIERS
const getAllSuppliers = async (
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

    // Fetch suppliers

    const suppliers = await pool.query(
      `
      SELECT *
      FROM suppliers

      ORDER BY id DESC

      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    // Total suppliers

    const totalSuppliers =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM suppliers
        `
      );

    // Total pages

    const totalPages = Math.ceil(
      totalSuppliers.rows[0].count /
      limit
    );

    res.status(200).json({

      suppliers:
        suppliers.rows,

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
  addSupplier,
  getAllSuppliers
};