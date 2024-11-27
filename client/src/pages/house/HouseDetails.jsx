import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./houseDetails.css";
import { FaStar, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function HouseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const token = Cookies.get("access_token");
    async function fetchData() {
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5500/house/find/${location.state._id}`
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
  }, [location.state._id, navigate]);
  console.log(data);

  if (!location.state) {
    navigate("/");
    return null;
  }

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
              </div>
            </div>

            <div className="right-content">
              <div className="booking-card">
                <div className="price">
                  <span className="amount">${data.price}</span> night
                </div>
                <button className="reserve-btn">Reserve</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HouseDetails;
