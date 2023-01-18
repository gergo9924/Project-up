import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  selectedRestaurantDetails,
  transmitRestaurant,
} from "../../../services/restaurant-service";

function RestaurantDetails() {
  let param = useParams();
  // console.log(param);
  let id = param.restaurantId;

  // console.log(id);
  const [restaurant, setRestaurant] = useState({});
  console.log(restaurant);

  useEffect(() => {
    transmitRestaurant().then((data) => {
      data &&
        Object.keys(data).map((item) => {
          //  console.log(item);
          if (item === id) {
            setRestaurant(data[item]);
            //    console.log(data[item]);
          }
        });
    });
  }, []);
  return <div>RestaurantDetails</div>;
}

export default RestaurantDetails;
