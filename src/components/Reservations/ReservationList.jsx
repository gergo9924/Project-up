import { newFormatDate } from "../../services/booking-service";
import "./ReservationsList.css"

function ReservationListing({ reservations, acceptCallback, declineCallback, status }) {
    return <div>
        {reservations &&
            reservations.map((reservation) => {
                return Object.keys(reservation).map((reservationId) => {
                    if (reservation[reservationId].status === status) {
                        return (
                            <div key={reservationId}>
                                {/* <ul>
                                    
                                    <li><span className="details-span">Date:</span> {newFormatDate(reservation[reservationId].date)}</li>
                                    <li>Number of Guests: {reservation[reservationId].numberOfGuests}</li>
                                    <li>Number of Guests: {reservation[reservationId].numberOfGuests}</li>
                                    <li>User id: {reservation[reservationId].userId}</li>
                                    <li>Message: {reservation[reservationId].message}</li>
                                </ul> */}
                                <ul >
                                                <li><span className="details-span">Date:</span> {newFormatDate(reservation[reservationId].date)}</li>
                                                {/* <li><span className="details-span">Restaurant:</span> {reservation[reservationId].restaurantName}</li> */}
                                                <li><span className="details-span">Number of guests:</span> {reservation[reservationId].numberOfGuests}</li>
                                                <li><span className="details-span">Message:</span> {reservation[reservationId].message}</li>
                                            </ul>
                                {
                                    acceptCallback ?
                                        <div>
                                            <div className="buttons">
                                                <button className="decline-btn" onClick={() => { declineCallback(reservationId) }}>Decline</button>
                                                <button className="accept-btn" onClick={() => { acceptCallback(reservationId) }}>Accept</button>
                                            </div>
                                            <hr />
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        );
                    };
                });
            })}
    </div>;
}

export default ReservationListing