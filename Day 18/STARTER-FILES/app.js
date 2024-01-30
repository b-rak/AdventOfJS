const symbolsChar = "!§$%&/()=?+*#@€[]|{}^.:"
const numbersChar = "0123456789"
const lowercaseChar = "abcdefghijklmnopqrstuvwxyz"
const uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const similarChar = ["i", "l", "1", "L", "o", "0", "O"]

let symbols = true
let numbers = true
let lowercase = true
let uppercase = true
let similar = true

const makeid = (length) => {
    let result = ''
    let characters = ''
    if (symbols) {
        characters += symbolsChar
    }
    if (numbers) {
        characters += numbersChar
    }
    if (lowercase) {
        characters += lowercaseChar
    }
    if (uppercase) {
        characters += uppercaseChar
    } 
    if (similar) {
        for (const simChar of similarChar) {
            characters += simChar
        }
    } else {
        for (const simChar of similarChar) {
            characters.replace(simChar, "")
        }
    }
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
}

document.addEventListener("DOMContentLoaded", () => {
    const pwLengthInput = document.getElementById("length")
    const pwLengthText = document.getElementById("lengthText")
    const pwInput = document.getElementById("password")

    // initial password
    pwInput.value = makeid(pwLengthText.innerText)

    pwLengthInput.addEventListener("input", () => {
        pwLengthText.innerText = pwLengthInput.value
        pwInput.value = makeid(pwLengthText.innerText)
    })

    const symbolCheckbox = document.getElementById("symbols")
    const numbersCheckbox = document.getElementById("numbers")
    const lowercaseCheckbox = document.getElementById("lowercase")
    const uppercaseCheckbox = document.getElementById("uppercase")
    const similiarCheckbox = document.getElementById("similar")

    const checkboxes = document.querySelectorAll("input[type=\"checkbox\"]")
    for (const checkbox of checkboxes) {
        checkbox.addEventListener("change", () => {
            if (checkbox.id == "symbols") {
                symbols = checkbox.checked
            } else if (checkbox.id == "numbers") {
                numbers = checkbox.checked
            } else if (checkbox.id == "lowercase") {
                lowercase = checkbox.checked
            } else if (checkbox.id == "uppercase") {
                uppercase = checkbox.checked
            } else if (checkbox.id == "similar") {
                similar = checkbox.checked
            }
            pwInput.value = makeid(pwLengthText.innerText)
        })
    }

    const copyButton = document.querySelector("button.copy")
    copyButton.addEventListener("click", () => {
        copyButton.classList.add("copied")
        setTimeout(() => {
            copyButton.classList.remove("copied")
        }, 5000)
        navigator.clipboard.writeText(pwInput.value)
    })
})