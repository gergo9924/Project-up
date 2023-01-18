import { Rating } from '@mui/material'
import React from 'react'
import { deleteComment, editComment } from '../../../repositories/guest-repositories'
import "./RestaurantComments.css"

function RestaurantCommentsAsRestaurant({comments, userName, userId, restaurantId}) {
    
    const [commentId, setCommentId] = React.useState(null)
    const [modify, setModify] = React.useState(false)
    const [newMessage, setNewMessage] = React.useState("")
    
    console.log(comments)
    let comms = []
    Object.keys(comments).map(comment => comms.push({...comments[comment], "commentId":comment}))
    console.log(comms)
    const sortedComments = comms.sort((a, b) => new Date(b.date) - new Date(a.date))
    console.log(sortedComments)
    return (
        <>
            {sortedComments.map(comment => {
                const date = comment.date
                console.log(comment)
                return (
                    <div keys={comment} className="comment-div">
                        <div className='comment-username'>
                            <p>{comment.user}</p>
                        </div>
                        <div>
                            <div className='rating-date'>
                                <p>{new Date(date).toLocaleDateString()}</p>
                                <p><Rating name="read-only" value={comment.rating} readOnly /></p>
                                <button className='comment-modify-btn' onClick={() => {
                                    deleteComment(comment.commentId, comment.userId, comment.restaurantId)
                                            .then(() => setModify(!modify))
                                }}>Delete comment</button>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                    
                )
            })}
        </>
    )
}

export default RestaurantCommentsAsRestaurant