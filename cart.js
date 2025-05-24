// Отримуємо кошик з cookies або створюємо новий
function getCartFromCookies() {
    let cartCookie = getCookieValue('cart');
    if (cartCookie && cartCookie !== '') {
        return JSON.parse(cartCookie);
    }
    return {};
}

let cartItems = getCartFromCookies();
let cartTotal = 0;

let cart_list = document.querySelector('.itemscard');
let orderBtn = document.querySelector("#orderBtn");
let orderSection = document.querySelector(".order");
let cart_total = document.querySelector('.cart_total'); // Додайте цей селектор

function calculateTotal() {
    let total = 0;
    for (let key in cartItems) {
        total += cartItems[key].price * cartItems[key].quantity;
    }
    return total;
}

function get_item(item) {
    return `<div class="itemcarddd">
        <img src="img/${item.image}" alt="" class="img1">
        <div class="">
            <h3>${item.title}</h3>
            <p class="itemsss">${item.price}грн</p>
            <input type="number" value="${item.quantity}" min="1" 
                   data-item="${item.title}" class="quantity-input">
        </div> 
    </div>`;
}

function showCartList() {
    if (cart_list) {
        cart_list.innerHTML = '';
        for (let key in cartItems) {
            cart_list.innerHTML += get_item(cartItems[key]);
        }
        cartTotal = calculateTotal();
        if (cart_total) {
            cart_total.innerHTML = cartTotal * 41;
        }
    }
}

// Функція для оновлення кількості товару
function updateQuantity(itemTitle, newQuantity) {
    if (cartItems[itemTitle]) {
        cartItems[itemTitle].quantity = newQuantity;
        if (cartItems[itemTitle].quantity <= 0) {
            delete cartItems[itemTitle];
        }
        // Зберігаємо зміни в cookies
        document.cookie = `cart=${JSON.stringify(cartItems)}; max-age=${60 * 60 * 24 * 7}; path=/`;
        showCartList();
    }
}

// Ініціалізація кошика при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    showCartList();
    
    // Обробник зміни кількості товару
    if (cart_list) {
        cart_list.addEventListener('change', (event) => {
            let target = event.target;
            if (target.classList.contains('quantity-input')) {
                const itemTitle = target.getAttribute('data-item');
                const newQuantity = +target.value;
                if (newQuantity > 0) {
                    updateQuantity(itemTitle, newQuantity);
                }
            }
        });
    }

    // Анімація появи кошика
    anime({
        targets: '.cart',
        opacity: 1,
        duration: 500,
        easing: 'easeInOutQuad'
    });
});