import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Box, 
  PlusCircle, 
  ShoppingCart, 
  Users, 
  Truck, 
  Warehouse, 
  LogOut,
  Package2
} from "lucide-react";
import "../styles/layout.css";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");
    

    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Package2 size={28} color="#45d7e8" />
          </div>
          <div className="brand-text">
            <span>INS</span>
            <p>Inventory Management System</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={isActive("/dashboard") ? "active" : ""}>
              <Link to="/dashboard">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </li>

            <li className={isActive("/products") ? "active" : ""}>
              <Link to="/products">
                <Box size={20} />
                <span>Products</span>
              </Link>
            </li>

            {role === "admin" && (
              <li className={isActive("/add-product") ? "active" : ""}>
                <Link to="/add-product">
                  <PlusCircle size={20} />
                  <span>Add Product</span>
                </Link>
              </li>
            )}

            <li className={isActive("/orders") ? "active" : ""}>
              <Link to="/orders">
                <ShoppingCart size={20} />
                <span>Orders</span>
              </Link>
            </li>

            <li className={isActive("/suppliers") ? "active" : ""}>
              <Link to="/suppliers">
                <Users size={20} />
                <span>Suppliers</span>
              </Link>
            </li>

            {role === "admin" && (
              <li className={isActive("/purchases") ? "active" : ""}>
                <Link to="/purchases">
                  <Truck size={20} />
                  <span>Purchases</span>
                </Link>
              </li>
            )}

            <li className={isActive("/inventory") ? "active" : ""}>
              <Link to="/inventory">
                <Warehouse size={20} />
                <span>Inventory</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
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
