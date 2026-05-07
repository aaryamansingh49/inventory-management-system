import {
    useEffect,
    useState
  } from "react";
  
  import { useNavigate } from "react-router-dom";
  
  import MainLayout from "../layouts/MainLayout";
  
  import api from "../services/api";
  
  function AddProduct() {
  
    const navigate = useNavigate();
  
    const [categories, setCategories] = useState([]);
  
    const [formData, setFormData] = useState({
  
      name: "",
      sku: "",
      description: "",
      price: "",
      stock: "",
      category_id: ""
  
    });
  
    // Handle input
    const handleChange = (e) => {
  
      setFormData({
  
        ...formData,
  
        [e.target.name]: e.target.value
  
      });
  
    };
  
    // Fetch categories
    const getCategories = async () => {
  
      try {
  
        const response = await api.get(
          "/categories"
        );
  
        setCategories(response.data.categories);
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
    // Submit form
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
      try {
  
        await api.post(
          "/products",
          formData
        );
  
        alert("Product added successfully");
  
        navigate("/products");
  
      } catch (error) {
  
        console.log(error);
  
        alert(
          error.response?.data?.message
        );
  
      }
  
    };
  
    useEffect(() => {
  
      getCategories();
  
    }, []);
  
    return (
  
      <MainLayout>
  
        <h1>Add Product</h1>
  
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "20px",
            maxWidth: "500px"
          }}
        >
  
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            style={inputStyle}
          />
  
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            onChange={handleChange}
            style={inputStyle}
          />
  
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            style={inputStyle}
          />
  
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            style={inputStyle}
          />
  
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            style={inputStyle}
          />
  
          {/* Category Dropdown */}
  
          <select
            name="category_id"
            onChange={handleChange}
            style={inputStyle}
          >
  
            <option value="">
              Select Category
            </option>
  
            {categories.map((category) => (
  
              <option
                key={category.id}
                value={category.id}
              >
                {category.category_name}
              </option>
  
            ))}
  
          </select>
  
          <button
            type="submit"
            style={{
              padding: "10px 20px"
            }}
          >
            Add Product
          </button>
  
        </form>
  
      </MainLayout>
  
    );
  
  }
  
  const inputStyle = {
  
    width: "100%",
  
    padding: "10px",
  
    marginBottom: "15px"
  
  };
  
  export default AddProduct;