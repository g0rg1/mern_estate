/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./createPage.css";

import { FaCity, FaDollarSign, FaLocationArrow, FaStar } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { CiTextAlignJustify } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const CreatePage = () => {
  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState(null);

  // Состояние для данных формы, добавляем изображения
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    rating: "",
    description: "",
    price: "",
    location: "",
    images: ["", "", "", ""], // Массив для хранения URL картинок
  });

  const { name, city, rating, description, price, location, images } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Если это поле для изображений, обновляем соответствующий элемент в массиве
    if (name.startsWith("image")) {
      const index = parseInt(name.split("_")[1], 10); // Извлекаем индекс (image_0, image_1, ...)
      const updatedImages = [...images];
      updatedImages[index] = value;
      setFormData({ ...formData, images: updatedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5500/house/",
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
      console.error(error);
      handleError("An error occurred while submitting the form.");
    }

    // Сброс формы после отправки
    setFormData({
      name: "",
      city: "",
      description: "",
      price: "",
      location: "",
      rating: "",
      images: ["", "", "", ""], // Сбросить изображения
    });
  };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      axios
        .post("http://localhost:5500/auth/", {}, { withCredentials: true })
        .then((response) => {
          if (response.data.status) {
            setIsUser(true);
            setUsername(response.data.user);
          }
        })
        .catch((err) => {
          console.error("Error verifying user:", err);
        });
    }
  }, []);

  return (
    <>
      {isUser ? (
        <div>
          <div className="auth-container">
            <div className="auth-card">
              <h2>Host your home</h2>
              <p className="auth-subtitle">
                Please fill in the details to get started
              </p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="input-group">
                  <div className="input-wrapper">
                    <FaHouse className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name of property"
                      value={name}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <FaCity className="input-icon" />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={city}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <CiTextAlignJustify className="input-icon" />
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <FaDollarSign className="input-icon" />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price per night"
                      value={price}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <FaLocationArrow className="input-icon" />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location: Country, City"
                      value={location}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <FaStar className="input-icon" />
                    <input
                      type="number"
                      name="rating"
                      placeholder="Rating:"
                      value={rating}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                {/* Добавляем поля для ввода изображений (URL) */}
                <div className="input-group">
                  <div className="input-wrapper">
                    <CiImageOn className="input-icon" />
                    <input
                      type="text"
                      name="image_0"
                      placeholder="Main image"
                      value={images[0]}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-wrapper">
                    <CiImageOn className="input-icon" />
                    <input
                      type="text"
                      name="image_1"
                      placeholder="Inside image"
                      value={images[1]}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-wrapper">
                    <CiImageOn className="input-icon" />
                    <input
                      type="text"
                      name="image_2"
                      placeholder="Outside image"
                      value={images[2]}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-wrapper">
                    <CiImageOn className="input-icon" />
                    <input
                      type="text"
                      name="image_3"
                      placeholder="Bed image"
                      value={images[3]}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <button type="submit" className="submit-button">
                  Host Property
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="login-redirect">
            <p className="login-title">Login to see current content</p>
            <button className="login-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePage;
