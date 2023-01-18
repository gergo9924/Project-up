import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeGuestData, createUser } from "../../../services/guest-service";
import { v4 as uuidv4 } from "uuid";
import "./GuestRegistrationScreen.css";

function GuestRegistrationScreen() {
  const [guestData, setGuestData] = useState({});
  console.log(guestData);
  let id = uuidv4();

  // React.useEffect(()=> {

  // }, [guestData])

  const navigate = useNavigate();
  return (
    <div className="user-registration-container">
      <h1>Sign up as User</h1>
      <p>Please enter your details to sign up!</p>
      <input
        onChange={(e) =>
          changeGuestData("userName", e.target.value, guestData, setGuestData)
        }
        placeholder="Username"
        type="text"
      ></input>
      <input
        onChange={(e) =>
          changeGuestData("firstName", e.target.value, guestData, setGuestData)
        }
        placeholder="First Name"
        type="text"
      ></input>
      <input
        onChange={(e) =>
          changeGuestData("lastName", e.target.value, guestData, setGuestData)
        }
        placeholder="Last Name"
        type="text"
      ></input>
      <input
        onChange={(e) =>
          changeGuestData("email", e.target.value, guestData, setGuestData)
        }
        placeholder="Email"
        type="text"
      ></input>
      <input
        onChange={(e) =>
          changeGuestData("password", e.target.value, guestData, setGuestData)
        }
        placeholder="Password"
        type="password"
        minLength="6"
      ></input>
      <input
        onChange={(e) =>
          changeGuestData("phone", e.target.value, guestData, setGuestData)
        }
        placeholder="Phone"
        type="text"
      ></input>
      <input
        onChange={(e) =>
          changeGuestData("address", e.target.value, guestData, setGuestData)
        }
        placeholder="Address"
        type="text"
      ></input>
      <button
        onClick={() =>
          createUser(guestData, id).then((data) =>
            data
              ? navigate(`/users/dashboard/${id}`)
              : navigate(`/guest/registration/`)
          )
        }
      >
        Create User
      </button>
    </div>
  );
}

export default GuestRegistrationScreen;
