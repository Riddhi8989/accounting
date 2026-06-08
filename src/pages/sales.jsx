import { useState } from "react";

function Sales() {
  const [form, setForm] = useState({
    customer: "",
    gstNo: "",
    product: "",
    amount: "",
    gst: 18
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveSale = (e) => {
    e.preventDefault();

    const gstAmount =
      (Number(form.amount) * Number(form.gst)) / 100;

    const newSale = {
      ...form,
      gstAmount
    };

    const existing =
      JSON.parse(localStorage.getItem("sales")) || [];

    existing.push(newSale);

    localStorage.setItem(
      "sales",
      JSON.stringify(existing)
    );

    alert("Sale Added Successfully");

    setForm({
      customer: "",
      gstNo: "",
      product: "",
      amount: "",
      gst: 18
    });
  };

  return (
    <div className="container">
      <h1>Sales Entry</h1>

      <form className="form" onSubmit={saveSale}>
        <input
          name="customer"
          placeholder="Customer Name"
          value={form.customer}
          onChange={handleChange}
          required
        />

        <input
          name="gstNo"
          placeholder="GST Number"
          value={form.gstNo}
          onChange={handleChange}
          required
        />

        <input
          name="product"
          placeholder="Product Name"
          value={form.product}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <select
          name="gst"
          value={form.gst}
          onChange={handleChange}
        >
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>
        </select>

        <button type="submit">
          Save Sale
        </button>
      </form>
    </div>
  );
}

export default Sales;