// Application state
let currentUser = null;
let isGuestUser = false;
let cart = [];
let products = [];
let filteredProducts = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeEventListeners();
    loadCartFromStorage();
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    const savedIsGuest = localStorage.getItem('isGuestUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isGuestUser = savedIsGuest === 'true';
        showMainScreen();
    } else {
        showLoginScreen();
    }
});

// Initialize products data
function initializeProducts() {
    products = [
        // Tennis Equipment
        {
            id: 1,
            name: "Professional Tennis Racket",
            category: "tennis",
            price: 149.99,
            description: "High-quality carbon fiber tennis racket for professional players. Perfect balance and control.",
            image: "images/tennis-racket.svg"
        },
        {
            id: 2,
            name: "Tennis Ball Set (3 pack)",
            category: "tennis",
            price: 12.99,
            description: "Premium tennis balls for tournament play. Excellent bounce and durability.",
            image: "images/tennis-balls.svg"
        },
        {
            id: 3,
            name: "Tennis Court Shoes",
            category: "tennis",
            price: 89.99,
            description: "Professional tennis shoes with excellent grip and ankle support.",
            image: "images/tennis-shoes.svg"
        },
        {
            id: 4,
            name: "Tennis Strings Pro",
            category: "tennis",
            price: 24.99,
            description: "High-performance tennis strings for enhanced power and control.",
            image: "images/tennis-strings.svg"
        },
        
        // Paddle Equipment
        {
            id: 5,
            name: "Carbon Paddle Racket",
            category: "paddle",
            price: 199.99,
            description: "Professional carbon fiber paddle racket with diamond shape for power players.",
            image: "images/paddle-racket.svg"
        },
        {
            id: 6,
            name: "Paddle Ball Set",
            category: "paddle",
            price: 18.99,
            description: "Official paddle balls with optimal pressure and bounce characteristics.",
            image: "images/paddle-balls.svg"
        },
        {
            id: 7,
            name: "Paddle Court Shoes",
            category: "paddle",
            price: 119.99,
            description: "Specialized paddle shoes with lateral support and non-marking soles.",
            image: "images/paddle-shoes.svg"
        },
        {
            id: 8,
            name: "Paddle Bag Pro",
            category: "paddle",
            price: 79.99,
            description: "Professional paddle bag with multiple compartments and thermal protection.",
            image: "images/paddle-bag.svg"
        },
        
        // Pickleball Equipment
        {
            id: 9,
            name: "Pickleball Paddle Set",
            category: "pickleball",
            price: 89.99,
            description: "Complete pickleball paddle set for beginners and intermediate players.",
            image: "images/pickleball-paddle.svg"
        },
        {
            id: 10,
            name: "Pickleball Balls (6 pack)",
            category: "pickleball",
            price: 15.99,
            description: "Tournament-grade pickleball balls with optimal holes and durability.",
            image: "images/pickleball-balls.svg"
        },
        {
            id: 11,
            name: "Pickleball Net System",
            category: "pickleball",
            price: 159.99,
            description: "Portable pickleball net system, easy setup for any court surface.",
            image: "images/pickleball-net.svg"
        },
        {
            id: 12,
            name: "Pickleball Court Shoes",
            category: "pickleball",
            price: 99.99,
            description: "Lightweight pickleball shoes with superior court grip and comfort.",
            image: "images/pickleball-shoes.svg"
        },
        {
            id: 13,
            name: "Defective Pickleball Set (CLEARANCE)",
            category: "pickleball",
            price: -25.00,
            description: "Defective pickleball set - store credit will be applied for this item.",
            image: "images/pickleball-balls.svg"
        }
    ];
    
    filteredProducts = [...products];
}

// Initialize event listeners
function initializeEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('guest-checkout-btn').addEventListener('click', handleGuestCheckout);
    
    // Navigation
    document.getElementById('menu-btn').addEventListener('click', toggleSideMenu);
    document.getElementById('close-menu').addEventListener('click', closeSideMenu);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('logout-menu').addEventListener('click', handleLogout);
    document.getElementById('reset-app').addEventListener('click', resetApp);
    
    // Cart
    document.getElementById('cart-btn').addEventListener('click', showCartPage);
    document.getElementById('continue-shopping').addEventListener('click', showInventoryPage);
    document.getElementById('checkout-btn').addEventListener('click', showCheckoutPage);
    
    // Checkout
    document.getElementById('checkout-form').addEventListener('submit', handleCheckoutSubmit);
    document.getElementById('cancel-checkout').addEventListener('click', showCartPage);
    document.getElementById('cancel-summary').addEventListener('click', showCartPage);
    document.getElementById('finish-order').addEventListener('click', completeOrder);
    document.getElementById('back-home').addEventListener('click', showInventoryPage);
    
    // Sorting and filtering
    document.getElementById('sort-select').addEventListener('change', handleSort);
    document.getElementById('category-filter').addEventListener('change', handleFilter);
    document.getElementById('price-filter').addEventListener('input', handleFilter);
    
    // Menu navigation
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            if (page === 'inventory') {
                showInventoryPage();
            } else if (page === 'about') {
                showAboutPage();
            }
            closeSideMenu();
        });
    });
}

