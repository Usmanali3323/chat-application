import React, { Component } from "react";
import Search from "./search";
import Axios from "axios";
import Result from "./Result";
import Loader from "./loader";
class weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      lat: "",
      lon: "",
      weatherData: null,
      temp: "",
      datacity: false,
      direction: false,
      cityaut: "",
      sunrise: "",
      sunset: "",
    };
  }




locationHandler = () => {
    this.setState({
      lat: "",
      lon: "",
      direction: true,
      datacity: false,
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        this.setState({
          lat: res.coords.latitude,
          lon: res.coords.longitude,
        });
      },(err)=>{
        if(err){
          this.setState({lat:33.738045, lon:73.125 });
          alert("please allow us to get your location ..")
        }
      });
    }else{
      console.log("geolocation is off .....");
    }
  };




componentDidMount(prop, state) {
    if (!this.state.lat && !this.state.lon) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((res) => {
          this.setState({
            lat: res.coords.latitude,
            lon: res.coords.longitude,
            direction: true,
          } )
        },(err)=>{
          this.setState({
            lat:33.738045,
            lon: 73.125,
            direction: true,
          },(err)=>{
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=cf51d9f4093ca4e00f63057f383f75e4`
      )
        .then((res) => {
          let d1 = new Date(res.data.sys.sunrise * 1000);
          let d2 = new Date(res.data.sys.sunset * 1000);
          let sunset = d2.toLocaleTimeString();
          let sunrise = d1.toLocaleTimeString();
          this.setState({
            weatherData: res.data,
            city: res.data.name,
            sunrise: sunrise,
            sunset: sunset,
            direction: true,
          });
        })
        .catch((err) =>
          console.log(err)
        );
      })
        });
      }
  }
}




  componentDidUpdate(props, state) {
    if (state.lat != this.state.lat && state.lon != this.state.lon) {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=cf51d9f4093ca4e00f63057f383f75e4`
      )
        .then((res) => {

          let d1 = new Date(res.data.sys.sunrise * 1000);
          let d2 = new Date(res.data.sys.sunset * 1000);
          let sunset = d2.toLocaleTimeString();
          let sunrise = d1.toLocaleTimeString();
          this.setState({
            weatherData: res.data,
            city: res.data.name,
            sunrise: sunrise,
            sunset: sunset,
          });
        })
        .catch((err) =>
          console.log( err)
        );
    } else if (
      this.state.city == state.city &&
      this.state.city !== this.state.cityaut
    ) {
      this.setState({ cityaut: this.state.city });
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=cf51d9f4093ca4e00f63057f383f75e4`
      )
        .then((res) => {
          let d1 = new Date(res.data.sys.sunrise * 1000);
          let d2 = new Date(res.data.sys.sunset * 1000);
          let sunset = d2.toLocaleTimeString();
          let sunrise = d1.toLocaleTimeString();
          this.setState({
            weatherData: res.data,
            lat: res.data.coord.lat,
            lon: res.data.coord.lon,
            sunrise: sunrise,
            sunset: sunset,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ datacity: false });
        });
    }
  }



cityHandler = (event) => {
    this.setState({ direction: false, datacity: true });
    event.preventDefault();
  };





changeHandler = (event) => {
    let name = event.target.name;
    if (name == "city") {
      this.setState({ city: event.target.value });
    } else if (name == "lat") {
      this.setState({ lat: event.target.value });
    } else if (name == "lon") {
      this.setState({ lon: event.target.value });
    }
  };


searchHandler=(event)=>{
    event.preventDefault();
    let lat = event.target.lat.value;
    let lon = event.target.lon.value;
    this.setState({ direction: true, datacity:false, lat:lat,
      lon:lon
    });
    if (lat && lon) {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=cf51d9f4093ca4e00f63057f383f75e4`
      )
        .then((res) => {
          let d1 = new Date(res.data.sys.sunrise * 1000);
          let d2 = new Date(res.data.sys.sunset * 1000);
          let sunset = d2.toLocaleTimeString();
          let sunrise = d1.toLocaleTimeString();
          this.setState({
            weatherData: res.data,
            city: res.data.name,
            sunrise: sunrise,
            sunset: sunset,
          });
        })
        .catch((err) =>
          console.log( err)
        );
    }
  }



render() {
    return (
      <>
        <Search
          click={this.locationHandler}
          changeHandler={this.changeHandler}
          city={this.state.city}
          lat={this.state.lat}
          lon={this.state.lon}
          searchHandler={this.searchHandler}
          cityHandler={this.cityHandler}
        />
        {this.state.weatherData==null ? <Loader/> : <h1></h1>}

         {this.state.direction && this.state.weatherData ? (
          <Result
            weatherData={this.state.weatherData}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            icon_id={this.state.weatherData.weather[0].icon}
          />
        ) : (
          <h1></h1>
        )}
        {this.state.datacity && this.state.weatherData ? (
          <Result
            weatherData={this.state.weatherData}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            icon_id={this.state.weatherData.weather[0].icon}
          />
        ) : (
          <h1></h1>
        )}
      
      </>
    );
  }
}

export default weather;
