import { useEffect, useState } from "react";
import { Calendar, ShoppingBag, MapPin, Layers, ChevronLeft, ChevronRight, Hash, DollarSign } from "lucide-react";
import axios from "axios";
import "../styles/purchaseHistory.css";
import MainLayout from "../layouts/MainLayout";

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/purchases/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentRecords = history.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(history.length / recordsPerPage);

  return (
    <MainLayout>
      <div className="purchase-history-container">
        <div className="purchase-history-header">
          <div>
            <h1>Purchase History</h1>
            <p className="subtitle">View and manage your recent inventory acquisitions</p>
          </div>
        </div>

        <div className="table-card">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th><div className="th-content"><Hash size={14} /> ID</div></th>
                  <th><div className="th-content"><Layers size={14} /> Supplier</div></th>
                  <th><div className="th-content"><MapPin size={14} /> Address</div></th>
                  <th><div className="th-content"><ShoppingBag size={14} /> Product</div></th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th><div className="th-content"><Calendar size={14} /> Date</div></th>
                </tr>
              </thead>

              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((item, index) => (
                    <tr key={index}>
                      <td className="text-muted">#{item.purchase_id}</td>
                      <td className="font-medium">{item.supplier_name}</td>
                      <td className="text-muted text-truncate">{item.address}</td>
                      <td className="font-medium">{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{Number(item.price).toLocaleString('en-IN')}</td>
                      <td className="font-semibold">₹{Number(item.total_amount).toLocaleString('en-IN')}</td>
                      <td className="text-muted text-sm">
                        {new Date(item.purchase_date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="empty-state">
                      No purchase records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-pagination-navigation-footer centered-layout">
            <div className="pagination-action-controls">
              <button
                type="button"
                className="pag-nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`pag-nav-btn page-num-btn ${currentPage === index + 1 ? "active-page" : ""}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                type="button"
                className="pag-nav-btn"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
              
          
              <div className="page-meta-counter">
                Page <span>{currentPage}</span> of <span>{totalPages || 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PurchaseHistory;
