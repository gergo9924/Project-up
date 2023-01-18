import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadRestaurantDetails } from "../../../repositories/restaurant-repositories";
import { loadReservationsForSelectedRestaurant } from "../../../repositories/booking-repositories";
import { BookingContext } from "../BookingContext";
import "./restaurantAdminDashboard.css"
import { bookingAccept } from "../../../services/booking-service.js";
import ReservationListing from "../../Reservations/ReservationList";
import { HashLink } from "react-router-hash-link";
import RestaurantMenuTabs from "./RestaurantMenuTabs";
import RestaurantReservationsTabs from "./RestaurantReservationsTabs";

function RestaurantAdminDashboard() {
  let navigate = useNavigate();
  let params = useParams();
  let id = params.restaurantId;
  let bookingContext = useContext(BookingContext);

  const [restaurant, setRestaurant] = React.useState(null);

  React.useEffect(() => {
    loadRestaurantDetails(id, setRestaurant);
  }, []);

  React.useEffect(() => {
    loadReservationsForSelectedRestaurant(
      id,
      bookingContext.reservationsWithDetails,
      bookingContext.setReservationsWithDetails
    );
  }, []);

  return (
    restaurant && (

      <>
        <div className="dashboard-container">
            <div className="rest-dashboard-heading-div">
              <h1 className="name">{restaurant.restaurantName}</h1>
              <button className="dashboard-btn"
                onClick={() => navigate(`/restaurant/mainpage/${id}`)}
              >
                View Restaurant Page
              </button>
            </div>
          <div className="dashboard-main-div">
            <div className="hashlink-div">
              <HashLink to="#maindetails" smooth>
                Main details
              </HashLink>
              <HashLink to="#menudetails" smooth>
                Menu details
              </HashLink>
              <HashLink to="#reservations" smooth>
                Reservations
              </HashLink>
              <HashLink to="#statics">
                Statistics
              </HashLink>
            </div>
            <div className="dashboard-details-div">
              <div id="maindetails">
							<div className="maindetails-div">
								<div className="maindetails-heading-div">
									<h1>Account details</h1>
									<button className="dashboard-btn" onClick={() => navigate(`/restaurants/modification/main-details/${id}`)}>
										Modify details
									</button>
								</div>
								<div className="rest-dets"><span className="details-span">Owner:</span> {restaurant.ownerName}</div>
								<div className="rest-dets"><span className="details-span">Address:</span> {restaurant.address}</div>
								<div className="rest-dets"><span className="details-span">Email:</span> {restaurant.e_mail}</div>
								<div className="rest-dets"><span className="details-span">Phone:</span> {restaurant.phoneNumber}</div>
								<div className="rest-dets"><span className="details-span">Capacity:</span> {restaurant.capacity}</div>
								<div className="rest-dets"><span className="details-span">Type:</span> {restaurant.restaurantType}</div>
							</div>
						</div>
            <div id="menudetails">
              <h1>Menu details</h1>
              <div>
                <RestaurantMenuTabs restaurant={restaurant}/>
                <button className="dashboard-btn"
                  onClick={() => navigate(`/restaurants/modification/menu/${id}`)}
                >
                  Modify Menu
                </button>
              </div>
            </div>

            <div id="reservations" >
              <h1>Reservations</h1>
                <RestaurantReservationsTabs loadReservationsForSelectedRestaurant/>
              {/* <button className="dashboard-btn"
                onClick={() => navigate(`/restaurants/${id}/bookings/listing`)}
              >
                Modify reservations
              </button> */}
            </div>
            <div id="statics">
              <h1>Statistics</h1>
              <h4>Total number of reservations</h4>
              {bookingContext.reservationsWithDetails ? <p>{bookingContext.reservationsWithDetails.length}</p> : 0}
            </div>
            </div>
          </div>
        </div>
      </>
    )
  );


}

export default RestaurantAdminDashboard;
