import {
  useEffect,
  useState
} from "react";
import "../styles/forms.css";
import "../styles/table.css";
import "../styles/dashboard.css";
import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function Purchases() {

  const [suppliers, setSuppliers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [supplierId, setSupplierId] =
    useState("");

  const [items, setItems] =
    useState([]);

  // Fetch suppliers
  const getSuppliers = async () => {

    try {

      const response = await api.get(
        "/suppliers"
      );

      setSuppliers(
        response.data.suppliers
      );

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch products
  const getProducts = async () => {

    try {

      const response = await api.get(
        "/products/all"
      );

      setProducts(
        response.data.products
      );

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
        price: 0
      }
    ]);

  };

  // Handle item change
  const handleItemChange = (
    index,
    field,
    value
  ) => {

    const updatedItems = [...items];

    updatedItems[index][field] =
      value;

    // Auto price fill
    if (field === "product_id") {

      const selectedProduct =
        products.find(
          (p) =>
            p.id === parseInt(value)
        );

      if (selectedProduct) {

        updatedItems[index].price =
          selectedProduct.price;

      }

    }

    setItems(updatedItems);

  };

  // Calculate total
  const calculateTotal = () => {

    return items.reduce(
      (total, item) => {

        return (
          total +
          item.quantity * item.price
        );

      },
      0
    );

  };

  // Submit purchase
  const handleSubmit = async (e) => {

    e.preventDefault();

    // Validations
    if (!supplierId) {

      return alert(
        "Please select supplier"
      );

    }

    if (items.length === 0) {

      return alert(
        "Please add products"
      );

    }

    try {

      await api.post(
        "/purchases",
        {
          supplier_id: supplierId,
          items
        }
      );

      alert("Purchase created");

      setSupplierId("");

      setItems([]);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message
      );

    }

  };

  useEffect(() => {

    getSuppliers();

    getProducts();

  }, []);

  return (

    <MainLayout>
  
      <div className="dashboard-section">
  
        <h1
          style={{
            marginBottom: "20px"
          }}
        >
  
          Purchases
  
        </h1>
  
        <form onSubmit={handleSubmit}>
  
          {/* Supplier Dropdown */}
  
          <div className="form-group">
  
            <select
              value={supplierId}
              onChange={(e) =>
                setSupplierId(
                  e.target.value
                )
              }
              className="form-input"
            >
  
              <option value="">
                Select Supplier
              </option>
  
              {suppliers.map(
                (supplier) => (
  
                  <option
                    key={supplier.id}
                    value={supplier.id}
                  >
  
                    {
                      supplier.supplier_name
                    }
  
                  </option>
  
                )
              )}
  
            </select>
  
          </div>
  
          {/* Add Product */}
  
          <button
            type="button"
            onClick={addItem}
            className="primary-btn"
            style={{
              marginBottom: "20px"
            }}
          >
  
            Add Product
  
          </button>
  
          {/* Product Rows */}
  
          {items.map(
            (item, index) => (
  
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "2fr 1fr 1fr",
                  gap: "15px",
                  marginBottom: "20px"
                }}
              >
  
                {/* Product */}
  
                <select
                  value={item.product_id}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "product_id",
                      e.target.value
                    )
                  }
                  className="form-input"
                >
  
                  <option value="">
                    Select Product
                  </option>
  
                  {products.map(
                    (product) => (
  
                      <option
                        key={product.id}
                        value={product.id}
                      >
  
                        {product.name}
  
                      </option>
  
                    )
                  )}
  
                </select>
  
                {/* Quantity */}
  
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Quantity"
                  className="form-input"
                />
  
                {/* Price */}
  
                <input
                  type="number"
                  value={item.price}
                  readOnly
                  className="form-input"
                />
  
              </div>
  
            )
          )}
  
          {/* Total */}
  
          <h2
            style={{
              marginBottom: "20px"
            }}
          >
  
            Total:
            ₹{calculateTotal()}
  
          </h2>
  
          {/* Submit */}
  
          <button
            type="submit"
            className="primary-btn"
          >
  
            Create Purchase
  
          </button>
  
        </form>
  
      </div>
  
    </MainLayout>
  
  );
}

export default Purchases;