import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import css from '../styles/Developer.module.scss';
import img from '../assets/weather.jpeg';
import Facebook from '../assets/facebook.svg';
import Twitter from '../assets/twitter.svg';
import Linkdin from '../assets/linkdin.svg';
class Developer extends Component {
  render() {
    return (
      <div className={css.container}>
      <div className={css.main}>
        <h1>Who I Am </h1>
        <div className={css.content}>
            <p>Welcome in my about My Name is Usman Ali I'm Student of Computer as well as MERN Stack Developer. I have started my journey with MERN from 2020 and I'm doing right now as well </p>
        </div>
        <img src={img} alt='_blank'/>
        <div className={css.social}>
        <Link to={'https://www.facebook.com/profile.php?id=100056550216667'}><img src={Facebook}/></Link>
        <Link to={'https://twitter.com/UsmanAl13858149'}><img src={Twitter} /></Link>
        <Link to={'https://www.linkedin.com/in/usman-ali-8aa5a223b/'}><img src={Linkdin} /></Link>

        
        </div>
      </div>
      </div>
    )
  }
}

export default Developer
