import React from "react";
import { loadRestaurants } from "../../../services/restaurant-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./SuperadminRestaurantListingScreen.css";

function SuperAdminRestaurantListingScreen() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = React.useState([]);
  console.log(restaurants);
  React.useEffect(() => {
    loadRestaurants(setRestaurants);
  }, []);

  return (
    <>
      <div className=" super-main-restaurants-listing">
        {Object.keys(restaurants).map((item) => {
          let id = item;
          return (
            <div
              key={uuidv4()}
              className="super-main-restaurants-listing-items"
            >
              {/* <p >{id}</p> */}
              <div
                className="super-pic"
                style={{
                  width: "300px",
                  height: "200px",
                  backgroundImage: `url(${restaurants[item].imgUrl})`,

                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  border: "1px solid black",
                }}
              ></div>
              <div className="super-name-email-div">
                <p> {restaurants[item].restaurantName}</p>
                <p>{restaurants[item].phoneNumber}</p>
                <p> {restaurants[item].webpageURL}</p>
              </div>

              <div className="super-btns">
                <div >
                  <div className="super-btn-accepted space-between">

                  <button className="super-reservation-del-btn"
                    onClick={() =>
                      navigate(`/superadmin/restaurant/delete/${id}`)
                    }
                    >
                    Delete
                  </button>
                  <button className="dashboard-btn"
                    onClick={() =>
                      navigate(`/superadmin/restaurant/modification/${id}`)
                    }
                    >
                    Modify
                    </button>
                  </div>
                  <button className="dashboard-btn"
                    onClick={() => navigate(`/restaurant/mainpage/${id}`)}
                  >
                    View Restaurant Page
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SuperAdminRestaurantListingScreen;
