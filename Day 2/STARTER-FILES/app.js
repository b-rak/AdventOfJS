const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti with Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
]

document.addEventListener("DOMContentLoaded", (event) => {
    const addToCartButtons = document.querySelectorAll("button.add")
    const cartSummaryElement = document.querySelector(".cart-summary")
    const panelCartElement = document.querySelector(".panel.cart")

    const checkEmptyCart = () => {
        if (cartSummaryElement.children.length === 0 ) {
            const emptyCartElement = document.createElement("p")
            emptyCartElement.classList.add("empty")
            emptyCartElement.textContent = "Your cart is empty."
            panelCartElement.insertBefore(emptyCartElement, cartSummaryElement)
        } else if (cartSummaryElement.children.length === 1 ) {
            const emptyCartElement = document.querySelector("p.empty")
            if (emptyCartElement)
                panelCartElement.removeChild(emptyCartElement)
        }
    }
    checkEmptyCart()

    const updateTotals = () => {
        const subtotalElement = document.querySelector("div.amount.price.subtotal")
        const taxElement = document.querySelector("div.amount.price.tax")
        const totalElement = document.querySelector("div.amount.price.total")
        
        let subtotal = 0, tax = 0, total = 0
        for (const listEntry of cartSummaryElement.children) {
            const itemSubtotal = listEntry.querySelector("div.subtotal")

            const quantity = parseInt(listEntry.querySelector("div.quantity").textContent)
            const menuItemName = listEntry.querySelector("p.menu-item").textContent
            let menuItemObj = getMenuItem(menuItemName)
            const price = menuItemObj.price/100
            let subtotalItem = price * quantity
            let taxItem = subtotalItem * 0.0975
            taxItem = Math.round((taxItem + Number.EPSILON) * 100) / 100
            let totalItem = subtotalItem + taxItem

            // add totals
            subtotal += subtotalItem
            tax += taxItem
            total += totalItem

            itemSubtotal.textContent = getCorrectPriceDisplay(subtotalItem)
        }
        subtotalElement.textContent = getCorrectPriceDisplay(subtotal)
        taxElement.textContent = getCorrectPriceDisplay(tax)
        totalElement.textContent = getCorrectPriceDisplay(total)
    }

    const resetCartStatus = (itemName) => {
        for (const item of document.querySelectorAll("p.menu-item")) {
            if (item.textContent !== itemName) {
                continue
            }
            const parent = item.parentElement
            parent.removeChild(item.nextElementSibling.nextElementSibling)
            const button = document.createElement("button")
            button.classList.add("add")
            button.textContent = "Add to Cart"
            button.addEventListener("click", () => addToCartCallback(button), {once: true})
            parent.appendChild(button)
        }
    }

    const addToCartCallback = (addToCartButton) => {
        addToCartButton.classList.remove("add")
        addToCartButton.classList.add("in-cart")

        addToCartButton.textContent = "In Cart"
        const imageElement = document.createElement("img")
        imageElement.src = "images/check.svg"
        imageElement.alt = "Check"
        addToCartButton.prepend(imageElement)
        let menuItem = addToCartButton.previousElementSibling.previousElementSibling.textContent
        let menuItemObj = getMenuItem(menuItem)

        //alternative: s. JS Kurs wo Html Schnipsel im separatem File und dann mit Values gefüllt wird
        itemPrice = "$" + menuItemObj.price/100
        const listItemElement = document.createElement("li")
        // plate element
        const divPlateElement = document.createElement("div")
        divPlateElement.classList.add("plate")
        const imgElement = document.createElement("img")
        imgElement.classList.add("plate")
        imgElement.src = "images/" + menuItemObj.image
        imgElement.alt = menuItemObj.alt
        const divQuantityElement = document.createElement("div")
        divQuantityElement.classList.add("quantity")
        divQuantityElement.textContent = 1
        divPlateElement.append(imgElement)
        divPlateElement.append(divQuantityElement)
        listItemElement.append(divPlateElement)
        // content
        const divContentElement = document.createElement("div")
        divContentElement.classList.add("content")
        const pMenuItemElement = document.createElement("p")
        pMenuItemElement.classList.add("menu-item")
        pMenuItemElement.textContent = menuItemObj.name
        const pPriceElement = document.createElement("p")
        pPriceElement.classList.add("price")
        pPriceElement.textContent = itemPrice
        divContentElement.append(pMenuItemElement)
        divContentElement.append(pPriceElement)
        listItemElement.append(divContentElement)
        // quantity wrapper
        const divQuanWrapperElement = document.createElement("div")
        divQuanWrapperElement.classList.add("quantity__wrapper")
        const btnDecreaseElement = document.createElement("button")
        btnDecreaseElement.classList.add("decrease")
        const btnIncreaseElement = document.createElement("button")
        btnIncreaseElement.classList.add("increase")
        const imgChevronElement = document.createElement("img")
        imgChevronElement.src = "images/chevron.svg"
        btnDecreaseElement.append(imgChevronElement)
        btnIncreaseElement.append(imgChevronElement.cloneNode(true))

        // add EventListeners to quantity elements
        btnIncreaseElement.addEventListener("click", () => {
            let itemQuantity = parseInt(divQuantityElement.textContent) + 1
            divQuantityElement.textContent = itemQuantity
            divQuanWrapperElement.querySelector("div.quantity").textContent = itemQuantity
            updateTotals()
        })
        btnDecreaseElement.addEventListener("click", () => {
            let itemQuantity = parseInt(divQuantityElement.textContent) - 1
            if (itemQuantity === 0) {
                cartSummaryElement.removeChild(btnDecreaseElement.parentNode.parentNode)
                checkEmptyCart()
                resetCartStatus(menuItemObj.name)
            } else {
                divQuantityElement.textContent = itemQuantity
                divQuanWrapperElement.querySelector("div.quantity").textContent = itemQuantity
            }
            updateTotals()
        })

        divQuanWrapperElement.append(btnDecreaseElement)
        divQuanWrapperElement.append(divQuantityElement.cloneNode(true))
        divQuanWrapperElement.append(btnIncreaseElement)
        listItemElement.append(divQuanWrapperElement)
        // subtotal
        const divSubtotalElement = document.createElement("div")
        divSubtotalElement.classList.add("subtotal")
        divSubtotalElement.textContent = itemPrice
        listItemElement.append(divSubtotalElement)
        
        cartSummaryElement.append(listItemElement)
        checkEmptyCart()
        updateTotals()

    }

    for (let addToCartButton of addToCartButtons) {
        addToCartButton.addEventListener("click", () => addToCartCallback(addToCartButton), {once: true})
    }
})

const getMenuItem = (itemName) => {
    for (let item of menuItems) {
        if (item.name === itemName) {
            return item
        }
    }
}

const getCorrectPriceDisplay = (price) => {
    price = Math.round((price + Number.EPSILON) * 100) / 100
    let priceText = "$" + price
    if (priceText.indexOf(".") === priceText.length-2) {
        priceText = priceText + "0"
    } else if (priceText.indexOf(".") === -1) {
        priceText = priceText + ".00"
    }
    return priceText
}