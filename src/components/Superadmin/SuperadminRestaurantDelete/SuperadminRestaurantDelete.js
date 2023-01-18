import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFunction } from "../../../services/restaurant-service";
import "./SuperadminRestaurantDelete.css"
function SuperadminRestaurantDelete() {
  let navigate = useNavigate();
  let param = useParams();
  let id = param.restaurantId;

  return (
    <div className="super-rest-del-modif-div">
      <h1 className="super-rest-del-delete-h1">Restaurant delete</h1>
      <h4>Are you sure you want to delete this restaurant?</h4>
      <div className="super-rest-del-btn-div">
      <button className="super-rest-del-update-btn"
        onClick={() => {
          deleteFunction(id);
          navigate("/superadmin/restaurant/listing");
        }}
      >
        Delete
      </button>
      <button  className="super-rest-delete-btn" onClick={() => navigate("/superadmin/restaurant/listing")}>
        Cancel
      </button>
    </div></div>
  );
}

export default SuperadminRestaurantDelete;
