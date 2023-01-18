import React from 'react'
import { useNavigate } from 'react-router-dom';
import { newFormatDate } from '../../services/booking-service';
import { AuthContext } from '../AuthContext';
import { BookingContext } from '../Restaurant/BookingContext';
import "./PendingReservations.css"

function PendingReservations({id, acceptCallback, declineCallback}) {
    const navigate = useNavigate()
    const bookingContext = React.useContext(BookingContext)
    const route = `/users/${id}/reservations`
    const context = React.useContext(AuthContext)

    return (
        <div className='reservations-main-div'>
            <div className='dashboard-reserv-heading-div'>
                <h2>Pending Reservations</h2>
            </div>
            <div>
                {bookingContext.reservationsWithDetails ?
                    bookingContext.reservationsWithDetails.map((reservation) => {
                        return Object.keys(reservation).map((reservationId) => {
                            if (reservation[reservationId].status == false) {
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
                                                <>
                                                    <div className="reservation-decider-btns">
                                                        <button className='reservation-decider-btn' onClick={() => { acceptCallback(reservationId) }}>Accept</button>
                                                        <button className="reservation-decider-delete-btn" onClick={() => { declineCallback(reservationId) }}>Decline</button>
                                                    </div>
                                                    <button className="dashboard-btn" onClick={() => navigate(`/restaurants/${reservation[reservationId].restaurantId}/booking/${reservationId}`)}>
                                                        Manage reservation
                                                    </button>
                                                </>
                                                :
                                                context.userData.details.role === "users"?
                                                <>
                                                    <button className="dashboard-btn" onClick={() => navigate(`/users/${id}/booking-modification/${reservationId}/${reservation[reservationId].restaurantId}`)}>
                                                        Manage reservation
                                                    </button>
                                                </>
                                                :
                                                null
                                            
                                            }
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

export default PendingReservations