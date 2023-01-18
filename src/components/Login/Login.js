import React, { useContext, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../AuthContext";
import { loginService } from "../../services/superadmin-auth-service";
import { useNavigate } from "react-router-dom";
import { logout } from "../../repositories/superadmi-auth-repositories";

import "./Login.css"
import { Link } from "react-router-dom"
import { BookingContext } from "../Restaurant/BookingContext.js";


function Login() {
  let navigate = useNavigate();
  // console.log("betolt");
  let [email, setEmail] = React.useState("");
  let [username, setUsername] = React.useState("");

  let context = useContext(AuthContext);
  let bookingContext = useContext(BookingContext)

  // date: "2022-07-14T9:00"
  // numberOfGuests: "1"
  // restaurantId: "6ea01dd1-07e4-427f-9be1-ef47f4a9b51f"

  useEffect(()=> {
    console.log(bookingContext.newReservation)
      if(bookingContext.newReservation != null && context.userData != null && context.userData.details.role != "superadmin" && context.userData.details.role != "restaurants"){
       return navigate(`/${context.userData.details.role}/${context.userData.uuid}/bookingconfirm`)
      } 
      if(context.userData != null){
        console.log(context.userData)
       if(context.userData.details.role != "superadmin"){
           navigate(`/${context.userData.details.role}/dashboard/${context.userData.uuid}`)
       } else {
        navigate(`/superadmin/restaurant/listing`)
       }
      }

  }, [context.userData])

  return (
    <div className="login-container">
      <div className="login-main-div">
        <h1>Log to Your Account</h1>
        <div className="login-div">
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => loginService(email, username)}>login</button>
          {/* <button onClick={() => logout().then(() => {
              console.log(context.userData);
              context.setUserData(null);
          })}>Logout</button> */}
        </div>
      </div>
      <div className="signup-div">
        <h1>New here?</h1>
        <p>Sign up and discover <br/> great amount of new opportunities</p>
        <Link className="login-link" to="/guest/registration">Sign up as User</Link>
        <Link className="login-link" to="/restaurants/registration">Sign up as Restaurant</Link>
      </div>
    </div>
  );

}

export default Login;
