import React from 'react'
import { newFormatDate } from '../../services/booking-service';
import { BookingContext } from '../Restaurant/BookingContext';
import moment from 'moment';
import "./History.css"

function History() {

    const bookingContext = React.useContext(BookingContext)

    return (
        <div className='reservations-main-div'>
            <div className='dashboard-reserv-heading-div'>
                <h2>History</h2>
            </div>
            <div>
                {bookingContext.reservationsWithDetails ?
                    bookingContext.reservationsWithDetails.map((reservation) => {
                        return Object.keys(reservation).map((reservationId) => {
                            const dateToFormat = reservation[reservationId].date;
                         
                            let isbefore = moment(dateToFormat).isBefore(Date());
                            if (isbefore) {
                                return (
                                    <div key={reservationId}>
                                        <div className="reservation-div">
                                            <ul >
                                                <li><span className="details-span">Date:</span> {newFormatDate(reservation[reservationId].date)}</li>
                                                <li><span className="details-span">Restaurant:</span> {reservation[reservationId].restaurantName}</li>
                                                <li><span className="details-span">Number of guests:</span> {reservation[reservationId].numberOfGuests}</li>
                                                <li><span className="details-span">Message:</span> {reservation[reservationId].message}</li>
                                            </ul>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            };
                        });
                    })
                    :<p>No pending reservations</p>
                }
            </div>
        </div>
    )
}

export default History