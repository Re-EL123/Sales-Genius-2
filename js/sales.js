let products = JSON.parse(localStorage.getItem('products')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let cart = [];

const productButtons = document.getElementById('product-buttons');
const cartList = document.getElementById('cart-list');
const totalEl = document.getElementById('total');

function renderProducts() {
    productButtons.innerHTML = '';
    products.forEach((p, i) => {
        const btn = document.createElement('button');
        btn.textContent = `${p.name} ($R{p.price})`;
        btn.onclick = () => addToCart(i);
        productButtons.appendChild(btn);
    });
}

function addToCart(index) {
    const product = products[index];
    const item = cart.find(c => c.name === product.name);
    if (item) item.qty++;
    else cart.push({...product, qty:1});
    renderCart();
}

function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((c, i) => {
        const subtotal = c.price * c.qty;
        total += subtotal;
        cartList.innerHTML += `<tr>
            <td>${c.name}</td>
            <td>${c.price}</td>
            <td>${c.qty}</td>
            <td>${subtotal}</td>
            <td><button onclick="removeFromCart(${i})">Remove</button></td>
        </tr>`;
    });
    totalEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length === 0) return alert('Cart is empty');
    const sale = {
        items: cart,
        total: parseFloat(totalEl.textContent),
        date: new Date().toLocaleString()
    };
    sales.push(sale);
    localStorage.setItem('sales', JSON.stringify(sales));
    cart = [];
    renderCart();
    alert('Sale completed!');
});

renderProducts();
renderCart();
