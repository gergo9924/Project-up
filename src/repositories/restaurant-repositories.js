//firebase-restaurant-registration
import { v4 as uuidv4 } from "uuid";
import { loadGuestFromDatabase, loadGuestFromDatabaseFetch } from "./guest-repositories";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { firebaseConfig, firebaseApp } from "../config";
import { changeEmail, changeEmailAndPassword, changePassword } from "./superadmi-auth-repositories";
import { getDatabase, ref as dbRef, onValue} from "firebase/database";


export function saveRestaurantToFirebase(restaurantData, id) {
  return fetch(
    `${firebaseConfig.databaseURL}/restaurants/${id}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    }
  );
}

export function saveRestaurantToFirebaseByUser(restaurantData, id) {
  return fetch(
    `${firebaseConfig.databaseURL}/restaurants/${id}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    }
  )
    .then((res) => res.json())
}

const URL = firebaseConfig.databaseURL;

export function loadRestaurantDetails(restourantIdVal, setRestaurantDetails) {
  const db = getDatabase(firebaseApp);
  const starCountRef = dbRef(db, `restaurants/${restourantIdVal}`,);
  onValue(starCountRef, (snapshot) => {
    const restDetails = snapshot.val()
    setRestaurantDetails(restDetails)
  })
}

export function setRestaurantDetails(id, data, newImg, newEmail, newPassword) {
  	if(newImg) {
		return uploadRestautantImgToDatabase (id, newImg)
		.then((url) => {
			data.imgUrl = url;
			if(newEmail && newPassword){
				return changeEmailAndPassword(data, newEmail, newPassword)
				.then(() => {
					return updateRestaurantDataInDatabase(id, data)
				})
			} else if (newEmail) {
				return changeEmail(data, newEmail)
				.then(() => {
					return updateRestaurantDataInDatabase(id, data)
				})
			} else if (newPassword) {
				return changePassword(data, newPassword)
				.then(() => {
					return updateRestaurantDataInDatabase(id, data)
				})
			} else {
				return updateRestaurantDataInDatabase(id, data)
			}
		})    
  	} else {
		if(newEmail && newPassword){
			return changeEmailAndPassword(data, newEmail, newPassword)
			.then(() => {
				return updateRestaurantDataInDatabase(id, data)
			})
		} else if (newEmail) {
			return changeEmail(data, newEmail)
			.then(() => {
				return updateRestaurantDataInDatabase(id, data)
			})
		} else if (newPassword) {
			return changePassword(data, newPassword)
			.then(() => {
				return updateRestaurantDataInDatabase(id, data)
			})
		} else {
			return updateRestaurantDataInDatabase(id, data)
		}
	}
}

export function updateRestaurantDataInDatabase(id, data){
	return fetch(`${URL}/restaurants/${id}.json`, {
		method: "PATCH",
		body: JSON.stringify(data),
	  });
}

export function uploadRestautantImgToDatabase (id, newImg){
	const storage = getStorage(firebaseApp)
    let storageRef = ref(storage, `RestaurantPics/${id}/restaurantProfilePic.jpg`);
    
    return uploadBytes(storageRef, newImg)
      .then(() => {
          return getDownloadURL(storageRef).then(url => {
            console.log(url)
            console.log("sikeres képfeltöltés")
            return url             
      })
	})
}

export function deleteMenuItemFromDatabase(id, foodType, foodName) {
  return fetch(
    `${firebaseConfig.databaseURL}/restaurants/${id}/menu/${foodType}/${foodName}.json`,
    {
      method: "DELETE",
    }
  ).then((res) => res.json());
}
// export function deleteBookingItemFromDatabase(id) {
//   return fetch(
//     `https://dinr-c6586-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`,
//     {
//       method: "DELETE",
//     }
//   );
// }
export function deleteMenuItemFromDatabaseByAdmin(id, foodType, foodName) {
  return fetch(
    `${firebaseConfig.databaseURL}/restaurants/${id}/menu/${foodType}/${foodName}.json`,
    {
      method: "DELETE",
    }
  ).then((res) => res.json());
}
// export function deleteBookingItemFromDatabase(id) {
//   return fetch(
//     `https://dinr-c6586-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`,
//     {
//       method: "DELETE",
//     }
//   );
// }
  
