import {
    useEffect,
    useState
  } from "react";
  import { Plus, Trash2, Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
  import "../styles/orders.css";
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

  const [page, setPage] =
  useState(1);

const [totalPages, setTotalPages] =
  useState(1);
  
    // Fetch products
    const getProducts = async () => {
  
      try {
  
        const response = await api.get(
          "/products/all"
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
          `/dashboard/recent-orders?page=${page}`
        );
    
        setRecentOrders(
          response.data.recentOrders
        );
    
        setTotalPages(
          response.data.totalPages
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
    
    }, []);
    
    useEffect(() => {
    
      getRecentOrders();
    
    }, [page]);

    // Status Chip UI rendering helper
  const renderStatusChip = (status) => {
    const cleanStatus = status ? status.toLowerCase() : 'pending';
    return (
      <span className={`status-badge badge-${cleanStatus}`}>
        {status || 'Pending'}
      </span>
    );
  };
  
    return (
      <MainLayout>
        <div className="orders-management-container">
          <div className="orders-page-header">
            <h1>Orders Management</h1>
          </div>
  
          {/* CREATE NEW ORDER CARD */}
          <div className="order-card-panel">
            <div className="panel-header-title">CREATE NEW ORDER</div>
            <form onSubmit={handleSubmit} className="order-builder-form">
              
              <div className="customer-input-row">
                <label htmlFor="customerNameInput">Customer Name</label>
                <div className="search-input-wrapper">
                  <input
                    id="customerNameInput"
                    type="text"
                    placeholder="Enter Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="clean-control-input"
                  />
                  <Search size={16} className="input-search-icon" />
                </div>
              </div>
  
              {/* Dynamic Product Formulation Grid */}
              <div className="product-table-framework">
                <div className="grid-table-header">
                  <div className="col-desc">PRODUCT DETAILS</div>
                  <div className="col-qty">QUANTITY</div>
                  <div className="col-price">UNIT PRICE</div>
                  <div className="col-amt">AMOUNT</div>
                  <div className="col-action">ACTION</div>
                </div>
  
                {selectedItems.length > 0 ? (
                  <div className="grid-table-body">
                    {selectedItems.map((item, index) => (
                      <div className="grid-table-row" key={index}>
                        <div className="col-desc">
                          <select
                            value={item.product_id}
                            onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
                            className="clean-control-select"
                          >
                            <option value="">Select Product from Inventory...</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-qty">
                          <input
                            type="number"
                            min="1"
                            placeholder="Enter Quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                            className="clean-control-input text-center"
                          />
                        </div>
                        <div className="col-price font-medium text-slate">
                          ₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="col-amt font-semibold text-slate">
                          ₹{(item.quantity * item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="col-action">
                          <button
                            type="button"
                            className="row-trash-action"
                            onClick={() => {
                              const filtered = [...selectedItems];
                              filtered.splice(index, 1);
                              setSelectedItems(filtered);
                            }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-items-placeholder">
                    No items added to this order yet. Click "Add Product" below to begin.
                  </div>
                )}
  
                <div className="product-addition-row">
                  <button
                    type="button"
                    onClick={addProduct}
                    className="add-product-dashed-btn"
                  >
                    <Plus size={14} /> Add Product
                  </button>
                  <div className="live-total-display">
                    Total Amount: <span className="price-bold">₹{calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
  
              <div className="form-submission-footer">
                <button type="submit" className="action-submit-order-btn">
                  CREATE ORDER
                </button>
              </div>
            </form>
          </div>
  
          {/* RECENT ORDERS GRID HISTORY */}
          <div className="orders-history-section-label">RECENT ORDERS</div>
          
          <div className="order-card-panel">
            <div className="panel-inner-sub-header">
              <h3>RECENT ORDERS HISTORY</h3>
              <div className="top-meta-pagination-text">
                Showing <span>Page {page}</span> of <span>{totalPages || 1}</span> orders
              </div>
            </div>
  
            <div className="responsive-table-view-container">
              <table className="modern-orders-data-sheet">
                <thead>
                  <tr>
                    <th style={{ width: '12%' }}>ORDER ID</th>
                    <th style={{ width: '28%' }}>CUSTOMER NAME</th>
                    <th style={{ width: '18%' }}>TOTAL AMOUNT</th>
                    <th style={{ width: '14%' }}>STATUS</th>
                    <th style={{ width: '14%' }}>ORDER DATE</th>
                    <th style={{ width: '14%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="order-id-label">#{order.id}</td>
                        <td className="font-medium text-dark-slate">{order.customer_name}</td>
                        <td className="font-semibold text-dark-slate">
                          ₹{Number(order.total_amount).toLocaleString('en-IN')}
                        </td>
                        <td>{renderStatusChip(order.status)}</td>
                        <td className="text-muted-gray text-sm">
                          {new Date(order.order_date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => downloadInvoice(order.id)}
                            className="download-invoice-action-btn"
                          >
                            <FileText size={14} /> Download Invoice
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="table-empty-fallback-state">
                        No matching records or recent history logged.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
  
            {/* Bottom Dynamic Nav Sheet Pagination */}
            <div className="bottom-pagination-action-bar">
              <div className="navigation-controls-cluster">
                <button
                  type="button"
                  className="navigation-arrow-btn"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
  
                {[...Array(totalPages)].map((_, idx) => {
                  const stepPage = idx + 1;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`navigation-arrow-btn numerical-page-btn ${page === stepPage ? "active-step" : ""}`}
                      onClick={() => setPage(stepPage)}
                    >
                      {stepPage}
                    </button>
                  );
                })}
  
                <button
                  type="button"
                  className="navigation-arrow-btn"
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  
  }
  
  export default Orders;