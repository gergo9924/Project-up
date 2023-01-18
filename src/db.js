// ...foodPictures/uuid/kajakep.jpg

let foodPictures = {
  foodPictures: {
    "foodPictureIdMappa(ételuuid)": "kajakep.jpg",
  },
};

// ...restaurantPictures/uuid/etterem.jpg

let restaurantPictures = {
  restaurantPictures: {
    "restaurantUuid(mappa)": "etterem.jpg",
  },
};

export let data = {
  users: {
    userId1: {
      "e-mail": "asd@asd.com",
      username: "probauser2",
      fireBaseAutToken: "123123123123",
      allergens: ["glutén", "laktóz"],
      phoneNumber: "+361233123",
    },
    userId2: {
      "e-mail": "asd@asd.com",
      username: "probauser2",
      fireBaseAutToken: "123123123123",
      restaurantOwner: "true/false",
      allergens: ["glutén", "laktóz"],
      phoneNumber: "01234567878",
    },
  },
  restaurants: {
    restaurantId1: {
      ownerName: "Gáz Géza",
      restaurantName: "RestaurantNameVal1",
      "e-mail": "asd@asd.com",
      password: "passwordVal",
      address: "addressVal",
      capacity: 150,
      fireBaseAutToken: "123123123123",
      taxId: "123123123123",
      phoneNumber: "+361233123",
      webpageURL: "url",
      restaurantType: ["italian", "chinese", "vegetarian", "paleo"],
      menu: {
        levesek: {
          húsleves: {
            uuid: "asdasdasdasdasdasdsa",
            ar: 1500,
            allergenek: ["glutén", "laktóz"],
            imgUrl: "asdasdasdasdasdasd",
          },
          gulyás: {
            ar: 1500,
            allergenek: ["glutén", "laktóz"],
          },
        },
        mainMeals:  {
            "rakott valami" : {
                uuid: "asdasdasdasdasdasdsa",
                ar: 400,
                allergenek: ["laktóz"],
                imgUrl: "https://asdd",
            }
        }
      },
      restaurantBackGroundImg: "(egyelőre-sablon)",
    },
    restaurantId2: {
      ownerName: "Gáz Béla",
      restaurantName: "RestaurantNameVal2",
      "e-mail": "asd@asd.com",
      password: "passwordVal",
      address: "addressVal",
      capacity: 100,
      fireBaseAutToken: "123123123123",
      taxId: "123123123123",
      phoneNumber: "+361233123",
      webpageURL: "url",
      restaurantType: ["italian", "chinese", "vegetarian", "paleo"],
      menu: {
        levesek: {
          húsleves: {
            uuid: "asdasdasdasdasdasdsa",
            ar: 1500,
            allergenek: ["glutén", "laktóz"],
            imgUrl: "asdasdasdasdasdasd",
          },
          gulyás: {
            ar: 1500,
            allergenek: ["glutén", "laktóz"],
          },
        },
        mainMeals:  {
            "rakott zöldség" : {
                uuid: "asdasdasdasdasdasdsa",
                ar: 1800,
                allergenek: ["glutén"],
                imgUrl: "https://asdd",
            }
        }
      },
      restaurantBackGroundImg: "(egyelőre-sablon)",
    },
  },
};

////////////////////////////////////////// Image Store ///////////////////////////////////////////
