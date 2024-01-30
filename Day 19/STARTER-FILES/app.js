const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const passwordConfirmInput = document.getElementById("confirm-password")
    const showPassword = document.querySelectorAll("button.show-hide")

    const addSuccess = (siblingInput) => {
        const imgElement = document.createElement("img")
        imgElement.src = "./images/success.svg"
        imgElement.alt = "Success"

        while (siblingInput.nextSibling) {
            siblingInput = siblingInput.nextSibling
            if (siblingInput.className == "success") {
                break
            }
        }
        siblingInput.append(imgElement)
    }

    const addError = (siblingInput, errormsg) => {
        const imgElement = document.createElement("img")
        imgElement.src = "./images/error.svg"
        imgElement.alt = "Error"

        while (siblingInput.nextSibling) {
            siblingInput = siblingInput.nextSibling
            if (siblingInput.className == "error") {
                break
            }
        }
        siblingInput.append(imgElement)
        siblingInput.append(document.createTextNode(errormsg))
    }

    const clear = (siblingInput) => {
        while (siblingInput.nextSibling) {
            siblingInput = siblingInput.nextSibling
            if (siblingInput.className == "error" && siblingInput.firstChild) {
                siblingInput.removeChild(siblingInput.firstChild)
                siblingInput.removeChild(siblingInput.firstChild)
            } else if (siblingInput.className == "success" && siblingInput.firstChild) {
                siblingInput.removeChild(siblingInput.firstChild)
                break
            }
        }
    }

    nameInput.addEventListener("focusout", () => {
        clear(nameInput)
        if (nameInput.value.replace(/\s/g, "").length) {
            addSuccess(nameInput)
        } else {
            addError(nameInput, "A name is required")
        }
    })

    emailInput.addEventListener("focusout", () => {
        clear(emailInput)
        if (emailInput.value.match(emailRegex)) {
            addSuccess(emailInput)
        } else {
            let errormsg = "E-Mail has not the correct format!"
            if (!emailInput.value.replace(/\s/g, "").length) {
                errormsg = "An e-mail is required"
            }
            addError(emailInput, errormsg)
        }
    })

    for (const showPasswordElement of showPassword) {
        showPasswordElement.addEventListener("click", (event) => {
            event.preventDefault()
            if (showPasswordElement.parentElement.classList.toggle("show")) {
                showPasswordElement.previousElementSibling.previousElementSibling.type = "text"
            } else {
                showPasswordElement.previousElementSibling.previousElementSibling.type = "password"
            }
        })
    }

    passwordInput.addEventListener("focusout", () => {
        clear(passwordInput)
        if (passwordInput.value.replace(/\s/g, "").length) {
            addSuccess(passwordInput)
        } else {
            addError(passwordInput, "A password is required")
        }
        // update confirm field
        if (passwordInput.value) {
            clear(passwordConfirmInput)
            if (passwordConfirmInput.value && passwordInput.value == passwordConfirmInput.value) {
                addSuccess(passwordConfirmInput)
            } else {
                addError(passwordConfirmInput, "Passwords are not the same!")
            }
        }
    })

    passwordConfirmInput.addEventListener("focusout", () => {
        clear(passwordConfirmInput)
        if (passwordConfirmInput.value && passwordInput.value == passwordConfirmInput.value) {
            addSuccess(passwordConfirmInput)
        } else {
            addError(passwordConfirmInput, "Passwords are not the same!")
        }
    })
})  