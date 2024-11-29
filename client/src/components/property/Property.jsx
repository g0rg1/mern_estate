/* eslint-disable react/prop-types */
import "./property.css";
import { FaStar } from "react-icons/fa";

const Property = ({ imageUrl, location, title, rating, pricePerNight }) => {
  return (
    <div className="card">
      <div className="imageContainer">
        <img src={imageUrl} alt={title} className="image" />
        <button className="heart">♡</button>
      </div>
      <div className="content">
        <div className="header">
          <h3 className="location">{title}</h3>
          <div className="rating">
            <FaStar className="star" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="title">{location}</p>
        <p className="price">
          <span className="pricePerNight">${pricePerNight}</span> night
        </p>
      </div>
    </div>
  );
};

export default Property;
