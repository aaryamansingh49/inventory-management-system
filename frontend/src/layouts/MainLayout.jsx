import { Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");
    

    navigate("/login");
  };

  return (

    <div className="layout">
  
      {/* Sidebar */}
  
      <div className="sidebar">
  
        <h2>Inventory System</h2>
  
        <hr />
  
        <ul>
  
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
  
          <li>
            <Link to="/products">
              Products
            </Link>
          </li>
  
          {
            role === "admin" && (
  
              <li>
                <Link to="/add-product">
                  Add Product
                </Link>
              </li>
  
            )
          }
  
          <li>
            <Link to="/orders">
              Orders
            </Link>
          </li>
  
          <li>
            <Link to="/suppliers">
              Suppliers
            </Link>
          </li>
   
     {
       role === "admin" && (
    
          <li>
            <Link to="/purchases">
              Purchases
            </Link>
          </li>
  )

}
  
          <li>
            <Link to="/inventory">
              Inventory
            </Link>
          </li>
  
        </ul>
  
        <button
          onClick={handleLogout}
          className="logout-btn"
        >
  
          Logout
  
        </button>
  
      </div>
  
      {/* Main Content */}
  
      <div className="main-content">
  
        {/* Navbar */}
  
        <div className="navbar">
  
          <h2>
            Inventory Dashboard
          </h2>
  
        </div>
  
        {/* Page Content */}
  
        {children}
  
      </div>
  
    </div>
  
  );
}

// const linkStyle = {
//   color: "white",
//   textDecoration: "none",
//   display: "block",
//   padding: "10px 0",
// };

export default MainLayout;
