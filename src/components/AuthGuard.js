import React from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function AuthGuard(props) {
  const params = useParams();
  const loginContext = React.useContext(AuthContext);
  let location = useLocation();

  const permissions = {
    [`/superadmin/restaurant/modification/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["superadmin"],
    "/superadmin/restaurant/registration": ["superadmin"],
    "/superadmin/restaurant/listing": ["superadmin"],
    "/superadmin/guest/registration": ["superadmin"],
    "/superadmin/guest/listing": ["superadmin"],
    [`/superadmin/guest/modification/${
      params.guestId ? params.guestId : null
    }`]: ["superadmin"],
    [`/superadmin/guest/delete/${params.userId ? params.userId : null}`]: [
      "superadmin",
    ],
    [`/superadmin/restaurant/delete/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["superadmin"],
    "/superadmin/booking": ["superadmin"],
    "/superadmin/bookings/listing": ["superadmin"],
    [`/superadmin/${
      params.restaurantId ? params.restaurantId : null
    }/booking/delete/${params.Id ? params.Id : null}`]: ["superadmin"],
    [`/superadmin/${
      params.restaurantId ? params.restaurantId : null
    }/booking/modification/${params.Id ? params.Id : null}`]: ["superadmin"],
    "/superadmin/login": ["superadmin"],
    [`/superadmin/menu/add/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["superadmin"],
    [`/restaurants/menu-item/modification/${
      params.restaurantId ? params.restaurantId : null
    }/${params.foodId ? params.foodId : null}`]: ["restaurants"],
    [`/restaurants/${
      params.restaurantId ? params.restaurantId : null
    }/menu/delete/${params.foodType ? params.foodType : null}/${
      params.foodName ? params.foodName : null
    }`]: ["restaurants"],
    [`/superadmin/menu/modification/${
      params.restaurantId ? params.restaurantId : null
    }/${params.foodId ? params.foodId : null}`]: ["superadmin"],
    [`/restaurants/${params.restaurantId ? params.restaurantId : null}`]: [
      "restaurants",
    ],
    [`/restaurants/modification/main-details/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["restaurants"],
    [`/restaurants/modification/menu/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["restaurants"],
    [`/restaurants/menu/add/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["restaurants"],
    [`/restaurants/dashboard/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["restaurants"],
    [`/restaurants/${
      params.restaurantId ? params.restaurantId : null
    }/bookings/listing`]: ["restaurants"],
    [`/restaurants/${
      params.restaurantId ? params.restaurantId : null
    }/booking/${params.Id ? params.Id : null}`]: ["restaurants"],
    ///restaurants/:restaurantId/booking/delete/:Id
    [`/restaurants/${
      params.restaurantId ? params.restaurantId : null
    }/booking/delete/${params.Id ? params.Id : null}`]: ["restaurants"],
    [`/users/dashboard/${params.userId ? params.userId : null}`]: ["users"],
    [`/users/${params.userId ? params.userId : null}/reservations`]: ["users"],
    [`/users/modification/main-details/${params.guestId ? params.guestId : null}`]: ["users"],
    [`/users/${params.userId ? params.userId : null}/bookingconfirm`]: ["users"],
    [`/users/${params.userId ? params.userId : null}/booking-modification/${params.bookingId ? params.bookingId : null}/${params.restaurantId ? params.restaurantId : null}`]: ["users"],
    [`/users/${params.userId ? params.userId : null}/booking/delete/${params.Id ? params.Id : null}/${
      params.restaurantId ? params.restaurantId : null
    }`]: ["users"],
  };

  return (
    <>
      {loginContext.userData &&
        hasPermissions(
          loginContext.userData.details.role,
          location.pathname,
          permissions,
          loginContext.userData.uuid,
          params
        ) &&
        props.children}
    </>
  );
}

function hasPermissions(role, route, permissions, uuid, params) {
  let rdy = false;
  if (Object.keys(params).length != 0) {
    Object.keys(params).find((param) => {
      if (params[param] == uuid) {
        return (rdy = true);
      }
    });
  } else {
    rdy = true;
  }
  return (permissions[route].includes(role) && rdy) || role == "superadmin";
}
