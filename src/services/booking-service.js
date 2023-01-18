import { FirebaseError } from "firebase/app";
import {
  deleteBookingReservationFromFirebase,
  getBookingNumbersFirebase,
  loadSpecificReservationUserIdFromFirebase,
  userBookingDetailsFromFirebase,
} from "../repositories/booking-repositories.js";

import { bookingAcceptRealtime } from "../repositories/booking-repositories.js";

export function tablesNeed(persons) {
  let needTables = 0;
  if (persons % 2 == 0) {
    needTables = persons / 2;
    return needTables;
  } else {
    return (needTables = Math.floor(persons / 2) + 1);
  }
}

export function avaiableTables(
  fullTableCapacity,
  currentTaken,
  newReservation,
  availableTables,
  setAvailableTables
) {
  let tableAfterReservation = 0;
  // console.log(newReservation)
  // console.log(newReservation) // 1  // 0
  //   console.log(!Number.isNaN(newReservation)) // true   // true
  //   console.log((newReservation <  1) ) // false   // true
  //   console.log(availableTables != true) // true   // true

  if (availableTables != undefined) {
    if (
      !Number.isNaN(newReservation) && //
      newReservation < 1 &&
      availableTables == false
    ) {
      return setAvailableTables(true);
    } else if (Number.isNaN(newReservation)) {
      return setAvailableTables(true);
    }
  }

  let fullReservationsArr = [...currentTaken, newReservation];

  fullReservationsArr.map(
    (reservation) => (tableAfterReservation += tablesNeed(reservation))
  );

  if (fullTableCapacity - tableAfterReservation >= 0) {
    //  setter(false);

    if (availableTables == true) {
      return setAvailableTables(false);
    } else {
      return fullTableCapacity - tableAfterReservation;
    }
  } else {
    if (availableTables == false) {
      setAvailableTables(true);
      return "NINCS ASZTAL ENNYI FŐRE!!";
    } else {
      return "NINCS ASZTAL ENNYI FŐRE!!";
    }
  }
}

export function getBookingNumbersOfselectedDate(
  date,
  restaurantId,
  isModification,
  guestNumber
) {
  return getBookingNumbersFirebase(
    date,
    restaurantId,
    isModification,
    guestNumber
  );
}

export function deleteBooking(reservationId, restaurantId, userId) {
  deleteBookingReservationFromFirebase(reservationId, restaurantId, userId);
}

export function userBookingDetails(reservationsArr) {
  return userBookingDetailsFromFirebase(reservationsArr);
}

export function formatDate(date) {
  // 2022-07-06T22:00:00.000Z
  let yymmddT = [...date].findIndex((letter) => letter == "T");
  let tAfter = date.slice(yymmddT + 1, date.length - 8);
  let yymmdd = date.slice(0, yymmddT);
  return [yymmdd, tAfter];
}
export function newFormatDate(date, select) {
  if (!date) {
    return;
  }
  // date: "2022-07-06T02:30"
  let yymmddT = [...date].findIndex((letter) => letter == "T");
  let tAfter = date.slice(yymmddT + 1);
  let yymmdd = date.slice(0, yymmddT);
  if (select == "time") {
    console.log(tAfter);
    return tAfter;
  } else if (select == "day") {
    console.log(yymmdd);
    return yymmdd;
  } else {
    return yymmdd + " " + tAfter;
  }
  // [yymmdd, tAfter];
}
export function reper() {
  var dtToday = new Date();
  let minDate;
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  return (minDate = year + "-" + month + "-" + day);
}
// export function newFormatDateForPastcheck(date) {
//   if (!date) {
//     return;
//   }
//   // date: "2022-07-06T02:30"
//   let yymmddT = [...date];
//   let tAfter = date.slice(yymmddT + 1);
//   let yymmdd = date.slice(0, yymmddT);
//   // if (select == "time") {
//   //   console.log(tAfter);
//   //   return tAfter;
//   // } else if (select == "day") {
//   //   console.log(yymmdd);
//   //   return yymmdd;
//   // } else {
//   return yymmdd + " " + tAfter;
//   // }
//   // [yymmdd, tAfter];
// }
export function nowYyyymmdd(dateOrTime) {
  let today = new Date();
  today.setTime(today.getTime() + 2 * 60 * 60 * 1000);

  if (dateOrTime == "date") {
    return today.toISOString().slice(0, 10);
  } else {
    let hours = today.toISOString().slice(11, 13);

    let minutes = today.toISOString().slice(14, 16);

    if (Number(minutes) > 30) {
      if (Number(hours) <= 8) {
        hours = `0${Number(hours) + 1}`;
      } else {
        hours = Number(hours) + 1;
      }

      minutes = "00";
    } else {
      if (Number(hours) <= 9) {
        hours = `0${Number(hours)}`;
      } else {
        hours = Number(hours);
      }
      minutes = "30";
    }
    return hours + ":" + minutes;
  }
}

//  return today.toISOString().slice(0, 10)

export function loadSpecificReservationUserId(reservationId, setUserIdGet){

 return loadSpecificReservationUserIdFromFirebase(reservationId, setUserIdGet)
}

export function bookingAccept(id, reservationsDetailsReal) {
  return bookingAcceptRealtime(id, reservationsDetailsReal);
}
