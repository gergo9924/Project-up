import React from "react";
import { nowYyyymmdd } from "../../../services/booking-service.js";
import { loadGuest } from "../../../services/guest-service";
import {
  loadRestaurants,
  makeReservation,
} from "../../../services/restaurant-service";
import BookingDetails from "../../Booking/BookingDetails.js";
import DateTimePicker from "../../Booking/DateTimePicker";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./SuperadminBooking.css";
function SuperadminBooking() {
  const navigate = useNavigate();
  // Osszes Guest setteles
  const [guests, setGuest] = React.useState([]);

  //Osszes etterem setteles:
  const [restaurants, setRestaurants] = React.useState([]);
  const [currentTaken, setCurrentTaken] = React.useState("");

  const [reservationDetails, setReservationDetails] = React.useState({
    numberOfGuests: 0,
    userId: "USER",
    restaurantId: "RESTAURANT",
  });

  const [day, setDay] = React.useState(nowYyyymmdd("date"));

  const [time, setTime] = React.useState(nowYyyymmdd("time"));

  const [availableTables, setAvailableTables] = React.useState(false);

  const [userName, setUsername] = React.useState("USER");
  const [restaurantName, setRestaurantName] = React.useState("RESTAURANT");

  React.useEffect(() => {
    loadGuest(setGuest);
  }, []);

  React.useEffect(() => {
    loadRestaurants(setRestaurants);
  }, []);

  React.useEffect(() => {
    setReservationDetails({ ...reservationDetails, date: `${day}T${time}` });
    let dateWithFormat = moment(`${day}T${time}`);

    if (
      reservationDetails.date &&
      day != "" &&
      time != "" &&
      reservationDetails.numberOfGuests > 0 &&
      reservationDetails.userId != "USER" &&
      reservationDetails.restaurantId != "RESTAURANT"
    ) {
      let isbefore = dateWithFormat.isBefore(Date());

      if (isbefore == false) {
        return setAvailableTables(false);
      } else {
        return setAvailableTables(true);
      }
    } else {
      return setAvailableTables(true);
    }
  }, [
    day,
    time,
    reservationDetails.numberOfGuests,
    reservationDetails.restaurantId,
    reservationDetails.userId,
    reservationDetails.restaurantName,
  ]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h1>Make a Reservation</h1>
      <div className="user-restaurant-choose">
        
        <select
          value={userName}
          onChange={(e) => {
            if (e.target.value == "USER") {
              setUsername("USER");
              setReservationDetails({
                ...reservationDetails,
                userId: "USER",
              });
            }

            Object.keys(guests).map((guest) => {
              if (guests[guest].userName == e.target.value) {
                setUsername(guests[guest].userName);
                setReservationDetails({
                  ...reservationDetails,
                  userId: guest,
                  userName: guests[guest].userName
                });
              }
            });
          }}
        >
          <option>USER</option>
          {Object.keys(guests).map((guest) => (
            <option key={uuidv4()}>{guests[guest].userName}</option>
          ))}
        </select>
    
        <select
          value={restaurantName}
          onChange={(e) => {
            Object.keys(restaurants).map((restaurant) => {
              if (e.target.value == "RESTAURANT") {
                setRestaurantName("RESTAURANT");
                return setReservationDetails({
                  ...reservationDetails,
                  restaurantId: "RESTAURANT",
                  restaurantName: null,
                });
              } else if (restaurant == e.target.value) {
                setRestaurantName(e.target.value);
                return setReservationDetails({
                  ...reservationDetails,
                  restaurantId: e.target.value,
                  restaurantName: restaurants[restaurant].restaurantName,
                });
              }
            });
          }}
        >
          {" "}
          <option>RESTAURANT</option>
          {Object.keys(restaurants).map((restaurant) => {
            return (
              <option value={restaurant} key={uuidv4()}>
                {restaurants[restaurant].restaurantName}
              </option>
            );
          })}
        </select>
      </div>

      <DateTimePicker
        reservationDetails={reservationDetails}
        setReservationDetails={setReservationDetails}
        day={day}
        setDay={setDay}
        setTime={setTime}
        time={time}
      />
      <div className="super-new-reservation">
        <h4>Party size:</h4>
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
          placeholder="Number of guests"
          min={1}
        />
      </div>
      <div className="super-custom-message">
        <p>Custom message for the restaurant:</p>
        <input
          onChange={(e) =>
            setReservationDetails({
              ...reservationDetails,
              message: e.target.value,
            })
          }
          type="text"
          placeholder="Message"
        />
      </div>

      <button
        className="make-reservation-btn"
        disabled={availableTables}
        onClick={() =>
          makeReservation({
            ...reservationDetails,
            date: `${day}T${time}`,
          }).then(() => navigate(`/superadmin/bookings/listing`))
        }
      >
        Make a reservation
      </button>

      {restaurants[reservationDetails.restaurantId] && !availableTables ? (
        <BookingDetails
          details={{
            ...reservationDetails,
            date: `${day}T${time}`,
            fullcapacity: restaurants[reservationDetails.restaurantId].capacity,
            availableTables,
            setAvailableTables,
            currentTaken,
            setCurrentTaken,
          }}
          isModification={false}
        />
      ) : null}
    </div>
  );
}

export default SuperadminBooking;
