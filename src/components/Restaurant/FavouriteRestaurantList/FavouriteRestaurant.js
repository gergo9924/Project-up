import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loadRestaurants } from '../../../services/restaurant-service';
import "../RestaurantPublicList/RestaurantPublicList.css"
import { v4 as uuidv4 } from 'uuid'; 
import { GuestContext } from '../../GuestContext';
import { loadFavouriteRestaurants } from '../../../repositories/restaurant-repositories';
import "./FavouriteRestaurant.css"
import { Rating } from '@mui/material';


function FavouriteRestaurant({restaurants}) {

    const navigate = useNavigate();
    console.log(restaurants)

    return (
        <div className='main-restaurants-listings'>
            {Object.keys(restaurants).map((item) => {
                let id = item;
                return (
                <div key={uuidv4()} className='main-restaurants-listing-items'>
                    <div style={{width: "300px", height:"200px", backgroundImage: `url(${restaurants[item].imgUrl})`, backgroundImage: `url(${restaurants[item].imgUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover" }} >
                    <div style={{
                    width: "100%",
                    margin: "10px auto",
                    backgroundImage: `url(${restaurants[item].imgUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}>
                    </div>{/* <img style={{maxWidth: "100%", maxHeight:"100%"}}src={restaurants[item].imgUrl} alt="restaurantImg"/> */}
                    </div>
                    <div className='name-email-div'>
                        <p>{restaurants[item].restaurantName}</p>
                        <p>{restaurants[item].webpageURL}</p>{" "}
                    </div>
                    {restaurants[item].ratings ?
                    <Rating name="read-only" value={calcAverage(restaurants[item].ratings)} readOnly />
                    :
                    <p>No ratings yet</p>
                  }
                    <button
                    onClick={() =>
                        navigate(`/restaurant/mainpage/${id}`)
                    }
                    >
                    View Restaurant
                    </button>
                </div>
                );
            })}
        </div>
    )

    function calcAverage(ratings) {
        const average = ratings.reduce((a,b) => a + b, 0) / ratings.length
        return average
      }
}

export default FavouriteRestaurant