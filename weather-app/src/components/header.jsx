import React from 'react';
import header_css from '../styles/header.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Menu from '../assets/menu.svg';


function header() {
  let style={
    display:'none'
  };
  const [state, setState] = useState(false);
  state ? style.display='flex' : style.display='none';
  if(innerWidth>753){
    if(!state){
    setState(true);
    }
  }

  return (
    <div className= {header_css.container}>
    <div className={header_css.header}>
    <div className={header_css.menu}>
     <Link to={'/'}><h1>Weather</h1></Link>
     <button type='button' onClick={()=>setState(!state)} ><img src="https://img.icons8.com/ios-filled/50/null/menu-rounded.png"/></button>
     </div>
      <div style={style} className={header_css.link}>
      <Link to={'/'}><h3>Weather</h3></Link>
      <Link to={'/developer'}><h3>Developer</h3></Link>
      <Link to={'/signup'}><h3>Signup</h3></Link>
      <Link to={'/login'}><h3>Login</h3></Link>
      </div>
    </div>
    </div>
  )
}

export default header;