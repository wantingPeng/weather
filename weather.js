/* 
https://api.open-meteo.com/v1/forecast?&hourly
=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&
daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max
,apparent_temperature_min,precipitation_sum&wind_speed_unit=mph&precipitation_unit
=inch&timeformat=unixtime
*/
import axios from "axios";
export function getWeather(lat,lon,timezone){
return axios.get('https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime',{
  params:{
    latitude:lat,
    longitude:lon,
    timezone:timezone
  }
}) .then(({data})=>{//!!!!!!{data} not data
  /*  return data  */
 return {
  current:parseCurrentWeather(data),
   daily:parseDailyWeather(data),
  hourly:parseHourlyWeather(data),  
}
}
)
}
function parseCurrentWeather({current,daily}){
  const {temperature_2m:currenTemp,///currenTemp=current_weather.temperature_2m
     weather_code,
    wind_speed_10m: windSpeed,
  }=current;
  const{
    apparent_temperature_max:[highFeelsLike],//highFeelsLike=daily.apparent_temperature_max[0]
    apparent_temperature_min:[lowFeelsLike],
    temperature_2m_max:[highTemp],
    temperature_2m_min:[lowTemp],
    precipitation_sum:precip,
  }=daily

return {
  currenTemp:Math.round(currenTemp),
  highTemp:Math.round(highTemp),
  lowTemp: Math.round(lowTemp),
  highFeelsLike: Math.round(highFeelsLike),
  lowFeelsLike : Math.round(lowFeelsLike),
  windSpeed: Math.round(windSpeed),
  precip:Math.round(precip*100)/100,
  weather_code, 
} 
} 

function parseDailyWeather({daily}){
return daily.time.map((time,index)=>{
  return {
    timestamp:time*1000,
    weather_code:daily.weather_code[index],
    highTemp:Math.round(daily.temperature_2m_max[index])
  }
})
}

function parseHourlyWeather({hourly, current}){
  return hourly.time.map((time, index)=>{
    return{
      timestamp:time*1000,
      weather_code:hourly.weather_code[index],
      FeelsLike:Math.round(hourly.apparent_temperature[index]),
      temp:Math.round(hourly.temperature_2m[index]),
      precip:Math.round(hourly.precipitation[index]*100)/100,
      windSpeed:Math.round(hourly.wind_speed_10m[index])

    }
  }).filter(({timestamp})=>timestamp>=current.time*1000)//the return of map are array but the content of array is object
}