import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/purchaseHistory.css"
import MainLayout from "../layouts/MainLayout";

const PurchaseHistory = () => {

    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 10;

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/purchases/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHistory(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const lastIndex = currentPage * recordsPerPage;

const firstIndex = lastIndex - recordsPerPage;

const currentRecords = history.slice(
    firstIndex,
    lastIndex
);

const totalPages = Math.ceil(
    history.length / recordsPerPage
);

    return (
        <MainLayout>

        <div className="purchase-history-container">

            <h1>Purchase History</h1>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Supplier</th>
                        <th>Address</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>

                </thead>

                <tbody>

                    {
                       currentRecords.map((item, index) => (

                            <tr key={index}>

                                <td>{item.purchase_id}</td>

                                <td>
                                    {item.supplier_name}
                                </td>
                                <td>
                                    {item.address}
                                </td>

                                <td>
                                    {item.product_name}
                                </td>

                                <td>
                                    {item.quantity}
                                </td>

                                <td>
                                    ₹{item.price}
                                </td>

                                <td>
                                    ₹{item.total_amount}
                                </td>

                                <td>
                                    {
                                        new Date(
                                            item.purchase_date
                                        ).toLocaleString()
                                    }
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

            <div className="pagination">

    <button
        disabled={currentPage === 1}
        onClick={() =>
            setCurrentPage(currentPage - 1)
        }
    >
        Prev
    </button>

    {
        [...Array(totalPages)].map((_, index) => (

            <button
                key={index}
                className={
                    currentPage === index + 1
                        ? "active-page"
                        : ""
                }

                onClick={() =>
                    setCurrentPage(index + 1)
                }
            >
                {index + 1}
            </button>

        ))
    }

    <button
        disabled={currentPage === totalPages}
        onClick={() =>
            setCurrentPage(currentPage + 1)
        }
    >
        Next
    </button>

</div>

        </div>
        </MainLayout>

    );
};

export default PurchaseHistory;