import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext.js";
import {
  deleteMenuItem,
  deleteMenuItemByAdmin,
} from "../../services/restaurant-service.js";
import "./Menu.css";

const MenuList = (props) => {
  const navigate = useNavigate();
  let context = useContext(AuthContext);

  return (
    <div key={uuidv4()}>
      <h3
        style={
          props.superStyleLiMenu
            ? props.superStyleLiMenu
            : { display: "inline" }
        }
      >
        {props.foodName}
      </h3>
      <div>
        {Object.keys(props.foodDetails).map((itemKey) => {
          if (itemKey == "uuid" || itemKey == "imgUrl") {
            return;
          }
          if (itemKey == "allergens" && props.foodDetails[itemKey]) {
            return (
              <div key={uuidv4()}>
                <span>{itemKey}:</span>
                <ul style={props.superStyle ? props.superStyle : null}>
                  {props.foodDetails[itemKey].map((all) => (
                    <li
                      style={props.superStyleLi ? props.superStyleLi : null}
                      key={uuidv4()}
                    >
                      {all}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return (
            <div style={{ fontWeight: "bold" }} key={uuidv4()}>
              <span>{itemKey}: </span>
              <span>{props.foodDetails[itemKey]}</span>
            </div>
          );
        })}

        {context.userData != null ? (
          //! Ha a restaurants usernek lesz menu modification oldala, akkor be kell tenni a kikommentelt részt:

          context.userData.details.role == "superadmin" ||
          context.userData.details.role == "restaurants" ? (
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() =>
                  deleteMenuItemByAdmin(
                    props.restaurantId,
                    props.foodType,
                    props.foodName
                  ).then(
                    navigate(
                      `/superadmin/restaurant/modification/${props.restaurantId}`
                    )
                  )
                }
              >
                Delete
              </button>
              <button
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  if (context.userData.details.role == "superadmin") {
                    return navigate(
                      `/superadmin/menu/modification/${props.restaurantId}/${props.foodDetails.uuid}`
                    );
                  } else {
                    return navigate(
                      `/restaurants/menu-item/modification/${props.restaurantId}/${props.foodDetails.uuid}`
                    );
                  }
                }}
              >
                Modify
              </button>
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default MenuList;
