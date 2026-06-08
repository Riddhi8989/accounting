import { useState } from "react";

function Purchase() {
  const [form, setForm] = useState({
    vendor: "",
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

  const savePurchase = (e) => {
    e.preventDefault();

    const gstAmount =
      (Number(form.amount) * Number(form.gst)) / 100;

    const newPurchase = {
      ...form,
      gstAmount
    };

    const purchases =
      JSON.parse(localStorage.getItem("purchases")) || [];

    purchases.push(newPurchase);

    localStorage.setItem(
      "purchases",
      JSON.stringify(purchases)
    );

    alert("Purchase Added Successfully");

    setForm({
      vendor: "",
      gstNo: "",
      product: "",
      amount: "",
      gst: 18
    });
  };

  return (
    <div className="container">
      <h1>Purchase Entry</h1>

      <form className="form" onSubmit={savePurchase}>
        <input
          type="text"
          name="vendor"
          placeholder="Vendor Name"
          value={form.vendor}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="gstNo"
          placeholder="GST Number"
          value={form.gstNo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={form.product}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
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
          Save Purchase
        </button>
      </form>
    </div>
  );
}

export default Purchase;