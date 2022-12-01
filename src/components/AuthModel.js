import React from 'react'

import { useState } from 'react';

export default function AuthModel( {setShowModal, isSignUp}) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setShowModal(false);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if(isSignUp && (password !== confirmPassword)){
        setError('Password need to match!');
      }
      console.log('Make a post request to our database');
    } catch (error) {
      console.log(error);
    }
  
  } 

  console.log(isSignUp);
 

  return (
    <>
        <div className='auth-modal'>
            <div className='close-icon' onClick={handleClick}>X</div>
            <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit ={handleSubmit}>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='email' 
                required={true} 
                onChange={(e) => setEmail(e.target.value)}
                ></input>

                  <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder='password' 
                required={true} 
                onChange={(e) => setPassword(e.target.value)}
                ></input>

               {isSignUp && <input 
                type="password" 
                id="password-check" 
                name="password-check" 
                placeholder='password-check' 
                required={true} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>}

             
                <input  className='secondary-button' type="submit" />
                <p>{error}</p>
            </form>
            <hr/>
            <h2>Get The App</h2>
        </div>
    </>
  )
}
