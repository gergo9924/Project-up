import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadReservation } from "../../../repositories/booking-repositories";
import { deleteBookingItem } from "../../../services/restaurant-service";
import "./GuestBookingDelete.css"

function RestaurantBookingDelete() {
  let navigate = useNavigate();
  let param = useParams();
  let id = param.Id;
  let restId = param.restaurantId;
  let userId = param.userId

  const [reservationDetails, setReservationDetails] = React.useState({});

  React.useEffect(() => {
    loadReservation(id, reservationDetails, setReservationDetails);
  }, []);

  let user;
  return (
    <div>
      {reservationDetails ?
        <div className="reservation-modif-div">
          <h1 className="guest-booking-delete-h1">Reservation delete</h1>
          <h4>Are you sure you want to delete your reservation?</h4>
          <div className="guest-reserv-modif-btn-div">
            <button className="guest-reserv-update-btn" onClick={() =>deleteBookingItem(restId, id, userId).then(() => navigate(`/users/dashboard/${userId}`))}>
              Delete
            </button>
            <button className="guest-reserv-delete-btn" onClick={() => navigate(`/users/dashboard/${userId}`)}>
              Back
            </button>
          </div>
        </div>
        :null
      }
    </div>
  );
}

export default RestaurantBookingDelete;
