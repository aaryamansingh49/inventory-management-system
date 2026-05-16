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
      <div className="products-dashboard-wrapper">
        
        {/* Top Header Section */}
        <div className="products-header-row">
          <h1 className="products-main-title">Products</h1>
          <div className="products-search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="products-search-input"
            />
          </div>
        </div>

        {/* Content Card Panel */}
        <div className="products-card-panel">
          <div className="products-table-container">
            <table className="products-data-table">
              <thead>
                <tr>
                  <th>PRODUCT ID</th>
                  <th>PRODUCT NAME</th>
                  <th>SKU</th>
                  <th>PRODUCT PRICE</th>
                  <th>STOCK QUANTITY</th>
                  <th>PRODUCT CATEGORY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="product-id-cell">{product.id}</td>
                      <td className="product-name-cell">{product.name}</td>
                      <td className="product-sku-cell">{product.sku}</td>
                      <td className="product-price-cell">₹{product.price}</td>
                      <td className="product-stock-cell">{product.stock}</td>
                      <td className="product-category-cell">{product.category_name}</td>
                      <td className="product-actions-cell">
                        {role === "admin" && (
                          <div className="action-buttons-group">
                            <button
                              className="product-btn-edit"
                              onClick={() => navigate(`/edit-product/${product.id}`)}
                            >
                              Edit
                            </button>
                            <button
                              className="product-btn-delete"
                              onClick={() => deleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="products-empty-state">
                      No products found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Pagination controls inside the card */}
          <div className="products-pagination-footer">
            <button
              className="products-nav-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            
            <span className="products-page-indicator">
              Current Page: {page} of {totalPages}
            </span>

            <button
              className="products-nav-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Products;
