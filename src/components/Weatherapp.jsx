import React, { useEffect, useRef, useState } from 'react'
import './Weatherapp.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weatherapp = () => {
    const inputRef=useRef()
    const[weatherdata,setweatherdata]=useState(false);
    const allIcons={
      "01d":clear,
      "01n":clear,
      "02d":cloud,
      "02n":cloud,
      "03d":clear,
      "03n":clear,
      "04d":drizzle,
      "04n":drizzle,
      "09d":rain,
      "09n":rain,
      "10d":rain,
      "10n":rain,
      "13d":snow,
      "13n":snow,

    }
    const search= async (city)=>{
      if(city===""){
        alert("Enter city name");
        return;
      }
      try{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
        const response= await fetch(url);
        const data = await response.json();
        if(!response.ok){
          alert(data.message);
          return;
        }
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear;
        setweatherdata({
          humidity: data.main.humidity,
          windspeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,  
          icon:icon,
        });

      }catch(error){
             setweatherdata(false);
             console.error("error in fetching weather data");            
      }
    }
    useEffect(()=>{
      search("new york");
    },[])
    
    return (
    <div className='weather'>
     <div className="search-bar">
      <input ref={inputRef} type="text" placeholder='search'/>
      <img src={search_icon} alt='' onClick={()=>search(inputRef.current.value)}/>
     </div>
     {weatherdata?<>
      <img src={weatherdata.icon} alt=" " className='weather-icon'/>
      <p className='temperature'>{weatherdata.temperature}°C</p>
      <p className='location'>{weatherdata.location}</p>
      <div className="weather-data">
      <div className='col'>
       <img src={humidity} alt=" "/>
       <div>
       <p>{weatherdata.humidity}%</p>
       <span>humidity</span>
       </div>
      </div>
      <div className='col'>
       <img src={wind} alt=" "/>
       <div>
       <p>{weatherdata.windspeed} km/h</p>
       <span>wind speed</span>
      </div>
      </div>
     </div>
     </>:<></>}
     
    </div>
  )
}

export default Weatherapp;
