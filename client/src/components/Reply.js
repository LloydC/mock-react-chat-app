import React, { useState } from 'react'

const Reply = ({ socket, setShowForm, messageId, username }) => {
    const [reply, setReply] = useState(`@${username}`)

    const handleSubmit = (e) => {
        e.preventDefault();
       
        //sends the username and socket ID to the Node.js server
        socket.emit('addReply', { 
            id: `${socket.id}${Math.random()}`,
            name: localStorage.getItem('userName'),
            reply: reply.replace(`@${localStorage.getItem('userName')}`, ''), 
            messageId,
        });
        setReply(`@${username}`)
        setShowForm(false);
      };
    return (
        <form className="reply__container" onSubmit={handleSubmit}>
          <input
            type="text"
            minLength={6}
            name="reply"
            id="reply"
            className="reply__input"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <span onClick={()=> setShowForm(false)}>X</span>
          <br />
          <button className="home__cta">Send</button>
        </form>
      );
}

export default Reply;
