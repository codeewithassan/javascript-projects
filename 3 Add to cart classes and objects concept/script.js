let totalCartItems = 0;
const cartCountElement = document.getElementById('cart-count');
const productsGrid = document.getElementById('products-grid');

class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    renderCard() {
        let card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <span style="font-size: 12px; color: gray;">${this.category}</span>
            <h3>${this.name}</h3>
            <p class="price">$${this.price}</p>
            <button class="add-btn" id="btn-${this.id}">Add To Cart</button>
        `;
        let addToCartBtn = card.querySelector(`#btn-${this.id}`);
        addToCartBtn.addEventListener('click', () => {
            this.addToCart();
        });

        return card;
    }

    addToCart() {
        totalCartItems++; 
        cartCountElement.innerText = totalCartItems; 
        alert(`${this.name} has been added to your cart!`);
    }
}

const product1 = new Product(101, "Wireless Mouse", 25, "Electronics");
const product2 = new Product(102, "Gaming Keyboard", 60, "Electronics");
const product3 = new Product(103, "Smart Watch", 120, "Gadgets");
const product4 = new Product(104, "Mobile Phones", 500, "Phones");

productsGrid.appendChild(product1.renderCard());
productsGrid.appendChild(product2.renderCard());
productsGrid.appendChild(product3.renderCard());
productsGrid.appendChild(product4.renderCard());