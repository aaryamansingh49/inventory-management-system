const pool = require("../config/db");


// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {

  try {

    const categories = await pool.query(
      `
      SELECT *
      FROM categories

      ORDER BY id DESC
      `
    );

    res.status(200).json({
      categories: categories.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// ADD CATEGORY
const addCategory = async (req, res) => {

  try {

    const { category_name } = req.body;

    // Check existing category
    const existingCategory = await pool.query(
      `
      SELECT *
      FROM categories
      WHERE category_name = $1
      `,
      [category_name]
    );

    if (existingCategory.rows.length > 0) {

      return res.status(400).json({
        message: "Category already exists"
      });

    }

    // Insert category
    const newCategory = await pool.query(
      `
      INSERT INTO categories
      (category_name)

      VALUES($1)

      RETURNING *
      `,
      [category_name]
    );

    res.status(201).json({
      message: "Category added successfully",
      category: newCategory.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


module.exports = {
  getAllCategories,
  addCategory
};