import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getGuestDetails } from "../../../services/guest-service.js";

import GuestInputDetails from "../../Guest/GuestInput/GuestInputDetails.js";
import { modifyUser } from "../../../services/guest-service.js";
import "./SuperadminGuestModification.css"

function SuperadminGuestModification() {
  const param = useParams();
  const id = param.guestId;
  const navigate = useNavigate();
  const [guest, setGuest] = React.useState({});

  useEffect(() => {
    getGuestDetails(id).then((data) => setGuest(data));
  }, []);

  return (
    <div className="super-guest-modification-container">
         <h1>Account details</h1>
      <GuestInputDetails
        details={{
          title: "Username:",
          func: [guest, setGuest],
          type: "text",
          value: "userName",
        }}
      />
      <GuestInputDetails
        details={{
          title: "Firstname:",
          func: [guest, setGuest],
          type: "text",
          value: "firstName",
        }}
      />
      <GuestInputDetails
        details={{
          title: "Lastname:",
          func: [guest, setGuest],
          type: "text",
          value: "lastName",
        }}
      />

      <GuestInputDetails
        details={{
          title: "Address:",
          func: [guest, setGuest],
          type: "text",
          value: "address",
        }}
      />
      <GuestInputDetails
      
        details={{
          title: "Email:",
          func: [guest, setGuest],
          type: "text",
          value: "email",
        }}
        isDisabled={true}
      />

      <GuestInputDetails
        details={{
          title: "Phone:",
          func: [guest, setGuest],
          type: "text",
          value: "phone",
        }}
      />
      {/* <GuestInputDetails
        details={{
          title: "Password:",
          func: [guest, setGuest],
          type: "text",
          value: "password",
        }}
      /> */}
      <div className="super-guest-reserv-modif-btn-div">
      <button className="super-guest-main-details-modif-btn"
        onClick={() => {
          modifyUser(guest, id)
          .then(() => navigate("/superadmin/guest/listing"));
        }}
      >
        Modify
      </button>
      <button className="super-guest-reserv-back-btn" onClick={() => navigate("/superadmin/guest/listing")}>
          Back
        </button>
    </div>
    </div>
  );
}

export default SuperadminGuestModification;
