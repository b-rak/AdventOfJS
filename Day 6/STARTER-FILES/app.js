document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.querySelector("input")
    const spanElement = document.querySelector("span.dollars")
    inputElement.addEventListener("input", () => {
        let dollarValue = "" + inputElement.value / 100
        if (dollarValue.indexOf(".") === -1) {
            dollarValue = dollarValue + ".00"
        } else if (dollarValue.indexOf(".") === dollarValue.length-2) {
            dollarValue = dollarValue + "0"
        }
        spanElement.textContent = dollarValue
    })
})