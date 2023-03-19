import React, { useState } from 'react'
import Reply from './Reply';
import Replies from './Replies';

 const UserMessage = ({message, socket}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="message__chats">
        <p>{message.name}</p>
        <div className="message__recipient">
            <p>{message.text}</p>
        </div>
        {showForm ? 
            <Reply socket={socket} setShowForm={setShowForm} messageId={message.id} /> :
            <p className="reply_button" onClick={()=> setShowForm(true)}>Reply</p>
        }
        {message.repliesID.length > 0 && <Replies replies={message.repliesID}  />}
    </div>
  )
}

export default UserMessage;
