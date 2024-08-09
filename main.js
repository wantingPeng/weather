
import { getWeather } from "./weather";
getWeather(10,10,Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(error => {
  console.error(error)
  alert('There was an error making the request!')
})
 function renderWeather({current, daily, hourly}){
  renderCurrent(current)
/*   renderDaily(daily)
  renderHourly(hourly) */
 }
 function renderCurrent(current){
  document.querySelector(`[data-current-temp]`).textContent=current.currenTemp
 }
