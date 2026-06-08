import { useEffect, useState } from "react";
import Card from "./components/Card";

function Dashboard() {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem("sales")) || []);
    setPurchases(JSON.parse(localStorage.getItem("purchases")) || []);
    setInvoices(JSON.parse(localStorage.getItem("invoices")) || []);
  }, []);

  const totalSales = sales.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalPurchases = purchases.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalGST = [...sales, ...purchases].reduce(
    (sum, item) => sum + Number(item.gstAmount || 0),
    0
  );

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="cards">
        <Card title="Total Sales" value={`₹${totalSales}`} />
        <Card title="Total Purchases" value={`₹${totalPurchases}`} />
        <Card title="Total GST" value={`₹${totalGST.toFixed(2)}`} />
        <Card title="Invoices" value={invoices.length} />
      </div>

      <h2>Recent Sales</h2>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>GST %</th>
          </tr>
        </thead>

        <tbody>
          {sales.slice(-5).reverse().map((sale, index) => (
            <tr key={index}>
              <td>{sale.customer}</td>
              <td>{sale.product}</td>
              <td>₹{sale.amount}</td>
              <td>{sale.gst}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;