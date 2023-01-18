import { firebaseConfig, firebaseApp } from "../config";

import { getDatabase, ref, onValue, set, update } from "firebase/database";

const DOMAIN = `${firebaseConfig.databaseURL}/reservations`;
const DOMAIN_RESTAURANT = `${firebaseConfig.databaseURL}/restaurants`;
const DOMAIN_USER = `${firebaseConfig.databaseURL}/users`;

export function getBookingNumbersFirebase(
  date,
  restaurantId,
  isModification,
  guestNumber
) {
  let numberOfBookingOneDate = [];
  return fetch(`${DOMAIN}.json`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (Object.keys(data).length > 0) {
        Object.values(data).map((item) => {
          if (item.restaurantId == restaurantId && item["date"] == date) {
            numberOfBookingOneDate.push(Number(item.numberOfGuests));
          }
        });

        if (isModification == true) {
          let find = numberOfBookingOneDate.findIndex(
            (item) => item == guestNumber
          );

          console.log(find);
          numberOfBookingOneDate.splice(find, 1);
          console.log(numberOfBookingOneDate);
          return numberOfBookingOneDate;
        } else {
          return numberOfBookingOneDate;
        }
      } else {
        return numberOfBookingOneDate;
      }
    });
}

// 2022-06-17T10:30

export function deleteBookingReservationFromFirebase(
  reservationId,
  restaurantId,
  userId
) {
  // fetch(`${DOMAIN}/${reservationId}.json`,{
  //   method:"DELETE"
  // })
  // .then()
  return fetch(`${DOMAIN_RESTAURANT}/${restaurantId}/reservations.json`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      let reservationsArray = [];
      reservationsArray = data.filter((item) => {
        if (item != reservationId) {
          return true;
        }
      });
      console.log(reservationsArray);
    });
}

export function loadReservationsForSelectedRestaurant(
  id,
  reservationsWithDetails,
  setReservationsWithDetails
) {
  fetch(`${DOMAIN_RESTAURANT}/${id}.json`)
    .then((resp) => resp.json())
    .then((restaurantDatas) => {
      let reservationsArray = [];
      if (restaurantDatas.reservations.length > 0) {
        restaurantDatas.reservations.map((reservation) => {
          reservationsArray.push(reservation);
        });
      }
      return reservationsArray;
    })
    .then((reserves) => {
      const db = getDatabase(firebaseApp);
      const starCountRef = ref(db, `reservations`);
      onValue(starCountRef, (snapshot) => {
        reservationsWithDetails = [];
        const reservations = snapshot.val();
        reserves.map((reservationID) => {
          Object.keys(reservations).filter((reserve) => {
            if (reserve == reservationID) {
              let obj = { [reservationID]: reservations[reserve] };
              return reservationsWithDetails.push(obj);
            }
          });
          setReservationsWithDetails(reservationsWithDetails);
        });
        console.log(reservationsWithDetails);
      });
    });
}

// export function loadReservation(
//   reservation,
//   reservationsWithDetails,
//   setReservationsWithDetails
// ) {
//   fetch(`${DOMAIN}/${reservation}.json`)

//     .then(resp => resp.json())
//     .then(reservationObj => setReservationsWithDetails([...reservationsWithDetails, reservationObj]))
// }
export function loadReservation(
  reservation,
  reservationsWithDetails,
  setReservationsWithDetails
) {
  return fetch(`${DOMAIN}/${reservation}.json`)
    .then((resp) => resp.json())
    .then((reservationObj) => {
      setReservationsWithDetails(reservationObj);
      return reservationObj;
    });
}

export function userReservationDetails() {
  return fetch(`${DOMAIN}.json`).then((resp) => resp.json());
}
export function loadReservationsForSelectedGuest(
  id,
  setReservations,
  reservationsWithDetails,
  setReservationsWithDetails
) {

  const db = getDatabase(firebaseApp);
      const starCountRef = ref(db, `users/${id}/reservations`);
      onValue(starCountRef, (snapshot) => {
        const reservations = snapshot.val();
        let reservationsArray = [];
        if (reservations.length > 0) {
          reservations.map((reservation) => {
            reservationsArray.push(reservation);
          });
        }
        fetch(`${DOMAIN}.json`)
        .then(res => res.json())
        .then(reservations => {
          let reservationsWithDetails = []
          reservationsArray.map((reservationID) => {
            Object.keys(reservations).filter((reserve) => {
              if (reserve == reservationID) {
                let obj = { [reservationID]: reservations[reserve] };
                return reservationsWithDetails.push(obj);
              }
            });
            return setReservationsWithDetails(reservationsWithDetails);
          });
        })
      // return reservationsArray;
      });
    }
//   fetch(`${DOMAIN_USER}/${id}.json`)
//     .then((resp) => resp.json())
//     .then((userDatas) => {
//       console.log(userDatas);
//       console.log(id);
//       let reservationsArray = [];
//       if (userDatas.reservations.length > 0) {
//         userDatas.reservations.map((reservation) => {
//           reservationsArray.push(reservation);
//         });
//       }
//       fetch(`${DOMAIN}/${reservation}.json`)
//       .then(res => res.json())
//       .then(reservations => {
//         reservationsArray.map((reservationID) => {
//           Object.keys(reservations).filter((reserve) => {
//             if (reserve == reservationID) {
//               let obj = { [reservationID]: reservations[reserve] };
//               return reservationsWithDetails.push(obj);
//             }
//           });
//           return setReservationsWithDetails(reservationsWithDetails);
//         });
//       })
//       return reservationsArray;
//     })
//     .then((reserves) => {
//       setReservations(reserves);

