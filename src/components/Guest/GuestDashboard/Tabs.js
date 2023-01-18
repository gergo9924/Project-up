import React from 'react';
import "./Tabs.css"
import PendingReservations from '../../Reservations/PendingReservations';
import History from '../../Reservations/History';
import AcceptedReservations from '../../Reservations/AcceptedReservations';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function ReservationsTabs({id}) {

    return (
        <Tabs>
            <TabList>
                <Tab>Upcoming reservations</Tab>
                <Tab>Pending reservations</Tab>
                <Tab>History</Tab>
            </TabList>

            <TabPanel>
                <AcceptedReservations id={id}/>
            </TabPanel>
            <TabPanel>
                <PendingReservations id={id}/>
            </TabPanel>
            <TabPanel>
                <History />
            </TabPanel>

        </Tabs>
    );
  }
  
  export default ReservationsTabs;