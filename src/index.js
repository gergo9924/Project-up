import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SuperadminRestaurantModification from "./components/Superadmin/SuperadminRestaurantModification/SuperadminRestaurantModification.js";
import SuperadminRestaurantRegistration from "./components/Superadmin/SuperadminRestaurantRegistration/SuperadminRestaurantRegistration.js";
import SuperAdminRestaurantListingScreen from "./components/Superadmin/SuperadminRestaurantListing/SuperAdminRestaurantListingScreen";
import SuperadminGuestRegistration from "./components/Superadmin/SuperadminGuestRegistration/SuperadminGuestRegistration";
import SuperadminGuestListing from "./components/Superadmin/SuperadminGuestListing/SuperadminGuestListing";
import SuperadminRestaurantDelete from "./components/Superadmin/SuperadminRestaurantDelete/SuperadminRestaurantDelete";
import SuperadminGuestModification from "./components/Superadmin/SuperadminGuestModify/SuperadminGuestModification.js";
import SuperadminGuestDelete from "./components/Superadmin/SuperadminGuestDelete/SuperadminGuestDelete";
import SuperadminBooking from "./components/Superadmin/SuperadminBooking/SuperadminBooking";

import SuperadminBookingListingScreen from "./components/Superadmin/SuperadminBookingListing/SuperadminBookingListingScreen";

import SuperadminMenuAdd from "./components/Superadmin/SuperadminMenuAdd/SuperadminMenuAdd.js";
import "./index.css"

import SuperadminMenuModification from "./components/Superadmin/SuperadminMenuModification/SuperadminMenuModification.js";
import RestaurantRegistrationScreen from "./components/Restaurant/RestaurantRegistrationScreen/RestaurantRegistrationScreen";
import RestaurantDetails from "./components/Restaurant/RestaurantDetails/RestaurantDetails";
import GuestRegistrationScreen from "./components/Guest/GuestRegistrationScreen/GuestRegistrationScreen";
import RestaurantAdminDashboard from "./components/Restaurant/RestaurantAmindDashboard/RestaurantAdminDashboard";
import AuthGuard from "./components/AuthGuard";

