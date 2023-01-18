import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadReservation } from "../../../repositories/booking-repositories";
import { loadSpecificReservationUserId } from "../../../services/booking-service.js";
import { deleteBookingItem } from "../../../services/restaurant-service";

function SuperadminBookingDelete() {
  let navigate = useNavigate();
  let param = useParams();
  let id = param.Id;
  let restId = param.restaurantId;

  console.log(id); //reservationId
  console.log(restId); // restaurantId

  const [reservationDetails, setReservationDetails] = React.useState({});
  console.log(reservationDetails);

  const [userIdGet, setUserIdGet] = React.useState("");

  React.useEffect(() => {
    console.log(id);
    loadSpecificReservationUserId(id, setUserIdGet);
  }, []);

  console.log(userIdGet);

  React.useEffect(() => {
    console.log(userIdGet);
    loadReservation(id, reservationDetails, setReservationDetails);
  }, []);

  return (
    <div className="reservation-modif-div">
      <h1 className="guest-booking-delete-h1">Reservation delete</h1>
      <h4>Are you sure you want to delete the reservation?</h4>

      <div className="guest-reserv-modif-btn-div">
        <button
          className="guest-reserv-update-btn"
          onClick={() => {
            console.log(reservationDetails);
            let uid = reservationDetails.userId;
            console.log(restId, id, uid);
            deleteBookingItem(restId, id, uid).then(() =>
              navigate(`/superadmin/bookings/listing`)
            );
          }}
        >
          Delete
        </button>
        <button
          className="guest-reserv-delete-btn"
          onClick={() => navigate(`/superadmin/bookings/listing`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SuperadminBookingDelete;
