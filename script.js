// Optional interactivity like smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});
// CART functionality
const cartItems = [];

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartList = document.getElementById("cart-items");

if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.getAttribute("data-product");
      cartItems.push(product);
      renderCart();
    });
  });
}

function renderCart() {
  if (!cartList) return;
  cartList.innerHTML = "";
  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    cartList.appendChild(li);
  });
}
// Save cart to localStorage when adding
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.getAttribute("data-product");
      cartItems.push(product);
      localStorage.setItem("braxoCart", JSON.stringify(cartItems)); // Save
      renderCart();
    });
  });
}

// Load cart items on checkout page
const orderSummaryList = document.getElementById("order-summary");
if (orderSummaryList) {
  const savedCart = JSON.parse(localStorage.getItem("braxoCart")) || [];
  savedCart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    orderSummaryList.appendChild(li);
  });
}

// Handle checkout form submit
const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.name.value;
    const phone = this.phone.value;
    const address = this.address.value;
    const order = JSON.parse(localStorage.getItem("braxoCart")) || [];

    const orderDetails = `
Name: ${name}
Phone: ${phone}
Address: ${address}
Order:
${order.map((p, i) => `${i + 1}. ${p}`).join("\n")}
    `.trim();

    alert("Order placed! Thank you!");

    // Optionally send to WhatsApp
    const waMessage = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/919999999999?text=${waMessage}`, "_blank");

    // Clear cart
    localStorage.removeItem("braxoCart");
    this.reset();
  });
}
