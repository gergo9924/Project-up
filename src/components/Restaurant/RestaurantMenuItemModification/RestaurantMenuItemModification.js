import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { foodUpdate } from "../../../services/menu-service.js";
import { delAllergen } from "../../../services/menu-service.js";
import { foodAdd } from "../../../services/menu-service.js";
import "./RestaurantsMenuItemModification.css"

const RestaurantMenuItemModification = () => {
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
     if (fullData.data["allergens"]){setAllergens(fullData.data["allergens"])} else  {setAllergens([])};
      // setAllergens(fullData.data["allergens"]);
      setFoodType(fullData.nameOfFood);
    });
  }, []);

  let inputRef = React.useRef();

  return (
    <div className="menu-item-container">
      <div className="menu-item-details">
        <h1>Menu</h1>
        <h3>{foodType}</h3>
        <input
          onChange={(e) => setFoodName(e.target.value)}
          type="text"
          placeholder="Name"
          value={foodName}
  
        />
        <input
          onChange={(e) => setFoodPrice(e.target.value)}
          type="number"
          placeholder="Price"
          value={foodprice}
        />
        <input
          onChange={(e) => setAllergen(e.target.value)}
          type="text"
          placeholder="+ Allergen"
          value={allergen}
        />
        <button className="restaurant-menu-item-modification-btn"
          onClick={() => {
    
          //  if(allergens == undefined){
          //   setAllergens([])
          //  }
          //  console.log(allergens)
          
          if(allergen == ""){
            let arr = [...allergens]                   
            setAllergens(arr);
            setAllergen("")
          } else {
            let arr = [...allergens, allergen];
            setAllergens(arr);
            setAllergen("")
          }
          }}
        >
          Add allergen
        </button>
        <div>
          {allergens &&
            allergens.map((item) => {
              if(item == ""){
                return
              }
              return (
                <div key={uuidv4()} className="allergen-div">
                  <p>{item}</p>
                  <button className="del-allergen-btn"
                    onClick={() => setAllergens(delAllergen(item, allergens))}
                  >
                    Delete allergen
                  </button>
                </div>
              );
            })}
        </div>

        <hr />
        <button className="restaurant-main-details-modification-btn"
          onClick={() => {
            console.log(allergens)
          
            if(allergens.length > 0) {
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
              navigate(`/restaurants/modification/menu/${restourantIdVal}`)
            }
            else {
              let obj = {
                oldData: oldFoodData,
                restaurantId: restourantIdVal,
                foodType: foodType,
                foodName: foodName,
                foodprice: foodprice,
                allergens: "",
              };
              console.log(obj);
              foodAdd(obj);
              navigate(`/restaurants/modification/menu/${restourantIdVal}`)
            }
          }}
        >
          Update Food
        </button>
        <button className="guest-reserv-back-btn" onClick={() => navigate(`/restaurants/modification/menu/${restourantIdVal}`)}>
              Back
        </button>

        {}
      </div>
    </div>
  );
};

export default RestaurantMenuItemModification;
