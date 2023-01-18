import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteUser } from '../../../services/guest-service';



function SuperadminGuestDelete() {

    let param = useParams();
    let id = param.userId;
    const navigate = useNavigate()

    return (
        <div className="reservation-modif-div">
        <h1 className="guest-booking-delete-h1">User delete</h1>
            <h4>Are you sure you want to delete the user?</h4>
            <div className="guest-reserv-modif-btn-div">
            <button className="guest-reserv-update-btn"  onClick={() => deleteUser(id).then(navigate(`/superadmin/guest/listing`))}>Delete</button>
            <button className="guest-reserv-delete-btn" onClick={() => navigate(`/superadmin/guest/listing`)}>Cancel</button>
        </div>
        </div>
      
    )
}

export default SuperadminGuestDelete