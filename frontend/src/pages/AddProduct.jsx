import {
    useEffect,
    useState
  } from "react";
  import "../styles/forms.css";
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
    
        <div className="dashboard-section">
    
          <h1
            style={{
              marginBottom: "20px"
            }}
          >
            Add Product
          </h1>
    
          <form onSubmit={handleSubmit}>
    
            {/* Product Name */}
    
            <div className="form-group">
    
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                onChange={handleChange}
                className="form-input"
              />
    
            </div>
    
            {/* SKU */}
    
            <div className="form-group">
    
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                onChange={handleChange}
                className="form-input"
              />
    
            </div>
    
            {/* Description */}
    
            <div className="form-group">
    
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                className="form-input"
                rows="4"
              />
    
            </div>
    
            {/* Price */}
    
            <div className="form-group">
    
              <input
                type="number"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                className="form-input"
              />
    
            </div>
    
            {/* Stock */}
    
            <div className="form-group">
    
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
                className="form-input"
              />
    
            </div>
    
            {/* Category */}
    
            <div className="form-group">
    
              <select
                name="category_id"
                onChange={handleChange}
                className="form-input"
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
    
            </div>
    
            {/* Submit Button */}
    
            <button
              type="submit"
              className="primary-btn"
            >
    
              Add Product
    
            </button>
    
          </form>
    
        </div>
    
      </MainLayout>
    
    );
  
  }
  
  export default AddProduct;