document.addEventListener("DOMContentLoaded", () => {
    let inputValid = true

    const billInputElement = document.getElementById("bill-amount")
    const numberOfPeopleElement = document.getElementById("number-of-people")
    const tipAmountElement = document.getElementById("tip-amount")
    const totalPerPersonElement = document.getElementById("total-per-person")
    const btnCalculateElement = document.getElementById("calculate")
    const billLabelDivElement = document.querySelector(".bill-amount > .label")
    const billDivElement = document.querySelector(".bill-amount")
    const peopleLabelDivElement = document.querySelector(".number-of-people > .label")
    const peopleDivElement = document.querySelector(".number-of-people")

    billInputElement.addEventListener("input", () => {
        let regEx = /^\d+(.\d)?\d?$/
        if (!regEx.test(billInputElement.value)) {
            inputValid = false
            billInputElement.style.borderBottom = "3px dotted #ed3535"
            if (!document.querySelector(".bill-error")) {
                const errorBillInput = document.createElement("p")
                errorBillInput.textContent = "Please enter a valid value."
                errorBillInput.classList.add("bill-error")
                billDivElement.insertBefore(errorBillInput, billLabelDivElement)
            }
        } else {
            inputValid = true
            const errorElement = document.querySelector(".bill-error")
            if (errorElement) {
                billInputElement.style.borderBottom = "3px dotted #B3B3B3"
                billDivElement.removeChild(errorElement)
            }
        }
    })

    numberOfPeopleElement.addEventListener("input", () => {
        let regEx = /^[1-9][0-9]*$/
        if (!regEx.test(numberOfPeopleElement.value)) {
            inputValid = false
            numberOfPeopleElement.style.borderBottom = "3px dotted #ed3535"
            if (!document.querySelector(".people-error")) {
                const errorPeopleInput = document.createElement("p")
                errorPeopleInput.textContent = "Please enter a valid value."
                errorPeopleInput.classList.add("people-error")
                peopleDivElement.insertBefore(errorPeopleInput, peopleLabelDivElement)
            }
        } else {
            inputValid = true
            const errorElement = document.querySelector(".people-error")
            if (errorElement) {
                numberOfPeopleElement.style.borderBottom = "3px dotted #B3B3B3"
                peopleDivElement.removeChild(errorElement)
            }
        }

    })

    btnCalculateElement.addEventListener("click", () => {
        if (!inputValid) {
            alert("Check your input values again.")
        } else {
            const billValue = parseFloat(billInputElement.value) * 100
            const peopleValue = parseFloat(numberOfPeopleElement.value)
            let tip = false
            let tipPercentage = 0
            const tipButtons = document.querySelectorAll("input[type=radio]")
            for (const tipButton of tipButtons) {
                if (tipButton.checked) {
                    tip = true
                    tipPercentage = tipButton.nextElementSibling.textContent
                    tipPercentage = parseInt(tipPercentage.substring(0, tipPercentage.indexOf("%")))
                }
            }
            
            if (!tip) {
                tip = confirm("Are you sure you want to continue without any tip? If not, then please select a tip and try again.")
                if (!tip) {
                    return
                }
            }

            const billWithTip = Math.round(billValue + billValue * tipPercentage/100) / 100
            const totalPerPerson = Math.round(billWithTip *100 / peopleValue) / 100

            tipAmountElement.textContent = formatPrice(billWithTip)
            totalPerPersonElement.textContent = formatPrice(totalPerPerson)
        }
    })
})

const formatPrice = (input) => {
    input = String(input)
    if (input.indexOf(".") === -1) {
        input = input + ".00"
    } else if (input.indexOf(".") === input.length-2) {
        input = input + "0"
    }
    return input
}