export function deleteBookingItemFromDatabase(restId, id, user) {
  console.log(restId, " ", id, " ",user)
  return fetch (`https://dinr-c6586-default-rtdb.europe-west1.firebasedatabase.app/restaurants/${restId}/reservations.json`)
  .then(res => res.json())
  .then(reservations => {
    let copyOfReservations = []
    reservations.map(reservation => {
      if(reservation != id){
        copyOfReservations.push(reservation)
      }
    })
    console.log(copyOfReservations)
    return copyOfReservations
  })
  .then(reservations =>{
    fetch(`https://dinr-c6586-default-rtdb.europe-west1.firebasedatabase.app/restaurants/${restId}/reservations.json`, {
      method: "PUT",
      body: JSON.stringify(reservations),
    })
    return reservations
  })
  .then(reservations => {
    console.log(reservations.length)
    if(reservations.length === 0){
      fetch(`${firebaseConfig.databaseURL}/restaurants/${restId}.json`, {
        method: "PATCH",
        body: JSON.stringify({"reservations": ""}),
      })
    }
    return reservations
  })
  .then(() => {
    fetch (`https://dinr-c6586-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/reservations.json`)
      .then(res => res.json())
      .then(reservations => {
        let copyOfReservations = []
        reservations.map(reservation => {
          if(reservation != id){
            copyOfReservations.push(reservation)
          }
        })
        console.log(copyOfReservations)
        return copyOfReservations
      })
      .then(reservations =>{
        fetch(`https://dinr-c6586-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/reservations.json`, {
          method: "PUT",
          body: JSON.stringify(reservations),
        })
        return reservations
      })
      .then(reservations => {
        console.log(reservations.length)
        if(reservations.length === 0){
          return fetch(`${firebaseConfig.databaseURL}/users/${user}.json`, {
            method: "PATCH",
            body: JSON.stringify({reservations: ""}),
          })
        }
        return reservations
      })
      .then(() => {
        return fetch(
          `https://dinr-c6586-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`,
          {method: "DELETE",}
        )
      })
    })
}

//SuperadminFirebaseRestaurantDelete

export function adminDelete(id) {
  fetch(`${URL}/restaurants/${id}.json`, {
    method: "DELETE",
  }).then((res) => res.json());
}

//SuperadminFirebaseRestaurantListing

export function loadRestaurantsFromDatabase(setRestaurants) {
  const db = getDatabase(firebaseApp);
  const starCountRef = dbRef(db, `restaurants`,);
  onValue(starCountRef, (snapshot) => {
    const restaurants = snapshot.val()
    setRestaurants(restaurants)
});

}

export function loadRestaurantsFromDatabaseFetch() {
  return fetch(`${URL}/restaurants.json`).then((datas) => datas.json());
}

export function loadRestaurant() {
  return fetch(`${URL}/restaurants.json`).then((datas) => datas.json());
}

