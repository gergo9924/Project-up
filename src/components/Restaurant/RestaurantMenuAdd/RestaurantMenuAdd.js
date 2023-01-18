import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { menuAdd } from "../../../services/menu-service.js";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const RestaurantMenuAdd = () => {
  const navigate = useNavigate();
  const param = useParams();
  const restourantIdVal = param.restaurantId;

  let inputRef = React.useRef();
  const [foodName, setFoodName] = useState("");
  const [foodprice, setFoodPrice] = useState("");
  const [foodType, setFoodType] = useState("Breakfasts");
  const [allergens, setAllergens] = useState([]);
  const [allergen, setAllergen] = useState("");
  let foodId = uuidv4();
  return (
    <div className="restaurant-modification-container">

    
    <div id="maindetails">
      <h3>Menu</h3>
      <select name="type" onChange={(e) => setFoodType(e.target.value)}>
        <option value="Breakfasts">Breakfasts</option>
        <option value="Appetizers">Appetizers</option>
        <option value="Soups">Soups</option>
        <option value="Main dishes">Main dishes</option>
        <option value="Pizzas">Pizzas</option>
        <option value="Sides">Sides</option>
        <option value="Desserts">Desserts</option>
        <option value="Drinks">Drinks</option>
        <option value="Alcohols">Alcohols</option>
      </select>
      <div>
        <input
          onChange={(e) => setFoodName(e.target.value)}
          type="text"
          placeholder="Name"
        />
      </div>
      <div>
        <input
          onChange={(e) => setFoodPrice(e.target.value)}
          type="number"
          placeholder="Price"
        />
      </div>
      <div>
        <input
          onChange={(e) => setAllergen(e.target.value)}
          type="text"
          placeholder="Allergens"
          value={allergen || ""}
        />

        <button className="restaurant-main-details-modification-btn"
          onClick={(e) => {
            let arr = [...allergens, allergen];
            setAllergen("");
            return setAllergens(arr);
          }}
        >
          Add allergen
        </button>
        <div>
          {allergens.map((item) => {
            return <p key={uuidv4()}>{item}</p>;
          })}
        </div>
      </div>
      <div>
        <label htmlFor="foodPicture">Choose a food picture</label>
        <input
          type="file"
          name="foodPicture"
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
      </div>

      <button className="restaurant-main-details-modification-btn"
        onClick={() => {
          if(allergen == ""){
            setAllergens([])
          }
          menuAdd(
            restourantIdVal,
            foodName,
            foodType,
            foodprice,
            allergens,
            foodId
          );
          return navigate(`/restaurants/dashboard/${restourantIdVal}`);
        }}
      >
        Add item
      </button>
    </div>
    </div>
  );
};

export default RestaurantMenuAdd;
