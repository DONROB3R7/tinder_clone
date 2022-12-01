import React from 'react'
import { useState } from 'react';

// Import Nav Components/Nav
import Nav from '../components/Nav'; 
import AuthModel from  '../components/AuthModel';


export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const authToken = false;

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(true);
    }

  return (
    <>  
        <div className='overlay'>
            <Nav minimal={false} 
                authToken={authToken} 
                setShowModal={setShowModal} 
                showModal={showModal} 
                setIsSignUp={setIsSignUp}
            />
            <div className='home'>
                <h1>Swipe Right</h1>
                <button className='primary-button' onClick={handleClick}>{authToken ? 'Signout' : 'Create Account'}</button>
                {showModal && (
                    <AuthModel setShowModal={setShowModal} setIsSignUp={setIsSignUp} isSignUp={isSignUp} />
                )}
            
            </div>
        </div>
    </>
  )
}


