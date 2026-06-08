import { useState } from "react";

function Invoice() {
  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    customer: "",
    gstNo: "",
    hsn: "",
    product: "",
    amount: "",
    gst: 18,
    taxType: "CGST_SGST"
  });

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value
    });
  };

  const taxableAmount = Number(invoice.amount || 0);

  const totalGST =
    (taxableAmount * Number(invoice.gst)) / 100;

  const cgst =
    invoice.taxType === "CGST_SGST"
      ? totalGST / 2
      : 0;

  const sgst =
    invoice.taxType === "CGST_SGST"
      ? totalGST / 2
      : 0;

  const igst =
    invoice.taxType === "IGST"
      ? totalGST
      : 0;

  const grandTotal =
    taxableAmount + totalGST;

  const saveInvoice = () => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    invoices.push({
      ...invoice,
      cgst,
      sgst,
      igst,
      grandTotal
    });

    localStorage.setItem(
      "invoices",
      JSON.stringify(invoices)
    );

    alert("Invoice Saved");
  };

  return (
    <div className="container">
      <h1>GST Invoice</h1>

      <div className="form">
        <input
          name="invoiceNo"
          placeholder="Invoice Number"
          value={invoice.invoiceNo}
          onChange={handleChange}
        />

        <input
          name="customer"
          placeholder="Customer Name"
          value={invoice.customer}
          onChange={handleChange}
        />

        <input
          name="gstNo"
          placeholder="GSTIN"
          value={invoice.gstNo}
          onChange={handleChange}
        />

        <input
          name="hsn"
          placeholder="HSN / SAC Code"
          value={invoice.hsn}
          onChange={handleChange}
        />

        <input
          name="product"
          placeholder="Product Name"
          value={invoice.product}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={invoice.amount}
          onChange={handleChange}
        />

        <select
          name="gst"
          value={invoice.gst}
          onChange={handleChange}
        >
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>
        </select>

        <select
          name="taxType"
          value={invoice.taxType}
          onChange={handleChange}
        >
          <option value="CGST_SGST">
            CGST + SGST
          </option>

          <option value="IGST">
            IGST
          </option>
        </select>
      </div>

      <div className="invoice-preview">
        <h2>Invoice Preview</h2>

        <p>
          <strong>Invoice No:</strong>{" "}
          {invoice.invoiceNo}
        </p>

        <p>
          <strong>Customer:</strong>{" "}
          {invoice.customer}
        </p>

        <p>
          <strong>GSTIN:</strong>{" "}
          {invoice.gstNo}
        </p>

        <p>
          <strong>HSN:</strong>{" "}
          {invoice.hsn}
        </p>

        <p>
          <strong>Product:</strong>{" "}
          {invoice.product}
        </p>

        <hr />

        <p>Taxable Amount : ₹{taxableAmount}</p>

        {cgst > 0 && (
          <p>CGST : ₹{cgst.toFixed(2)}</p>
        )}

        {sgst > 0 && (
          <p>SGST : ₹{sgst.toFixed(2)}</p>
        )}

        {igst > 0 && (
          <p>IGST : ₹{igst.toFixed(2)}</p>
        )}

        <h2>
          Grand Total : ₹
          {grandTotal.toFixed(2)}
        </h2>

        <button onClick={saveInvoice}>
          Save Invoice
        </button>

        <button
          onClick={() => window.print()}
          style={{ marginLeft: "10px" }}
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
}

export default Invoice;