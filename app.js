const apiUrl = 'data.json';

// Attach cartItems to the global window object
window.cartItems = [];

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const productList = document.getElementById('product-list');

        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card');

            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.setAttribute('src', product.image);
            cardImg.setAttribute('alt', product.name);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const productName = document.createElement('h5');
            productName.classList.add('card-title');
            productName.textContent = `Name: ${product.name}`;

            const productDescription = document.createElement('p');
            productDescription.classList.add('card-text');
            productDescription.textContent = `Description: ${product.description}`;

            const productPrice = document.createElement('p');
            productPrice.classList.add('card-text');
            productPrice.textContent = `Price: ₱${product.price}`;

            const productDate = document.createElement('p');
            productDate.classList.add('card-text');
            productDate.textContent = `Date Added: ${product['date added']}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('btn', 'btn-primary');
            addToCartButton.textContent = 'Add to Cart';

            addToCartButton.addEventListener('click', () => {
                addToCart(product);
                updateCartTable();
            });

            cardBody.appendChild(productName);
            cardBody.appendChild(productDescription);
            cardBody.appendChild(productPrice);
            cardBody.appendChild(productDate);
            cardBody.appendChild(addToCartButton);

            productCard.appendChild(cardImg);
            productCard.appendChild(cardBody);
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function addToCart(product) {
    const existingItem = window.cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        window.cartItems.push({ ...product, quantity: 1 });
    }
}

function updateCartTable() {
    const cartTableBody = document.getElementById('cart-items');
    cartTableBody.innerHTML = '';

    window.cartItems.forEach(item => {
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
    const item = window.cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartTable();
    }
}

function decrementQuantity(productId) {
    const item = window.cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartTable();
    }
}

fetchAndDisplayProducts();
