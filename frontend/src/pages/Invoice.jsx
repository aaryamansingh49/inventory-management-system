import { useEffect, useState } from "react";
import "../styles/invoice.css";
import {
  FaBox,
  FaCheckCircle
} from "react-icons/fa";

import api from "../services/api";

import "../styles/invoice.css";

function Invoice() {

  const [invoice, setInvoice] =
    useState(null);

  const orderId =
    window.location.pathname.split("/")[2];

  const getInvoice = async () => {

    try {

      const response = await api.get(
        `/invoices/${orderId}`
      );

      setInvoice(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getInvoice();

  }, []);

  if (!invoice) {

    return <h1>Loading...</h1>;

  }

  return (

    <div className="invoice-container">

      {/* Header */}

      <div className="invoice-header">

        <div className="invoice-logo-section">

          <div className="invoice-logo">

            <FaBox />

          </div>

          <div>

            <h1>
              INVENTORY INVOICE
            </h1>

            <p>
              Thank you for your business!
            </p>

          </div>

        </div>

        <div className="invoice-id-section">

          <span className="paid-badge">

            PAID

          </span>

          <p>Invoice ID</p>

          <h2>
            INV-{invoice.order.id}
          </h2>

        </div>

      </div>

      {/* Info */}

      <div className="invoice-info-grid">

        {/* Bill To */}

        <div className="invoice-card">

          <h3>BILL TO</h3>

          <h2>
            {
              invoice.order.customer_name
            }
          </h2>

          <p>Customer</p>

          <p>India</p>

        </div>

        {/* Details */}

        <div className="invoice-card">

          <h3>
            INVOICE DETAILS
          </h3>

          <p>

            <strong>
              Order Date:
            </strong>

            {
              new Date(
                invoice.order.order_date
              ).toLocaleString()
            }

          </p>

          <p>

            <strong>
              Invoice Date:
            </strong>

            {
              new Date()
                .toLocaleString()
            }

          </p>

          <p>

            <strong>
              Payment Status:
            </strong>

            <span className="status-paid">

              PAID

            </span>

          </p>

        </div>

        {/* Total */}

        <div className="invoice-total-card">

          <h3>TOTAL AMOUNT</h3>

          <h1>

            ₹
            {
              invoice.order
                .total_amount
            }

          </h1>

        </div>

      </div>

      {/* Table */}

      <table className="invoice-table">

        <thead>

          <tr>

            <th>#</th>

            <th>PRODUCT</th>

            <th>QTY</th>

            <th>UNIT PRICE</th>

            <th>TOTAL</th>

          </tr>

        </thead>

        <tbody>

          {invoice.items.map(
            (item, index) => (

              <tr key={index}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {item.name}
                </td>

                <td>
                  {item.quantity}
                </td>

                <td>
                  ₹{item.price}
                </td>

                <td>

                  ₹
                  {
                    item.quantity *
                    item.price
                  }

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

      {/* Footer */}

      <div className="invoice-footer">

        <div>

          <h2>
            Inventory Management
            System
          </h2>

          <p>
            Smart Inventory.
            Better Business.
          </p>

          <p>
            support@inventory.com
          </p>

          <p>
            +91 98765 43210
          </p>

        </div>

        <div>

          <FaCheckCircle
            className="footer-icon"
          />

          <h3>
            Thank you for your
            business!
          </h3>

          <p>
            This is a computer
            generated invoice.
          </p>

        </div>

      </div>

      {/* Print */}

      <button
        className="print-btn"
        onClick={() =>
          window.print()
        }
      >

        Download PDF

      </button>

    </div>

  );

}

export default Invoice;