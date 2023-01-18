import React from 'react'
import { Rating } from '@mui/material';

function RatingStars({value, setValue, setFeedback, feedback}) {
    return (
        <div>
            <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setFeedback({...feedback, "rating": newValue})

            }}
            />
        </div>
    )
}

export default RatingStars