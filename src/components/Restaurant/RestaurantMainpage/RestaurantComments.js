import { Rating } from '@mui/material'
import React from 'react'
import { deleteComment, editComment } from '../../../repositories/guest-repositories'
import "./RestaurantComments.css"

function RestaurantComments({comments, userName, userId, restaurantId}) {
    
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
                                {
                                    comment.user == userName?
                                    <button className='comment-modify-btn' onClick={() => {
                                        setCommentId(comment.commentId)
                                        setModify(!modify)
                                        setNewMessage(comment.comment)
                                    }}>Manage comment</button>
                                    :
                                    null
                                }
                            </div>
                            {
                            commentId === comment.commentId && modify?
                                <div className='modify-comment-div'>
                                    <textarea className='modify-comment-textarea' name="comment" value={newMessage} onChange={(e) =>setNewMessage(e.target.value)}/>
                                    <div className='modify-comment-btns'>
                                        <button className="modify-comment-btn" onClick={() => {
                                            editComment(comment.commentId, newMessage, restaurantId)
                                                .then(() => setModify(!modify))
                                        }}>Modify</button>                                
                                        <button className='modify-comment-delete-btn' onClick={() => {
                                            deleteComment(comment.commentId, userId, restaurantId)
                                                .then(() => setModify(!modify))
                                        }}>Delete</button>                                
                                    </div>
                                </div>
                                :
                                <p>{comment.comment}</p>
                            }
                        </div>
                    </div>
                    
                )
            })}
        </>
    )
}

export default RestaurantComments