import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import "../styles/dashboard.css";
import "../styles/dashboardUpgrade.css";
import "../styles/table.css";
import api from "../services/api";

import {
  Package,
  ShoppingCart,
  Handshake,
  IndianRupee,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,

    totalOrders: 0,

    totalSuppliers: 0,

    totalRevenue: 0,

    lowStockItems: 0,
  });

  const [analytics, setAnalytics] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const getDashboardStats = async () => {
    try {
      const response = await api.get("/dashboard/stats");

      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnalytics = async () => {
    try {
      const response = await api.get("/dashboard/sales-analytics");

      setAnalytics(response.data.analytics);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardStats();
    getAnalytics();
  }, []);

  return (
    <MainLayout>
      <div className="dashboard-wrapper">
        {/* Welcome Header Section */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1>Welcome Back, {user?.role === "admin" ? "Admin" : "Staff"}</h1>

            <p>Monitor your inventory and sales performance in real-time.</p>
          </div>
          <div className="header-actions">
            <div className="profile-badge">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.role === "admin" ? "Admin" : "Staff"
                }&background=random&color=fff&bold=true&size=200`}
                alt="User"
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <Package size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Active Inventory</span>
              <h2 className="stat-value">{stats.totalProducts} Products</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <ShoppingCart size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Orders</span>
              <h2 className="stat-value">{stats.totalOrders}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper teal">
              <Handshake size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Supplier Partnerships</span>
              <h2 className="stat-value">{stats.totalSuppliers}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <IndianRupee size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Revenue (This Month)</span>
              <h2 className="stat-value">
                ₹{stats.totalRevenue.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="stat-card critical">
            <div className="stat-icon-wrapper red">
              <AlertTriangle size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Critical Low Stock</span>
              <h2 className="stat-value">{stats.lowStockItems} Items</h2>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="analytics-container">
          <div className="analytics-header">
            <h3>Performance Overview</h3>
            <button className="time-filter">
              Last 30 days <ChevronDown size={16} />
            </button>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#45d7e8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#45d7e8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#999", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#999", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total_sales"
                  stroke="#2c3e50"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
