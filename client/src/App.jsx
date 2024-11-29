import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Houses from "./pages/houses/Houses";
import HouseDetails from "./pages/house/HouseDetails";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePage from "./pages/createPage/createPage";
import MyReservations from "./pages/reservations/MyReservations";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/houses/:id" element={<HouseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/reservation" element={<MyReservations />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
