import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/resultList/List";

function Houses() {
  const location = useLocation();
  const { destination, date, options } = location.state || {};
  console.log(destination, date, options);
  return (
    <>
      <Navbar />
      <Header />
      <h1>Results for {destination}</h1>
      <List search={location.state} />
      <Footer />
    </>
  );
}

export default Houses;
