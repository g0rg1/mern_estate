import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./admin.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Admin() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("properties");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (!error) {
      fetchData();
    }
  }, [activeTab, error]);

  const checkAdminAccess = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5500/auth/",
        {},
        { withCredentials: true }
      );

      if (!response.data.status || !response.data.isAdmin) {
        navigate("/");
        return;
      }

      setIsUser(true);
      setIsAdmin(true);
    } catch (error) {
      console.error("Authentication error:", error);
      navigate("/login");
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "properties") {
        const response = await axios.get("http://localhost:5500/house/", {
          withCredentials: true,
        });
        setProperties(response.data);
      } else if (activeTab === "bookings") {
        const response = await axios.get("http://localhost:5500/booking/", {
          withCredentials: true,
        });
        setBookings(response.data);
      } else if (activeTab === "users") {
        const response = await axios.get("http://localhost:5500/user/", {
          withCredentials: true,
        });
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:5500/house/${id}`, {
          withCredentials: true,
        });
        setProperties(properties.filter((property) => property._id !== id));
      } catch (error) {
        console.error("Failed to delete property:", error);
      }
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:5500/booking/${id}`, {
          withCredentials: true,
        });
        setBookings(bookings.filter((booking) => booking._id !== id));
      } catch (error) {
        console.error("Failed to delete booking:", error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5500/user/${id}`, {
          withCredentials: true,
        });
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5500/booking/${id}`,
        {
          status: newStatus,
        },
        {
          withCredentials: true,
        }
      );
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  const handleToggleAdmin = async (userId, isAdmin) => {
    try {
      await axios.put(
        `http://localhost:5500/user/${userId}`,
        {
          isAdmin: !isAdmin,
        },
        {
          withCredentials: true,
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isAdmin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="admin-container">
        <h1>Admin Dashboard</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "properties" ? "active" : ""}`}
            onClick={() => setActiveTab("properties")}
          >
            Properties
          </button>
          <button
            className={`tab ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
          <button
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : activeTab === "properties" ? (
          <div className="properties-list">
            {properties.map((property) => (
              <div key={property._id} className="property-card">
                {property.images && property.images[0] && (
                  <img src={property.images[0]} alt={property.name} />
                )}
                <div className="property-info">
                  <h3>{property.name}</h3>
                  <p className="location">{property.location}</p>
                  <p className="price">${property.price} per night</p>
                  <p className="owner">
                    Owner: {property.owner?.username || "Unknown"}
                  </p>
                  <div className="actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProperty(property._id)}
                    >
                      Delete Property
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === "bookings" ? (
          <div className="bookings-list admin-bookings">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-image">
                  {booking.house?.images && booking.house.images[0] && (
                    <img
                      src={booking.house.images[0]}
                      alt={booking.house.name || "Property"}
                    />
                  )}
                </div>
                <div className="booking-info">
                  <h3>{booking.house?.name || "Unknown Property"}</h3>
                  <p className="user">
                    Booked by: {booking.user?.username || "Unknown User"}
                  </p>
                  <p className="days">Days: {booking.numberOfDays}</p>
                  <p className="price">Total Price: ${booking.totalPrice}</p>
                  <p className="status">
                    Status: {booking.status || "pending"}
                  </p>
                  <p className="date">
                    Booked on: {formatDate(booking.createdAt)}
                  </p>
                  <div className="actions">
                    <select
                      value={booking.status || "pending"}
                      onChange={(e) =>
                        handleUpdateBookingStatus(booking._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      Delete Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="users-list">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-info">
                  <h3>{user.name || "Unknown User"}</h3>
                  <p className="email">{user.email || "No email"}</p>
                  <p className="role">
                    Role: {user.isAdmin ? "Admin" : "User"}
                  </p>
                  {user.createdAt && (
                    <p className="joined">
                      Joined: {formatDate(user.createdAt)}
                    </p>
                  )}
                  <div className="actions">
                    <button
                      className={`role-btn ${user.isAdmin ? "admin" : "user"}`}
                      onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                    >
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
