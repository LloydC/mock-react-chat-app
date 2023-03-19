import React from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import  UserMessage from './UserMessage';

const ChatBody = ({ socket, messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <Message message={message} socket={socket} key={message.id} />
          ) : (
            <UserMessage message={message} socket={socket} key={message.id} />
          )
        )}

        <div className="message__status">
            <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;