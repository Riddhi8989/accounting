import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find(
      (u) => u.email === email
    );

    if (existingUser) {
      alert("User already exists");
      return;
    }

    users.push({
      name,
      email,
      password
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration Successful");

    navigate("/");
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleRegister}
      >
        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

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

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
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
            ? "Hide Password"
            : "Show Password"}
        </button>

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
