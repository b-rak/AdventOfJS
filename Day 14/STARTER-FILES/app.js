const date = new Date()
let currentDate = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    fullMonth: date.toLocaleDateString("en-GB", {month: "long"})
}

positions = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
}

const getDateInfo = (currentDate, index) => {
    const date = new Date(currentDate.year, currentDate.month+index, currentDate.day)
    return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        fullMonth: date.toLocaleDateString("en-GB", {month: "long"})
    }
}

const clearMonth = (days) => {
    for(let i=0; i<days.length; i++) {
        days[i].textContent = ""
        days[i].className = ""
    }
}

const displayMonth = (days, currentDate) => {
    const numberOfDays = new Date(currentDate.year, currentDate.month+1, 0).getDate()
    const firstDay = new Date(currentDate.year, currentDate.month, 1).toLocaleDateString("en-GB", {weekday: "long"})
    console.log("NUMBER:", numberOfDays)

    const date = new Date()
    const today = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    }

    const startIndex = positions[firstDay]
    let counter = 1

    console.log(startIndex+numberOfDays)
    console.log(days.length)
    for (let i=startIndex; i<=startIndex+numberOfDays-1; i++) {
        const calendarDay = days[i]
        calendarDay.textContent = counter
        counter++
        if (calendarDay.textContent == currentDate.day && currentDate.day == today.day && currentDate.month == today.month && currentDate.year == today.year) {
            calendarDay.classList.add("today")
        }
    }
}

const exceed = () => {
    const numberOfDays = new Date(currentDate.year, currentDate.month+1, 0).getDate()
    const firstDay = new Date(currentDate.year, currentDate.month, 1).toLocaleDateString("en-GB", {weekday: "long"})
    if (positions[firstDay]+numberOfDays > 35) {
        return true
    } else {
        console.log("!")
        return false
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let days = document.querySelectorAll("div:not([class]), div.today")
    clearMonth(days)
    console.log(days)
    const month = document.querySelector(".month")
    month.textContent = currentDate.fullMonth

    const wrapperElement = document.querySelector("div.wrapper")
    const adaptFields = () => {
        if (exceed() && days.length == 35) {
            for (let i=0; i<7; i++) {
                const divElement = document.createElement("div")
                divElement.className = ""
                wrapperElement.appendChild(divElement)
            }
        } else if (!exceed() && days.length == 42) {
            for (let i=6; i>=0; i--) {
                wrapperElement.removeChild(days[35+i])
            }
        }
        days = document.querySelectorAll("div[class=\"\"], div.today")
    }
    adaptFields()
    displayMonth(days, currentDate)

    const next = document.querySelector("div.next > img")
    const previous = document.querySelector("div.previous > img")

    next.addEventListener("click", () => {
        clearMonth(days)
        currentDate = getDateInfo(currentDate, 1)
        month.textContent = currentDate.fullMonth
        adaptFields()
        displayMonth(days, currentDate)
    })

    previous.addEventListener("click", () => {
        clearMonth(days)
        currentDate = getDateInfo(currentDate, -1)
        month.textContent = currentDate.fullMonth
        adaptFields()
        displayMonth(days, currentDate)
    })
})