import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMenuItem } from "../../../services/restaurant-service";

function RestaurantMenuItemDelete() {
  let navigate = useNavigate();
  let param = useParams();
  let id = param.restaurantId;
  let foodType = param.foodType;
  let foodName = param.foodName;

  return (
    <div>
      <div>
        <button className="restaurant-main-details-modification-btn"
          onClick={() =>
            deleteMenuItem(id, foodType, foodName).then(
              navigate(`/restaurants/dashboard/${id}`)
            )
          }
        >
          Confirm
        </button>
        <button className="restaurant-main-details-modification-btn"
         onClick={() => navigate(`/restaurants/dashboard/${id}`)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RestaurantMenuItemDelete;
