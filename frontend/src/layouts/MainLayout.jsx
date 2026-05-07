import {
    Link,
    useNavigate
  } from "react-router-dom";
  
  function MainLayout({ children }) {
  
    const navigate = useNavigate();
  
    const handleLogout = () => {
  
      localStorage.removeItem("token");
  
      localStorage.removeItem("user");
  
      navigate("/login");
  
    };
  
    return (
  
      <div style={{
        display: "flex",
        minHeight: "100vh"
      }}>
  
        {/* Sidebar */}
  
        <div style={{
          width: "250px",
          background: "#111827",
          color: "white",
          padding: "20px"
        }}>
  
          <h2>Inventory System</h2>
  
          <hr />
  
          <ul style={{
            listStyle: "none",
            padding: 0
          }}>
  
            <li>
              <Link
                to="/dashboard"
                style={linkStyle}
              >
                Dashboard
              </Link>
            </li>
  
            <li>
              <Link
                to="/products"
                style={linkStyle}
              >
                Products
              </Link>
            </li>
  
            <li>
              <Link
                to="/orders"
                style={linkStyle}
              >
                Orders
              </Link>
            </li>
  
            <li>
              <Link
                to="/suppliers"
                style={linkStyle}
              >
                Suppliers
              </Link>
            </li>
  
          </ul>
  
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "10px",
              width: "100%"
            }}
          >
            Logout
          </button>
  
        </div>
  
  
        {/* Main Content */}
  
        <div style={{
          flex: 1,
          background: "#f3f4f6",
          padding: "20px"
        }}>
  
          {/* Navbar */}
  
          <div style={{
            background: "white",
            padding: "15px",
            marginBottom: "20px"
          }}>
  
            <h2>Inventory Dashboard</h2>
  
          </div>
  
          {/* Page Content */}
  
          {children}
  
        </div>
  
      </div>
  
    );
  
  }
  
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "10px 0"
  };
  
  export default MainLayout;