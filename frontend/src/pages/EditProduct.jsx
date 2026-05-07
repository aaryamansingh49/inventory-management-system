import {
    useEffect,
    useState
  } from "react";
  
  import {
    useNavigate,
    useParams
  } from "react-router-dom";
  
  import MainLayout from "../layouts/MainLayout";
  
  import api from "../services/api";
  
  function EditProduct() {
  
    const { id } = useParams();
  
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
  
    // Fetch product details
    const getProductDetails = async () => {
  
      try {
  
        const response = await api.get(
          "/products"
        );
  
        const product =
          response.data.products.find(
            (p) => p.id === parseInt(id)
          );
  
        if (product) {
  
          setFormData({
  
            name: product.name,
  
            sku: product.sku,
  
            description:
              product.description,
  
            price: product.price,
  
            stock: product.stock,
  
            category_id:
              product.category_id || ""
  
          });
  
        }
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
    // Update product
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
      try {
  
        await api.put(
          `/products/${id}`,
          formData
        );
  
        alert("Product updated");
  
        navigate("/products");
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
    useEffect(() => {
  
      getCategories();
  
      getProductDetails();
  
    }, []);
  
    return (
  
      <MainLayout>
  
        <h1>Edit Product</h1>
  
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
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            style={inputStyle}
          />
  
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="SKU"
            style={inputStyle}
          />
  
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            style={inputStyle}
          />
  
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            style={inputStyle}
          />
  
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            style={inputStyle}
          />
  
          <select
            name="category_id"
            value={formData.category_id}
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
            Update Product
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
  
  export default EditProduct;