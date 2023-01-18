import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { delAllergen, menuAdd } from "../../../services/menu-service.js";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const SuperadminMenuAdd = () => {
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
    <div className="super-menuitem-modification-container">
      <h1>Adding new food</h1>
      <select
        className="super-menuitem-modification"
        name="type"
        onChange={(e) => setFoodType(e.target.value)}
      >
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
          placeholder="+Allergens"
          value={allergen || ""}
        />
        <div>
          </div>
          <button
            className="super-menu-item-modif-btn"
            onClick={(e) => {
              let arr = [...allergens, allergen];
              setAllergen("");
              return setAllergens(arr);
            }}
          >
            Add allergen
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          {allergens &&
            allergens.map((item) => {
              return (
                <div className="allergen-del-btn-flex" key={uuidv4()}>
                  <p>{item}</p>
                  <button
                    className="super-menu-back-btn"
                    onClick={() => setAllergens(delAllergen(item, allergens))}
                  >
                    DEL allergen
                  </button>
                </div>
              );
            })}
        </div>
        <div className="super-btn-back-accepted">
        <button
          className="super-menu-back-btn"
          onClick={() =>
            navigate(`/superadmin/restaurant/modification/${restourantIdVal}`)
          }
        >
          Back
        </button>

      <button  className="super-menu-item-modif-btn"
        onClick={() => {
          menuAdd(
            restourantIdVal,
            foodName,
            foodType,
            foodprice,
            allergens,
            foodId
          );
          return navigate(
            `/superadmin/restaurant/modification/${restourantIdVal}`
          );
        }}
      >
        Add item
      </button>
    </div>
    </div>
  );
};

export default SuperadminMenuAdd;
