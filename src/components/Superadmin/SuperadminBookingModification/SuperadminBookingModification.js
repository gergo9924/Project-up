import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadReservation,
  modifyReservation,
} from "../../../repositories/booking-repositories";
import BookingDetails from "../../Booking/BookingDetails";
import { loadRestaurantDetails } from "../../../repositories/restaurant-repositories";
import DateTimePicker from "../../Booking/DateTimePicker";
import {
  newFormatDate,
  nowYyyymmdd,
} from "../../../services/booking-service.js";
import moment from "moment";
import "./SuperadminBookingModification.css";

function SuperadminBookingModification() {
  const navigate = useNavigate();

  let param = useParams();
  let id = param.Id;
  let restId = param.restaurantId;

  const [reservationDetails, setReservationDetails] = React.useState({
    numberOfGuests: 0,
  });

  const [availableTables, setAvailableTables] = React.useState(false);
  const [currentTaken, setCurrentTaken] = React.useState("");
  const [restaurant, setRestaurant] = React.useState({});
  const [day, setDay] = React.useState("");
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    loadReservation(id, reservationDetails, setReservationDetails).then(
      (reserv) => {
        console.log(reserv);
        setDay(newFormatDate(reserv.date, "day"));
        setTime(newFormatDate(reserv.date, "time"));
      }
    );
  }, []);
  React.useEffect(() => {
    loadRestaurantDetails(restId, setRestaurant);
  }, []);

  React.useEffect(() => {
    if (
      reservationDetails.date &&
      day != "" &&
      time != "" &&
      reservationDetails.numberOfGuests > 0
    ) {
      let isbefore = moment(`${day}T${time}`).isBefore(Date());
      console.log(isbefore);
      console.log(moment());
      console.log(availableTables);
      if (isbefore == false) {
        setAvailableTables(false);
      } else {
        setAvailableTables(true);
      }
    }
  }, [day, time, reservationDetails.numberOfGuests]);

  return (
    <div>
      {reservationDetails && (
        <>
          <div className="super-reservation-modif-container">
            {/* <p> Guest ID: {reservationDetails.userId}</p> */}
            <div>
              <h1>Reservation modification</h1>

              <div className="super-reservation-modif-div">
                <div className="super-booked-date">
                  <h4 className="super-reservation-input-details-div">
                    Reserved date:
                  </h4>
                  <span>{newFormatDate(reservationDetails.date)}</span>
                </div>
                <div className="super-reservation-input-details-div">
                <label>Number Of Guests:</label>
                <input
                  onChange={(e) => {
                    if (
                      e.target.value == "0" ||
                      e.target.value == "" ||
                      e.target.value < 1
                    ) {
                      setAvailableTables(true);
                      setReservationDetails({
                        ...reservationDetails,
                        numberOfGuests: e.target.value,
                      });
                    } else {
                      setAvailableTables(false);
                      console.log(e.target.value);
                      setReservationDetails({
                        ...reservationDetails,
                        numberOfGuests: e.target.value,
                      });
                    }
                  }}
                  type="number"
                  value={reservationDetails.numberOfGuests}
                  min={0}
                />
            
              </div>
              <div className="super-reservation-input-details-div-message">
                <label>Message:</label>
                <input
                  onChange={(e) => {
                    if (e.target.value != "") {
                      setReservationDetails({
                        ...reservationDetails,
                        message: e.target.value,
                      });
                    }
                  }}
                  type="text"
                  value={
                    reservationDetails.message
                      ? reservationDetails.message
                      : "No message added"
                  }
                />
              </div>
            </div>
            </div>


            <div className="date-time-block">
              <DateTimePicker
                reservationDetails={reservationDetails}
                setReservationDetails={setReservationDetails}
                day={day}
                setDay={setDay}
                setTime={setTime}
                time={time}
              />
            </div>
          </div>
     

          {reservationDetails.restaurantId &&
          reservationDetails.numberOfGuests > 0 &&
          !availableTables ? (
            <BookingDetails
              details={{
                ...reservationDetails,
                date: `${day}T${time}`,
                fullcapacity: restaurant.capacity,
                availableTables,
                setAvailableTables,
                currentTaken,
                setCurrentTaken,
              }}
              isModification={true}
            />
          ) : null}
        </>
      )}
      <div className="flex-middle-gap">
      <button className="super-reserv-update-btn"
            disabled={availableTables}
            onClick={() =>
              modifyReservation(id, {
                ...reservationDetails,
                date: `${day}T${time}`,
              }).then(() => navigate(`/superadmin/bookings/listing`))
            }
          >
            Save Changes
          </button>
      	<button className="super-reserv-back-btn" onClick={() => navigate(`/superadmin/bookings/listing`)}>
						Back
					</button>
      </div>
           
    </div>
  );
}

export default SuperadminBookingModification;
