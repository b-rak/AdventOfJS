document.addEventListener("DOMContentLoaded", () => {
    const pianoKeys = document.querySelectorAll("a[href='#']")
    for (const [index, pianoKey] of pianoKeys.entries()) {
        pianoKey.addEventListener("click", () => {
            const audioElement = new Audio("./audio/key-" + (index+1) + ".mp3")
            audioElement.play()
        })
    }
})