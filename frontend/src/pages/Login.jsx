import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Boxes } from "lucide-react";

import "../styles/login.css";
// import "../styles/auth.css";
import "../styles/forms.css";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Left Section */}
      <div className="left-panel">
        <div className="brand">
          <Boxes size={42} />

          <div>
            <h1>IMS</h1>
            <p>Inventory Management System</p>
          </div>
        </div>

        <div className="welcome-text">
          <h2>Welcome back!</h2>

          <h3>Optimize your supply chain.</h3>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-card">
        <h1 className="login-heading">Authorized Personnel Access</h1>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>

            <div className="input-box">
              <Mail size={18} />

              <input
                type="email"
                name="email"
                placeholder="Enter your work email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <Lock size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Options */}
          <div className="options">
            <label>
              <input type="checkbox" />
              Keep me signed in
            </label>
          </div>

          {/* Button */}
          <button type="submit" className="login-btn">
            Sign In →
          </button>
        </form>

        <p className="bottom-text">
          Don’t have an account?
          <span>Contact your administrator.</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
