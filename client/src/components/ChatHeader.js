import React from 'react'

// Material Ui
import LogoutIcon from '@mui/icons-material/Logout';

export default function ChatHeader() {
  return (
    <>
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src="https://i.imgur.com/OckVkRo.jpeg" alt="Random Pic"/>
                </div>
                <h3>Welcome Dinesh</h3>
            </div>
            <i className="log-out-icon"><LogoutIcon/></i>
        </div>
    </>
  )
}
