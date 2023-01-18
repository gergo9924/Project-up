import React from 'react'
import { newFormatDate } from '../../services/booking-service';
import { BookingContext } from '../Restaurant/BookingContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function AcceptedReservations({id}) {

    const bookingContext = React.useContext(BookingContext)
    const navigate = useNavigate()
    const context = React.useContext(AuthContext)


    console.log(context.userData.details.role)
    return (
        <div className='reservations-main-div'>
            <div className='dashboard-reserv-heading-div'>
                <h2>Upcoming Reservations</h2>
            </div>
            <div>
                {bookingContext.reservationsWithDetails && 
                    bookingContext.reservationsWithDetails.map((reservation) => {
                        return Object.keys(reservation).map((reservationId) => {
                            
                            const dateToFormat = reservation[reservationId].date;
                            let isbefore = moment(dateToFormat).isBefore(Date());
                            if (reservation[reservationId].status == true && !isbefore) {
                                console.log(reservationId)
                                return (
                                    <div key={reservationId}>
                                        <div className="reservation-div">
                                            <ul >
                                                <li><span className="details-span">Date:</span> {newFormatDate(reservation[reservationId].date)}</li>
                                                {
                                                    context.userData.details.role === "users"?
                                                    <li><span className="details-span">Restaurant:</span> {reservation[reservationId].restaurantName}</li>
                                                    :
                                                    <li><span className="details-span">Guest:</span> {reservation[reservationId].userName}</li>    
                                                }
                                                <li><span className="details-span">Number of guests:</span> {reservation[reservationId].numberOfGuests}</li>
                                                <li><span className="details-span">Message:</span> {reservation[reservationId].message}</li>
                                            </ul>
                                            {
                                                context.userData.details.role === "restaurants"?
                                                <button className="dashboard-btn" onClick={() => navigate(`/restaurants/${reservation[reservationId].restaurantId}/booking/${reservationId}`)}>
                                                    Manage reservation
                                                </button>
                                                :
                                                context.userData.details.role === "users"?
                                                <button className="dashboard-btn" onClick={() => navigate(`/users/${id}/booking-modification/${reservationId}/${reservation[reservationId].restaurantId}`)}>
                                                    Manage reservation
                                                </button>
                                                :
                                                null
                                            }
                                        </div>
                                        <hr />
                                    </div>
                                );
                            }
                        });
                    })
                }
            </div>
        </div>
    )
}

export default AcceptedReservations