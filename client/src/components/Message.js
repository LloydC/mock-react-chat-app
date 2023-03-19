import React, { useState } from 'react'
import Reply from './Reply';
import Replies from './Replies';

const Message = ({ message, socket }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="message__chats">
            <p className="sender__name">You</p>
            <div className="message__sender">
                <p>{message.text}</p>
            </div>
            {showForm ? 
                <Reply socket={socket} setShowForm={setShowForm} messageId={message.id} username={message.name}/> :
                <p className="reply_button" onClick={()=> setShowForm(true)}>Reply</p>
            }
            {message.repliesID.length > 0 && <Replies replies={message.repliesID} />}
        </div>
    )
}

export default Message;
