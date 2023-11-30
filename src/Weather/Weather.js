import React, { useEffect, useState } from "react";
import "./weather.scss";
import bg from "./img/weather-2.jpg";

export default function Weather() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const wheatherValue = {
    url: "https://api.openweathermap.org/data/2.5/",
    appid: "9140380415ce30a751b279e449096e79",
  };
  const cityId = "707471";

  // get date
  const date = new Date().toLocaleDateString()
  const dateFormat = `${date[0]+date[1]}.${date[3]+date[4]}.${date[8]+date[9]}`

  // Get Weather API
  let empty = null
  useEffect(() => {
    fetch(
      `${wheatherValue.url}weather?id=${cityId}&appid=${wheatherValue.appid}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  
  // run animation count
  const runCount = (toCount) => {
    let step = 1;
    let time = 50;
    const inCelsius = Math.round(toCount - 273.15);
    let toNum = Math.abs(inCelsius);
    if (count <= toNum) {
      setTimeout(() => {
        setCount(count + step);
      }, time);
    }
    return count - 1
  };

  // function change box-shadow weather
  const boxShadow = (value)=>{
    if(value === 'Clear'){
      return 'weather-wrapp clear'
    } 
    else if(value === 'Rain'){
      return 'weather-wrapp rain' 
    }
    else if(value === 'Drizzle'){
     return 'weather-wrapp rain'
    }
    else if(value === 'Thunderstorm'){
      return 'weather-wrapp storm' 
    }
    else if(value === 'Snow'){
      return 'weather-wrapp snow' 
    }
    else if(value === 'Clouds'){
      return 'weather-wrapp cloud'
    }
     else return 'weather-wrapp'
  }
  
  if (error) {
    return (
      <section className="section-full">
        <div className="bg-wrapp">
          <img className="bg-full" src={bg} alt="" />
        </div>
        <div className="weather-block">
          <div className="weather-wrapp">
            <div className="weather-top"></div>
            <div className="weather-general-info">
              <div className="temp">
                <h4>Error: {error.message}</h4>
              </div>
            </div>
            <div className="weather-bottom"></div>
          </div>
        </div>
      </section>
    );
  } else if (!isLoaded) {
    return (
      <section className="section-full">
        <div className="bg-wrapp">
          <img className="bg-full" src={bg} alt="bg-img" />
        </div>
        <div className="weather-block">
          <div className="weather-wrapp">
            <div className="weather-top"></div>
            <div className="weather-general-info">
              <div className="temp">
                <h1>Loading...</h1>
                <h4>Все буде Україна...</h4>
              </div>
            </div>
            <div className="weather-bottom"></div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="section-full">
        <div className="bg-wrapp">
          <img className="bg-full" src={bg} alt="" />
        </div>
        <div className="weather-block">
          <div className={boxShadow(items.weather[0].main)}>
            <div className="weather-top">
              <div className="weather-date">
                <h4 className="weather-date-info">{dateFormat}</h4>
                <div className="city-wrapp">
                  <h2 className="weather-city">{items.name}</h2>
                  <div className="weather-cloud-info">
                    <img src={`http://openweathermap.org/img/wn/${items.weather[0].icon}@2x.png`}/>
                    <h6>{items.weather[0].main}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="weather-general-info">
              <div className="humidity">
                <h6>Humidity:</h6>
                <h3>{items.main.humidity}%</h3>
              </div>
              <div className="temp">
                <h1 className="temp-title">
                  {items.main.temp < 273.15 ? "-" : ""}
                  {runCount(items.main.temp)}&deg;
                </h1>
              </div>
              <div className="wind-speed">
                <h6>Wind speed:</h6>
                <h3>{Math.round(items.wind.speed)} m/s</h3>
              </div>
            </div>
            <div className="weather-bottom">
              <p className="feel">
                Feel Like: {Math.round(items.main.feels_like - 273.15)}&deg;
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

}
