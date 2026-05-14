import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import "../styles/dashboard.css";
import "../styles/table.css";
import api from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {

  const [stats, setStats] = useState({

    totalProducts: 0,

    totalOrders: 0,

    totalSuppliers: 0,

    totalRevenue: 0,

    lowStockItems: 0

  });

  const [analytics, setAnalytics] =
  useState([]);

  const getDashboardStats = async () => {

    try {

      const response = await api.get(
        "/dashboard/stats"
      );

      setStats(response.data.data);

    } catch (error) {

      console.log(error);

    }

  };


  const getAnalytics = async () => {

    try {
  
      const response = await api.get(
        "/dashboard/sales-analytics"
      );
  
      setAnalytics(
        response.data.analytics
      );
  
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
  
      <h1>Dashboard</h1>
  
      {/* Dashboard Cards */}
  
      <div className="dashboard-cards">
  
        {/* Products */}
  
        <div className="dashboard-card">
  
          <h3>Total Products</h3>
  
          <h1>
            {stats.totalProducts}
          </h1>
  
        </div>
  
        {/* Orders */}
  
        <div className="dashboard-card">
  
          <h3>Total Orders</h3>
  
          <h1>
            {stats.totalOrders}
          </h1>
  
        </div>
  
        {/* Suppliers */}
  
        <div className="dashboard-card">
  
          <h3>Total Suppliers</h3>
  
          <h1>
            {stats.totalSuppliers}
          </h1>
  
        </div>
  
        {/* Revenue */}
  
        <div className="dashboard-card">
  
          <h3>Total Revenue</h3>
  
          <h1>
            ₹{stats.totalRevenue}
          </h1>
  
        </div>
  
        {/* Low Stock */}
  
        <div className="dashboard-card">
  
          <h3>Low Stock Items</h3>
  
          <h1>
            {stats.lowStockItems}
          </h1>
  
        </div>
  
      </div>
  
      {/* Sales Analytics */}
  
      <div className="dashboard-section">
  
        <h2>Sales Analytics</h2>
  
        <ResponsiveContainer
          width="100%"
          height={300}
        >
  
          <LineChart data={analytics}>
  
            <CartesianGrid strokeDasharray="3 3" />
  
            <XAxis dataKey="date" />
  
            <YAxis />
  
            <Tooltip />
  
            <Line
              type="monotone"
              dataKey="total_sales"
            />
  
          </LineChart>
  
        </ResponsiveContainer>
  
      </div>
  
    </MainLayout>
  
  );

}



export default Dashboard;