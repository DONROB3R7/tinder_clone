import React from 'react'


// Import Components
import ChatHeader from './ChatHeader';
import MatchesDisplay from './MatchesDisplay';
import ChatDisplay from './ChatDisplay';

export default function ChatContainer() {
  return (
    <div className='chat-container'>
        <ChatHeader />
        <div>
          <button className='option'>Matches</button>
          <button className='option'>Chat</button>
        </div>
        <MatchesDisplay />
        <ChatDisplay />
    </div>
  )
}
