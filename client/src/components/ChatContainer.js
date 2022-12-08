import React from 'react'

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
