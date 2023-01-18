import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../repositories/superadmi-auth-repositories";
import { loadLogo } from "../../repositories/image-repositories";
import { AuthContext } from "../AuthContext";
import { BookingContext } from "../Restaurant/BookingContext";
import "./Navigation.css";
import { LogoContext } from "../LogoContext";
import { RestaurantContext } from "../RestaurantContext";

function Navigation() {
  const loginContext = React.useContext(AuthContext);
  const bookingContext = React.useContext(BookingContext);
  const restaurantContext = React.useContext(RestaurantContext);
  const logoContext = React.useContext(LogoContext);

  let navigate = useNavigate();
  // console.log(loginContext)
  // console.log(bookingContext)

  return (
    <nav className="main-navigation">
      <div className="logo-div">
        <NavLink to="/">
          <div style={{ width: "90px", marginLeft: "20px" }}>
            <img
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              src={logoContext.logo}
              alt="logo"
            ></img>
          </div>
        </NavLink>
      </div>

      <div className="navigation">
        {!loginContext.userData && (
          <>
            <NavLink to="login">Sign in</NavLink>
            <div className="dropdown">
              <button className="dropbtn">Sign up</button>
              <div className="dropdown-content">
                <Link to="guest/registration">User Registration</Link>
                <Link to="restaurants/registration">
                  Restaurant registration
                </Link>
              </div>
            </div>
          </>
        )}

        {loginContext.userData &&
          loginContext.userData.details.role == "restaurants" && (
            <>
              <NavLink to={`restaurants/dashboard/${loginContext.userData.uuid}`}>
                Restaurant dashboard
              </NavLink>
              <NavLink
                to={`restaurants/${loginContext.userData.uuid}/bookings/listing`}
              >
                Reservations
              </NavLink>
            </>
          )}
        {loginContext.userData &&
          loginContext.userData.details.role == "users" && (
            <>
              <NavLink to={`users/dashboard/${loginContext.userData.uuid}`}>
                My dashboard
              </NavLink>
              {/* <Link to={`users/${loginContext.userData.uuid}/reservations`}>Reservations</Link> */}
            </>
          )}

        {loginContext.userData &&
          loginContext.userData.details.role == "superadmin" && (
            <>
              <NavLink to="superadmin/restaurant/listing">Restaurants</NavLink>
              <NavLink to="superadmin/guest/listing">Guests</NavLink>
              <NavLink to="superadmin/bookings/listing">Reservations</NavLink>
              <NavLink to="superadmin/restaurant/registration">
                Restaurant Registration
              </NavLink>
              <NavLink to="superadmin/guest/registration">Guest Registration</NavLink>
              <NavLink to="superadmin/booking">New Reservation</NavLink>
            </>
          )}
        {loginContext.userData && (
          <button
            className="dropbtn"
            onClick={() => {
              loginContext.setUserData(null);
              bookingContext.setNewReservation(null);
              restaurantContext.setRestaurantDetail(null);
              restaurantContext.setIsRestaurantLoggedIn(false);
              logout().then(() => {
                navigate("/");
              });
            }}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
