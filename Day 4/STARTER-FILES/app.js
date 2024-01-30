const exceptions = ["`", "DEL", "Tab", "CAPS"]

document.addEventListener("DOMContentLoaded", () => {
    const keyButtons = document.querySelectorAll("button")
    
    document.addEventListener("keydown", (event) => {
        const pressedKey = event.key
        const currentJiggleElement = document.querySelector("button.jiggle")
        let jiggleKey = currentJiggleElement.textContent
        if (checkIfCorrectKey(jiggleKey.toLowerCase(), pressedKey.toLowerCase())) {
            currentJiggleElement.classList.remove("jiggle")
            let random = Math.floor(Math.random() * keyButtons.length)
            const newJiggleElement = keyButtons[random]
            newJiggleElement.classList.add("jiggle")
        }
    })
})

const checkIfCorrectKey = (expected, actual) => {
    if (expected === "`") {
        return actual === "°"
    } else if (expected === "del") {
        return actual === "backspace"
    } else if (expected === "caps") {
        return actual === "capslock"
    } else {
        return expected.toLowerCase() === actual.toLowerCase()
    }
}