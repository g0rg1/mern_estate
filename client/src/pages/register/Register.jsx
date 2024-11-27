import { useState } from "react";
import "../login/login.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { data, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, name } = formData;
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
      position: "bottom-right",
    });

  const { success, message } = data;
  if (success) {
    handleSuccess(message);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } else {
    handleError(message);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5500/auth/register",
        {
          ...formData,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
      ...formData,
      email: "",
      password: "",
      username: "",
    });
  };
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">
            Please fill in the details to get started
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={name}
                  onChange={handleOnChange}
                />
              </div>
            </div>

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

            <div className="input-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Create Account
            </button>

            <p className="switch-auth">
              Already have an account? <a href="#">Sign in</a>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Register;
