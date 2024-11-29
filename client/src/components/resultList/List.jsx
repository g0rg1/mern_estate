/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Property from "../property/Property";
import { Link } from "react-router-dom";
import "./list.css";
import { useEffect, useState } from "react";
import axios from "axios";
function List({ search }) {
  const { destination, date, options } = search;
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const url = destination
        ? `http://localhost:5500/house/city/${destination}`
        : 'http://localhost:5500/house';
      
      const response = await axios.get(url, {
        withCredentials: true,
      });
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [search.destination]);
  console.log(destination);
  console.log(data);

  return (
    <div>
      {!data ? (
        "Loading..."
      ) : (
        <div className="list">
          {data.map((property) => (
            <Link
              key={property._id}
              className="link"
              to={`/houses/${property.id}`}
              state={property}
            >
              <Property
                imageUrl={property.images[0]}
                location={property.location}
                title={property.name}
                rating={property.rating}
                pricePerNight={property.price}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
