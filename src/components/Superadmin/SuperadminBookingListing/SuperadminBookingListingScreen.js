import React from "react";
import {
  deleteBooking,
  newFormatDate,
} from "../../../services/booking-service";
import { loadReservations } from "../../../services/restaurant-service";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./SuperadminBookingListingScreen.css";
import SuperReservationsTabs from "../../SuperReservations/SuperReservationsTabs.js";

function SuperadminBookingListingScreen() {
  const navigate = useNavigate();
  let [reservations, setReservations] = React.useState([]);

  React.useEffect(() => {
    loadReservations(setReservations);
  }, []);
  
  return (
    <div>
      <div id="reservations-super">
        <h1>Reservations</h1>
        <SuperReservationsTabs reservations={reservations} />
      </div>
    </div>
  );
}

export default SuperadminBookingListingScreen;