//       const db = getDatabase(firebaseApp);
//       const starCountRef = ref(db, `reservations`);
//       onValue(starCountRef, (snapshot) => {
//         reservationsWithDetails = [];
//         const reservations = snapshot.val();
//         reserves.map((reservationID) => {
//           Object.keys(reservations).filter((reserve) => {
//             if (reserve == reservationID) {
//               let obj = { [reservationID]: reservations[reserve] };
//               return reservationsWithDetails.push(obj);
//             }
//           });
//           return setReservationsWithDetails(reservationsWithDetails);
//         });
//         console.log(reservationsWithDetails);
//       });
//     });
// }

export function userBookingDetailsFromFirebase(reservationsArr) {
  return fetch(`${DOMAIN}.json`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let fullDetails = [];
      reservationsArr.map((resId) => {
        Object.keys(res).map((fullResKeys) => {
          if (fullResKeys == resId) {
            fullDetails.push({ id: fullResKeys, ...res[fullResKeys] });
          }
        });
      });

      return fullDetails;
    });
}

export function modifyReservation(id, reservationDetails) {
  return fetch(`${DOMAIN}/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(reservationDetails),
  });
}

export function bookingAcceptRealtime(reservationId, reservationsDetailsReal) {
  // console.log(reservationsDetailsReal)
  // console.log(reservationId)

  // let selectedReservation = {}

  // reservationsDetailsReal.map(reservation => {
  //   if(Object.keys(reservation) == reservationId) {
  //     return selectedReservation = reservation
  //   }
  // })
  // Object.keys(selectedReservation).map(reservation => {
  //   return selectedReservation[reservation].status = true
  // })
  return fetch(`${DOMAIN}/${reservationId}.json`, {
    method: "PATCH",
    body: JSON.stringify({ status: true }),
  }).then((resp) => resp.json());

  // let filtered = reservationsDetailsReal.find(
  //    (reservation) => {
  //     if(Object.keys(reservation) == reservationId){
  //       console.log(reservation)
  //       return reservationsDetailsReal[reservation]
  //     }
  // }
  // );
  // console.log(reservationsDetailsReal[reservationId]);
  // console.log({ ...reservationsDetailsReal, status: true });
  // // filtered = { ...filtered, {status: true }};

  //   filtered.status = true
  //   console.log(filtered)
  //   return fetch(`${DOMAIN}/${reservationId}.json`, {
  //     method:"PUT",
  //     body:JSON.stringify({
  //       ...reservationsDetailsReal, status : true
  //   })
  // }).then(resp => resp.json())

  // const db = getDatabase(firebaseApp);
  // return update(ref(db, `reservations`),
  //   {...filtered}
  // );
}

export function loadReservationsForSelectedRestaurantReal(
  id,
  setReservationsReal
) {
  let resArr = [];
  let db = getDatabase(firebaseApp);
  let utvonalRef = ref(db, `restaurants/${id}/reservations`);
  onValue(utvonalRef, (resObject) => {
    resObject.forEach((item) => {
      const ertekek = item.val();

      resArr.push(item.val());
    });
    console.log(resArr);
    setReservationsReal(resArr);
  });
}

export function loadReservationsDetailsForSelectedRestaurantReal(
  reservationsReal,
  setReservationsDetailsReal
) {
  let resArr = [];
  let db = getDatabase(firebaseApp);

  reservationsReal.map((oneRes) => {
    let utvonalRef = ref(db, `/reservations/${oneRes}`);
    onValue(utvonalRef, (resObject) => {
      let objLittle = {};
      resObject.forEach((item) => {
        const ertekKey = item.key;

        const ertekek = item.val();
        objLittle = { ...objLittle, [ertekKey]: ertekek };
      });
      resArr.push({ [oneRes]: { ...objLittle } });
      console.log(resArr);
    });
  });
  return setReservationsDetailsReal(resArr);
}

export function loadSpecificReservationUserIdFromFirebase(
  reservationId,
  setUserIdGet
) {
 
  return fetch(`${DOMAIN}.json`)
  .then((res) => res.json())
  .then((res) => {return setUserIdGet(res)})


  // let db = getDatabase(firebaseApp);
  // let utvonalRef = ref(db, `reservations`);
  // let fullSpecResDetails = {};
  // onValue(utvonalRef, (resObj) => {
  //   let itemVal = resObj.val();
  //   fullSpecResDetails = { ...itemVal };
  // });
  // let searchedUserId;
  // Object.keys(fullSpecResDetails).map((itemId) => {

  //   if (itemId == reservationId) {
  //    searchedUserId = fullSpecResDetails[itemId].userId;
  //   }

  // });

  // return setUserIdGet(searchedUserId);
}
