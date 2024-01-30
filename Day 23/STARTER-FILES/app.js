let manuallyClosed = false

document.addEventListener("DOMContentLoaded", () => {
    const toasterElement = document.querySelector("div.toaster")
    const closeButton = document.getElementById("closeToaster")

    setTimeout(() => {
        toasterElement.classList.remove("collapsed")
    }, 15000)

    closeButton.addEventListener("click", () => {
        toasterElement.classList.add("collapsed")
        manuallyClosed = true
    })

    document.addEventListener("mousemove", (event) => {
        if (event.clientY < 50 && !manuallyClosed) {
            toasterElement.classList.remove("collapsed")
        }
    })
})