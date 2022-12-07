import React from 'react'
import logo from '../images/logo-white.png';
import colorLogo from '../images/logo-color.png';


export default function Nav({minimal, authToken, setShowModal, showModal, setIsSignUp}) {
    
    const handelClick = () => {
        console.log('Button Click');
        setShowModal(true);
        setIsSignUp(false);
    }

  return (
    <nav>
        <div className='logo-container'>
            <img className="logo" src={minimal ? colorLogo : logo} alt='logo' />
        </div>
        {!authToken && !minimal && <button 
        className='nav-button' 
        onClick={handelClick}
        disabled={showModal}
        >Log in</button>}
    </nav>
   
  )
}
