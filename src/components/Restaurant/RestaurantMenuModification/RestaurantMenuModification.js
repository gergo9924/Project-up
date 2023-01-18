import React, { useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
// import { data } from "./db.js";
import { v4 as uuidv4 } from "uuid";
import { loadRestaurantDetails } from "../../../repositories/restaurant-repositories";
import {
  modifyRestaurantDetails,
  selectedRestaurantDetails,
} from "../../../services/restaurant-service";
import Menu from "../../Menu/Menu.js";
import InputRestaurantDetails from "../../Restaurant/RestaurantInput/InputRestaurantDetails.js";
import RestaurantMenuTabs from "../RestaurantAmindDashboard/RestaurantMenuTabs";
import "./RestaurantMenuModification.css"

const RestaurantMenuModification = () => {
  const inputRef = useRef();

  const navigate = useNavigate();
  const param = useParams();
  const restourantIdVal = param.restaurantId;
  const [restaurant, setRestaurant] = React.useState(null);
  const [foodTypeVal, setFoodTypeVal] = React.useState("Menu");
  const [selectedFood, setSelectedFood] = React.useState("Food");

  React.useEffect(() => {
    loadRestaurantDetails(restourantIdVal, setRestaurant);
  }, []);

  console.log(restaurant)

  return (
    restaurant &&
      <div className="menu-details-container">
        <div className="menudetails">
          <h1>Menu</h1>
          <div>
            <button className="restaurant-new-food-btn" onClick={() => navigate(`/restaurants/menu/add/${restourantIdVal}`)}>
              New Food
            </button>
          </div>
          <div className="">
              <RestaurantMenuTabs restaurant={restaurant} restaurantModif={true} restId={restourantIdVal}/>
          </div>
          <button className="guest-reserv-back-btn" onClick={() => navigate(`/restaurants/dashboard/${restourantIdVal}`)}>
              Back
          </button>
        </div>
      </div>
  );
  function addMenuList(e) {
    console.log(e.target.value);
    setFoodTypeVal(e.target.value);
  }

  function addFoodType(e) {
    console.log(e.target.value);
    setSelectedFood(e.target.value);
  }

  function foodDetails(food) {
    let foodDetailsSum = restaurant.menu[foodTypeVal][food];

    return Object.keys(foodDetailsSum).map((item) => {
      return (
        <div key={uuidv4()}>
          <div>{item} :</div>
          <input
            onChange={(e) => {}}
            type="text"
            value={foodDetailsSum[item]}
          />
        </div>
      );
    });
  }

  function selectedMenuList(foodOne) {
    let food = restaurant.menu[foodOne];

    return (
      <div>
        <select
          onChange={(e) => {
            return addFoodType(e);
          }}
        >
          <option>{selectedFood}</option>

          {Object.keys(food).map((menuName) => {
            return <option key={uuidv4()}>{menuName}</option>;
          })}
        </select>{" "}
        <button>Add new food type </button>
        <button>Delete food type </button>
        <hr />
        {selectedFood == "Food" ? null : <div>{foodDetails(selectedFood)}</div>}
      </div>
    );
  }
};

export default RestaurantMenuModification;
