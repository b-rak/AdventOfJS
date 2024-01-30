import { getWeatherData } from './api.js'

const daysOfWeekMap = {
    0: 'SUN', 
    1: 'MON', 
    2: 'TUES', 
    3: 'WED', 
    4: 'THUR', 
    5: 'FRI', 
    6: 'SAT'
}

const iconNameToSizeMap = {
    cloudy: { width: 264, height: 166},
    sunny: { width: 208, height: 213},
    stormy: { width: 246, height: 187},
    snowy: { width: 230, height: 196},
    'partly-cloudy': {width: 230, height:209},
    rainy: { width: 160, height: 222},
}

const weatherCodeTranslation = {
    cloudy: [3],
    sunny: [0],
    stormy: [95, 96, 99],
    snowy: [71, 73, 75, 77, 85, 86],
    'partly-cloudy': [1, 2, 45, 48],
    rainy: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]
}

document.addEventListener("DOMContentLoaded", async () => {
    const daysOfWeekElements = document.querySelectorAll(".day-of-week")
    const datesElements = document.querySelectorAll(".date")
    for (let i=0; i<7; i++) {
        let day = new Date()
        day.setDate(day.getDate()+i)
        daysOfWeekElements[i].textContent = daysOfWeekMap[day.getDay()]
        datesElements[i].textContent = day.getDate()
    }

    const weatherData = await getWeatherData()

    const barElements = document.querySelectorAll(".bar")
    const weatherImageElements = document.querySelectorAll("div.weather > svg")
    const maxTempElements = document.querySelectorAll(".temperature")
    const precipitationElements = document.querySelectorAll("div.precipitation")
    const minTempElements = document.querySelectorAll("div.low")

    for (let i=0; i<7; i++) {
        const weatherObj = weatherData.daily[i]
        const weatherCondition = getWeatherCondition(weatherObj.weathercode)
        barElements[i].className = ""
        barElements[i].className = "bar " + weatherCondition

        const width = iconNameToSizeMap[weatherCondition].width
        const height = iconNameToSizeMap[weatherCondition].height
        weatherImageElements[i].setAttribute("width", width)
        weatherImageElements[i].setAttribute("height", height)
        weatherImageElements[i].setAttribute("viewBox", "0 0 " + width + " " + height)  
        weatherImageElements[i].querySelector("use").setAttribute("xlink:href", "#" + weatherCondition)

        maxTempElements[i].textContent = Math.round(weatherObj.max_temp)
        const spanElement = document.createElement("span")
        spanElement.classList.add("degrees")
        spanElement.textContent = "°"
        maxTempElements[i].appendChild(spanElement)

        precipitationElements[i].childNodes[2].textContent = " " + weatherObj.precipitation + " mm"

        minTempElements[i].childNodes[2].textContent = weatherObj.min_temp + "°"
    }
})

const getWeatherCondition = (weathercode) => {
    for (const [key, value] of Object.entries(weatherCodeTranslation)) {
        if (value.includes(weathercode)) {
            return key
        }
    }
}