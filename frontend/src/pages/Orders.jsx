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

      const [recentOrders, setRecentOrders] =
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

    //Recent Orders

    const getRecentOrders = async () => {

        try {
      
          const response = await api.get(
            "/dashboard/recent-orders"
          );
      
          setRecentOrders(
            response.data.recentOrders
          );
      
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


    const downloadInvoice = async (
        orderId
      ) => {
      
        try {
      
          const response = await api.get(
      
            `/invoices/${orderId}`,
      
            {
              responseType: "blob"
            }
      
          );
      
          // Create file URL
          const url =
            window.URL.createObjectURL(
              new Blob([response.data])
            );
      
          // Create link
          const link =
            document.createElement("a");
      
          link.href = url;
      
          link.setAttribute(
            "download",
            `invoice-${orderId}.pdf`
          );
      
          document.body.appendChild(link);
      
          link.click();
      
          link.remove();
      
        } catch (error) {
      
          console.log(error);
      
          alert("Invoice download failed");
      
        }
      
      };
  
    // Submit order
    const handleSubmit = async (e) => {
  
      e.preventDefault();

      //customer validation

      if (!customerName.trim()) {

        return alert(
          "Customer name is required"
        );
      
      }
      
      if (selectedItems.length === 0) {
      
        return alert(
          "Please add at least one product"
        );
      
      }

      //product validation

      for (const item of selectedItems) {

        if (!item.product_id) {
      
          return alert(
            "Please select a product"
          );
      
        }
      
        if (item.quantity <= 0) {
      
          return alert(
            "Quantity must be greater than 0"
          );
      
        }
      
      }
  
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

        getRecentOrders();
  
      } catch (error) {
  
        console.log(error);
  
        alert(
          error.response?.data?.message
        );
  
      }
  
    };
  
    useEffect(() => {
  
      getProducts();
      getRecentOrders();
  
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

        <hr
  style={{
    margin: "40px 0"
  }}
/>

<h2>Recent Orders</h2>

<table
  border="1"
  width="100%"
  cellPadding="10"
  style={{
    background: "white"
  }}
>

  <thead>

    <tr>

      <th>ID</th>

      <th>Customer</th>

      <th>Total</th>

      <th>Status</th>

      <th>Date</th>

      <th>Invoice</th>

    </tr>

  </thead>

  <tbody>

    {recentOrders.map((order) => (

      <tr key={order.id}>

        <td>{order.id}</td>

        <td>
          {order.customer_name}
        </td>

        <td>
          ₹{order.total_amount}
        </td>

        <td>
          {order.status}
        </td>

        <td>
          {
            new Date(
              order.order_date
            ).toLocaleDateString()
          }
        </td>

        <td>

        <button
  onClick={() =>
    downloadInvoice(order.id)
  }
>

  Download Invoice

</button>

          {/* <a
            href={`http://localhost:5000/api/invoices/${order.id}`}
            target="_blank"
          >

            Download Invoice

          </a> */}

        </td>

      </tr>

    ))}

  </tbody>

</table>
  
      </MainLayout>
  
    );
  
  }
  
  const inputStyle = {
  
    padding: "10px",
  
    minWidth: "200px"
  
  };
  
  export default Orders;