import {
    useEffect,
    useState
  } from "react";
  
  import MainLayout from "../layouts/MainLayout";
  
  import api from "../services/api";
  
  function Inventory() {
  
    const [history, setHistory] =
      useState([]);
  
    // Fetch history
    const getHistory = async () => {
  
      try {
  
        const response = await api.get(
          "/inventory/history"
        );
  
        setHistory(
          response.data.history
        );
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
    useEffect(() => {
  
      getHistory();
  
    }, []);
  
    return (
  
      <MainLayout>
  
        <h1>Inventory History</h1>
  
        <table
          border="1"
          width="100%"
          cellPadding="10"
          style={{
            background: "white"
          }}
        >
  
          <thead>
  
            <tr>
  
              <th>ID</th>
  
              <th>Product</th>
  
              <th>Action</th>
  
              <th>Quantity</th>
  
              <th>Date</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {history.map((item) => (
  
              <tr key={item.id}>
  
                <td>{item.id}</td>
  
                <td>
                  {item.product_name}
                </td>
  
                <td>
                  {item.action}
                </td>
  
                <td>
                  {item.quantity}
                </td>
  
                <td>
  
                  {
                    new Date(
                      item.created_at
                    ).toLocaleString()
                  }
  
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </MainLayout>
  
    );
  
  }
  
  export default Inventory;