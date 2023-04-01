import React from 'react';
import {Link} from 'react-router-dom'
import css from '../styles/footer.module.scss'
function footer() {
  return (
    <div className={css.footer}>
    <div className={css.footer_layout}>
        <div className={css.weather}>
         <Link to={'/'}><h1>Weather</h1></Link> 
         <Link to={'/developer'}><h4>Developer</h4></Link> 
        </div>
        <div className={css.icon}>
        <Link to={'https://www.facebook.com/profile.php?id=100056550216667'} ><i className="fa fa-facebook" aria-hidden="true"></i></Link> 
        <Link to={'https://twitter.com/UsmanAl13858149'} ><i className="fa fa-twitter" aria-hidden="true"></i></Link>
        <Link to={'https://www.linkedin.com/in/usman-ali-8aa5a223b/'} ><i className="fa fa-linkedin-square" aria-hidden="true"></i></Link>
        </div>
    </div>
    <p className={css.copy}>@Copy Right 2023</p>
    </div>
  )
}

export default footer;