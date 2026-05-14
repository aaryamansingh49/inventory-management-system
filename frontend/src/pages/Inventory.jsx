import {
    useEffect,
    useState
  } from "react";
  
  import "../styles/table.css";
  import "../styles/dashboard.css";
  
  import MainLayout from "../layouts/MainLayout";
  
  import api from "../services/api";
  
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
  
        <div className="dashboard-section">
  
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
  
            <h1>
  
              Inventory History
  
            </h1>
  
            <div
              style={{
                fontWeight: "bold",
                color: "#2563eb"
              }}
            >
  
              Page {page} of {totalPages}
  
            </div>
  
          </div>
  
          <table className="custom-table">
  
            <thead>
  
              <tr>
  
                <th>ID</th>
  
                <th>Product</th>
  
                <th>Action</th>
  
                <th>Quantity</th>
  
                <th>Date</th>
  
              </tr>
  
            </thead>
  
            <tbody>
  
              {history.map((item) => (
  
                <tr key={item.id}>
  
                  <td>{item.id}</td>
  
                  <td>
                    {item.product_name}
                  </td>
  
                  <td>
  
                    {
  
                      item.action === "SALE"
  
                        ? "🔻 SALE"
  
                        : "🟢 PURCHASE"
  
                    }
  
                  </td>
  
                  <td>
                    {item.quantity}
                  </td>
  
                  <td>
  
                    {
                      new Date(
                        item.created_at
                      ).toLocaleString()
                    }
  
                  </td>
  
                </tr>
  
              ))}
  
            </tbody>
  
          </table>
  
          {/* Pagination */}
  
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginTop: "25px"
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
  
              Page {page}
  
            </span>
  
            <button
              className="primary-btn"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage(page + 1)
              }
            >
  
              Next
  
            </button>
  
          </div>
  
        </div>
  
      </MainLayout>
  
    );
  
  }
  
  export default Inventory;