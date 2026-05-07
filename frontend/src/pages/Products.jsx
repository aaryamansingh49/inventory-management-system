import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function Products() {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // Fetch products
  const getProducts = async () => {
    try {
      const response = await api.get(
        `/products?page=${page}&limit=5&search=${search}`
      );

      setProducts(response.data.products);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      alert("Product deleted");

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page, search]);

  return (
    <MainLayout>
      <h1>Products</h1>

      {/* Search */}

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {/* Table */}

      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{
          background: "white",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>

            <th>Name</th>

            <th>SKU</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Category</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              <td>{product.name}</td>

              <td>{product.sku}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>{product.category_name}</td>

              <td>
                <button onClick={() => navigate(`/edit-product/${product.id}`)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span
          style={{
            margin: "0 15px",
          }}
        >
          Page {page}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
}

export default Products;
