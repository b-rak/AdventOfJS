document.addEventListener("DOMContentLoaded", () => {
    const inputFields = document.querySelectorAll("input")
    const button = document.querySelector("button")

    for (const [index, inputField] of inputFields.entries()) {
        inputField.addEventListener("input", (event) => {
            let value = inputField.value
            if (value.length === 1) {
                let i = index + 1
                if (i < inputFields.length) {
                    inputFields[i].focus()
                }
            } else if (value.length === 0) {
                let i = index - 1
                if (i > -1) {
                    inputFields[i].focus()
                }
            }
        })
    }

    inputFields[0].addEventListener("paste", () => {
        navigator.clipboard
            .readText()
            .then((text) => {
                for (let i=0; i<text.length; i++) {
                    inputFields[i].value = text.charAt(i)
                }
                inputFields[1].blur()
            })

    })

    button.addEventListener("click", () => {
        let pin = "1234"
        let code = ""
        for (const inputField of inputFields) {
            if (inputField.value) {
                code = code + String(inputField.value)
            }
        }
        if (code !== pin) {
            alert("Your entered code is not correct...")
        }
    })
})