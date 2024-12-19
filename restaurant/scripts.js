// Store basket in localStorage
function addToBasket(item, price, button) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const existingItemIndex = basket.findIndex(b => b.item === item);

    // Toggle button color and handle basket
    if (existingItemIndex !== -1) {
        basket.splice(existingItemIndex, 1); // Remove item if already in basket
        button.classList.remove('added');  // Reset button color when item is removed
        alert(`${item} removed from basket`);
    } else {
        basket.push({ item, price });
        button.classList.add('added');  // Change button color when item is added
        alert(`${item} added to basket`);
    }

    localStorage.setItem('basket', JSON.stringify(basket));
}

// Load basket and display in basket.html
function loadBasket() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketList = document.getElementById('basket-list');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    basketList.innerHTML = ''; // Clear existing items

    basket.forEach(({ item, price }) => {
        const li = document.createElement('li');
        li.textContent = `${item} - $${price}`;
        basketList.appendChild(li);
        total += price;
    });

    totalPriceElement.textContent = `Total: $${total}`;
}

// Confirm order and clear basket
function confirmOrder() {
    if (confirm('Are you sure you want to confirm your order?')) {
        alert('Order confirmed! Thank you!');
        localStorage.removeItem('basket');
        window.location.href = 'order.html';
    }
}

// Load basket automatically on basket.html
if (window.location.pathname.includes('basket.html')) {
    document.addEventListener('DOMContentLoaded', loadBasket);
}
