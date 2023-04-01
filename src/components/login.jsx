import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import '../css/login.css';
import { auth, provider } from '../firebase/config';
import { useStateValue } from './stateProvider';
function login() {
    const[{user},dispatch] = useStateValue();
    const sigIn= () =>{
        signInWithPopup(auth,provider).then((result)=>{
            console.log(result.user);
            dispatch({
                type: "SET_USER",
                user: result.user
            });
        }).catch((err)=>{
            alert(err);
        })
    } 
  return (
    <div className='login__wrapper'>
    <div className='login'>
   <img src= "https://s3.amazonaws.com/freebiesupply/large/2x/whatsapp-logo-transparent.png"/>
   <h2>sign in to Whatsapp</h2>
    <button onClick={sigIn}>Login with Gmail</button>
    </div>
    </div>
  )
}

export default login;
