import React from "react";
import { getBookingNumbersOfselectedDate } from "../../services/booking-service.js";
import { tablesNeed } from "../../services/booking-service.js";
import { avaiableTables } from "../../services/booking-service.js";

const BookingDetails = (props) => {
  const [currentTaken, setCurrentTaken] = React.useState("");

  console.log(props);
  console.log(props.details.restaurantId);
  console.log(props.reservationDetails);
  console.log(props.isModification);
  console.log(props.details.numberOfGuests);
  console.log(props.details.availableTables);

  React.useEffect(() => {
    getBookingNumbersOfselectedDate(
      props.details.date,
      props.details.restaurantId,
      props.isModification,
      props.details.numberOfGuests
    ).then((res) => setCurrentTaken(res));
  }, [props.details.date, props.details.restaurantId]);

  const fullTableCapacity = Math.floor(props.details.fullcapacity / 2);
  // const sitNumbers = avaiableTables(fullTableCapacity, currentTaken, 0)


	return (
			<div>
				<h4 style={{textAlign: "center"}}>Available number of tables <br/> for selected date:</h4>
				{/* <div>
					{avaiableTables(fullTableCapacity, currentTaken, 0)}
				</div>
				<div style={{ marginTop: "20px" }}>
					Étterem teljes kapacitása: {props.details.fullcapacity} szék.
				</div>
				<div>
					Étterem kapacitása asztalokban kifejezve: {fullTableCapacity} db.
				</div>
				<div>
					Rendelkezésre álló asztalok száma:{" "}
					{avaiableTables(fullTableCapacity, currentTaken, 0)}
			
				</div>
				<hr />
				<div>
					Szükséges hely {props.details.numberOfGuests} főre:{" "}
					{tablesNeed(Number(props.details.numberOfGuests))} db.
				</div> */}
				<div style={{textAlign: "center"}}>
					{/* Még foglalható asztalok száma:{" "} */}
					{avaiableTables(
					fullTableCapacity,
					currentTaken,
					Number(props.details.numberOfGuests),
					props.details.availableTables,
					props.details.setAvailableTables
					)}
				
				</div>
			</div>
	);

};

export default BookingDetails;
