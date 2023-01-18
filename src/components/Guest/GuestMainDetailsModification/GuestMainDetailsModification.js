import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGuestDetails, guestModificationService } from "../../../services/guest-service.js";
import GuestInputDetails from "../../Guest/GuestInput/GuestInputDetails.js";
import { modifyUser } from "../../../services/guest-service.js";
import "./GuestMainDetailsModification.css"

function GuestMainDetailsModification() {
  const param = useParams();
  const id = param.guestId;
  const navigate = useNavigate();
  const [guest, setGuest] = React.useState({});
  const [newEmail, setNewEmail] = React.useState(null)
  const [newPassword, setNewPassword] = React.useState(null)

  useEffect(() => {
    getGuestDetails(id).then((data) => setGuest(data));
  }, []);

  return (
    <div className="guest-modification-container">
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
      {/* <GuestInputDetails
        details={{
          title: "Email:",
          func: [guest, setGuest],
          type: "text",
          value: "email",
        }}
      /> */}

      <GuestInputDetails
        details={{
          title: "Phone:",
          func: [guest, setGuest],
          type: "text",
          value: "phone",
        }}
      />
      <div className='guest-input-details-div'>
        <span>Email:</span>
        <input type="text" value={guest["email"] || ""}  onChange={(e) => {
          guestModificationService(e.target.value,"email", guest, setGuest);
                setNewEmail(e.target.value)
              }}/>
      </div>
      <div className='guest-input-details-div'>
        <span>Password:</span>
        <input type="password" value={guest["password"] || ""}  onChange={(e) => {
                guestModificationService(e.target.value,"password", guest, setGuest);
                setNewPassword(e.target.value)
              }}/>
      </div>
      <div>
      </div>
      {/* <GuestInputDetails
        details={{
          title: "Password:",
          func: [guest, setGuest],
          type: "text",
          value: "password",
        }} */}
      {/* /> */}
      <div className="guest-reserv-modif-btn-div">
        <button className="guest-main-details-modif-btn"
          onClick={() => {
            modifyUser(guest, id, newEmail, newPassword)
            .then(() => navigate(`/users/dashboard/${id}`));
            setNewEmail(null)
            setNewPassword(null)
          }}
        >
          Modify
        </button>
        <button className="guest-reserv-back-btn"onClick={() => navigate(`/users/dashboard/${id}`)}>
          Back
        </button>
      </div>
    </div>
  );
}

export default GuestMainDetailsModification;