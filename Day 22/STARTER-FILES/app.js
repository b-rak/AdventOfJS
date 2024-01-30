document.addEventListener("DOMContentLoaded", () => {
    const creditCardWrapperElement = document.querySelector(".credit-card__wrapper")
    const creditCardNumber = document.querySelector("input[name=card-number]")
    const cvvInput = document.querySelector("input[name=cvv]")

    const updateClass = (className) => {
        creditCardWrapperElement.classList.remove("american")
        creditCardWrapperElement.classList.remove("visa")
        creditCardWrapperElement.classList.remove("mstercard")
        creditCardWrapperElement.classList.remove("discover")
        creditCardWrapperElement.classList.add(className)
    }

    creditCardNumber.addEventListener("blur", () => {
        let cardNumber = "" + creditCardNumber.value
        let cardType = ""
        if (cardNumber.startsWith("3")) {
            cardType = "american"
        } else if (cardNumber.startsWith("4")) {
            cardType = "visa"
        } else if (cardNumber.startsWith("5")) {
            cardType = "mastercard"
        } else if (cardNumber.startsWith("6")) {
            cardType = "discover"
        }
        if (cardType !== "") updateClass(cardType)
    })

    cvvInput.addEventListener("focus", () => {
        creditCardWrapperElement.classList.add("flip")
    })

    cvvInput.addEventListener("blur", () => {
        creditCardWrapperElement.classList.remove("flip")
    })
})