// User management
const validUsers = [
    { username: 'unosquare_validUser', password: 'secret_uno', type: 'standard' }
];

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Special handling for removed users
    if (username === 'unosquare_errorUser' && password === 'secret_uno') {
        showError('Epic Error, not sure what happened');
        return;
    }
    
    // Special handling for performance user - 10 second delay
    if (username === 'unosquare_performanceUser' && password === 'secret_uno') {
        showLoadingState();
        setTimeout(() => {
            hideLoadingState();
            showError('Too slow');
        }, 10000);
        return;
    }
    
    const user = validUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMainScreen();
    } else {
        showError('Epic sadface: Username and password do not match any user in this service');
    }
}

function handleGuestCheckout() {
    currentUser = { username: 'guest', type: 'guest' };
    isGuestUser = true;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('isGuestUser', 'true');
    showMainScreen();
}

function handleLogout() {
    currentUser = null;
    isGuestUser = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isGuestUser');
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    showLoginScreen();
    closeSideMenu();
}

function resetApp() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    showInventoryPage();
    closeSideMenu();
}

// Screen management
function showLoginScreen() {
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('main-screen').classList.remove('active');
}

function showMainScreen() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    showInventoryPage();
    renderProducts();
}

function showLoadingState() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h3>Loading...</h3>
            <p>Please wait while we process your request</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
}

function hideLoadingState() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

function showInventoryPage() {
    hideAllPages();
    document.getElementById('inventory-page').classList.add('active');
    renderProducts();
}

function showAboutPage() {
    hideAllPages();
    document.getElementById('about-page').classList.add('active');
}

function showCartPage() {
    hideAllPages();
    document.getElementById('cart-page').classList.add('active');
    renderCart();
}

function showCheckoutPage() {
    if (cart.length === 0) {
        showError('You cannot checkout without items in your cart!');
        return;
    }
    
    // Check for negative total
    const total = getCartTotal();
    if (total < 0) {
        showError('Cannot proceed to checkout with negative amounts. Please remove items with negative values or add more items to your cart.');
        return;
    }
    
    hideAllPages();
    document.getElementById('checkout-page').classList.add('active');
    
    // Show email field for guest users
    const emailGroup = document.getElementById('email-group');
    const emailInput = document.getElementById('email');
    if (isGuestUser) {
        emailGroup.style.display = 'block';
        emailInput.required = true;
    } else {
        emailGroup.style.display = 'none';
        emailInput.required = false;
    }
    
    // Hide First Name and Last Name for unosquare_validUser
    const firstNameGroup = document.getElementById('first-name').closest('.form-group');
    const lastNameGroup = document.getElementById('last-name').closest('.form-group');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    
    if (currentUser && currentUser.username === 'unosquare_validUser') {
        firstNameGroup.style.display = 'none';
        lastNameGroup.style.display = 'none';
        firstNameInput.required = false;
        lastNameInput.required = false;
        // Set default values
        firstNameInput.value = 'Valid';
        lastNameInput.value = 'User';
    } else {
        firstNameGroup.style.display = 'block';
        lastNameGroup.style.display = 'block';
        firstNameInput.required = true;
        lastNameInput.required = true;
        firstNameInput.value = '';
        lastNameInput.value = '';
    }
}

function showOrderSummaryPage() {
    hideAllPages();
    document.getElementById('order-summary-page').classList.add('active');
    renderOrderSummary();
}

