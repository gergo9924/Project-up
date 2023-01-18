import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteRestFromFavourites,
  saveRestToFavourites,
  selectedRestaurantDetails,
} from "../../../services/restaurant-service.js";
import MenuList from "../../Menu/MenuList.js";
import { v4 as uuidv4 } from "uuid";
import BookingDetails from "../../Booking/BookingDetails.js";
import DateTimePicker from "../../Booking/DateTimePicker.js";
import { makeReservation } from "../../../services/restaurant-service.js";
import { AuthContext } from "../../AuthContext.js";
import { BookingContext } from "../BookingContext.js";
import "./RestaurantMainpage.css";
import {
  faChevronDown,
  faChevronUp,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { HashLink } from "react-router-hash-link";
import { RestaurantContext } from "../../RestaurantContext.js";
import { nowYyyymmdd } from "../../../services/booking-service.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GuestContext } from "../../GuestContext.js";
import { loadFavourites } from "../../../repositories/guest-repositories.js";
import RatingStars from "../../RatingStars/RatingStars.js";
import {
  loadRatings,
  sendReview,
} from "../../../repositories/restaurant-repositories.js";
import { Rating } from "@mui/material";
import RestaurantComments from "./RestaurantComments.js";
import RestaurantCommentsAsRestaurant from "./RestaurantCommentsAsRestaurant.js";

const RestaurantMainpage = () => {
  let restaurantContext = React.useContext(RestaurantContext);

  const bookingContext = useContext(BookingContext);
  const guestContext = useContext(GuestContext);
  const context = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();

  const [availableTables, setAvailableTables] = React.useState(true);
  const [currentTaken, setCurrentTaken] = React.useState("");
  const [menuShow, setMenuShow] = React.useState(false);
  const [isFavourite, setIsFavourite] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [feedback, setFeedback] = React.useState({});
  const [ratings, setRatings] = React.useState(0);
  const [numberOfRatings, setNumberOfRatings] = React.useState(0);
  const [isCommenting, setIsCommenting] = React.useState(true)

  console.log(context.userData);
  React.useEffect(() => {
    selectedRestaurantDetails(
      params.restaurantId,
      restaurantContext.setRestaurantDetail
    );
    if (context.userData == null) {
      restaurantContext.setIsRestaurantLoggedIn(false);
    } else if (context.userData.details.role == "restaurants") {
      restaurantContext.setIsRestaurantLoggedIn(true);
    }
  }, []);

  React.useEffect(() => {
    context.userData &&
      loadFavourites(
        context.userData.uuid,
        guestContext.setFavourites,
        setIsFavourite,
        params.restaurantId
      );
  }, [context.userData]);

  React.useEffect(() => {
    loadRatings(params.restaurantId, setRatings, setNumberOfRatings);
  }, [restaurantContext.restaurantDetail]);

  console.log(guestContext.favourites);

  const [reservationDetails, setReservationDetails] = React.useState({
    restaurantId: params.restaurantId,
  });

  const [day, setDay] = React.useState(nowYyyymmdd("date"));

  const [time, setTime] = React.useState(nowYyyymmdd("time"));

  // useState({date: "2022-06-17T10:30" });
  if (
    reservationDetails.restaurantId &&
    reservationDetails.numberOfGuests > 0 &&
    day != ""
  ) {
  }
  return (
    restaurantContext.restaurantDetail && (
      <div>
        {Object.keys(restaurantContext.restaurantDetail).length > 0 ? (
          <div>
            <div
              style={{
                width: "100%",
                height: "50vh",
                margin: "10px auto",
                backgroundImage: `url(${restaurantContext.restaurantDetail.imgUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="restaurant-main-details-div">
              <div className="restaurant-details">
                <div>
                  <div className="rest-links">
                    <HashLink to="#overview" smooth>
                      Overview
                    </HashLink>
                    <HashLink to="#menu" smooth>
                      Menu
                    </HashLink>
                    <HashLink to="#contacts" smooth>
                      Contacts
                    </HashLink>
                    <HashLink to="#reviews" smooth>
                      Reviews
                    </HashLink>
                  </div>
                  <div id="overview">
                    <h1 className="rest-h1">
                      {restaurantContext.restaurantDetail.restaurantName}
                    </h1>
                    <div className="rating-fav-div">
                      <div className="restaurant-rating-div">
                        {ratings > 0 ? (
                          <>
                            <Rating name="read-only" value={ratings} readOnly />
                            <h4>{Math.round(ratings * 10) / 10}</h4>
                            <p>{` (${numberOfRatings}) ratings`}</p>
                          </>
                        ) : (
                          <h4>No ratings yet</h4>
                        )}
                      </div>
                      {context.userData &&
                        context.userData.details.role == "users" &&
                        isFavourite && (
                          <div
                            onClick={() => {
                              deleteRestFromFavourites(
                                params.restaurantId,
                                context.userData.uuid
                              ).then(() => setIsFavourite(false));
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHeart}
                              style={{
                                color: "red",
                                width: "50px",
                                height: "20px",
                              }}
                            />
                          </div>
                        )}
                      {context.userData &&
                        context.userData.details.role == "users" &&
                        !isFavourite && (
                          <div
                            onClick={() => {
                              saveRestToFavourites(
                                params.restaurantId,
                                context.userData.uuid
                              ).then(() => setIsFavourite(true));
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faHeart}
                              style={{
                                opacity: "0.4",
                                color: "red",
                                width: "50px",
                                height: "20px",
                              }}
                            />
                          </div>
                        )}
                    </div>
                    <div className="rest-address">
                      {restaurantContext.restaurantDetail.address}
                    </div>
                    <div>
                      <span style={{ color: "#da3743", fontWeight: "bold" }}>
                        Type:
                      </span>{" "}
                      {restaurantContext.restaurantDetail.restaurantType}
                    </div>
                    <p className="rest-detail">
                      {`${restaurantContext.restaurantDetail.discription}`}
                    </p>
                  </div>
                  <div>
                    {menuShow ? (
                      <button
                        className="show-menu"
                        id="menu"
                        onClick={() => setMenuShow(!menuShow)}
                      >
                        Menu <FontAwesomeIcon icon={faChevronUp} />
                      </button>
                    ) : (
                      <button
                        className="show-menu"
                        id="menu"
                        onClick={() => setMenuShow(!menuShow)}
                      >
                        Menu <FontAwesomeIcon icon={faChevronDown} />
                      </button>
                    )}
                    {restaurantContext.restaurantDetail.length != 0 &&
                    menuShow ? (
                      <div className="menu-div">
                        {Object.keys(
                          restaurantContext.restaurantDetail.menu
                        ).map((item) => {
                          return (
                            <div
                              style={{ textAlign: "center" }}
                              className="menu-type-div?"
                              key={uuidv4()}
                            >
                              <h2
                                style={{
                                  textDecoration: "underline",
                                  paddingBottom: "0px",
                                  marginBottom: "4px",
                                }}
                              >
                                {item}
                              </h2>
                              <div className="menu-items">
                                {Object.keys(
                                  restaurantContext.restaurantDetail["menu"][
                                    item
                                  ]
                                ).map((foodName) => (
                                  <MenuList
                                    superStyle={{
                                      margin: "5px",
                                      marginTop: "05px",
                                      paddingLeft: 0,
                                    }}
                                    superStyleLi={{
                                      listStyleType: "none",
                                      textAlign: "center",
                                    }}
                                    superStyleLiMenu={{
                                      color: "#da3743",
                                      marginBottom: "5px",
                                      marginTop: "10px",
                                    }}
                                    key={uuidv4()}
                                    foodName={foodName}
                                    foodDetails={
                                      restaurantContext.restaurantDetail[
                                        "menu"
                                      ][item][foodName]
                                    }
                                    restaurantId={params.restaurantId}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <h2 id="contacts">Contacts</h2>
                    <div>
                      <p>Email: {restaurantContext.restaurantDetail.e_mail}</p>
                      <p>
                        Phone: {restaurantContext.restaurantDetail.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="reviews-container">
                    <h2 id="reviews">Reviews</h2>
                    {
                      context.userData &&
                      context.userData.details.role == "users" &&
                        isCommenting ?
                        <div>                    
                          <div className="reviews-div">
                            <h2>New review</h2>
                            <div className="user-rating-div">
                              <h4>Rate:</h4>
                              <RatingStars value={rating} setValue={setRating} setFeedback={setFeedback} feedback={feedback}/>
                            </div>
                            <p>Custom review of the restaurant:</p>
                            <textarea className="comment-textarea" rows="4" cols="50"
                              onChange={(e) =>{
                                console.log(feedback)
                                setFeedback({
                                  "comment" : e.target.value,
                                  "date" : Date(),
                                  "user" : context.userData.details.userName,
                                  "rating" : rating,
                                  "restaurantId": params.restaurantId,
                                  "userId": context.userData.uuid
                                })
                              }
                              }
                              type="text"
                              placeholder="Type your review"
                            />
                            <button
                              className="make-reservation-btn"
                              disabled={feedback.length == 0}
                              onClick={() => {
                                sendReview(feedback, rating, context.userData.uuid, params.restaurantId)
                                setIsCommenting(false)
                                }
                              }
                            >
                              Send review
                            </button>
                          </div>
                        </div>
                        :
                        context.userData &&
                        context.userData.details.role == "users" &&
                        <div>                    
                        <div className="reviews-div">
                          <h2>Thank your for your comment!</h2>
                          <button
                            className="additional-comment-btn"
                            onClick={() => {
                              setIsCommenting(true)
                              }
                            }
                          >
                            Write additional comment
                          </button>
                        </div>
                      </div>

                    }
                    {restaurantContext.restaurantDetail && (
                      <div className="comments-div-cont">
                        {restaurantContext.restaurantDetail.comments &&
                        context.userData == undefined ? (
                          <RestaurantComments
                            comments={
                              restaurantContext.restaurantDetail.comments
                            }
                            restaurantId={params.restaurantId}
                          />
                        ) : restaurantContext.restaurantDetail.comments &&
                          context.userData.details.role != undefined &&
                          context.userData.details.role == "restaurants" ? (
                          <RestaurantCommentsAsRestaurant
                            comments={
                              restaurantContext.restaurantDetail.comments
                            }
                            userName={context.userData.details.userName}
                            userId={context.userData.uuid}
                            restaurantId={params.restaurantId}
                          />
                        ) : restaurantContext.restaurantDetail.comments &&
                          context.userData ? (
                          <RestaurantComments
                            comments={
                              restaurantContext.restaurantDetail.comments
                            }
                            userName={context.userData.details.userName}
                            userId={context.userData.uuid}
                            restaurantId={params.restaurantId}
                          />
                        ) : (
                          <p>No reviews yet</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {restaurantContext.isRestaurantLoggedIn == false ? (
                <div className="rest-main-reservation-main-div">
                  <div className="rest-main-reservation-div">
                    <div className="rest-main-reservation-title-div">
                      <h3>Make a Reservation</h3>
                    </div>
                    <div>
                      <DateTimePicker
                        reservationDetails={reservationDetails}
                        setReservationDetails={setReservationDetails}
                        day={day}
                        setDay={setDay}
                        setTime={setTime}
                        time={time}
                      />

                      <div className="guests-input-div">
                        <h4>Party size</h4>
                        <input
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              setAvailableTables(false);
                              setReservationDetails({
                                ...reservationDetails,
                                numberOfGuests: e.target.value,
                              });
                            }
                          }}
                          type="number"
                          placeholder="Number of guests"
                          min={1}
                        />
                      </div>
                      <div className="message-div">
                        <p>Custom message for the restaurant:</p>
                        <input
                          onChange={(e) =>
                            setReservationDetails({
                              ...reservationDetails,
                              message: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Message"
                        />
                        <button
                          className="make-reservation-btn"
                          disabled={availableTables}
                          onClick={() => {
                            if (context.userData != null) {
                              makeReservation({
                                ...reservationDetails,
                                date: `${day}T${time}`,
                                userId: context.userData.uuid,
                                userName: context.userData.details.userName,
                                restaurantName:
                                  restaurantContext.restaurantDetail
                                    .restaurantName,
                              })
                                .then((res) =>
                                  bookingContext.setNewReservation("success")
                                )
                                .then(() =>
                                  navigate(
                                    `/users/dashboard/${context.userData.uuid}`
                                  )
                                );
                            } else {
                              // reservationsWithDetails,
                              console.log(bookingContext);
                              bookingContext.setNewReservation({
                                ...reservationDetails,
                                date: `${day}T${time}`,
                                restaurantName:
                                  restaurantContext.restaurantDetail
                                    .restaurantName,
                              });

                              return navigate("/login");
                            }
                          }}
                        >
                          Make a reservation
                        </button>
                      </div>
                      {reservationDetails.restaurantId &&
                      reservationDetails.numberOfGuests &&
                      !availableTables &&
                      day != "" ? (
                        <BookingDetails
                          details={{
                            ...reservationDetails,
                            date: `${day}T${time}`,
                            fullcapacity:
                              restaurantContext.restaurantDetail.capacity,
                            availableTables,
                            setAvailableTables,
                            currentTaken,
                            setCurrentTaken,
                          }}
                          isModification={false}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    )
  );

  //  func dayChanged(day){
  //     //ujra kell
  //   }
};

export default RestaurantMainpage;
