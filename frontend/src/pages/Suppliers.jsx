import {
  useEffect,
  useState
} from "react";

import "../styles/forms.css";
import "../styles/table.css";
import "../styles/dashboard.css";

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

      <h1
        style={{
          marginBottom: "20px"
        }}
      >

        Suppliers

      </h1>

      {/* Add Supplier Form */}

      {

        role === "admin" && (

          <div className="dashboard-section">

            <form onSubmit={handleSubmit}>

              {/* Supplier Name */}

              <div className="form-group">

                <input
                  type="text"
                  name="supplier_name"
                  placeholder="Supplier Name"
                  value={
                    formData.supplier_name
                  }
                  onChange={handleChange}
                  className="form-input"
                />

              </div>

              {/* Phone */}

              <div className="form-group">

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />

              </div>

              {/* Address */}

              <div className="form-group">

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                className="primary-btn"
              >

                Add Supplier

              </button>

            </form>

          </div>

        )

      }

      {/* Suppliers Table */}

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

          <h2>

            Suppliers List

          </h2>

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

              <th>Name</th>

              <th>Phone</th>

              <th>Address</th>

            </tr>

          </thead>

          <tbody>

            {suppliers.map(
              (supplier) => (

                <tr key={supplier.id}>

                  <td>
                    {supplier.id}
                  </td>

                  <td>
                    {
                      supplier.supplier_name
                    }
                  </td>

                  <td>
                    {supplier.phone}
                  </td>

                  <td>
                    {supplier.address}
                  </td>

                </tr>

              )
            )}

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

export default Suppliers;