import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/AuthContext.js";
import Header from "./components/Header/Header.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loadUserRole, loadUser } from "./services/superadmin-auth-service.js";

import { firebaseApp } from "./config.js";

import { BookingContext } from "./components/Restaurant/BookingContext.js";

import { useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.js";

import "./App.css";
import { LogoContext } from "./components/LogoContext.js";
import { loadLogo } from "./repositories/image-repositories.js";
import { RestaurantContext } from "./components/RestaurantContext.js";
import { GuestContext } from "./components/GuestContext.js";

function App() {
  const [userData, setUserData] = React.useState(null);
  const [reservationsWithDetails, setReservationsWithDetails] =
    React.useState(null);
  const [restaurantDetail, setRestaurantDetail] = React.useState(null);
  const [logo, setLogo] = React.useState("");
  const [newReservation, setNewReservation] = React.useState(null);
  const [isRestaurantLoggedIn, setIsRestaurantLoggedIn] = React.useState(false);
  const [favourites, setFavourites] = React.useState([]);
  const [favouriteRestaurants, setFavouriteRestaurants] = React.useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        loadUserRole(uid, setUserData, navigate);
      } else {
        setUserData(null);
      }
    });
  }, []);

  React.useEffect(() => {
    loadLogo().then((logo) => setLogo(logo));
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ userData, setUserData }}>
        <GuestContext.Provider
          value={{
            favourites,
            setFavourites,
            favouriteRestaurants,
            setFavouriteRestaurants,
          }}
        >
          <RestaurantContext.Provider
            value={{
              restaurantDetail,
              setRestaurantDetail,
              isRestaurantLoggedIn,
              setIsRestaurantLoggedIn,
            }}
          >
            <LogoContext.Provider value={{ logo }}>
              <BookingContext.Provider
                value={{
                  reservationsWithDetails,
                  setReservationsWithDetails,
                  newReservation,
                  setNewReservation,
                }}
              >
                <Navigation />
                <Outlet />
              </BookingContext.Provider>
            </LogoContext.Provider>
          </RestaurantContext.Provider>
        </GuestContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
