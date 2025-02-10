import menuArray from "/data.js"

const yourOrder = []

document.addEventListener("click", (e) => {
    if (e.target.dataset.add){
        handleAddBtn(Number(e.target.dataset.add))
    } else if (e.target.dataset.remove) {
        handleRemoveBtn(Number(e.target.dataset.remove))
    }
})

function handleAddBtn(menuItemId) {
    menuArray.forEach(item=>{
        if (item.id === menuItemId) {
            if (item.quantity === 0){
                yourOrder.push(item)
            }
            item.quantity++ 
        }
    })
    render()
}

function handleRemoveBtn(menuItemId) {
    for (let i = 0; i < yourOrder.length; i++) {
        if (yourOrder[i].id === menuItemId) {
            yourOrder[i].quantity--
            if (yourOrder[i].quantity === 0) {
                yourOrder.splice(i, 1)
            }
        }
    }
    render()
}

function getMenuHtmlString() {
    return menuArray.map(item=>{
        const {
            location,
            name,
            ingredients,
            id,
            price,
            emoji
        } = item

        return `
        <div class="container-menu">
            <img src="${location}">
            <div class="menu-item">
                <h2 class="mt0 mb0 subheading">${name}</h2>
                <p class="mb0 menu-item-ingredients">${ingredients.join(", ")}</p>
                <p class="mb0 item-amt">$${price}</p>
            </div>
            <button data-add=${id} class="btn add-btn"><i data-add=${id} class="fa-solid fa-plus"></i></button>
        </div>
        `
    }).join("")
}

function getOrderHtmlString() {
    if (yourOrder.length === 0) {
        return ""
    }
    const orderHtmlString = yourOrder.map(item=>{
        return `
        <ul class="ul-menu order-item-details">
            <li class="subheading">${item.name}</li>
            <li class="item-qty">x${item.quantity}</li>
            <li data-remove="${item.id}" role="button" aria-label="button" class="btn order-item-remove">remove</li>
            <li class="order-item-amt item-amt">$${item.price}</li>
        </ul>
        `
    })
    orderHtmlString.unshift(`<h2 class="order-title mt0 subheading">Your order</h2>`)
    return orderHtmlString.join("")
}

function getTotalPriceHtmlString() {
    if (yourOrder.length === 0) {
        return ""
    }
    const totalPrice = yourOrder.reduce((total, cur)=>total + Number(cur.price) * Number(cur.quantity), 0)
    return `
    <ul class="ul-menu total-price">
        <li class="subheading">Total price:</li>
        <li class="item-amt">$${totalPrice}</li>
    </ul>
    `
}

function getBtnHtmlString() {
    if (yourOrder.length === 0) {
        return ""
    }
    return `<button class="btn btn-big btn-complete-order">Complete Order</button>`
}

function render() {
    document.querySelector("#menu").innerHTML = getMenuHtmlString()
    document.querySelector("#container-order").innerHTML = getOrderHtmlString()
    document.querySelector("#total-price").innerHTML = getTotalPriceHtmlString()
    document.querySelector("#complete-order").innerHTML = getBtnHtmlString()
}

render()
