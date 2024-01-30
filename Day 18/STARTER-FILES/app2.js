const symbolsChar = "!§$%&/()=?+*#@€[]|{}^.:"
const numbersChar = "0123456789"
const lowercaseChar = "abcdefghijklmnopqrstuvwxyz"
const uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const similarChar = ["i", "l", "1", "L", "o", "0", "O"]

const makeid = (length, symbols, numbers, lowercase, uppercase, similar) => {
    let result = ''
    let characters = symbolsChar + numbersChar + lowercaseChar + uppercaseChar
    if (!similar) {
        for (const simChar of similarChar) {
            characters = characters.replace(simChar, "")
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
    const pwLengthInput = document .getElementById("length")
    const pwLengthText = document.getElementById("lengthText")
    const pwInput = document.getElementById("password")

    // initial password
    pwInput.value = makeid(pwLengthText.innerText, true, true, true, true, true)

    pwLengthInput.addEventListener("input", () => {
        pwLengthText.innerText = pwLengthInput.value
        pwInput.value = makeid(pwLengthText.innerText,
            document.getElementById("symbols").checked,
            document.getElementById("numbers").checked,
            document.getElementById("lowercase").checked,
            document.getElementById("uppercase").checked,
            document.getElementById("similar").checked
        )
    })

    const checkboxes = document.querySelectorAll("input[type="checkbox"]")
    for (const checkbox of checkboxes) {
        checkbox.addEventListener("change", () => {
            pwInput.value = makeid(pwLengthText.innerText,
                document.getElementById("symbols").checked,
                document.getElementById("numbers").checked,
                document.getElementById("lowercase").checked,
                document.getElementById("uppercase").checked,
                document.getElementById("similar").checked
            )
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