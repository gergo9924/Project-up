import React from 'react';
import { guestModificationService } from '../../../services/guest-service.js';
import "./GuestInputDetails.css"

const GuestInputDetails = (props) => {
	return (
		<form className='guest-input-details-div'>
			<span>{props.details.title} </span>
			<input disabled={props.isDisabled == true ? props.isDisabled : false} type={props.details.type} value={props.details.func[0][props.details.value] || ""}  onChange={(e) => {
				guestModificationService(e.target.value,props.details.value, props.details.func[0], props.details.func[1]);
			}}/>
		</form>
	);

};

export default GuestInputDetails;




