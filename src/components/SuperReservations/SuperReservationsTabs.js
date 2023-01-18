import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AcceptedReservationsSuper from './AcceptedReservationsSuper.js';
import HistorySuper from './HistorySuper.js';
import PendingReservationsSuper from './PendingReservationsSuper.js';


const SuperReservationsTabs = ({reservations}) => {
    // console.log(reservations)
    return (
          <Tabs>
            <TabList>
                <Tab>Upcoming reservations</Tab>
                <Tab>Pending reservations</Tab>
                <Tab>History</Tab>
            </TabList>

            <TabPanel>
                <AcceptedReservationsSuper reservations={reservations}/>
            </TabPanel>
            <TabPanel>
                <PendingReservationsSuper reservations={reservations}/>
            </TabPanel>
            <TabPanel>
                <HistorySuper reservations={reservations}/>
            </TabPanel>

        </Tabs>
    );
};

export default SuperReservationsTabs;