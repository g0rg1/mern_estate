/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./houseDetails.css";
import { FaStar, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HouseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = Cookies.get("access_token");
    async function fetchData() {
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5500/house/find/${location.state._id}`,
            { withCredentials: true }
          );
          setData(response.data);
        } catch (e) {
          console.error(e);
        }
      } else {
        navigate("/login");
      }
    }
    fetchData();
    console.log(data);
    console.log(location.state);
    console.log(token);
  }, [location.state._id, navigate]);

  if (!location.state) {
    navigate("/");
    return null;
  }
  const handleDaysChange = (e) => {
    const value = e.target.value;
    // Проверяем, что значение не пустое и является числом
    if (value && !isNaN(value)) {
      setNumberOfDays(Math.max(1, parseInt(value)));
    } else {
      setNumberOfDays(1); // Устанавливаем минимальное значение, если ввод некорректный
    }
  };
  const handleBooking = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:5500/booking/',
        {
          houseId: data._id,
          numberOfDays
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Booking successful!');
        navigate('/reservation');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="house-details">
      <Navbar />

      {!data ? (
        "Loading..."
      ) : (
        <div className="details-container">
          <div className="details-header">
            <h1>{data.title}</h1>
            <div className="sub-header">
              <div className="rating">
                <FaStar />
                <span>{data.rating}</span>
              </div>
              <span className="location">{data.location}</span>
              <div className="actions">
                <button className="action-btn">
                  <FaHeart /> Save
                </button>
              </div>
            </div>
          </div>

          <div className="image-grid">
            {data.images.map((image, index) => (
              <div
                key={index}
                className={`image-item ${index === 0 ? "main-image" : ""}`}
              >
                <img src={image} alt={`Property view ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="details-content">
            <div className="left-content">
              <div className="description">
                <h2>About this place</h2>
                <p>{data.description}</p>
                <p className="owner-p">
                  Owner:
                  <span className="owner">{data.owner?.name || "Unknown"}</span>
                </p>
              </div>
            </div>

            <div className="right-content">
              <div className="booking-card">
                <div className="price">
                  <span className="amount">${data.price}</span> night
                </div>
                <div className="booking-inputs">
                  <div className="days-input">
                <label>Number of days:</label>
                <input
                    type="number"
                    min="1"
                    value={numberOfDays}
                    onChange={handleDaysChange}
                  />
                  </div>
                  <div className="total">
                    <span>Total:</span>
                    <span className="total-amount">${data.price * numberOfDays}</span>
                  </div>
                  </div>

                <button onClick={handleBooking} disabled={isLoading} className="reserve-btn">{isLoading ? 'Processing...' : 'Reserve Now'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HouseDetails;
