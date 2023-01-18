import React from "react";
import { changeGuestData, createUser } from "../../../services/guest-service";
import { useNavigate } from "react-router-dom";
import "./SuperadminRegistrationScreen.css"
import { v4 as uuidv4 } from "uuid";

function SuperadminGuestRegistration() {
  const [guestData, setGuestData] = React.useState({});
  const navigate = useNavigate();
  let id = uuidv4();

  return (
    <div className="user-registration-container">
      <h1>Guest Registration</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            changeGuestData("userName", e.target.value, guestData, setGuestData)
          }
        />
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            changeGuestData(
              "firstName",
              e.target.value,
              guestData,
              setGuestData
            )
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) =>
            changeGuestData("lastName", e.target.value, guestData, setGuestData)
          }
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) =>
            changeGuestData("email", e.target.value, guestData, setGuestData)
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            changeGuestData("password", e.target.value, guestData, setGuestData)
          }
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) =>
            changeGuestData("phone", e.target.value, guestData, setGuestData)
          }
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) =>
            changeGuestData("address", e.target.value, guestData, setGuestData)
          }
        />
      </div>

      <button
        onClick={() =>
          createUser(guestData, id, "superadmin").then(() =>
            navigate(`/superadmin/guest/listing`)
          )
        }
      >
        Create User
      </button>
    </div>
  );
}

export default SuperadminGuestRegistration;
