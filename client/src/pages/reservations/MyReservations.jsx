import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import './reservations.css';
import { format } from 'date-fns';

function MyReservations() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5500/booking/user', {
          withCredentials: true
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="my-reservations">
      <Navbar />
      <div className="reservations-container">
        <h1>My Reservations</h1>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="no-bookings">No reservations found</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-image">
                  <img src={booking.house.images[0]} alt={booking.house.name} />
                </div>
                <div className="booking-info">
                  <h3>{booking.house.name}</h3>
                  <p className="location">{booking.house.location}</p>
                  <p className="days">Days: {booking.numberOfDays}</p>
                  <p className="price">Total Price: ${booking.totalPrice}</p>
                  <p className="status">Status: {booking.status}</p>
                  <p className="date">Booked on: {format(new Date(booking.createdAt), 'PPP')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReservations;