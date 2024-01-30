const data = [
    {
        id: 1,
        name: 'Cameron Williamson',
        email: 'cameron.wiliamson@example.com',
        title: 'Software Developer'
    },
    {
        id: 2,
        name: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        title: 'Project Manager'
    },
    {
        id: 3,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        title: 'Marketing Coordinator'
    },
    {
        id: 4,
        name: 'Wade Warren',
        email: 'wade.warren@example.com',
        title: 'Software Tester'
    },
    {
        id: 5,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        title: 'Web Designer'
    },
    {
        id: 6,
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        title: 'Marketing Coordinator'
    },
    {
        id: 7,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        title: 'Web Designer'
    },
    {
        id: 8,
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 9,
        name: 'Ralph Edwards',
        email: 'ralph.edwards@example.com',
        title: 'Software Tester'
    },
    {
        id: 10,
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 11,
        name: 'Willie Jennings',
        email: 'willie.jennings@example.com',
        title: 'Team Leader'
    },
    {
        id: 12,
        name: 'Neveah Simmons',
        email: 'neveah.simmons@example.com',
        title: 'Team Leader'
    },
    {
        id: 13,
        name: 'Theresa Webb',
        email: 'theresa.webb@example.com',
        title: 'Software Tester'
    },
    {
        id: 14,
        name: 'Debbe Baker',
        email: 'debbe.baker@example.com',
        title: 'Software Developer'
    },
    {
        id: 15,
        name: 'Ronald Richards',
        email: 'ronald.richards@example.com',
        title: 'Software Developer'
    },
    {
        id: 16,
        name: 'Deanna Curtis',
        email: 'deanna.curtis@example.com',
        title: 'Scrum Master'
    },
    {
        id: 17,
        name: 'Felicia Reid',
        email: 'felicia.reed@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 18,
        name: 'Jessie Alexander',
        email: 'jessie.alexander@example.com',
        title: 'Project Manager'
    },
    {
        id: 19,
        name: 'Sam Smith',
        email: 'sam.smith@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 20,
        name: 'Eleanor Rigby',
        email: 'eleanor.rigby@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 21,
        name: 'Devon Lane',
        email: 'devon.lane@example.com',
        title: 'Team Leader'
    },
    {
        id: 22,
        name: 'Guy Hawkins',
        email: 'guy.hawkins@example.com',
        title: 'Team Leader'
    },
    {
        id: 23,
        name: 'Jim Parks',
        email: 'jim.parks@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 24,
        name: 'Susanne Ford',
        email: 'susanne.ford@example.com',
        title: 'Software Developer Manager'
    },
    {
        id: 25,
        name: 'Kathryn Murphy',
        email: 'kathryn.murphy@example.com',
        title: 'Project Manager'
    },
    {
        id: 26,
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        title: 'Software Developer'
    },
    {
        id: 27,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        title: 'Software Tester'
    },
    {
        id: 28,
        name: 'Karen MacAfee',
        email: 'karen.macafee@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 29,
        name: 'Dianne Russell',
        email: 'dianne.russell@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 30,
        name: 'Bessie Cooper',
        email: 'bessie.cooper@example.com',
        title: 'Scrum Master'
    },
]

let currentPage = 1
document.addEventListener("DOMContentLoaded", () => {
    const tableRows = document.querySelectorAll("tbody > tr")

    const updateList = (pageNumber) => {
        currentPage = pageNumber
        for (const [index, row] of tableRows.entries()) {
            const rowId = row.querySelector("td:nth-of-type(1)")
            const rowName = row.querySelector("td.name > input")
            const rowEmail = row.querySelector("td:nth-of-type(3) > input")
            const rowTitle = row.querySelector("td:nth-of-type(4) > input")
    
            rowId.textContent = data[index + (pageNumber-1) * 10].id
            rowName.value = data[index + (pageNumber-1) * 10].name
            rowEmail.value = data[index + (pageNumber-1) * 10].email
            rowTitle.value = data[index + (pageNumber-1) * 10].title
        }
    }
    updateList(1)

    const buttonPrevious = document.getElementById("previous")
    const buttonNext = document.getElementById("next")
    const currentPageElement = document.getElementById("currentPage")

    buttonNext.addEventListener("click", () => {
        if (currentPageElement.value < 3) {
            currentPageElement.value = +currentPageElement.value + 1
            updateList(currentPageElement.value)
        }
    })

    buttonPrevious.addEventListener("click", () => {
        if (currentPageElement.value > 1) {
            currentPageElement.value = +currentPageElement.value - 1
            updateList(currentPageElement.value)
        }
    })

    const sort = (order, property) => {
        if (order !== "ascending" && order !== "descending") return
        let elements = data.filter((obj, index) => (currentPage-1)*10 <= index && index < currentPage*10)
        elements.sort((obj1, obj2) => {
            if (obj1[property] < obj2[property]) return -1
            else if (obj1[property] > obj2[property]) return 1
            else return 0
        })
        if (order === "descending") elements.reverse()
        for (let i=0; i<10; i++) {
            data[(currentPage-1)*10 + i] = elements[i]
        }
        console.log(data)
    }

    const getPropertyName = (headerElement) => {
        let heading = headerElement.textContent
        if (heading.includes("ID")) return "id"
        else if (heading.includes("Name")) return "name"
        else if (heading.includes("Email")) return "email"
        else if (heading.includes("Job")) return "title"
    }

    const headerElements = document.querySelectorAll("tr > th")
    for (const [index, headerElement] of headerElements.entries()) {
        if (index == 4) return
        headerElement.addEventListener("click", () => {
            const sortingButton = headerElement.querySelector("button")
            if (sortingButton.className.includes("ascending")) {
                sortingButton.classList.remove("ascending")
                sortingButton.classList.add("descending")
                sort("descending", getPropertyName(headerElement))
            } else if (sortingButton.className.includes("descending")) {
                sortingButton.classList.remove("descending")
            } else {
                sortingButton.classList.add("ascending")
                sort("ascending", getPropertyName(headerElement))
            }
            updateList(currentPage)
        })
    }

    //remove?
    const headerID = document.querySelector("th.header__id")
    const headerName = document.querySelector("th.header__name")
    headerID.addEventListener("click", () => {

    })
})