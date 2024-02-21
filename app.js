const apiUrl = 'data.json';

let cartItems = [];

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const productList = document.getElementById('product-list');

        data.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product');

            const productName = document.createElement('h5');
            productName.textContent = `Name: ${product.name}`;

            const productDescription = document.createElement('p');
            productDescription.textContent = `Description: ${product.description}`;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: ₱${product.price}`;

            const productDate = document.createElement('p');
            productDate.textContent = `Date Added: ${product['date added']}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';

            addToCartButton.addEventListener('click', () => {
                addToCart(product);
                updateCartTable();
            });

            productContainer.appendChild(productName);
            productContainer.appendChild(productDescription);
            productContainer.appendChild(productPrice);
            productContainer.appendChild(productDate);
            productContainer.appendChild(addToCartButton);

            productList.appendChild(productContainer);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
}

function updateCartTable() {
    const cartTableBody = document.getElementById('cart-items');
    cartTableBody.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₱${item.price}</td>
            <td>
                <button class="btn btn-secondary" onclick="decrementQuantity(${item.id})">-</button>
                ${item.quantity}
                <button class="btn btn-secondary" onclick="incrementQuantity(${item.id})">+</button>
            </td>
            <td>₱${item.price * item.quantity}</td>
        `;
        cartTableBody.appendChild(row);
    });
}

function incrementQuantity(productId) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartTable();
    }
}

function decrementQuantity(productId) {
    const item = cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartTable();
    }
}

fetchAndDisplayProducts();
