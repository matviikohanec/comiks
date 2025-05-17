let cart_list = document.querySelector('.itemscard')
let orderBtn = document.querySelector("#orderBtn")
let orderSection = document.querySelector(".order")

console.log(cart)

function get_item(item) {
    return `<div class="itemcarddd">
    <img src="img/${item.image}" alt="" class="img1">
    <div class="">
        <h3>${item.title}</h3>
        <p class="itemsss">${item.price}грн</p>
    </div> 
</div>`
}

function showCartList() {
    cart_list.innerHTML = ''
    for (let key in cart.items) { // проходимося по всіх ключах об'єкта cart.items
        cart_list.innerHTML += get_item(cart.items[key])
    }
    cart_total.innerHTML = cart.calculateTotal()*41
}

showCartList()

cart_list.addEventListener('change', (event) => {
        let target = event.target 
        const itemTitle = target.getAttribute('data-item')
        const newQuantity = +target.value
        if (newQuantity > 0) {
            cart.updateQuantity(itemTitle, newQuantity)
            showCartList() // Оновити список товарів у кошику
        }
    });

    //анімація появи кошика поступова поява кошика
    anime({
        targets: '.cart',
        opacity: 1, // Кінцева прозорість (1 - повністю видимий)
        duration: 500, // Тривалість анімації в мілісекундах
        easing: 'easeInOutQuad'
    })

