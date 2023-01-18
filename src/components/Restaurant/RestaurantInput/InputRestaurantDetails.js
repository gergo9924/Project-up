import React from "react";
import { restaurantModificationService } from "../../../services/restaurant-service.js";
import "../../Superadmin/SuperadminRestaurantModification/SuperadminRestaurantModification.css";
import "./InputRestaurantDetails.css"

const InputRestaurantDetails = (props) => {
  return (
    <div>
      <div
        className={
          props.styleName == "super" ? "super-input-rest-details-mod" : null
        }
      >
        <form className='restaurant-input-details-div'>
          <span className='restaurant-details-span'>{props.details.title}</span>
          <input
            disabled={props.details.value == "e_mail" ? true : false}
            onChange={(e) => {
              restaurantModificationService(
                e.target.value,
                props.details.value,
                props.details.func[0],
                props.details.func[1]
              );
            }}
            type={props.details.type}
            value={props.details.func[0][props.details.value] || ""}
          />
        </form>
      </div>
    </div>
  );
};

export default InputRestaurantDetails;
