import React from "react";
import { newFormatDate } from "../../services/booking-service.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';   

const AcceptedReservationsSuper = ({ reservations }) => {
  const navigate = useNavigate();
  
  return (
    <div className="reservations-main-div">

      <div>
        {reservations &&
          Object.keys(reservations).map((reservationId) => {
            const dateToFormat = reservations[reservationId].date;
            let isbefore = moment(dateToFormat).isBefore(Date());
            if (reservations[reservationId].status == true && !isbefore) {
              return (
                <div key={uuidv4()}>
                  <div className="reservation-div-super">
                    <ul>
                      <li>
                        <span className="details-span">Date:</span>{" "}
                        {newFormatDate(reservations[reservationId].date)}
                      </li>
                      <li>
                        <span className="details-span">Restaurant:</span>{" "}
                        {reservations[reservationId].restaurantName}
                      </li>
                      <li>
                        <span className="details-span">Number of guests:</span>{" "}
                        {reservations[reservationId].numberOfGuests}
                      </li>
                      <li>
                        <span className="details-span">Message:</span>{" "}
                        {reservations[reservationId].message}
                      </li>
                    </ul>
                  <div className="super-btn-accepted">
                     <button className="super-reservation-del-btn"
                      onClick={() =>
                        navigate(
                          `/superadmin/${reservations[reservationId].restaurantId}/booking/delete/${reservationId}`
                        )
                      }
                    >
                      Delete
                    </button>
                    <button
                      className="dashboard-btn"
                      onClick={() =>
                        navigate(
                          `/superadmin/${reservations[reservationId]["restaurantId"]}/booking/modification/${reservationId}`
                        )
                      }
                    >
                      Manage reservation
                    </button>
                  </div>
                   
                  </div>
                  <hr />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default AcceptedReservationsSuper;
