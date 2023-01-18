import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingDetails from "../../Booking/BookingDetails";
import { BookingContext } from "../BookingContext";
import { v4 as uuidv4 } from "uuid";
import { loadReservationsForSelectedRestaurant } from "../../../repositories/booking-repositories";
import "./RestaurantBookingList.css"
import { newFormatDate } from "../../../services/booking-service";

function RestaurantBookingsList() {
  let bookingContext = useContext(BookingContext);
  let navigate = useNavigate();
  let param = useParams();
  let restId = param.restaurantId;

  React.useEffect(() => {
    loadReservationsForSelectedRestaurant(
      restId,
      bookingContext.reservationsWithDetails,
      bookingContext.setReservationsWithDetails
    );
  }, []);

  return (
    <div>
      

      <div className="restaurant-dashboard-container">

     
      <div className="restaurant-dashboard-main-div"> 
        <div>
          <div id="restaurant-maindetails">
            <div className="restaurant-maindetails-div">
              <div className="restaurant-maindetails-heading-div">
              <h1>Reservations</h1>

              </div>
        {bookingContext.reservationsWithDetails &&
          bookingContext.reservationsWithDetails.map((reservation) => {
            return Object.keys(reservation).map((id) => {
              return (
                <div key={uuidv4()}>
                  <ul key={uuidv4()}>
                  <li><span className="details-span">Date:</span> {newFormatDate(reservation[id].date)}</li>
                    <li>Number of Guests:{reservation[id].numberOfGuests}</li>
                    {/* <li>User id: {reservation[id].userId}</li> */}
                    <li>Message: {reservation[id].message}</li>
                  </ul>
                  <button className="restaurant-booking-btn"
                    onClick={() =>
                      navigate(`/restaurants/${restId}/booking/${id}`)
                    }
                  >
                    Modify Reservation
                  </button>
                  <button className="restaurant-booking-del-btn"
                    onClick={() =>
                      navigate(`/restaurants/${restId}/booking/delete/${id}`)
                    }
                  >
                    Delete reservation
                  </button>
                </div>
              );
            });
          })}
          
          </div>
          </div>
      </div>
      </div>

      </div>
    </div>
  );
}

export default RestaurantBookingsList;
