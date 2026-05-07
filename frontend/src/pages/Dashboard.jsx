import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({

    totalProducts: 0,

    totalOrders: 0,

    totalRevenue: 0,

    lowStockItems: 0

  });

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

  useEffect(() => {

    getDashboardStats();

  }, []);

  return (

    <MainLayout>

      <h1>Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(4, 1fr)",
        gap: "20px",
        marginTop: "20px"
      }}>

        {/* Card 1 */}

        <div style={cardStyle}>

          <h3>Total Products</h3>

          <h1>
            {stats.totalProducts}
          </h1>

        </div>

        {/* Card 2 */}

        <div style={cardStyle}>

          <h3>Total Orders</h3>

          <h1>
            {stats.totalOrders}
          </h1>

        </div>

        {/* Card 3 */}

        <div style={cardStyle}>

          <h3>Total Revenue</h3>

          <h1>
            ₹{stats.totalRevenue}
          </h1>

        </div>

        {/* Card 4 */}

        <div style={cardStyle}>

          <h3>Low Stock Items</h3>

          <h1>
            {stats.lowStockItems}
          </h1>

        </div>

      </div>

    </MainLayout>

  );

}

const cardStyle = {

  background: "white",

  padding: "20px",

  borderRadius: "10px",

  boxShadow:
    "0px 2px 10px rgba(0,0,0,0.1)",

  textAlign: "center"

};

export default Dashboard;