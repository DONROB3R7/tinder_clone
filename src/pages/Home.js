import React from 'react'

// Import Nav Components/Nav
import Nav from '../components/Nav'; 

export default function Home() {

    const authToken = false;

    const handleClick = () => {
        console.log('clicks')
    }

  return (
    <>
        <Nav />
        <div className='home'>
            <h1>Swipe Right</h1>
            <button className='primary-button' onClick={handleClick}>{authToken ? 'Signout' : 'Create Account'}</button>
        </div>
    </>
  )
}


