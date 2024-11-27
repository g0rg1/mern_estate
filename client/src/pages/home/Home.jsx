import { Link } from "react-router-dom";
import Categories from "../../components/categories/Categories";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Property from "../../components/property/Property";
import axios from "axios";
import "./home.css";
import { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:5500/house/featured",
          {
            withCredentials: true,
          }
        );
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);
  console.log(data);
  // const properties = [
  //   {
  //     id: 1,
  //     images: [
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //     ],
  //     location: "Malibu, California",
  //     title: "Beachfront Villa with Ocean View",
  //     rating: "4.95",
  //     pricePerNight: "350",
  //     dates: "Jun 1-6",
  //   },
  //   {
  //     id: 2,
  //     images: [
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //     ],
  //     location: "Venice Beach, California",
  //     title: "Modern Beach House",
  //     rating: "4.85",
  //     pricePerNight: "420",
  //     dates: "Jul 1-8",
  //   },
  //   {
  //     id: 3,
  //     images: [
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //     ],
  //     location: "Santa Monica, California",
  //     title: "Luxury Oceanfront Suite",
  //     rating: "4.92",
  //     pricePerNight: "380",
  //     dates: "Aug 1-5",
  //   },
  //   {
  //     id: 4,
  //     images: [
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //       "https://a0.muscache.com/im/pictures/dc5a53bc-14c7-44cb-a1d7-992b0d41608f.jpg?im_w=720&im_format=avif",
  //     ],
  //     location: "Pacific Palisades, California",
  //     title: "Seaside Modern Villa",
  //     rating: "4.88",
  //     pricePerNight: "450",
  //     dates: "Sep 1-7",
  //   },
  // ];

  return (
    <>
      <Navbar />
      <Header />
      <h2 className="popular">Popular categories</h2>
      <Categories />
      <h2 className="popular">Find what you love</h2>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <div className="list">
          {data.map((item) => (
            <Link
              key={item._id}
              className="link"
              to={`/houses/${item._id}`}
              state={item}
            >
              <Property
                imageUrl={item.images[0]}
                location={item.location}
                title={item.name}
                rating={item.rating}
                pricePerNight={item.price}
              />
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Home;
