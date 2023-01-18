import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadReservation, modifyReservation } from "../../../repositories/booking-repositories";
import BookingDetails from "../../Booking/BookingDetails";
import { loadRestaurantDetails } from "../../../repositories/restaurant-repositories";
import DateTimePicker from "../../Booking/DateTimePicker";
// import "./GuestBookingModification.css"
import { BookingContext } from "../../Restaurant/BookingContext";

function RestaurantBookingModification() {

	const bookingContext = useContext(BookingContext);
	const navigate = useNavigate()

	let param = useParams();
	let id = param.Id;
	let userId = param.userId;
	let restId = param.restaurantId
	console.log(id)

	const [reservationDetails, setReservationDetails] = React.useState({ restaurantId: param.restaurantId, })
	const [availableTables, setAvailableTables] = React.useState(false)

	const [currentTaken, setCurrentTaken] = React.useState("");

	const [restaurant, setRestaurant] = React.useState({})
	const [day, setDay] = React.useState("")
	const [time, setTime] = React.useState("")

	const [oldDate, setOldTime] = React.useState("")

	React.useEffect(() => {
		loadReservation(id, reservationDetails, setReservationDetails)
			.then((reserv) => {
				console.log(reserv)
				let oldTime = reserv.date.substring(11)
				let oldDay = reserv.date.slice(0, 10)
				setTime(oldTime)
				setDay(oldDay)
				setOldTime(`${oldDay} ${oldTime}`)
			})

	}, [])
	React.useEffect(() => {
		console.log(restId)
		loadRestaurantDetails(restId, setRestaurant)
	}, [])


	return (
		<div>
			{reservationDetails &&
				<div className="reservation-modif-container">
					<div className="reservation-modif-div">
						<h1>Reservation modification</h1>
						<h4 className="reservation-input-details-div">Reserved date: {oldDate}</h4>
						<div className="reservation-modif-details-div">
							<div className="reservation-input-details-div">
								<label>Number Of Guests:</label>
								<input
									onChange={(e) => {
										setReservationDetails({
											...reservationDetails,
											numberOfGuests: e.target.value,
										})
									}
									}
									type="number"
									placeholder={reservationDetails.numberOfGuests}
									min={1}
								/>
							</div>
							<div className="reservation-input-details-div">
								<label>Message:</label>
								<input className="reservation-message" onChange={(e) => {
										if (e.target.value != "") {
											setReservationDetails({
												...reservationDetails,
												message: e.target.value,
											})
										}
									}
									}
									type="text"
									placeholder={reservationDetails.message ? reservationDetails.message : "No message added"}
								/>
						</div>
						</div>
						<DateTimePicker reservationDetails={reservationDetails} setReservationDetails={setReservationDetails} day={day} setDay={setDay} setTime={setTime} time={time} />
					</div>
					<div className="guest-reserv-modif-btn-div">
						<button className="guest-reserv-update-btn" disabled={availableTables} onClick={() =>{
							modifyReservation(id, { ...reservationDetails, status: false, date: `${day}T${time}` })
								.then(() => bookingContext.setNewReservation("success"))
								.then(() => navigate(`/restaurants/dashboard/${restId}`))}
						}>
							Update reservation
						</button>
						<button className="guest-reserv-delete-btn"onClick={() => navigate(`/restaurants/${restId}/booking/delete/${id}`)}>
							Delete reservations
						</button>
					</div>

					{reservationDetails.restaurantId && reservationDetails.numberOfGuests && reservationDetails.userId ?
						<BookingDetails details={{
							...reservationDetails, date: `${day}T${time}`, fullcapacity: restaurant.capacity, availableTables, setAvailableTables, currentTaken,
							setCurrentTaken
						}} isModification={true} />
						: null
					}
					<button className="guest-reserv-back-btn"onClick={() => navigate(`/restaurants/dashboard/${restId}`)}>
						Back
					</button>

				</div>
			}
		</div>
	);
}

export default RestaurantBookingModification;