function showCompletePage() {
    hideAllPages();
    document.getElementById('complete-page').classList.add('active');
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

// Side menu management
function toggleSideMenu() {
    document.getElementById('side-menu').classList.toggle('open');
}

function closeSideMenu() {
    document.getElementById('side-menu').classList.remove('open');
}

// Product rendering
function renderProducts() {
    const container = document.getElementById('inventory-container');
    container.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'inventory-item';
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="inventory-item-image">
        <div class="inventory-item-details">
            <div class="inventory-item-name">${product.name}</div>
            <div class="inventory-item-desc">${product.description}</div>
            <div class="inventory-item-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to cart
            </button>
        </div>
    `;
    return div;
}

// Cart management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    
    // Add visual feedback
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.classList.add('updated');
    setTimeout(() => cartCountElement.classList.remove('updated'), 300);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToStorage();
    renderCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        saveCartToStorage();
        renderCart();
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
    
    // Enable/disable checkout button based on cart content and total
    const checkoutBtn = document.getElementById('checkout-btn');
    const total = getCartTotal();
    checkoutBtn.disabled = cart.length === 0 || total < 0;
    
    // Update button text if total is negative
    if (total < 0) {
        checkoutBtn.textContent = 'Cannot Checkout (Negative Total)';
        checkoutBtn.style.backgroundColor = '#ccc';
    } else {
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.style.backgroundColor = '';
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Cart rendering
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some items to get started!</p>
            </div>
        `;
    } else {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        container.innerHTML = `
            <div class="cart-summary">
                <h3>Items in bag: ${totalItems}</h3>
            </div>
            ${cart.map(item => {
                const itemSubtotal = item.price * item.quantity;
                return `
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-desc">${item.description}</div>
                            <div class="cart-item-subtotal">Subtotal: $${itemSubtotal.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
            }).join('')}
        `;
    }
    
    totalElement.textContent = getCartTotal().toFixed(2);
}

// Sorting and filtering
function handleSort() {
    const sortValue = document.getElementById('sort-select').value;
    
    switch (sortValue) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }
    
    renderProducts();
}

function handleFilter() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = parseFloat(document.getElementById('price-filter').value) || Infinity;
    
    filteredProducts = products.filter(product => {
        const categoryMatch = !categoryFilter || product.category === categoryFilter;
        const priceMatch = product.price <= priceFilter;
        return categoryMatch && priceMatch;
    });
    
    // Reapply current sort
    handleSort();
}

// Checkout handling
function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const checkoutData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        zipCode: formData.get('zipCode'),
        paymentType: formData.get('paymentType'),
        cardNumber: formData.get('cardNumber'),
        expiryDate: formData.get('expiryDate'),
        cvv: formData.get('cvv')
    };
    
    // Add email for guest users
    if (isGuestUser) {
        checkoutData.email = formData.get('email');
    }
    
    // Validate form
    if (!validateCheckoutForm(checkoutData)) {
        return;
    }
    
    // Store checkout data
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    showOrderSummaryPage();
}

function validateCheckoutForm(data) {
    // Validate email for guest users
    if (isGuestUser && data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('Please enter a valid email address');
            return false;
        }
    }
    
    // Validate zip code (US format)
    const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
    if (!zipRegex.test(data.zipCode)) {
        showError('Please enter a valid US zip code (e.g., 12345 or 12345-6789)');
        return false;
    }
    
    // Validate card number (16 digits)
    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(data.cardNumber)) {
        showError('Please enter a valid 16-digit card number');
        return false;
    }
    
    // Validate expiry date (MM/YY format)
    const expiryRegex = /^[0-9]{2}\/[0-9]{2}$/;
    if (!expiryRegex.test(data.expiryDate)) {
        showError('Please enter expiry date in MM/YY format');
        return false;
    }
    
    // Validate expiry date is in the future
    const [month, year] = data.expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        showError('Card expiry date must be in the future');
        return false;
    }
    
    // Validate CVV (3-4 digits)
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(data.cvv)) {
        showError('Please enter a valid CVV (3-4 digits)');
        return false;
    }
    
    return true;
}

function renderOrderSummary() {
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
    
    // Render items
    const itemsContainer = document.getElementById('summary-items');
    itemsContainer.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Render payment info
    const paymentContainer = document.getElementById('summary-payment');
    paymentContainer.innerHTML = `
        <p><strong>Payment Type:</strong> ${checkoutData.paymentType === 'credit' ? 'Credit Card' : 'Debit Card'}</p>
        <p><strong>Card Number:</strong> **** **** **** ${checkoutData.cardNumber.slice(-4)}</p>
    `;
    
    // Render shipping info
    const shippingContainer = document.getElementById('summary-shipping');
    let shippingInfo = `
        <p><strong>Name:</strong> ${checkoutData.firstName} ${checkoutData.lastName}</p>
        <p><strong>Zip Code:</strong> ${checkoutData.zipCode}</p>
    `;
    
    // Add email for guest users
    if (isGuestUser && checkoutData.email) {
        shippingInfo += `<p><strong>Email:</strong> ${checkoutData.email}</p>`;
    }
    
    shippingContainer.innerHTML = shippingInfo;
    
    // Calculate totals
    const subtotal = getCartTotal();
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    document.getElementById('summary-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('summary-tax').textContent = tax.toFixed(2);
    document.getElementById('summary-total').textContent = total.toFixed(2);
}

function completeOrder() {
    // Clear cart and checkout data
    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutData');
    updateCartCount();
    
    showCompletePage();
}

// Error handling
function showError(message) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message error-banner';
    errorDiv.textContent = message;
    
    // Find the appropriate container to insert the error
    const activeForm = document.querySelector('.login-form, .checkout-form');
    if (activeForm) {
        activeForm.insertBefore(errorDiv, activeForm.firstChild);
    } else {
        // Fallback: show at top of active page
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            activePage.insertBefore(errorDiv, activePage.firstChild);
        }
    }
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Simulate user behavior issues for different user types
function simulateUserIssues() {
    if (!currentUser) return;
    
    switch (currentUser.type) {
        case 'problem':
            // Simulate performance issues
            setTimeout(() => {
                if (Math.random() < 0.1) { // 10% chance
                    showError('Oops! Something went wrong. Please try again.');
                }
            }, 2000);
            break;
            
        case 'performance':
            // Add artificial delays
            if (Math.random() < 0.3) { // 30% chance
                document.body.classList.add('loading');
                setTimeout(() => {
                    document.body.classList.remove('loading');
                }, 1000 + Math.random() * 2000);
            }
            break;
            
        case 'error':
            // Simulate random errors
            if (Math.random() < 0.15) { // 15% chance
                showError('Error: This user experiences random issues during testing.');
            }
            break;
    }
}

// Run user simulation periodically
setInterval(simulateUserIssues, 5000);