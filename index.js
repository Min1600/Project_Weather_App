const input = document.getElementById("location")
const loading = document.getElementById("loading")
const date = new Date()
const info = document.getElementById("content")
const today = document.getElementById("today")
const time = document.getElementById("time")
const temp = document.getElementById("temp")
const feelsLike = document.getElementById("feelslike")
const windSpeed = document.getElementById("windspeed")
const conditions = document.getElementById("conditions")
const description = document.getElementById("description")
const humidity = document.getElementById("humidity")
const visibility =  document.getElementById("visibility")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const dates = document.getElementById("date")

async function getWeather(){
    try{
    let location = input.value
    let weather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today/${dates.value}?key=J64MLJBWW7LM9UDMEY5GSBMR9`
    const response = await fetch(weather, {mode: 'cors'})
    const data = await response.json()
    hideLoading()
    return data
    }catch(error){
        alert("404 ERROR")
    }
    }

    function displayLoading (){
loading.style.display = "block"
    }

    function hideLoading(){
        loading.style.display = "none"
    }

    async function displayTodayData(){
        displayLoading()
        const weatherData = await getWeather()
        today.textContent = date.toDateString();
        time.textContent = weatherData.currentConditions.datetime
        temp.textContent = Math.round((weatherData.currentConditions.temp -32)*5/9) + "°C"
        conditions.textContent = weatherData.currentConditions.conditions
        windSpeed.textContent = "Wind Speed: " + weatherData.currentConditions.windspeed + " mph"
        visibility.textContent = "visibility: " + weatherData.currentConditions.visibility + " mi"
        humidity.textContent = "humidity: " + weatherData.currentConditions.humidity + "%"
        feelsLike.textContent = "Feels like: " + Math.round((weatherData.currentConditions.feelslike -32)*5/9) + "°C"
        sunrise.textContent = "Sunrise: " + weatherData.currentConditions.sunrise
        sunset.textContent = "Sunset: " + weatherData.currentConditions.sunset
        description.textContent = "Description: " +  weatherData.days[0].description
    }

    async function displayData(x){
        displayLoading()
        const weatherData = await getWeather()
        today.textContent = weatherData.days[x].datetime
        time.textContent = ""
        temp.textContent =  Math.round((weatherData.days[x].temp -32)*5/9) + "°C"
        conditions.textContent = weatherData.days[x].conditions
        windSpeed.textContent = "Wind Speed: " + weatherData.days[x].windspeed + " mph"
        visibility.textContent = "visibility: " + weatherData.days[x].visibility + " mi"
        humidity.textContent = "humidity: " + weatherData.days[x].humidity + "%"
        feelsLike.textContent = "Feels like: " + Math.round((weatherData.days[x].feelslike -32)*5/9) + "°C"
        sunrise.textContent = "Sunrise: " + weatherData.days[x].sunrise
        sunset.textContent = "Sunset: " + weatherData.days[x].sunset
        description.textContent = "Description: " +  weatherData.days[0].description
    }

   async function findDate(){
        const weatherData = await getWeather()
        for(let i=0; i<weatherData.days.length; i++){
      if(dates.value){
        if(weatherData.days[i].datetime === dates.value){

            displayData(i)
        }}else{

            displayTodayData()
        }
    }}