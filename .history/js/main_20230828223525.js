/* <Today> */
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")
let todayLocation = document.getElementById("todayLocation")
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")

let todayCondition = document.getElementById("today_condition")

let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
//< next day>
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition")

let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextDay = document.getElementsByClassName("next_day_name")

//< search>
let searchInput = document.getElementById("search")

// < API >
async function getWeatherData(cityName)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}
//  data of today
function displayTodayData(data)
{
    let todayDate = new Date()
    todayConditionText.innerHTML = data.current.condition.text

    humidity.innerHTML = data.current.humidity+"%"

    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
    todayLocation.innerHTML = data.location.name


    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)

    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()

    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
   
}
//  next day data
function displayNextData(data)
{
    let forecastData = data.forecast.forecastday
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecastData[i+1].date)

        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
      
}

async function startApp(city="london")
{
    let weatherData = await getWeatherData(city)
    if(!weatherData.error)

    {
        displayTodayData(weatherData)
        
        displayNextData(weatherData)
    }
}

startApp()
searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})