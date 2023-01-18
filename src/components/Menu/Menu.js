import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./Menu.css"

const Menu = (props) => {
  console.log(props)
  const navigate = useNavigate();
  // console.log(props.foodDetails)
  // console.log(props.foodName)
  //  Object.keys(props.foodDetails)
console.log(props.foodDetails)
  return (
    <div>
      <h3>{props.foodName}</h3>
      <div>
        {Object.keys(props.foodDetails).map((itemKey) => {
       
          if (itemKey == "uuid") {
            return;
          }
          if(itemKey == "allergens" && props.foodDetails[itemKey].length > 0){
          
            return (
                  <div key={uuidv4()}>
                    <span>{itemKey}: </span>
                    <ul>
                       <span>{props.foodDetails[itemKey].map(all => <li>{all}</li>)}</span>
                    </ul>
                   
                  </div>
                );
          }

   
          return (
            <div key={uuidv4()}>
              <span>{itemKey}: </span>
              <span>{props.foodDetails[itemKey]}</span>
            </div>
          );
        })}
        <button className="menu-modify-btn"
          onClick={() =>
            navigate(
              `/restaurants/menu-item/modification/${props.restaurantId}/${props.foodDetails.uuid}`
            )
          }
        >
      
          Modify
        </button>
        <button className="menu-delete-btn"
          onClick={() =>
            navigate(
              `/restaurants/${props.restaurantId}/menu/delete/${props.foodType}/${props.foodName}`
            )
          }
        >
      
          Delete
        </button>
      </div>
    </div>
  );
};

export default Menu;
