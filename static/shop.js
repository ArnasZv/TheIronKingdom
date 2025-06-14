//adds local storage into the cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
//adds the function for the cart to update the price and it starts at 0
function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
// its embeded in html that it multiplies items price by quantity and adds a remove button
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
         ${item.name} x ${item.quantity} - $${item.price * item.quantity}
        <button onclick="removeItem(${item.id})"> ❌ </button>
        `;
        cartItemsContainer.appendChild(li);
        total += item.price * item.quantity;
    });
// checks for local storage if there are any items in the basket already if not it starts fresh
    cartTotalDisplay.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}
//adds function to add products into the li if the product already exists add +1 and then update the cart making cart dynamicly change price
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({...product, quantity:1});
    }
    updateCartDisplay();
}
// gives function to the remove button filters all items and removes the items that you clicked on and updates the cart after
function removeItem(id) {
    cart=cart.filter(item => item.id !== id);
    updateCartDisplay();
}
// adds event listeners for add to cart button 
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const productEl = e.target.closest(".product");
        const id = parseInt(productEl.dataset.id);
        const name = productEl.dataset.name;
        const price = parseFloat(productEl.dataset.price);
        addToCart({id , name, price});
    });
});

updateCartDisplay();


//copied same code from carpage.html into here for the mobile menu
//Toggle mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menuToggle');
    const nav = document.getElementById ('navbar');

    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});