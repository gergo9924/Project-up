import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  modifyRestaurantDetails,
  selectedRestaurantDetails,
} from "../../../services/restaurant-service";
import MenuList from "../../Menu/MenuList.js";
import InputRestaurantDetails from "../../Restaurant/RestaurantInput/InputRestaurantDetails.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./SuperadminRestaurantModification.css";
import TextAreaDetails from "../../Restaurant/RestaurantInput/TextAreaDetails.js";

const SuperadminRestaurantModification = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const param = useParams();
  const restourantIdVal = param.restaurantId;

  const [restaurantDetails, setRestaurantDetails] = React.useState([]);
  const [foodTypeVal, setFoodTypeVal] = React.useState("Menu");
  const [selectedFood, setSelectedFood] = React.useState("Food");

  useEffect(() => {
    selectedRestaurantDetails(restourantIdVal, setRestaurantDetails);
  }, []);

  let restaurant;

  return (
    <div style={{ display: "flex" }}>
      <div className="super-restaurant-mod-container">
        <h1>Restaurant modification</h1>

        {/* <h2>Restaurant id/name: {restourantIdVal}</h2> */}

        <div>
          <InputRestaurantDetails
            details={{
              title: "Restaurant Name:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "restaurantName",
            }}
            styleName={"super"}
          />

          <InputRestaurantDetails
            details={{
              title: "Address:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "address",
            }}
            styleName={"super"}
          />

          <InputRestaurantDetails
            details={{
              title: "Tax ID:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "taxId",
            }}
            styleName={"super"}
          />
          <InputRestaurantDetails
            details={{
              title: "Owner name:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "ownerName",
            }}
            styleName={"super"}
          />
          <InputRestaurantDetails
            details={{
              title: "Restaurant phone number:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "phoneNumber",
            }}
            styleName={"super"}
          />
          <InputRestaurantDetails
            details={{
              title: "Webpage URL:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "webpageURL",
            }}
            styleName={"super"}
          />
          <InputRestaurantDetails
            details={{
              title: "Restaurant capacity:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "number",
              value: "capacity",
            }}
            styleName={"super"}
          />

          <InputRestaurantDetails
            details={{
              title: "Restaurant email:",
              func: [restaurantDetails, setRestaurantDetails],
              type: "text",
              value: "e_mail",
            }}
            styleName={"super"}
          />
          <div>
            <TextAreaDetails
              details={{
                title: "Restaurant Discripton:",
                func: [restaurantDetails, setRestaurantDetails],
                value: "discription",
              }}
              maxWidth={"500px"}
              styleName={"super"}
            />
          </div>
          <div>
            <input id="file" className="img-input" type="file" ref={inputRef} />
            <label className="super-rest-modify-btn " htmlFor="file">
              <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faImage} />
              Choose New Restaurant Photo
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              className="back-btn-super-modify"
              onClick={() => navigate(`/superadmin/restaurant/listing`)}
            >
              Back
            </button>
            <button
              className="change-btn-super"
              onClick={() => {
                modifyRestaurantDetails(
                  restourantIdVal,
                  restaurantDetails,
                  inputRef.current.files[0]
                ).then(() => navigate(`/superadmin/restaurant/listing`));
              }}
            >
              Change main details
            </button>
          </div>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <div>
          <h1 className="super-menu-modification">Menu modification</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="change-btn-super"
              onClick={() =>
                navigate(`/superadmin/menu/add/${restourantIdVal}`)
              }
            >
              Add New Food
            </button>
          </div>

          <div className="super-menu-div" key={uuidv4()}>
            {restaurantDetails.length != 0 &&
            restaurantDetails.menu != undefined
              ? Object.keys(restaurantDetails.menu).map((item) => {
                  return (
                    <div style={{ textAlign: "center" }} key={uuidv4()}>
                      <h2
                        style={{
                          textDecoration: "underline",
                          paddingBottom: "0px",
                          marginBottom: "4px",
                           
                        }}
                      >
                        {item}
                      </h2>

                      <div className="menu-items">
                        {Object.keys(restaurantDetails["menu"][item]).map(
                          (foodName) => (
                            <div key={uuidv4()}>
                              <MenuList
                                superStyle={{
                                  margin: "5px",
                                  marginTop: "5px",
                                  paddingLeft: 0,
                                }}
                                superStyleLi={{
                                  listStyleType: "none",
                                  textAlign: "center"
                                }}
                                superStyleLiMenu={{
                                  color: "#da3743",
                                  marginBottom: "5px",
                                  marginTop: "25px",
                                  
                                }}
                                key={uuidv4()}
                                foodName={foodName}
                                foodDetails={
                                  restaurantDetails["menu"][item][foodName]
                                }
                                foodType={item}
                                restaurantId={restourantIdVal}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
  // function addMenuList(e) {
  //   console.log(e.target.value);
  //   setFoodTypeVal(e.target.value);
  // }

  // function addFoodType(e) {
  //   console.log(e.target.value);
  //   setSelectedFood(e.target.value);
  // }

  // function foodDetails(food) {
  //   let foodDetailsSum = restaurant.menu[foodTypeVal][food];

  //   return Object.keys(foodDetailsSum).map((item) => {
  //     return (
  //       <div key={uuidv4()}>
  //         <div>{item} :</div>
  //         <input
  //           onChange={(e) => {}}
  //           type="text"
  //           value={foodDetailsSum[item]}
  //         />
  //       </div>
  //     );
  //   });
  // }

  // function selectedMenuList(foodOne) {
  //   let food = restaurant.menu[foodOne];

  //   return (
  //     <div>
  //       <select
  //         onChange={(e) => {
  //           return addFoodType(e);
  //         }}
  //       >
  //         <option>{selectedFood}</option>

  //         {Object.keys(food).map((menuName) => {
  //           return <option key={uuidv4()}>{menuName}</option>;
  //         })}
  //       </select>{" "}
  //       <button>Add new food type </button>
  //       <button>Delete food type </button>
  //       <hr />
  //       {selectedFood == "Food" ? null : <div>{foodDetails(selectedFood)}</div>}
  //     </div>
  //   );
  // }
};

export default SuperadminRestaurantModification;
