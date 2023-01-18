    //   import React, { useState } from "react";
    //   import DatePicker from "react-datepicker";
    //   import "react-datepicker/dist/react-datepicker.css";
      
    //   export default function TableDatePicker(props) {
    //       const [startDate, setStartDate] = useState(null);
    //       console.log(startDate)
    //       const minTime = new Date(2000, 1, 1, 10, 30);
    //       const maxTime = new Date(2000, 1, 1, 21, 30);
    //       // const defaultValue = new Date(2022, 6, 30, 8, 15);
      
    //       return (
    //           <div>
    //               <DatePicker
    //                   minTime={minTime}
    //                   maxTime={maxTime}
    //                   // defaultValue={defaultValue}
    //                   placeholderText={props.date ? props.date : "Select Booking Date"}
    //                   showTimeSelect
    //                   dateFormat="MMMM d, yyyy h:mmaa"
    //                   selected={startDate}
    //                   selectsStart
    //                   startDate={startDate}
    //                   onChange={date => {setStartDate(date); return props.reservation.setReservationDetails({ ...props.reservation.reservationDetails, date: startDate })}}
    //               />
    //           </div>
    //       )
    //   }