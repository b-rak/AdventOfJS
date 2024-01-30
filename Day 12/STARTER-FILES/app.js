const rps = ["Rock", "Paper", "Scissors"]

const selectPick = () => {
    return rps[Math.floor(Math.random() * rps.length)]
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button")
    for (const button of buttons) {
        button.addEventListener("click", () => {
            const selected = button.querySelector("img").alt
            console.log("Selected:", selected)
            let computer = selectPick()
            while (computer == selected) {
                computer = selectPick()
            }
            console.log("Computer:", computer)

            localStorage.setItem("Select", selected)
            localStorage.setItem("Com", computer)
            window.location.href='./winner.html'
        })
    }
})