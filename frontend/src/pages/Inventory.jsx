import {
    useEffect,
    useState
  } from "react";
  import "../styles/inventory.css";
  import MainLayout from "../layouts/MainLayout";
  import api from "../services/api";

  const ArrowUpDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
  );
  const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  );
  
  function Inventory() {
  
    const [history, setHistory] =
      useState([]);
  
    const [page, setPage] =
      useState(1);
  
    const [totalPages, setTotalPages] =
      useState(1);
  
    // Fetch history
  
    const getHistory = async () => {
  
      try {
  
        const response = await api.get(
          `/inventory/history?page=${page}`
        );
  
        setHistory(
          response.data.history
        );
  
        setTotalPages(
          response.data.totalPages
        );
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
    useEffect(() => {
  
      getHistory();
  
    }, [page]);
  
    return (
      <MainLayout>
        <div className="inventory-view-framework">
          
          {/* Dynamic Typography Top Header Section */}
          <div className="inventory-main-header">
            <h1>Inventory History</h1>
          </div>
  
          {/* Clean Rounded Sheet Card Box Component Container */}
          <div className="inventory-card-panel">
            <div className="inventory-table-scroll-wrapper">
              <table className="inventory-history-data-table">
                <thead>
                  <tr>
                    <th style={{ width: "16%" }}>INVENTORY ID</th>
                    <th style={{ width: "28%" }}>PRODUCT NAME</th>
                    <th style={{ width: "20%" }}>INVENTORY ACTION</th>
                    <th style={{ width: "16%" }}>QUANTITY</th>
                    <th style={{ width: "20%" }}>DATE & TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <tr key={item.id}>
                        <td className="id-tracking-label">{item.id}</td>
                        <td className="product-title-bold">{item.product_name}</td>
                        <td>
                          {item.action === "SALE" ? (
                            <span className="badge-action-pill sale-pill">
                              <ArrowUpDownIcon /> SALE
                            </span>
                          ) : (
                            <span className="badge-action-pill purchase-pill">
                              <ShoppingCartIcon /> PURCHASE
                            </span>
                          )}
                        </td>
                        <td className="quantity-counter-cell">{item.quantity}</td>
                        <td className="timestamp-data-label">
                          {new Date(item.created_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                          }).replace(',', '')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="inventory-empty-fallback">
                        No transactional logs recorded or found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
  
            {/* Action Navigation Pagination Row Block */}
            <div className="inventory-pagination-footer-bar">
              <div className="pagination-controls-cluster">
                <button
                  className="pagination-nav-arrow-btn"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
  
                <span className="pagination-current-step-label">
                  Current Page: {page} of {totalPages}
                </span>
  
                <button
                  className="pagination-nav-arrow-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
  
          </div>
        </div>
      </MainLayout>
    );
  
  }
  
  export default Inventory;