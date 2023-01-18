import React from 'react';
import moment from 'moment';
import { newFormatDate } from '../../services/booking-service.js';

const HistorySuper = ({reservations}) => {
    console.log(reservations);
    return (
        <div className='reservations-main-div'>
      
        <div>
            {reservations ?
          Object.keys(reservations).map((reservationId) => {
            const dateToFormat = reservations[reservationId].date;
            let isbefore = moment(dateToFormat).isBefore(Date());
                        if (isbefore) {
                            return (
                                <div key={reservationId}>
                                    <div className="reservation-div">
                                        <ul >
                                            <li><span className="details-span">Date:</span> {newFormatDate(reservations[reservationId].date)}</li>
                                            <li><span className="details-span">Restaurant:</span> {reservations[reservationId].restaurantName}</li>
                                            <li><span className="details-span">Number of guests:</span> {reservations[reservationId].numberOfGuests}</li>
                                            <li><span className="details-span">Message:</span> {reservations[reservationId].message}</li>
                                        </ul>
                                    </div>
                                    <hr />
                                </div>
                            )
                        };
                    })
             
                : <p>No pending reservations</p>
            }
        </div>
    </div>
    );
};

export default HistorySuper;