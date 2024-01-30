document.addEventListener("DOMContentLoaded" , () => {
    const dot = document.querySelector("#something")
    const overlay = document.querySelector("div.overlay")
    dot.addEventListener("click", () => {
        overlay.style.display = "flex"
    })

    const close = document.querySelector("button.close")
    close.addEventListener("click", () => {
        overlay.style.display = "none"
    })
})