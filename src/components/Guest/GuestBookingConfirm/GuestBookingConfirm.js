import React, { useContext, useState } from "react";
import { BookingContext } from "../../Restaurant/BookingContext.js";
import { newFormatDate } from "../../../services/booking-service.js";
import {
  makeReservation,
  selectedRestaurantDetails,
} from "../../../services/restaurant-service.js";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext.js";

const GuestBookingConfirm = () => {
  const param = useParams();
  const useruId = param.userId;
  const context = React.useContext(AuthContext);

  const [restaurantDetails, setReservationDetails] = useState(null);
  const bookingContext = useContext(BookingContext);
  React.useEffect(() => {
    selectedRestaurantDetails(
      bookingContext.newReservation.restaurantId,
      setReservationDetails
    );
  }, []);
  console.log(bookingContext.newReservation);
  let date;
  if (bookingContext.newReservation) {
    date = newFormatDate(bookingContext.newReservation.date);
  }

  console.log(restaurantDetails);
  const navigate = useNavigate();
  const resDetails = {
    ...bookingContext.newReservation,
    userId: useruId,
    userName: context.userData.details.userName,
    status: false,
  };

  return (
    <div id="maindetails" style={{ marginLeft: "auto", marginRight: "auto" }}>
      <div className="maindetails-div">
        <div className="maindetails-heading-div">
          <h1>Please Confirm your booking or Cancel it!</h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" , marginBottom: "10px"}} className="details-span">
              Restaurant name:{" "}
            </div>{" "}
            <div>{restaurantDetails && restaurantDetails.restaurantName}</div>
          </div>
          {/* <div>Restaurant name: </div>
      <span>{restaurantDetails && restaurantDetails.restaurantName}</span> */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%"  , marginBottom: "10px"}} className="details-span">
                Date:{" "}
              </div>
              <div>{date}</div>
            </div>
          </div>

          {/* <div>Date: </div>
      <span>{date}</span> */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" , marginBottom: "10px" }} className="details-span">
                Number of guests:
              </div>
              <div>{bookingContext.newReservation.numberOfGuests}</div>
            </div>
          </div>
          {/* <div>Number of guests: </div>
      <span>{bookingContext.newReservation.numberOfGuests} person.</span> */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%"  , marginBottom: "10px"}} className="details-span">
                Message:
              </div>
              <div>
                <textarea style={{resize:"vertical"}} 
                  readOnly={true}
                  defaultValue={bookingContext.newReservation.message}
                ></textarea>
              </div>
            </div>
          </div>

          {/* <div>Message:</div>
      <textarea readOnly={true} defaultValue={bookingContext.newReservation.message}></textarea> */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "baseline",
          }}
        >
          <button
            className="super-guest-reserv-back-btn"
            style={{ width: "150px", panding: "10px", height: "40px" }}
            onClick={() => {
              bookingContext.setNewReservation(null);
              return navigate(
                `/restaurant/mainpage/${bookingContext.newReservation.restaurantId}`
              );
            }}
          >
            Cancel
          </button>
          <button
            className="dashboard-btn"
            style={{ width: "150px", panding: "10px", height: "40px" }}
            onClick={() => {
              console.log(useruId);
              return makeReservation(resDetails)
                .then(() => bookingContext.setNewReservation("success"))
                .then(() => navigate(`/users/dashboard/${useruId}`));
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestBookingConfirm;
