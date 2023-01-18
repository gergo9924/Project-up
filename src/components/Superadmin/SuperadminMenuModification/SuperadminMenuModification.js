import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { foodUpdate } from "../../../services/menu-service.js";
import { delAllergen } from "../../../services/menu-service.js";
import { foodAdd } from "../../../services/menu-service.js";
import "./SuperadminMenuModification.css";
const SuperadminMenuModification = () => {
  const navigate = useNavigate();
  const param = useParams();
  const restourantIdVal = param.restaurantId;
  const foodIdVal = param.foodId;

  const [foodData, setFoodData] = React.useState({});
  const [oldFoodData, setOldFoodData] = React.useState("");
  const [foodName, setFoodName] = React.useState("");
  const [foodprice, setFoodPrice] = React.useState("");
  const [foodType, setFoodType] = React.useState("Breakfasts");
  const [allergens, setAllergens] = React.useState([]);

  const [allergen, setAllergen] = React.useState("");

  React.useEffect(() => {
    foodUpdate(restourantIdVal, foodIdVal).then((fullData) => {
      console.log(fullData);
      setFoodData({ ...fullData });
      setOldFoodData({ ...fullData });
      setFoodPrice(fullData.data["price"]);
      setFoodName(fullData["dataName"]);
      if (fullData.data["allergens"]) {
        setAllergens(fullData.data["allergens"]);
      } else {
        setAllergens([]);
      }
      setFoodType(fullData.nameOfFood);
    });
  }, []);

  let inputRef = React.useRef();

  return (
    <div className="super-menuitem-modification-container">
      <h1>Menu item modification</h1>
      <select
        className="super-menuitem-modification"
        name="type"
        value={foodType}
        disabled
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
          value={foodName}
        />
      </div>
      <div>
        <input
          onChange={(e) => setFoodPrice(e.target.value)}
          type="number"
          placeholder="Price"
          value={foodprice}
        />
      </div>
      <div>
        <input
          onChange={(e) => setAllergen(e.target.value)}
          type="text"
          placeholder="+ Allergen"
          value={allergen || ""}
        />
      </div>
      <div>
        <button className="super-menu-item-modif-btn"
          onClick={(e) => {
            let arr = [...allergens, allergen];
            setAllergen("");
            if (allergen == "") {
              return;
            } else {
              return setAllergens(arr);
            }
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
                <button className="super-menu-back-btn"
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
        <button
          className="super-menu-item-modif-btn"
          onClick={() => {
            let obj = {
              oldData: oldFoodData,
              restaurantId: restourantIdVal,
              foodType: foodType,
              foodName: foodName,
              foodprice: foodprice,
              allergens: allergens,
            };
            console.log(obj);
            foodAdd(obj);
            navigate(`/superadmin/restaurant/modification/${restourantIdVal}`);
          }}
        >
          Update Food
        </button>
      </div>
    </div>
  );
};

export default SuperadminMenuModification;
