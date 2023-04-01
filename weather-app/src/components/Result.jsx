import React, { Component } from 'react'
import css from '../styles/Result.module.scss';
import sunrise from '../assets/sunrise1.svg';
import sunset from '../assets/sunset.svg';
export class Result extends Component {
    constructor(props) {
      super(props)
      this.state={
      temp: '',
      C_val: '',
      F_val: '',
      id: ''
      }
    }

  fahrent=()=>{
    if(this.state.F_val == 'F'){
        let fahrent = this.state.temp * 9/5 + 32 ;
        let fah=fahrent.toFixed();
     this.setState({fah:"black"  , temp : fah, C_val:'F', F_val:'C' });
    } else if(this.state.F_val=='C'){
        let celcius =  5/9 * (this.state.temp-32);
        this.setState({fah:"black"  , temp : celcius.toFixed(), C_val:'C', F_val:'F'});
    }
  }

static getDerivedStateFromProps(props, state){
let temp = props.weatherData.main.temp -273.15;
if(!state.temp){
    return {
        temp: temp.toFixed(),
        C_val: 'C',
        F_val:'F',
        id: props.weatherData.id
    }
}else if(props.weatherData.id !== state.id){
    return {
      temp:temp.toFixed(),
      id:props.weatherData.id
    }
  }
  return null;
}
  render() {
    let style_cel={
    color: 'black',
    cursor: 'pointer',
    }
    let style_fah = {
        color: 'white',
        cursor: 'pointer'
    }

    return (
    <>
    <div className= {css.result}>
     <div className={css.temp}>
     <h2 className={css.description}>{this.props.weatherData.weather[0].main}</h2>
     <img src={`http://openweathermap.org/img/wn/${this.props.icon_id}@2x.png`}  />
     <h1>{this.state.temp}<span style={style_cel} >°{this.state.C_val}</span>/<span style={style_fah} onClick={this.fahrent}>{this.state.F_val}</span></h1>
     </div>
     <div className={css.sun_rs}>
        <div>
        <h1>sunrise</h1>
        <img  className={css.sun} src={sunrise}></img>
          <h2>{this.props.sunrise}</h2>
        </div>
        <div>
        <h1>sunset</h1>
          <img className={css.sun} src={sunset}></img>
          <h2>{this.props.sunset}</h2>
        </div>
    </div>
    </div>
    </>
    )
  }
}

export default Result;