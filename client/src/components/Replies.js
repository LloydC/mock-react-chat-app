import React, { useState } from 'react'

const Replies = ({ replies }) => {
    const [displayReplies, setDisplayReplies] = useState(false);

    return (
        <div className='replies_container'>
            <button className='replies_button' onClick={() => { setDisplayReplies(!displayReplies)}}>
                <div className='replies_underscore'></div>
                <span className='replies_message'>
                    {
                    displayReplies ? 
                        'Hide all replies' : 
                        `View ${replies.length > 1 ? `all ${replies.length} replies`: `1 reply`}`
                    } 
                </span>
            </button>
         
            <ul className='replies_list'>
                {
                    displayReplies && replies.map(({name, reply}) => 
                    <li className='reply_message' key={reply}>
                        <b>@{name}</b> {reply}
                    </li>)
                }
            </ul>
        </div>
        
    )
}

export default Replies;
