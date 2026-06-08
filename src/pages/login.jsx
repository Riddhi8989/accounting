import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    console.log("Users:", users);

    const foundUser = users.find(
      (u) =>
        u.email.trim().toLowerCase() ===
          user.trim().toLowerCase() &&
        u.password === password
    );

    console.log("Found User:", foundUser);

    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Success");

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleLogin}
      >
        <h1>Accounting Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={user}
          onChange={(e) =>
            setUser(e.target.value)
          }
          required
        />

        <div className="password-group">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;