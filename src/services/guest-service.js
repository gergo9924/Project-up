import {
  guestadminDelete,
  loadGuestFromDatabase,
  saveGuestToFirebase,
  modifyGuestInFirebase,
  userReservationDetails,
} from "../repositories/guest-repositories";
import { loadGuestDetails } from "../repositories/guest-repositories";
import { createAuthentication } from "../services/superadmin-auth-service.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { guestadminDelete, loadGuestFromDatabase, saveGuestToFirebase} from "../repositories/guest-repositories"

export function loadGuest(setGuest) {
  loadGuestFromDatabase(setGuest)
}
export function createUser(guestData, id , userrole) {
  guestData.reservations = ""; //firebase miatt üres string, amúgy egy tömb

  console.log(guestData.email);
  return createAuthentication(
    guestData.email,
    guestData.password,
    "users",
    id
  ).then((authUid) => {
    if (authUid) {
      console.log(guestData.email);
      console.log(authUid);
      console.log(id);
      guestData.authUid = authUid;
      guestData.favourites = "";
      guestData.comments = "";
      guestData.role = "users";
      return saveGuestToFirebase(guestData, id);
    }
   return
  })
  .then(() => {
     if(userrole == "superadmin"){
      return 
    } else {
      
     return signInWithEmailAndPassword(getAuth(), guestData.email, guestData.password)
    }
  });
}

export function changeGuestData(prop, value, guestData, setGuestData) {
  guestData[prop] = value;
  return setGuestData(guestData);
}

export function getGuestDetails(id) {
  return loadGuestDetails(id);
}

export function guestModificationService(
  itemValue,
  propKey,
  guestData,
  setGuestData
) {
  guestData[propKey] = itemValue;
  return setGuestData({ ...guestData });
}

export function modifyUser(guestData, id, newEmail, newPassword) {
  return modifyGuestInFirebase(guestData, id, newEmail, newPassword);
}

export function deleteUser(id) {
  return guestadminDelete(id);
}
