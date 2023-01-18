import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./AccountDetailsScreen.css";

const AccountDetails = ({ user }) => {
  const navigate = useNavigate();

  let userDetails = Object.values(user)[0];
  let userId = Object.keys(user)[0];

  return (
    <div>
      <div id="maindetails-account-box">
        <div className="maindetails-div">
          <h2 className="superaccount">Account details</h2>

       
            <div>
              <span className="details-span">Firstname:</span>{" "}
              <span>{userDetails.firstName}</span>
            </div>
            <div>
              <span className="details-span">Lastname:</span>{" "}
              <span>{userDetails.lastName}</span>
            </div>
            <div>
              <span className="details-span">Username:</span>{" "}
              <span>{userDetails.userName}</span>
            </div>
            <div>
              <span className="details-span">Address:</span>
              <span>{userDetails.address}</span>
            </div>
            <div>
              <span className="details-span">Email:</span>
              <span>{userDetails.email}</span>
            </div>
            <div>
              <span className="details-span">Phone:</span>
              <span>{userDetails.phone}</span>
            </div>
          </div>
          <div className="del-modify-btns">
            <button
              className="super-guest-delete-btn"
              onClick={() => navigate(`/superadmin/guest/delete/${userId}`)}
            >
              Delete
            </button>
            <button
              className="super-dashboard-btn"
              onClick={() =>
                navigate(`/superadmin/guest/modification/${userId}`)
              }
            >
              Modify details
            </button>
          </div>
        </div>
      </div>
   
  );
};

export default AccountDetails;

{
  /* <div key={uuidv4()}>
<ul >
  <li>Username: {guests[user].userName}</li>
  <li>Firstname: {guests[user].firstName}</li>
  <li>Lastname: {guests[user].lastName}</li>
  <li>Address: {guests[user].address}</li>
  <li>Email: {guests[user].email}</li>
  <li>Phone: {guests[user].phone}</li>

 
</ul>
  <button onClick={() =>  navigate(`/superadmin/guest/modification/${user}`)}> Modify </button>
                  <button onClick={() => navigate(`/superadmin/guest/delete/${user}`)}>Delete</button>
  </div> */
}
