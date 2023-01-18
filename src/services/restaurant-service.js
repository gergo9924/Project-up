import {
  loadRestaurantDetails,
  setRestaurantDetails,
  saveRestaurantToFirebase,
  adminDelete,
  saveReservationToDatabase,
  loadReservationsFromDatabase,
  loadRestaurant,
  saveRestaurantToFirebaseByUser,
  loadAspecificRestaurantDetails,
  deleteMenuItemFromDatabase,
  deleteBookingItemFromDatabase,
  uploadRestaurantPicture,
  deleteBookingFromRestaurant,
  deleteBookingFromUser,
  loadRestaurantsFromDatabase,
  saveRestToFavouritesInDatabase,
  deleteRestFromFavouritesInDatabase,
  deleteMenuItemFromDatabaseByAdmin,
} from "../repositories/restaurant-repositories";
import { createAuthentication } from "../services/superadmin-auth-service.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function deleteMenuItem(id, foodType, foodName) {
  return deleteMenuItemFromDatabase(id, foodType, foodName);
}
export function deleteMenuItemByAdmin(id, foodType, foodName) {
  return deleteMenuItemFromDatabase(id, foodType, foodName);
}
export function deleteBookingItem(restId, id, user) {
  return deleteBookingItemFromDatabase(restId, id, user);
}
// SuperAdminServiceDelete

export function deleteFunction(id) {
  adminDelete(id);
}

export const restaurantModificationService = (
  itemValue,
  propKey,
  restaurantDetails,
  setRestaurantDetails
) => {
  restaurantDetails[propKey] = itemValue;

  return setRestaurantDetails({ ...restaurantDetails });
};

export const selectedRestaurantDetails = (
  restourantIdVal,
  setRestaurantDetails
) => {
  loadRestaurantDetails(restourantIdVal, setRestaurantDetails);
};

export const modifyRestaurantDetails = (
  restourantIdVal,
  restaurantDetails,
  newImg,
  newEmail,
  newPassword
) => {
  return setRestaurantDetails(
    restourantIdVal,
    restaurantDetails,
    newImg,
    newEmail,
    newPassword
  );
};

export function loadRestaurants(setRestaurants) {
  loadRestaurantsFromDatabase(setRestaurants);
}
export function transmitRestaurant() {
  return loadRestaurant();
}

export function createRestaurant(restaurantData, id, picture, who) {
  return createAuthentication(
    restaurantData.e_mail,
    restaurantData.password,
    "restaurants",
    id
  )
    .then((authUid) => {
      if (authUid) {
        return uploadRestaurantPicture(picture, id).then((url) => {
          return { authUid, url };
        });
      }
      return;
    })
    .then((data) => {
      if (data.authUid) {
        console.log(data);
        restaurantData.authUid = data.authUid;
        restaurantData.imgUrl = data.url;
        restaurantData.role = "restaurants";
        restaurantData.comments = "";
        restaurantData.ratings = "";
        return saveRestaurantToFirebaseByUser(restaurantData, id);
      }
      return;
    })
    .then(() => {
      console.log(who)
      if(who == "superadmin"){
        return
      } else {
        return  signInWithEmailAndPassword(
        getAuth(),
        restaurantData.e_mail,
        restaurantData.password
      )
      }
    
    }
    
    );
}

export function changeRestaurantData(
  prop,
  value,
  restaurantData,
  setRestaurantData
) {
  restaurantData[prop] = value;
  return setRestaurantData(restaurantData);
}

// export function addItem() {}

export function makeReservation(reservationDetails) {
  console.log(reservationDetails);
  return saveReservationToDatabase(reservationDetails);
}

export function loadReservations(setReservations) {
  loadReservationsFromDatabase().then((reservations) =>
    setReservations(reservations)
  );
}
export function loadAspecificRestDetailsFromFirebase(
  data,
  setRestaurantsWithDetails
) {
  let restData = [];
  return data.map((item) => {
    return loadAspecificRestaurantDetails(item.restaurantId).then((data) => {
      restData.push(data);

      setRestaurantsWithDetails(restData);
    });
  });
}

export function saveRestToFavourites(restId, guestId) {
  return saveRestToFavouritesInDatabase(restId, guestId);
}

export function deleteRestFromFavourites(restId, guestId) {
  return deleteRestFromFavouritesInDatabase(restId, guestId);
}
