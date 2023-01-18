import { getAuth, signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../../config.js";
import { AuthContext } from "../AuthContext.js";

const Header = () => {
  const navigate = useNavigate();
  let context = useContext(AuthContext);
  return (
    <div>
      <select onChange={(e) => navigate(`/${e.target.value}`)}>
        <option>LINKEK</option>
        <option>superadmin/restaurant/registration</option>
        <option>superadmin/guest/registration</option>
        <option>restaurants/registration</option>
        <option>guest/registration</option>
        <option>superadmin/restaurant/listing</option>
        <option>superadmin/guest/listing</option>
        <option>superadmin/bookings/listing</option>
        <option>superadmin/booking</option>
        <option>superadmin/login</option>
        <option>login</option>
      </select>

      {context.userData != null ? (
        <button onClick={() => logout()}>Logout</button>
      ) : null}
    </div>
  );

  function logout() {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        console.log(context.userData);
        context.setUserData(null);
      })
      .catch((error) => {
        // An error happened.
      });
  }
};

export default Header;
