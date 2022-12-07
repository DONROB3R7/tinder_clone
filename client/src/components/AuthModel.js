import React from 'react'

import { useState } from 'react';
import axois from 'axios';
import {useNavigate} from 'react-router-dom';

export default function AuthModel( {setShowModal, isSignUp}) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const handleClick =  () => {
    setShowModal(false);
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      if(isSignUp && (password !== confirmPassword)){
        setError('Password need to match!');
        return;
      }

      const response  = await axois.post('http://localhost:3001/signup', {email , password})
      const success = response.status === 200;
      console.log(response.status);
      if(success) navigate('/onboarding');
    } catch (error) {
      console.log(error);
    }
  
  } 

 

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
