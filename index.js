import menuArray from "/data.js"

function getHtmlString() {
    
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
            <button data-pizza-${id} class="btn add-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        `
    }).join("")
}

function render(){
    document.querySelector("#menu").innerHTML = getHtmlString()
}

render()

