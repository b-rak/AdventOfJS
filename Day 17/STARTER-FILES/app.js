document.addEventListener("DOMContentLoaded", () => {
    const liElements = document.querySelectorAll("ul > li")
    const links = document.querySelectorAll("ul > li > a")
    const headlines = document.querySelectorAll("h3")

    for (const link of links) {
        link.addEventListener("click", (event) => {
            for (const liElement of liElements) {
                if (liElement.classList.contains("selected")) {
                    liElement.classList.remove("selected")
                }
            }
            link.parentElement.classList.add("selected")
        })
    }

    document.addEventListener("scroll", () => {
        for (let [index, headline] of headlines.entries()) {
            const y = headline.getBoundingClientRect().y
            let ratio = 0.5
            // exception: last headline
            if (index == headlines.length - 1) {
                ratio = 0.75
            }

            if (0 < y  && y < Math.floor(window.innerHeight * ratio)) {
                let text = headline.innerText
                // exception: typo in headline
                if (text.startsWith("For the code-sa")) {
                    text = "For the code-sa"
                }
                for (const liElement of liElements) {
                    if (liElement.classList.contains("selected")) {
                        liElement.classList.remove("selected")
                    }
                }
                for (const link of links) {
                    if (link.innerText.includes(text)) {
                        link.parentElement.classList.add("selected")
                    }
                }
                break
            }
        }
    })
})