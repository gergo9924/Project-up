import { firebaseConfig } from "../config";

const DOMAIN = `${firebaseConfig.databaseURL}/restaurants`;


export function saveMenuToFirebase(
  restourantIdVal,
  foodName,
  foodType,
  foodprice,
  allergens,
  foodId
) {
  fetch(`${DOMAIN}/${restourantIdVal}/menu/${foodType}/${foodName}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid: foodId,
      price: foodprice,
      allergens: allergens,
      imgUrl: "meg nincs",
    }),
  });
}

export function loadFoodDetails(restaurantId, foodId) {
 return  fetch(`${DOMAIN}/${restaurantId}/menu.json`)
    .then((res) => res.json())
    .then((adat) => {
      let filtered = Object.keys(adat);
        console.log(filtered)
      let obj = {};
      filtered.map((food) => {
        let objKeys = Object.keys(adat[food]);
        console.log(adat[food])
      
        objKeys.map((kulcs) => {
          if (adat[food][kulcs].uuid == foodId) {
              console.log(kulcs)
              obj = { "data":  adat[food][kulcs], "dataName": kulcs, "nameOfFood" : food }
            
          }
        });
      });
     
      return obj;
    });
}

export function updateFood(obj){
console.log(obj)
console.log(obj.oldData.dataName)
console.log(obj.foodName)
if(obj.oldData.dataName != obj.foodName){
console.log("nem ua")
    let foodNameNew = obj.foodName
    foodNameNew = {

        allergens: obj.allergens,
        price: obj.foodprice,
        imgUrl: obj.oldData.data.imgUrl,
        uuid: obj.oldData.data.uuid,

    }
    console.log(foodNameNew)
    
   return fetch(`${DOMAIN}/${obj.restaurantId}/menu/${obj.foodType}/${obj.foodName}.json`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foodNameNew),

    }).then(res=> {
      
     return fetch(`${DOMAIN}/${obj.restaurantId}/menu/${obj.foodType}/${obj.oldData.dataName}.json`, {
        method: "DELETE"
      })
    })


} else {

     return  fetch(`${DOMAIN}/${obj.restaurantId}/menu/${obj.foodType}/${obj.foodName}.json`,{
        method: "PATCH",
        body:JSON.stringify({
                allergens: obj.allergens,
                price: obj.foodprice
        })
        })
}

}

// let obj = {
//     restaurantId: restourantIdVal,
//     foodType : foodType,
//     foodName: foodName,
//     foodprice: foodprice,
//     allergens: allergens
// }
