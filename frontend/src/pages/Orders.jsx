import {
    useEffect,
    useState
  } from "react";
  
  import MainLayout from "../layouts/MainLayout";
  
  import api from "../services/api";
  
  function Orders() {
  
    const [products, setProducts] = useState([]);
  
    const [customerName, setCustomerName] =
      useState("");
  
    const [selectedItems, setSelectedItems] =
      useState([]);
  
    // Fetch products
    const getProducts = async () => {
  
      try {
  
        const response = await api.get(
          "/products"
        );
  
        setProducts(response.data.products);
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
    // Add product to order
    const addProduct = () => {
  
      setSelectedItems([
        ...selectedItems,
  
        {
          product_id: "",
          quantity: 1,
          price: 0
        }
      ]);
  
    };
  
    // Handle item changes
    const handleItemChange = (
      index,
      field,
      value
    ) => {
  
      const updatedItems = [...selectedItems];
  
      updatedItems[index][field] = value;
  
      // Auto set product price
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
  
      setSelectedItems(updatedItems);
  
    };
  
    // Calculate total
    const calculateTotal = () => {
  
      return selectedItems.reduce(
        (total, item) => {
  
          return (
            total +
            item.quantity * item.price
          );
  
        },
        0
      );
  
    };
  
    // Submit order
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
      try {
  
        await api.post(
          "/orders",
          {
            customer_name:
              customerName,
  
            items: selectedItems
          }
        );
  
        alert("Order created");
  
        setCustomerName("");
  
        setSelectedItems([]);
  
      } catch (error) {
  
        console.log(error);
  
        alert(
          error.response?.data?.message
        );
  
      }
  
    };
  
    useEffect(() => {
  
      getProducts();
  
    }, []);
  
    return (
  
      <MainLayout>
  
        <h1>Create Order</h1>
  
        <form onSubmit={handleSubmit}>
  
          {/* Customer Name */}
  
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            style={inputStyle}
          />
  
          {/* Add Product Button */}
  
          <button
            type="button"
            onClick={addProduct}
            style={{
              marginBottom: "20px"
            }}
          >
            Add Product
          </button>
  
          {/* Product Items */}
  
          {selectedItems.map(
            (item, index) => (
  
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "15px"
                }}
              >
  
                {/* Product Dropdown */}
  
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
                  placeholder="Qty"
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
  
          {/* Submit */}
  
          <button type="submit">
  
            Create Order
  
          </button>
  
        </form>
  
      </MainLayout>
  
    );
  
  }
  
  const inputStyle = {
  
    padding: "10px",
  
    minWidth: "200px"
  
  };
  
  export default Orders;