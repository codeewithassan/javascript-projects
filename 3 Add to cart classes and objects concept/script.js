// Global variable cart ke total items ko track karne ke liye
let totalCartItems = 0;
const cartCountElement = document.getElementById('cart-count');
const productsGrid = document.getElementById('products-grid');

// ==========================================
// 1. CLASS (The Blueprint / Sancha)
// ==========================================
class Product {
    // Constructor naye product ka unique data accept karega
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    // Method: Yeh function har product ka HTML card khud generate karega
    renderCard() {
        // Ek naya div element memory mein create kiya
        let card = document.createElement('div');
        card.classList.add('product-card');

        // Card ka HTML structure set kiya 'this' use karke
        card.innerHTML = `
            <span style="font-size: 12px; color: gray;">${this.category}</span>
            <h3>${this.name}</h3>
            <p class="price">$${this.price}</p>
            <button class="add-btn" id="btn-${this.id}">Add To Cart</button>
        `;

        // Card ke button par click listener lagaya jo is class ke andar hi handle hoga
        let addToCartBtn = card.querySelector(`#btn-${this.id}`);
        addToCartBtn.addEventListener('click', () => {
            this.addToCart(); // Is class ka apna 'addToCart' method call kiya
        });

        // Is mukammal card element ko return kar diya
        return card;
    }

    // Method: Jab is product par click ho to kya action hona chahiye
    addToCart() {
        totalCartItems++; // Global count badhaya
        cartCountElement.innerText = totalCartItems; // UI update ki
        alert(`${this.name} has been added to your cart!`);
    }
}

// ==========================================
// 2. OBJECTS CREATION (Class se baahir asli products)
// ==========================================

// Humne sancha (Class) use karke 3 alag alag real products (Objects) banaye
const product1 = new Product(101, "Wireless Mouse", 25, "Electronics");
const product2 = new Product(102, "Gaming Keyboard", 60, "Electronics");
const product3 = new Product(103, "Smart Watch", 120, "Gadgets");
const product4 = new Product(104, "Mobile Phones", 500, "Phones");

// ==========================================
// 3. UI PAR RENDER KARNA
// ==========================================

// Objects ke 'renderCard()' function ko call kiya aur return hone wala HTML element container mein daal diya
productsGrid.appendChild(product1.renderCard());
productsGrid.appendChild(product2.renderCard());
productsGrid.appendChild(product3.renderCard());
productsGrid.appendChild(product4.renderCard());