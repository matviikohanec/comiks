async function getProduct(){
    let response = await fetch("items.json");
    let products = await response.json();
    return products;
}

function getCardHTML(product) {
    
    let productData = JSON.stringify(product)

    return `
    <div class="item">
                    <img src="img/${product.image}" alt="" class="img1">
                    <h3>${product.title}</h3>
                    <p class="itemsss">${product.price}</p>
                    <button class="cart-btn" data-poduct=${productData}>КУПИТИ</button>
                </div>
`
}


getProduct().then(function (product){
    let productsList = document.querySelector('.items')
    if (productsList) {
            product.forEach(function (product){
                productsList.innerHTML += getCardHTML(product)
            })
        }

    let buyButtons = document.querySelectorAll('.cart-btn');

    if (buyButtons) {
        buyButtons.forEach(function (button){
            button.addEventListener('click', addToCard);
        
        });
    }
})