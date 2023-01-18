import React from "react";
import { AuthContext } from "../../AuthContext.js";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadReservationsForSelectedGuest } from "../../../repositories/booking-repositories.js";
import { BookingContext } from "../../Restaurant/BookingContext.js";
import { loadFavourites, loadGuestDetailsFromDatabase } from "../../../repositories/guest-repositories.js";
import "./GuestDashboard.css"
import { HashLink } from "react-router-hash-link";
import FavouriteRestaurant from "../../Restaurant/FavouriteRestaurantList/FavouriteRestaurant.js";
import { GuestContext } from "../../GuestContext.js";
import { loadFavouriteRestaurants } from "../../../repositories/restaurant-repositories.js";
import ReservationsTabs from "./Tabs.js";


function GuestDashboard() {

	const navigate = useNavigate();
	let context = useContext(AuthContext);
	const favContext = React.useContext(GuestContext)
	let bookingContext = useContext(BookingContext);
	let params = useParams();
	let id = params.userId;

	const [bookingsWithDetails, setBookingsWithDetails] = React.useState({});
	const [user, setUser] = React.useState({});
	const [modal, setModal] = React.useState(false);
	const [modalStyle, setModalStyle] = React.useState("block");

	React.useEffect(() => {
		console.log(bookingContext.newReservation);
		if (
			bookingContext.newReservation != null &&
			bookingContext.newReservation != "success" &&
			context.userData != null
		) {
			navigate(`/users/${context.userData.uuid}/bookingconfirm`);
		} else if (bookingContext.newReservation == "success") {
			setModal(true);
			bookingContext.setNewReservation(null)
		}
	}, []);

	React.useEffect(() => {
		loadFavourites(id, favContext.setFavourites, "setIsFavourite", params.restaurantId)
	}, [bookingContext.reservationsWithDetails])
	
	React.useEffect(() => {
		loadGuestDetailsFromDatabase(id, setUser);
		loadFavouriteRestaurants(favContext.favourites, favContext.setFavouriteRestaurants);
	}, [favContext.favourites]);
	

	React.useEffect(() => {
		loadReservationsForSelectedGuest(
			id,
			setBookingsWithDetails,
			bookingContext.reservationsWithDetails,
			bookingContext.setReservationsWithDetails
		);
	}, []);

	return (
		<div className="guest-dashboard-container">
			{modal == true ?
				<div className="modal" style={{ display: modalStyle }}
				>
					<div className="modal-content">
						<span className="xBtn" onClick={() => {
							bookingContext.newReservation = null;
							return setModalStyle("none")
						}} style={{ display: "flex", width: "30px", marginLeft: "auto", marginRight: "30px", justifyContent: "end", fontSize: "30px" }}   >&times;</span>
						<p style={{ textAlign: "center" }}> SUCCESSFUL BOOKING </p>
					</div>
				</div>
				: null}

			<div className="dashboard-container">
				{/* <div className="heading-div"> */}
					<h1 className="name">{`${user.firstName} ${user.lastName}`}</h1>
					{/* <div className="empty-div"></div> */}
				{/* </div> */}
				<div className="dashboard-main-div">
					<div className="hashlink-div">
						<HashLink to="#maindetails" smooth>
							Main details
						</HashLink>
						<HashLink to="#reservations" smooth>
							Reservations
						</HashLink>
						<HashLink to="#savedrestaurants" smooth>
							Saved restaurants
						</HashLink>
					</div>

					<div className="dashboard-details-div">
						<div id="maindetails">
							<div className="maindetails-div">
								<div className="maindetails-heading-div">
									<h1>Account details</h1>
									<button className="dashboard-btn" onClick={() => navigate(`/users/modification/main-details/${id}`)}>
										Modify details
									</button>
								</div>
								<div><span className="details-span">Firstname:</span> {user.firstName}</div>
								<div><span className="details-span">Lastname:</span> {user.lastName}</div>
								<div><span className="details-span">Username:</span> {user.userName}</div>
								<div><span className="details-span">Address:</span> {user.address}</div>
								<div><span className="details-span">Email:</span> {user.email}</div>
								<div><span className="details-span">Phone:</span> {user.phone}</div>
							</div>
						</div>
						<div id="reservations">
							<h1>Reservations</h1>
							<ReservationsTabs id={id}/>
						</div>
						{favContext.favouriteRestaurants &&							
							<div id="savedrestaurants">
								<h1>Saved restaurants</h1>
								<FavouriteRestaurant restaurants={favContext.favouriteRestaurants}/>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
}


export default GuestDashboard;
