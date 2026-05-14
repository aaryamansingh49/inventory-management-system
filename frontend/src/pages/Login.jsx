import { useState } from "react";
import "../styles/auth.css";
import "../styles/forms.css";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });
  const [showPassword, setShowPassword] =
  useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/login",
        formData
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div className="auth-container">
  
      <div className="auth-card">
  
        <h1 className="auth-title">
  
          Inventory Login
  
        </h1>
  
        <form onSubmit={handleLogin}>
  
          {/* Email */}
  
          <div className="form-group">
  
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="form-input"
            />
  
          </div>
  
          {/* Password */}
  
          <div className="form-group">
  
          <div
  style={{
    position: "relative"
  }}
>

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    name="password"
    placeholder="Enter Password"
    onChange={handleChange}
    className="form-input"
  />

  <span
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform:
        "translateY(-50%)",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#555"
    }}
  >

    {
      showPassword
        ? "Hide"
        : "Show"
    }

  </span>

</div>
  
          </div>
  
          {/* Submit */}
  
          <button
            type="submit"
            className="primary-btn"
            style={{
              width: "100%"
            }}
          >
  
            Login
  
          </button>
  
        </form>
  
        <div className="auth-footer">
  
          {/* <p>
  
            Inventory Management System
  
          </p> */}
  
        </div>
  
      </div>
  
    </div>
  
  );

}

export default Login;