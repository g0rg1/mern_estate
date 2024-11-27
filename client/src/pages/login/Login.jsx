/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import "./login.css";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5500/auth/login",
        {
          ...formData,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
      setFormData({
        ...formData,
        email: "",
        password: "",
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Please enter your details to sign in</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Sign in
            </button>

            <p className="switch-auth">
              Don&lsquo;t have an account?{" "}
              <Link className="login-link" to={"/register"}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