import RestaurantMainDetailsModification from "./components/Restaurant/RestaurantMainDetailsModification/RestaurantMainDetailsModification";
import RestaurantMenuModification from "./components/Restaurant/RestaurantMenuModification/RestaurantMenuModification";
import RestaurantMenuItemModification from "./components/Restaurant/RestaurantMenuItemModification/RestaurantMenuItemModification";
import RestaurantMenuAdd from "./components/Restaurant/RestaurantMenuAdd/RestaurantMenuAdd";
import RestaurantMenuItemDelete from "./components/Restaurant/RestaurantMenuItemDelete/RestaurantMenuItemDelete";
import RestaurantBookingsList from "./components/Restaurant/RestaurantBookingsList/RestaurantBookingsList";
import RestaurantBookingModification from "./components/Restaurant/RestaurantBookingModification/RestaurantBookingModification";
import Login from "./components/Login/Login";
import GuestDashboard from "./components/Guest/GuestDashboard/GuestDashboard";
import RestaurantMainpage from "./components/Restaurant/RestaurantMainpage/RestaurantMainpage.js";
import RestaurantPublicList from "./components/Restaurant/RestaurantPublicList/RestaurantPublicList";
import RestaurantBookingDelete from "./components/Restaurant/RestaurantBookingDelete/RestaurantBookingDelete";
import GuestBooking from "./components/Guest/GuestBookingsListing/GuestBookingsListing";
import GuestBookingsListing from "./components/Guest/GuestBookingsListing/GuestBookingsListing";
import GuestMainDetailsModification from "./components/Guest/GuestMainDetailsModification/GuestMainDetailsModification";
import GuestBookingModification from "./components/Guest/GuestBookingModification/GuestBookingModification";
import GuestBookingDelete from "./components/Guest/GuestBookingDelete/GuestBookingDelete";
import GuestBookingConfirm from "./components/Guest/GuestBookingConfirm/GuestBookingConfirm.js";
import SuperadminBookingDelete from "./components/Superadmin/SuperadminBookingDelete/SuperadminBookingDelete";
import SuperadminBookingModification from "./components/Superadmin/SuperadminBookingModification/SuperadminBookingModification";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<RestaurantPublicList />} />

        <Route
          path="superadmin/restaurant/modification/:restaurantId"
          element={
            <AuthGuard>
              <SuperadminRestaurantModification />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/restaurant/registration"
          element={
            <AuthGuard>
              <SuperadminRestaurantRegistration />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/restaurant/listing"
          element={
            <AuthGuard>
              <SuperAdminRestaurantListingScreen />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/modification/main-details/:restaurantId"
          element={
            <AuthGuard>
              <RestaurantMainDetailsModification />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/modification/menu/:restaurantId"
          element={
            <AuthGuard>
              <RestaurantMenuModification />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/:restaurantId/menu/delete/:foodType/:foodName"
          element={
            <AuthGuard>
              <RestaurantMenuItemDelete />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/menu/add/:restaurantId"
          element={
            <AuthGuard>
              <RestaurantMenuAdd />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/:restaurantId/bookings/listing"
          element={
            <AuthGuard>
              <RestaurantBookingsList />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/:restaurantId/booking/:Id"
          element={
            <AuthGuard>
              <RestaurantBookingModification />
            </AuthGuard>
          }
        />
        <Route
          path="/restaurants/:restaurantId/booking/delete/:Id"
          element={
            <AuthGuard>
              <RestaurantBookingDelete />
            </AuthGuard>
          }
        />
        

        <Route
          path="restaurants/menu-item/modification/:restaurantId/:foodId"
          element={
            <AuthGuard>
              <RestaurantMenuItemModification />
            </AuthGuard>
          }
        />
        <Route
          path="superadmin/guest/registration"
          element={
            <AuthGuard>
              <SuperadminGuestRegistration />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/guest/listing"
          element={
            <AuthGuard>
              <SuperadminGuestListing />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/guest/modification/:guestId"
          element={
            <AuthGuard>
              <SuperadminGuestModification />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/guest/delete/:userId"
          element={
            <AuthGuard>
              <SuperadminGuestDelete />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/restaurant/delete/:restaurantId"
          element={
            <AuthGuard>
              <SuperadminRestaurantDelete />
            </AuthGuard>
          }
        />
        <Route
          path="superadmin/booking"
          element={
            <AuthGuard>
              <SuperadminBooking />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/bookings/listing"
          element={
            <AuthGuard>
              <SuperadminBookingListingScreen />
            </AuthGuard>
          }
        />
        <Route
          path="/superadmin/:restaurantId/booking/delete/:Id"
          element={
            <AuthGuard>
              <SuperadminBookingDelete />
            </AuthGuard>
          }
        />
        <Route
          path="/superadmin/:restaurantId/booking/modification/:Id"
          element={
            <AuthGuard>
              <SuperadminBookingModification />
            </AuthGuard>
          }
        />

        <Route
          path="superadmin/menu/add/:restaurantId"
          element={
            <AuthGuard>
              <SuperadminMenuAdd />
            </AuthGuard>
          }
        />
        <Route
          path="superadmin/menu/modification/:restaurantId/:foodId"
          element={
            <AuthGuard>
              <SuperadminMenuModification />
            </AuthGuard>
          }
        />
        <Route
          path="users/dashboard/:userId"
          element={
            <AuthGuard>
              <GuestDashboard />
            </AuthGuard>
          }
        />
        <Route
          path="users/:userId/reservations"
          element={
            <AuthGuard>
              <GuestBookingsListing />
            </AuthGuard>
          }
        />
        <Route
          path="/users/modification/main-details/:guestId"
          element={
            <AuthGuard>
              <GuestMainDetailsModification />
            </AuthGuard>
          }
        />
        <Route
          path="/users/:userId/booking-modification/:bookingId/:restaurantId"
          element={
            <AuthGuard>
              <GuestBookingModification />
            </AuthGuard>
          }
        />
        <Route
          path="/users/:userId/booking/delete/:Id/:restaurantId"
          element={
            <AuthGuard>
              <GuestBookingDelete />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/:restaurantId"
          element={
            <AuthGuard>
              <RestaurantDetails />
            </AuthGuard>
          }
        />
        <Route
          path="restaurants/dashboard/:restaurantId"
          element={
            <AuthGuard>
              <RestaurantAdminDashboard />
            </AuthGuard>
          }
        />



        <Route
          path="users/:userId/bookingconfirm"
          element={
            <AuthGuard>
              <GuestBookingConfirm />
            </AuthGuard>
          }
        />



        <Route
          path="restaurant/mainpage/:restaurantId"
          element={<RestaurantMainpage />}
        />

        {/* <Route path="superadmin/login" element={<SuperadminLogin />} /> */}

        <Route
          path="guest/registration"
          element={<GuestRegistrationScreen />}
        />
        <Route
          path="restaurants/registration"
          element={<RestaurantRegistrationScreen />}
        />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