export function saveReservationToDatabase(reservationDetails) {
  console.log(reservationDetails);

  reservationDetails.status = false;
  
  let id = uuidv4();
  console.log(id)
 return fetch(`${URL}/reservations/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationDetails),
  })
    .then((resp) => resp.json())
    .then(() => {
      let userObject = {};
      loadGuestFromDatabaseFetch(reservationDetails.userId).then((user) => {
        userObject = {...user}
        
        console.log(userObject);
        let copyOfuserObject = [...userObject?.reservations, id];

        fetch(`${URL}/users/${reservationDetails.userId}.json`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userObject,
            reservations: copyOfuserObject,
          }),
        })
          .then((resp) => resp.json())
          .then(() => {
            let restaurantObject = {};
            loadRestaurantsFromDatabaseFetch().then((restaurants) => {
              restaurantObject = restaurants[reservationDetails.restaurantId];
              let copyOfRestaurantObject = [
                ...restaurantObject.reservations,
                id,
              ];
              console.log(copyOfRestaurantObject);
              fetch(
                `${URL}/restaurants/${reservationDetails.restaurantId}.json`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...restaurantObject,
                    reservations: copyOfRestaurantObject,
                  }),
                }
              ).then((resp) => resp.json());
            });
            console.log("valami")
          });
      });
    });
}

export function loadReservationsFromDatabase() {
  return fetch(`${URL}/reservations.json`).then((resp) => resp.json());
}

export function loadAspecificRestaurantDetails(restourantIdVal) {
  return fetch(`${URL}/restaurants/${restourantIdVal}.json`)
    .then((res) => res.json())
    .then((data) => {
      let obj = {
        restaurantId: restourantIdVal,
        address: data.address,
        name: data.restaurantName,
        ["e-mail"]: data.e_mail,
        ["phone"]: data.phoneNumber,
        ["webpageURL"]: data.webpageURL,
      };
      console.log(obj);
      return obj;
    });
}

export function uploadRestaurantPicture(picture, id) {
  const storage = getStorage(firebaseApp)
  let storageRef = ref(storage, `RestaurantPics/${id}/restaurantProfilePic.jpg`);
  if (picture == undefined) {

    storageRef = ref(storage, `RestaurantPics/sample.jpg`)
    return getDownloadURL(storageRef).then(url => {
        return url
    })
  } else {
    return uploadBytes(storageRef, picture)
      .then(() => {
          return getDownloadURL(storageRef).then(url => {
            console.log(url)
              return url             
          })
      })
  }
}

export function saveRestToFavouritesInDatabase(restId, guestId){
  return fetch(`${firebaseConfig.databaseURL}/users/${guestId}/favourites.json`)
    .then(res => res.json())
    .then(favourites => {
      let favouritesArray = [restId];
      if (favourites.length > 0) {
        favourites.map((favourite) => {
          favouritesArray.push(favourite);
        });
      }
      return fetch(`${firebaseConfig.databaseURL}/users/${guestId}.json`,{
        method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({favourites: favouritesArray}),
      })
    })
}

export function deleteRestFromFavouritesInDatabase(restId, guestId) {
  return fetch(`${firebaseConfig.databaseURL}/users/${guestId}/favourites.json`)
  .then(res => res.json())
  .then(favourites => {
    let copyOfFavourites = []
    favourites.map(favourite => {
      if(favourite != restId){
        copyOfFavourites.push(favourite)
      }
    })
    console.log(copyOfFavourites)
    return (copyOfFavourites)
  })
  .then(favourites =>{
    fetch(`${firebaseConfig.databaseURL}/users/${guestId}/favourites.json`, {
      method: "PUT",
      body: JSON.stringify(favourites),
    })
    return favourites
  })
  .then(favourites => {
    console.log(favourites.length)
    if(favourites.length === 0){
      return fetch(`${firebaseConfig.databaseURL}/users/${guestId}.json`, {
        method: "PATCH",
        body: JSON.stringify({favourites: ""}),
      })
    }
    return
  })
}

export function loadFavouriteRestaurants(restIds, setRestaurants) {
  const db = getDatabase(firebaseApp);
  const starCountRef = dbRef(db, `restaurants`,);
  onValue(starCountRef, (snapshot) => {
    const allRestaurants = snapshot.val()
    let favRestaurants = {}
    restIds.map(favRestId => {
      Object.keys(allRestaurants).filter(restaurantId => {
        if(favRestId == restaurantId){
          favRestaurants = {...favRestaurants, [favRestId]: allRestaurants[restaurantId]}
        }
      })
    })
    setRestaurants(favRestaurants)
  });
}

export function sendReview(feedback, rating, userId, restaurantId) {
	const commentId = uuidv4()
	return fetch(`${firebaseConfig.databaseURL}/users/${userId}/comments.json`)
		.then(res => res.json())
		.then(comments => {
		let commentsArray = [commentId];
		if (comments.length > 0) {
			comments.map((comment) => {
			commentsArray.push(comment);
			});
		}
		return fetch(`${firebaseConfig.databaseURL}/users/${userId}.json`,{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({comments: commentsArray}),
		})
	})
		.then(() => {
			fetch(`${URL}/restaurants/${restaurantId}/comments.json`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({[commentId]: feedback}),
			})
		})
		.then(() => {
			fetch(`${URL}/restaurants/${restaurantId}/ratings.json`)
				.then(res => res.json())
				.then(ratings => {
				let ratingsArray = [rating];
				if (ratings.length > 0) {
					ratings.map((rating) => {
					ratingsArray.push(rating);
					});
				}
				return fetch(`${URL}/restaurants/${restaurantId}.json`,{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ratings: ratingsArray}),
				})
			})
		})
}

export function loadRatings(restaurantId, setRatings, setNumberOfRatings){
	const db = getDatabase(firebaseApp);
	const starCountRef = dbRef(db, `restaurants/${restaurantId}/ratings`);
	onValue(starCountRef, (snapshot) => {
		const ratings = snapshot.val()
		console.log(ratings)
		if(ratings.length > 0) {
			const average = ratings.reduce((a,b) => a + b, 0) / ratings.length
			console.log(average)
			setRatings(average)
      setNumberOfRatings(ratings.length)
		} else {
			setRatings(0)
		}
	});
}

