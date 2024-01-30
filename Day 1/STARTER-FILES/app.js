document.addEventListener("DOMContentLoaded", () => {
    const minutesInput = document.querySelector(".minutes input")
    const secondsInput = document.querySelector(".seconds input")
    const startButton = document.querySelector(".start")
    const ringElement = document.querySelector(".ring")
    const timerElement = document.querySelector(".timer")
    const settingsElement = document.querySelector(".settings")
    
    let intervalId
    let running = false
    let minutes = minutesInput.value
    let seconds = secondsInput.value
    
    const stopButton = document.createElement("button")
    stopButton.classList.add("stop")
    stopButton.textContent = "stop"
    stopButton.addEventListener("click", async (event) => stopTimer())

    startButton.addEventListener("click", async (event) => {
        running = true
        ringElement.classList.remove("ending")
        minutesInput.disabled = true
        secondsInput.disabled = true
        timerElement.replaceChild(stopButton, startButton)
        let array = [minutes, seconds]
        intervalId = setInterval(async () => {
            array = runTimer(array[0], array[1])
            minutesInput.value = setTimeEntry(array[0])
            secondsInput.value = setTimeEntry(array[1])
            console.log(array)
            if (array[0] == 0 && array[1] == 0) {
                ringElement.classList.add("ending")
                stopTimer()
                await delay(10)
                alert("Time`s up!")
            }
        }, 1000)
    })

    minutesInput.addEventListener("input", () => {
        minutesInput.value = minutesInput.value.replaceAll(/[^0-9]/g, "")
        minutes = parseInt(minutesInput.value)
    })

    secondsInput.addEventListener("input", () => {
        secondsInput.value = secondsInput.value.replaceAll(/[^0-9]/g, "")
        seconds = parseInt(secondsInput.value)
    })

    settingsElement.addEventListener("click", () => {
        if (minutesInput.disabled === true) {
            minutesInput.disabled = false
            secondsInput.disabled = false
        } else {
            minutesInput.disabled = true
            secondsInput.disabled = true
        }
        stopTimer()
    })

    const stopTimer = () => {
        if (running === true) {
            startButton.textContent = "start"
            clearInterval(intervalId)
            timerElement.replaceChild(startButton, stopButton)
            running = false
        }
        minutes = parseInt(minutesInput.value)
        seconds = parseInt(secondsInput.value)
    }
})

const runTimer = (minutes, seconds) => {
    console.log("Minutes:", minutes, "Seconds:", seconds)
    if (seconds > 0) {
        return [minutes, seconds-1]
    } else {
        if (minutes > 0) {
            return [minutes-1, 59]
        } else {
                return [0, 0]
        }
    }
}

const setTimeEntry = (input) => {
    if (input > 9) {
        return input
    } else {
        return "0" + input
    }
}

async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms))
}