import {
  useEffect,
  useState
} from "react";

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
        "/products"
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

      <h1>Purchases</h1>

      <form onSubmit={handleSubmit}>

        {/* Supplier Dropdown */}

        <select
          value={supplierId}
          onChange={(e) =>
            setSupplierId(
              e.target.value
            )
          }
          style={inputStyle}
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

        <br /><br />

        {/* Add Item */}

        <button
          type="button"
          onClick={addItem}
        >

          Add Product

        </button>

        <br /><br />

        {/* Product Rows */}

        {items.map(
          (item, index) => (

            <div
              key={index}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px"
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
                style={inputStyle}
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
                style={inputStyle}
              />

              {/* Price */}

              <input
                type="number"
                value={item.price}
                readOnly
                style={inputStyle}
              />

            </div>

          )
        )}

        {/* Total */}

        <h2>
          Total: ₹
          {calculateTotal()}
        </h2>

        <button type="submit">

          Create Purchase

        </button>

      </form>

    </MainLayout>

  );

}

const inputStyle = {

  padding: "10px",

  minWidth: "200px"

};

export default Purchases;