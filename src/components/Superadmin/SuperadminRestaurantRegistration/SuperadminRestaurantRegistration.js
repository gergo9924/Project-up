import React from "react";
import { useNavigate } from "react-router-dom";
import {
  createRestaurant,
  changeRestaurantData,
} from "../../../services/restaurant-service";
import "./SuperadminRestaurantRegistrationScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

function SuperadminRestaurantRegistration() {
  // const inputRef = React.useRef();
  const navigate = useNavigate();

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

  const [restaurantData, setRestaurantData] = React.useState(restaurant);
  const inputRef = React.useRef();
  let id = uuidv4();
  return (
    <div className="restaurant-registration-container">
      <h1>Restaurant Registration</h1>
      <p>Please enter the basic details of the new restaurant!</p>
      <input
        onChange={(e) =>
          changeRestaurantData(
            "ownerName",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="text"
        placeholder="Restaurant Owner"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "restaurantName",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="text"
        placeholder="Restaurant Name"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "e_mail",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="text"
        placeholder="E-mail"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "password",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="password"
        placeholder="Password"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "taxId",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="Text"
        placeholder="Tax ID"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "address",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="text"
        placeholder="Address"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "phoneNumber",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="text"
        placeholder="Restaurant Phone Number"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "webpageURL",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="text"
        placeholder="Webpage URL"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "restaurantType",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="text"
        placeholder="Restaurant Type"
      />
      <input
        onChange={(e) =>
          changeRestaurantData(
            "capacity",
            e.target.value,
            restaurantData,
            setRestaurantData
          )
        }
        type="number"
        placeholder="Restaurant Capacity"
      />
      <h3>Restaurant Discripton:</h3>
      <input
        style={{ height: "100px" }}
        onChange={(e) =>
          changeRestaurantData(
            "discription",
            e.target.value,
            restaurantData,
            setRestaurantData
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
          createRestaurant(restaurantData, id, inputRef.current.files[0], "superadmin").then(
            (data) => navigate(`/superadmin/restaurant/listing`)
          )
        }
      >
        Create Account
      </button>
    </div>
  );
}

export default SuperadminRestaurantRegistration;
