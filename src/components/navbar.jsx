import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Accounting Pro</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/sales">Sales</Link>
        <Link to="/purchase">Purchase</Link>
        <Link to="/invoice">Invoice</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;