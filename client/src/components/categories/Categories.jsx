import "./categories.css";
import { FaHotel, FaHouseUser } from "react-icons/fa";
import { MdVilla } from "react-icons/md";
import { LuPalmtree } from "react-icons/lu";

function Categories() {
  return (
    <div className="category-container">
      <div className="categoriesList">
        <div className="category">
          <FaHotel className="icon" />
          <p>Hotels</p>
        </div>
        <div className="category">
          <FaHouseUser className="icon" />
          <p>Houses</p>
        </div>
        <div className="category">
          <MdVilla className="icon" />
          <p>Villas</p>
        </div>
        <div className="category">
          <LuPalmtree className="icon" />
          <p>Palmtrees</p>
        </div>
      </div>
    </div>
  );
}

export default Categories;
