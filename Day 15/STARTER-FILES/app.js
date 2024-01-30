document.addEventListener("DOMContentLoaded", () => {
    const videoListElement = document.querySelector("ul")
    const items = sampleAPIResponse.items

    for (const item of items) {
        // create list element
        const liElement = document.createElement("li")
        const aElement = document.createElement("a")
        aElement.classList.add("video")
        const imgElement = document.createElement("img")
        imgElement.src = item["snippet"]["thumbnails"]["default"]["url"]
        imgElement.alt = item["snippet"]["title"]
        const headlineElement = document.createElement("h3")
        headlineElement.textContent = item["snippet"]["title"]

        aElement.appendChild(imgElement)
        aElement.appendChild(headlineElement)
        liElement.appendChild(aElement)

        // change main video information when video from list is selected
        liElement.addEventListener("click", () => {
            const iframe = document.querySelector("div.feature iframe")
            const bigHeadline = document.querySelector("div.feature > h1")
            const description = document.querySelector("div.feature > p")

            const vidId = item["snippet"]["thumbnails"]["default"]["url"].split("/")
            console.log(vidId)
            iframe.src = "https://www.youtube.com/embed/" + vidId[4]
            bigHeadline.textContent = item["snippet"]["title"]
            description.textContent = item["snippet"]["description"]
        })

        videoListElement.appendChild(liElement)
    }
})