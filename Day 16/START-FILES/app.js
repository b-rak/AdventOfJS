document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll("a.star")
    const rating = document.querySelector(".star-rating")

    for (const star of stars) {
        star.addEventListener("mouseover", () => {
            rating.className = "star-rating " + star.className.split(" ")[1]
        })
    }
})