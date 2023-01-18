import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  changeRestaurantData,
  createRestaurant,
} from "../../../services/restaurant-service";
import { v4 as uuidv4 } from "uuid";
import "./RestaurantRegistrationScreen.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
//import { AuthContext } from "../../AuthContext";
//const context = useContext(AuthContext);
function RestaurantRegistrationScreen() {
  let restaurant = {
    ownerName: "",
    restaurantName: "",
    password: "",
    e_mail: "",
    address: "",
    fireBaseAutToken: "",
    menu: "",
    taxId: "",
    phoneNumber: "",
    webpageURL: "",
    restaurantType: [],
    capacity: 0,
    reservations: "", //firebase miatt üres string, amúgy egy tömb
    // restaurantBackGroundImg: inputRef
  };
  const [restaurantDetails, setRestaurantDetails] = useState(restaurant);
  const inputRef = React.useRef();
  let navigate = useNavigate();

  let id = uuidv4();
  return (
    <div className="restaurant-registration-container">
      <h1>Sign up as Restaurant</h1>
      <p>Please enter the basic details of your restaurant!</p>
      <input
        placeholder="Restaurant Owner"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "ownerName",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Restaurant Name"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "restaurantName",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="E-mail"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "e_mail",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Password (atleast 6 characters)"
        type="password"
        minLength="6"
        onChange={(e) =>
          changeRestaurantData(
            "password",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Tax ID"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "taxId",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Address"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "address",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Restaurant Phone Number"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "phoneNumber",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Webpage URL"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "webpageURL",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Restaurant Type"
        type="text"
        onChange={(e) =>
          changeRestaurantData(
            "restaurantType",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <input
        placeholder="Restaurant Capacity"
        type="number"
        onChange={(e) =>
          changeRestaurantData(
            "capacity",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
      />
      <h3>Restaurant Discripton:</h3>
      <input
        style={{ height: "100px" }}
        onChange={(e) =>
          changeRestaurantData(
            "discription",
            e.target.value,
            restaurantDetails,
            setRestaurantDetails
          )
        }
        type="text"
        placeholder="Please enter some details about your restaurant.."
      />
      <div>
        <input id="file" className="img-input" type="file" ref={inputRef} />
        <label className="image-upload-label" htmlFor="file">
          <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faImage} />{" "}
          Choose Restaurant Photo
        </label>
      </div>{" "}
      <button
        onClick={() =>
          createRestaurant(
            restaurantDetails,
            id,
            inputRef.current.files[0]
          ).then((data) =>
            data
              ? navigate(`/restaurants/dashboard/${id}`)
              : navigate("/restaurants/registration")
          )
        }
      >
        Create Account
      </button>
    </div>
  );
}

export default RestaurantRegistrationScreen;
