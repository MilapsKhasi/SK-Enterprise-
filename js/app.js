function showScreen(screenId) {
    // 1. Hide EVERY section with the class 'app-screen'
    const allScreens = document.querySelectorAll('.app-screen');
    allScreens.forEach(screen => {
        screen.style.display = 'none';
    });

    // 2. Show only the one we want
    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = 'block';
        // 3. Force scroll to top so the new screen starts at the header
        window.scrollTo(0, 0);
    } else {
        console.error("Screen ID not found:", screenId);
    }
}

// Configuration
const ADMIN_PASSWORD = "your_secret_password"; // Change this!
let isAdmin = false;

// 1. Fetch and Display Products
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; // Clear loading text

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">${product.price}</p>
                
                <a href="tel:+91XXXXXXXXXX" class="btn-call">Call Papa to Buy</a>
                
                <div class="admin-only" style="display: ${isAdmin ? 'block' : 'none'}">
                    <button class="btn-call btn-admin-edit" onclick="editProduct(${product.id})">Edit Product</button>
                    <button class="btn-call" style="background:red;" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 2. Secret Admin Logic
const adminTrigger = document.getElementById('admin-trigger');
let clickCount = 0;

adminTrigger.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        const password = prompt("Enter Admin Password:");
        if (password === ADMIN_PASSWORD) {
            isAdmin = true;
            alert("Admin Access Granted!");
            loadProducts(); // Refresh UI to show admin buttons
        } else {
            alert("Incorrect Password");
        }
        clickCount = 0; // Reset
    }
});

// Initialize
loadProducts();
