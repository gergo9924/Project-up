import React from "react";

import { loadGuest } from "../../../services/guest-service";

import AccountDetails from "../../Account/AccountDetails.js";
import { v4 as uuidv4 } from "uuid";
import "../../Account/AccountDetailsScreen.css"
function SuperadminGuestListing() {
  let [guests, setGuest] = React.useState([]);

  React.useEffect(() => {
    loadGuest(setGuest);
  }, []);

  return (
    <div className="account-detail-grid">
      {Object.keys(guests).map((user) => {
        let obj = { [user]: guests[user] };
        return (
          <div key={uuidv4()}>
            <AccountDetails user={obj} />
          </div>
        );
      })}
    </div>
  );
}

export default SuperadminGuestListing;
