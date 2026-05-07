import {
    useEffect,
    useState
  } from "react";
  
  import MainLayout from "../layouts/MainLayout";
  
  import api from "../services/api";
  
  function Suppliers() {
  
    const [suppliers, setSuppliers] =
      useState([]);
  
    const [formData, setFormData] =
      useState({
  
        supplier_name: "",
  
        phone: "",
  
        address: ""
  
      });
  
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
          "/suppliers"
        );
  
        setSuppliers(
          response.data.suppliers
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
  
    }, []);
  
    return (
  
      <MainLayout>
  
        <h1>Suppliers</h1>
  
        {/* Form */}
  
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "30px"
          }}
        >
  
          <input
            type="text"
            name="supplier_name"
            placeholder="Supplier Name"
            value={
              formData.supplier_name
            }
            onChange={handleChange}
            style={inputStyle}
          />
  
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
  
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
  
          <button type="submit">
  
            Add Supplier
  
          </button>
  
        </form>
  
        {/* Table */}
  
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
  
              <th>Name</th>
  
              <th>Phone</th>
  
              <th>Address</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {suppliers.map(
              (supplier) => (
  
                <tr
                  key={supplier.id}
                >
  
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
  
      </MainLayout>
  
    );
  
  }
  
  const inputStyle = {
  
    padding: "10px",
  
    marginRight: "10px",
  
    marginBottom: "10px"
  
  };
  
  export default Suppliers;