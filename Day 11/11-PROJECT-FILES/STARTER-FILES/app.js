document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll("a")
    for (const question of questions) {
        question.addEventListener("click", () => {
            question.parentNode.classList.toggle("expand")
        })
    }
})