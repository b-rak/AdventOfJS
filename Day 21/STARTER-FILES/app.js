let income = 0
let expenses = 0
let loc = "en-US"

document.addEventListener("DOMContentLoaded", () => {
    const budgetAmountInput = document.querySelector("#income")

    // summary information
    const incomeElement = document.querySelector(".summary-item:nth-of-type(1) > .summary-amount")
    const expenseElement = document.querySelector(".summary-item:nth-of-type(2) > .summary-amount")
    const balanceElement = document.querySelector(".summary-item:nth-of-type(3) > .summary-amount")

    // add expense
    const expenseName = document.querySelector("#expense-name")
    const expenseAmount = document.querySelector("#expense-amount")
    const addButton = document.querySelector("#add-expense-button")

    const expensesList = document.querySelector(".expense-table")

    const updateSummary = () => {
        incomeElement.textContent = "$" + format(round(income, 2))
        expenseElement.textContent = "$" + format(round(expenses, 2))
        
        let balance = income - expenses
        balanceElement.textContent = "$" + format(round(balance, 2))
        if (balance >= 0) {
            balanceElement.style.color = "#4CA536"
        } else {
            balanceElement.style.color = "#DF1414"
        }
    }

    const calculateSum = () => {
        expenses = 0
        const expenseAmountElements = document.querySelectorAll(".expense-table > div:nth-of-type(3n+2)")
        for (const expense of expenseAmountElements) {
            expenses += +expense.textContent.substring(1)
        }
    }

    budgetAmountInput.addEventListener("blur", () => {
        income = budgetAmountInput.value
        updateSummary(income)
    })

    addButton.addEventListener("click", () => {
        //create expense element
        const exNameDiv = document.createElement("div")
        const exAmountDiv = document.createElement("div")
        const deleteDiv = document.createElement("div")
        const deleteButton = document.createElement("button")
        const deleteImg = document.createElement("img")

        exNameDiv.textContent = expenseName.value
        exAmountDiv.textContent = "$" + format(round(expenseAmount.value, 2))

        deleteDiv.classList.add("delete")
        deleteDiv.addEventListener("click", () => {
            expensesList.removeChild(exNameDiv)
            expensesList.removeChild(exAmountDiv)
            expensesList.removeChild(deleteDiv)
            calculateSum()
            updateSummary()
        })

        deleteButton.name="delete-expense"
        deleteButton.classList.add("delete-expense")
        deleteImg.src = "./images/trash.svg"
        deleteImg.alt = "Trash"

        deleteButton.appendChild(deleteImg)
        deleteDiv.appendChild(deleteButton)

        expensesList.appendChild(exNameDiv)
        expensesList.appendChild(exAmountDiv)
        expensesList.appendChild(deleteDiv)

        calculateSum()
        updateSummary()
    })
})


const formatPrice = (price) => {
    price = "" + price
    const length = price.length
    
    let n = Math.floor((length-2)/3)
    let mod = (length-2) % 3

    let result = ""
    for (let i=0; i<mod; i++) {
        result = result + price.charAt(i)
    }
    for (let i=0; i<n; i++) {
        if (mod == 0 && i == 0) {
            result = result + price.substring(mod+3*i, mod+3*i+3)    
        } else {
            result = result + "." + price.substring(mod+3*i, mod+3*i+3)
        }
    }
    result = result + "," + price.substring(price.length-2)
    return result
}

const round = (value, decimals) => {
    return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals).toFixed(decimals)
} 

const format = (num) => {
    return num.toLocaleString(loc, {style:"currency", currency:"USD"})
}

