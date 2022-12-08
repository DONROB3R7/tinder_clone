// React Cores
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// Material Ui
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';


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

      const response  = await axios.post('http://localhost:3001/signup', {email , password})
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
            <div className='close-icon' onClick={handleClick}><CloseIcon/></div>
            <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit ={handleSubmit}>
              <TextField 
                type="email" 
                id="email" 
                name="email" 
                placeholder='Email' 
                required={true} 
                onChange={(e) => setEmail(e.target.value)}
                label="Email" 
                variant="outlined" />

              <TextField 
                type="password" 
                id="password" 
                name="password" 
                placeholder='Password' 
                required={true} 
                onChange={(e) => setPassword(e.target.value)}
                label="Password" 
                variant="outlined" />

               {isSignUp && <TextField 
                type="password" 
                id="password-check" 
                name="password-check" 
                placeholder='Password-Check' 
                required={true} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Password-Check" 
                variant="outlined" />
                }
                <input  className='secondary-button' type="submit" />
                <p>{error}</p>
            </form>
        </div>
    </>
  )
}
