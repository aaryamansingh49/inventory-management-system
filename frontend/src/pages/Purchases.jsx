import { useEffect, useState } from "react";
import {
  UserPlus,
  Plus,
  ShoppingCart,
  Trash2,
  Layers,
  CreditCard,
} from "lucide-react";
import "../styles/purchases.css";
import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function Purchases() {
  const [suppliers, setSuppliers] = useState([]);

  const [products, setProducts] = useState([]);

  const [supplierId, setSupplierId] = useState("");

  const [items, setItems] = useState([]);

  // Fetch suppliers
  const getSuppliers = async () => {
    try {
      const response = await api.get("/suppliers");

      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products
  const getProducts = async () => {
    try {
      const response = await api.get("/products/all");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add item row
  const addItem = () => {
    setItems([
      ...items,

      {
        product_id: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] = value;

    // Auto price fill
    if (field === "product_id") {
      const selectedProduct = products.find((p) => p.id === parseInt(value));

      if (selectedProduct) {
        updatedItems[index].price = selectedProduct.price;
      }
    }

    setItems(updatedItems);
  };

  // Calculate total
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  // Submit purchase
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!supplierId) {
      return alert("Please select supplier");
    }

    if (items.length === 0) {
      return alert("Please add products");
    }

    try {
      await api.post("/purchases", {
        supplier_id: supplierId,
        items,
      });

      alert("Purchase created");

      setSupplierId("");

      setItems([]);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getSuppliers();

    getProducts();
  }, []);

  return (
    <MainLayout>
      <div className="purchases-page-wrapper">
        <div className="purchases-header">
          <h1>Purchases</h1>
        </div>

        <form onSubmit={handleSubmit} className="purchases-main-form">
          {/* Top Actions Bar */}
          <div className="purchases-top-bar">
            <div className="supplier-select-box">
              <label className="field-label">Supplier</label>
              <div className="select-icon-wrapper">
                <UserPlus size={18} className="inner-icon" />
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="premium-select"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.supplier_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="button" onClick={addItem} className="action-add-btn">
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </div>

          {/* Form Dynamic Section */}
          <div className="purchase-details-card">
            <div className="card-inner-header">
              <h3>Purchase Details</h3>
            </div>

            {items.length === 0 ? (
              <div className="empty-items-state">
                <ShoppingCart size={40} />
                <p>No products added yet. Click "Add Product" above to start build configuration.</p>
              </div>
            ) : (
              <div className="product-rows-container">
                {items.map((item, index) => (
                  <div key={index} className="purchase-item-row">
                    {/* Product Selection */}
                    <div className="row-input-cell group-two-flex">
                      <label className="row-mobile-label">Product</label>
                      <select
                        value={item.product_id}
                        onChange={(e) =>
                          handleItemChange(index, "product_id", e.target.value)
                        }
                        className="row-form-input"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity Field */}
                    <div className="row-input-cell">
                      <label className="row-mobile-label">Quantity</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", Number(e.target.value))
                        }
                        placeholder="1"
                        className="row-form-input alignment-center"
                        min="1"
                      />
                    </div>

                    {/* Price Display Field */}
                    <div className="row-input-cell">
                      <label className="row-mobile-label">Price</label>
                      <input
                        type="number"
                        value={item.price || "1299.00"}
                        readOnly
                        placeholder="0.00"
                        className="row-form-input readonly-style"
                      />
                    </div>

                    {/* Extra Visual Sync Option to Clear/Remove Element Line */}
                    <button 
                      type="button" 
                      className="inline-row-remove-btn"
                      onClick={() => {
                        const filtered = items.filter((_, i) => i !== index);
                        setItems(filtered);
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Form Footer Section containing Order Values and Final Processing Submission */}
            <div className="purchase-card-summary-footer">
              <div className="summary-display-metrics">
                <span className="summary-label">Order Total</span>
                <span className="summary-value-amount">
                  ₹{calculateTotal()}
                </span>
              </div>

              <button type="submit" className="submit-purchase-main-btn">
                <Layers size={18} />
                <span>Create Purchase</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default Purchases;
