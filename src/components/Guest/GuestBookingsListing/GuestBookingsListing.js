import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BookingContext } from "../../Restaurant/BookingContext";
import { newFormatDate } from "../../../services/booking-service.js";
import { loadReservationsForSelectedGuest } from "../../../repositories/booking-repositories.js";

function GuestBookingsListing() {
  let bookingContext = useContext(BookingContext);
  let navigate = useNavigate();
  let param = useParams();
  console.log(bookingContext);

  const [bookingsWithDetails, setBookingsWithDetails] = React.useState({});

  React.useEffect(() => {
    if (bookingContext.reservationsWithDetails == null) {
      loadReservationsForSelectedGuest(
        param.userId,
        setBookingsWithDetails,
        bookingContext.reservationsWithDetails,
        bookingContext.setReservationsWithDetails
      );
    }
  }, []);
  return (
    <div>
      <h1>Reservations</h1>
      <div>
        {bookingContext.reservationsWithDetails &&
          bookingContext.reservationsWithDetails.map((reservation) => {
            return Object.keys(reservation).map((id) => {
              return (
                <div key={uuidv4()}>
                  <ul>
                    <li>Date: {newFormatDate(reservation[id].date)}</li>
                    <li>Number Of Guests: {reservation[id].numberOfGuests}</li>
                    <li>Reservation Id: {reservation[id].userId}</li>
                    <li>Message: {reservation[id].message}</li>
                  </ul>
                  <button
                    onClick={() =>
                      navigate(
                        `/users/${param.userId}/booking-modification/${id}/${reservation[id].restaurantId}`
                      )
                    }
                  >
                    Modify Reservation
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/users/${param.userId}/booking/delete/${id}/${reservation[id].restaurantId}`
                      )
                    }
                  >
                    Delete reservations
                  </button>
                </div>
              );
            });
          })}
      </div>
    </div>
  );
}

export default GuestBookingsListing;
