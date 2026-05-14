import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";
import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

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
  
      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        Products
      </h1>
  
      {/* Search */}
  
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="form-input"
        style={{
          maxWidth: "350px",
          marginBottom: "20px"
        }}
      />
  
      {/* Table */}
  
      <div className="dashboard-section">
  
        <table className="custom-table">
  
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
  
                <td>
                  ₹{product.price}
                </td>
  
                <td>{product.stock}</td>
  
                <td>
                  {product.category_name}
                </td>
  
                <td>
  
                  {
  
                    role === "admin" && (
  
                      <>
  
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              `/edit-product/${product.id}`
                            )
                          }
                        >
  
                          Edit
  
                        </button>
  
                        <button
                          className="danger-btn"
                          onClick={() =>
                            deleteProduct(product.id)
                          }
                        >
  
                          Delete
  
                        </button>
  
                      </>
  
                    )
  
                  }
  
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
  
      {/* Pagination */}

<div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px"
  }}
>

  <button
    className="primary-btn"
    disabled={page === 1}
    onClick={() =>
      setPage(page - 1)
    }
  >

    Prev

  </button>

  <span
    style={{
      fontWeight: "bold"
    }}
  >

    Page {page} of {totalPages}

  </span>

  <button
    className="primary-btn"
    disabled={page === totalPages}
    onClick={() =>
      setPage(page + 1)
    }
  >

    Next

  </button>

</div>
  
    </MainLayout>
  
  );
}

export default Products;
