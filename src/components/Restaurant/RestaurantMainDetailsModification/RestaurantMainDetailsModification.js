import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  modifyRestaurantDetails,
  restaurantModificationService,
  selectedRestaurantDetails,
} from "../../../services/restaurant-service";
import InputRestaurantDetails from "../RestaurantInput/InputRestaurantDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import "./RestaurantMainDetailsModification.css"

function RestaurantMainDetailsModification() {
  let navigate = useNavigate();
  const inputRef = useRef();
  let params = useParams();
  let restourantIdVal = params.restaurantId;
  const [restaurantDetails, setRestaurantDetails] = React.useState([]);
  // console.log(restaurantDetails);
  const [newEmail, setNewEmail] = React.useState(null)
  const [newPassword, setNewPassword] = React.useState(null)


  useEffect(() => {
    return selectedRestaurantDetails(restourantIdVal, setRestaurantDetails);
  }, []);

  return (
    <div className="guest-modification-container">
          <h1>Restaurant modification</h1>
          <InputRestaurantDetails
            details={{
              title: "Restaurant Name:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "restaurantName",
            }}
          />
          <InputRestaurantDetails
            details={{
              title: "Address:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "address",
            }}
          />
          <InputRestaurantDetails
            details={{
              title: "Tax ID:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "taxId",
            }}
          />
          <InputRestaurantDetails
            details={{
              title: "Owner name:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "ownerName",
            }}
          />
          <InputRestaurantDetails
            details={{
              title: "Restaurant phone number:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "phoneNumber",
            }}
          />
          <InputRestaurantDetails
            details={{
              title: "Webpage URL:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "webpageURL",
            }}
          />
          <InputRestaurantDetails
            details={{
              title: "Restaurant capacity:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "capacity",
            }}
          />
          <form className='restaurant-input-details-div'>
            <span>Email:</span>
            <input type="text" value={restaurantDetails["e_mail"] || ""} onChange={(e) => {
              restaurantModificationService(e.target.value, "e_mail", restaurantDetails, setRestaurantDetails);
              setNewEmail(e.target.value)
            }} />
          </form>
          <form className='restaurant-input-details-div'>
            <span>Password:</span>
            <input type="password" value={restaurantDetails["password"] || ""} onChange={(e) => {
              restaurantModificationService(e.target.value, "password", restaurantDetails, setRestaurantDetails);
              setNewPassword(e.target.value)
            }} />
          </form>
          <InputRestaurantDetails
            details={{
              title: "Restaurant Discripton:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "discription",
            }}
          />
          <div className="img-input-div">
            <input id="file" className="img-input" type="file" ref={inputRef} />
            <label className="image-upload-label" htmlFor="file">
              <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faImage} />{" "}
              Choose Restaurant Photo
            </label>
          </div>
          <div className="guest-reserv-modif-btn-div">
            <button className="guest-reserv-update-btn"
              onClick={() => {
                modifyRestaurantDetails(restourantIdVal, restaurantDetails, inputRef.current.files[0], newEmail, newPassword)
                  .then(() => {
                    navigate(`/restaurants/dashboard/${restourantIdVal}`);
                    setNewEmail(null)
                    setNewPassword(null)
                  })
              }}
            >
              Change main details{" "}
            </button>
            <button className="guest-reserv-back-btn"onClick={() => navigate(`/restaurants/dashboard/${restourantIdVal}`)}>
              Back
            </button>
          </div>
    </div>
  );
}

export default RestaurantMainDetailsModification;
