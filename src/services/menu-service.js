import { saveMenuToFirebase } from "../repositories/menu-repositories.js"
import { loadFoodDetails } from "../repositories/menu-repositories.js"
import { updateFood } from "../repositories/menu-repositories.js" 

 export function menuAdd(restourantIdVal,foodName, foodType,foodprice, allergens, foodId ){

    // console.log(allergens)
    return saveMenuToFirebase(restourantIdVal,foodName, foodType,foodprice, allergens, foodId ) 
 }

 export function foodUpdate(restaurantId, foodId){
   return loadFoodDetails(restaurantId, foodId)
 }

 export function delAllergen(item, allergens){
  let filtered = allergens.filter(all => 
      item != all
      
  )
  return filtered
  // console.log(filtered)
  // if(filtered.length == 0){

  // return  filtered = [""]
  // } else {
  //    return filtered 
  // }

}

export function  foodAdd(obj){
    return updateFood(obj)
}