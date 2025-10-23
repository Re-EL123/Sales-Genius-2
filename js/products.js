const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts() {
    productList.innerHTML = '';
    products.forEach((p, i) => {
        productList.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td><button onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `;
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

productForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    products.push({ name, price });
    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    renderProducts();
});

renderProducts();