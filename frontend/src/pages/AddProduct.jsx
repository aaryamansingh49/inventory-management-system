import {
    useEffect,
    useState
  } from "react";
  import "../styles/addProduct.css";
  import { useNavigate } from "react-router-dom";
  import MainLayout from "../layouts/MainLayout";
  import { 
    User, 
    Hash, 
    AlignLeft, 
    IndianRupee, 
    Layers, 
    Tag, 
    Plus 
  } from "lucide-react";
  
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
        <div className="form-page-container">
          <div className="form-card">
            <div className="form-header">
              <h1>Add Product</h1>
              <p>Create a new entry in your digital warehouse</p>
            </div>
  
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                {/* Product Name */}
                <div className="input-group">
                  <label>Product Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g., Wireless Mouse"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
  
                {/* Price */}
                <div className="input-group">
                  <label>Price</label>
                  <div className="input-wrapper">
                    <IndianRupee className="input-icon" size={18} />
                    <input
                      type="number"
                      name="price"
                      placeholder="e.g., 29.99"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
  
                {/* SKU */}
                <div className="input-group">
                  <label>SKU</label>
                  <div className="input-wrapper">
                    <Hash className="input-icon" size={18} />
                    <input
                      type="text"
                      name="sku"
                      placeholder="e.g., WM-1234"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
  
                {/* Stock */}
                <div className="input-group">
                  <label>Stock Quantity</label>
                  <div className="input-wrapper">
                    <Layers className="input-icon" size={18} />
                    <input
                      type="number"
                      name="stock"
                      placeholder="e.g., 150"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
  
                {/* Description - Full Width */}
                <div className="input-group full-width">
                  <label>Description</label>
                  <div className="input-wrapper textarea-wrapper">
                    <AlignLeft className="input-icon top-icon" size={18} />
                    <textarea
                      name="description"
                      placeholder="Enter product specifications and details..."
                      onChange={handleChange}
                      rows="4"
                    />
                  </div>
                </div>
  
                {/* Category */}
                <div className="input-group full-width">
                  <label>Category</label>
                  <div className="input-wrapper">
                    <Tag className="input-icon" size={18} />
                    <select name="category_id" onChange={handleChange} required>
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
  
              <button type="submit" className="submit-action-btn">
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    );
  
  }
  
  export default AddProduct;