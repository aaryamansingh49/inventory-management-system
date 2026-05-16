import {
  useEffect,
  useState
} from "react";
import { User, Phone, MapPin, Plus, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import "../styles/suppliers.css";


import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function Suppliers() {

  const [suppliers, setSuppliers] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [formData, setFormData] =
    useState({

      supplier_name: "",

      phone: "",

      address: ""

    });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  // Handle input

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // Fetch suppliers

  const getSuppliers = async () => {

    try {

      const response = await api.get(
        `/suppliers?page=${page}`
      );

      setSuppliers(
        response.data.suppliers
      );

      setTotalPages(
        response.data.totalPages
      );

    } catch (error) {

      console.log(error);

    }

  };

  // Add supplier

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/suppliers",
        formData
      );

      alert("Supplier added");

      setFormData({

        supplier_name: "",

        phone: "",

        address: ""

      });

      getSuppliers();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message
      );

    }

  };

  useEffect(() => {

    getSuppliers();

  }, [page]);

  return (
    <MainLayout>
      <div className="suppliers-dashboard-wrapper">
        {/* Large Main Heading */}
        <div className="suppliers-main-header">
          <h1>Suppliers</h1>
        </div>

        {/* Add Supplier Form Card Container */}
        {role === "admin" && (
          <div className="supplier-form-card-panel">
            <h3>Add New Supplier</h3>
            <form onSubmit={handleSubmit} className="supplier-inline-form">
              {/* Supplier Name */}
              <div className="supplier-input-field">
                <label>Supplier Name</label>
                <div className="input-with-icon-wrapper">
                  <User size={16} className="field-inner-icon" />
                  <input
                    type="text"
                    name="supplier_name"
                    placeholder="Acme Corporation"
                    value={formData.supplier_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="supplier-input-field">
                <label>Phone Number</label>
                <div className="input-with-icon-wrapper">
                  <Phone size={16} className="field-inner-icon" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1-555-0199"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="supplier-input-field field-grow-address">
                <label>Address</label>
                <div className="input-with-icon-wrapper">
                  <MapPin size={16} className="field-inner-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Industrial Way, Springfield"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="add-supplier-action-btn">
                <Plus size={16} />
                <span>Add Supplier</span>
              </button>
            </form>
          </div>
        )}

        {/* Suppliers List Table Section Container */}
        <div className="suppliers-list-data-card">
          <div className="list-card-header-row">
            <div className="heading-left-box">
              <Layers size={18} className="heading-icon" />
              <h2>Suppliers List</h2>
            </div>
            <div className="page-meta-counter">
              Page <span>{page}</span> of <span>{totalPages}</span>
            </div>
          </div>

          {/* Responsive Data Grid */}
          <div className="table-responsive-viewport">
            <table className="premium-suppliers-data-table">
              <thead>
                <tr>
                  <th>Supplier ID</th>
                  <th>Supplier Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-table-state-cell">
                      No registered suppliers available in this sequence page range.
                    </td>
                  </tr>
                ) : (
                  suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td className="supplier-id-mono-cell">{supplier.id}</td>
                      <td className="supplier-name-bold-cell">{supplier.supplier_name}</td>
                      <td className="supplier-phone-cell">{supplier.phone}</td>
                      <td className="supplier-address-muted-cell">{supplier.address}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

      
         <div className="table-pagination-navigation-footer centered-layout">
            <div className="pagination-action-controls">
              <button
                type="button"
                className="pag-nav-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>
              
              <div className="pag-current-indicator">
                Page {page}
              </div>

              <button
                type="button"
                className="pag-nav-btn"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );

}

export default Suppliers;