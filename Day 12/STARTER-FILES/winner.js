let meWin = 0
let comWin = 0

let winner = ""

const playRPS = (selected, computer) => {
    if (selected == "Rock" && computer == "Scissors") {
        console.log("Rock wins")
        meWin++
        winner = "Me"
    } else if (selected == "Rock" && computer == "Paper") {
        console.log("Paper wins")
        comWin++
        winner = "Com"
    } else if (selected == "Paper" && computer == "Scissors") {
        console.log("Scissors wins")
        comWin++
        winner = "Com"
    } else if (selected == "Paper" && computer == "Rock") {
        console.log("Paper wins")
        meWin++
        winner = "Me"
    } else if (selected == "Scissors" && computer == "Paper") {
        console.log("Scissors wins")
        meWin++
        winner = "Me"
    } else if (selected == "Scissors" && computer == "Rock") {
        console.log("Rock wins")
        comWin++
        winner = "Com"
    } else if (selected == computer) {
        console.log("OHHHH")
        winner = "Draw"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    function change() {
        selected = localStorage.getItem("Select")
        comselect = localStorage.getItem("Com")
    
        playRPS(selected, comselect)

        const myImage = document.querySelector(".your-pick img")
        const comImage = document.querySelector(".computer-pick img")
        const winnerElement = document.querySelector("body.winner")

        console.log(winner)
        console.log(winner == "Me")
        if (winner == "Me") {
            winnerElement.classList.remove("computer-wins")
            winnerElement.classList.add("you-win")
        } else if (winner == "Com") {
            winnerElement.classList.add("computer-wins")
            winnerElement.classList.remove("you-win")
        }

        myImage.src = "./images/" + selected.toLowerCase() + ".png"
        myImage.alt = selected
        comImage.src = "./images/" + comselect.toLowerCase() + ".png"
        comImage.alt = comselect
    }
    change()
    console.log("ME:", meWin, ", COM:", comWin)
    document.querySelector("button").addEventListener("click", () => {
        window.location.href='./index.html'
    })
})
