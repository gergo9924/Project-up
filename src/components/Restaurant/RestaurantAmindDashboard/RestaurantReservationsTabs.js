import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { loadReservationsForSelectedRestaurant } from '../../../repositories/booking-repositories';
import ReservationListing from '../../Reservations/ReservationList';
import { BookingContext } from "../BookingContext";
import { bookingAccept } from "../../../services/booking-service.js";
import ReservationsTabs from '../../Guest/GuestDashboard/Tabs';
import AcceptedReservations from '../../Reservations/AcceptedReservations';
import PendingReservations from '../../Reservations/PendingReservations';


function RestaurantReservationsTabs() {

    React.useEffect(() => {
        loadReservationsForSelectedRestaurant(
          id,
          bookingContext.reservationsWithDetails,
          bookingContext.setReservationsWithDetails
        );
      }, []);

      let bookingContext = useContext(BookingContext);
      let params = useParams();
      let id = params.restaurantId;

    return (
        <Tabs>
            <TabList>
                <Tab>Accepted Reservations</Tab>
                <Tab>Pending Reservations</Tab>
            </TabList>

             <TabPanel>
                <div className='restaurant-reservation'>
                    <AcceptedReservations id={id} status={true}/>
                    {/* <ReservationListing reservations={bookingContext.reservationsWithDetails} status={true} /> */}
                </div>
            </TabPanel>
            
            <TabPanel>
                <div className='restaurant-reservation'>
                    <PendingReservations id={id} acceptCallback={bookingAccept} declineCallback={""}/>
                    {/* <ReservationListing acceptCallback={bookingAccept} reservations={bookingContext.reservationsWithDetails} declineCallback={""} status={false} /> */}
                </div>
            </TabPanel> 

        </Tabs>
    )
}

export default RestaurantReservationsTabs