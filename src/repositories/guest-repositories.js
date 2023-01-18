import { v4 as uuidv4 } from "uuid";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import {
  changeEmail,
  changeEmailAndPassword,
  changePassword,
} from "./superadmi-auth-repositories";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { firebaseConfig, firebaseApp } from "../config";
//firebase-guest-listing

const DOMAIN = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/users`;

export function loadGuestFromDatabase(setGuest) {
  const db = getDatabase(firebaseApp);
  const starCountRef = dbRef(db, `users`);
  onValue(starCountRef, (snapshot) => {
    const users = snapshot.val();
  
    setGuest(users);
  });
}

export function loadGuestFromDatabaseFetch(id) {
  return fetch(`${DOMAIN}/${id}.json`).then((datas) => datas.json());
}

// firebase-guest-registration

export function saveGuestToFirebase(guestData, id) {
  return fetch(`${DOMAIN}/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guestData),
  });
}

export function loadGuestDetails(id) {
  return fetch(`${DOMAIN}/${id}.json`).then((resp) => resp.json());
}

export function loadGuestDetailsFromDatabase(id, setUser) {
  const db = getDatabase(firebaseApp);
  const starCountRef = dbRef(db, `users/${id}`);
  onValue(starCountRef, (snapshot) => {
    const user = snapshot.val();
    setUser(user);
  });
}

export function modifyGuestInFirebase(guestData, id, newEmail, newPassword) {
  if (newEmail && newPassword) {
    return changeEmailAndPassword(guestData, newEmail, newPassword).then(() => {
      return updateGuestDetailsInDatabase(id, guestData);
    });
  } else if (newEmail) {
    return changeEmail(guestData, newEmail).then(() => {
      return updateGuestDetailsInDatabase(id, guestData);
    });
  } else if (newPassword) {
    return changePassword(guestData, newPassword).then(() => {
      return updateGuestDetailsInDatabase(id, guestData);
    });
  } else {
    return updateGuestDetailsInDatabase(id, guestData);
  }
}

export function updateGuestDetailsInDatabase(id, guestData) {
  return fetch(`${DOMAIN}/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guestData),
  });
}

export function guestadminDelete(id) {
  return fetch(`${DOMAIN}/${id}.json`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export function loadFavourites(id, setFavourites, setIsFavourite, restId) {
  const db = getDatabase(firebaseApp);
  const starCountRef = dbRef(db, `users/${id}/favourites`);
  onValue(starCountRef, (snapshot) => {
    const favourites = snapshot.val();
    setFavourites(favourites);
    if (
      favourites &&
      favourites.find((favouriteId) => favouriteId === restId)
    ) {
      setIsFavourite(true);
    }
  });
}

export function editComment(commentId, newMessage, restaurantId){
  console.log(commentId, newMessage, restaurantId)
  return fetch(`${firebaseConfig.databaseURL}/restaurants/${restaurantId}/comments/${commentId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"comment":newMessage}),
  });
}

export function deleteComment(commentId, userId, restaurantId){
  return fetch(`${firebaseConfig.databaseURL}/restaurants/${restaurantId}/comments/${commentId}.json`, {
    method: "DELETE"
  })
    .then(() => {
      return fetch(`${firebaseConfig.databaseURL}/restaurants/${restaurantId}/comments.json`)
              .then(resp => resp.json())
              .then(comments => {
                if(!comments){
                  return fetch(`${firebaseConfig.databaseURL}/restaurants/${restaurantId}.json`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"comments": ""}),
                  })
                }
              })
    })
    .then(() => {
      return fetch(`${firebaseConfig.databaseURL}/users/${userId}/comments.json`)
      .then((resp) => resp.json())
      .then((comments) => {        
        let commentsArray = comments.filter((comment) => {
          if (comment != commentId) {
            return true;
          }
        });
        return commentsArray
      })
      .then(comments => {
        return fetch(`${firebaseConfig.databaseURL}/users/${userId}.json`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"comments": comments}),
        })
        .then(() => {
          if(comments.length === 0) {
            return fetch(`${firebaseConfig.databaseURL}/users/${userId}.json`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"comments": ""}),
            })
          }
          return
        })
      });
    })
}