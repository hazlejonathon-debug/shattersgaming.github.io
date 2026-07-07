// ==========================
// SHATTER'S GAMING STORE
// ==========================


// ==========================
// CART DATA
// ==========================

let cart = JSON.parse(localStorage.getItem("shatterCart")) || [];


// ==========================
// ADD TO CART
// ==========================

function addToCart(productName, productPrice){

    cart.push({

        name: productName,
        price: productPrice

    });

    saveCart();

    updateCart();

    showNotification(productName);

}


// ==========================
// UPDATE CART
// ==========================

function updateCart(){

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if(cartCount){

        cartCount.textContent = cart.length;

    }

    if(!cartItems || !cartTotal){

        return;

    }

    if(cart.length === 0){

        cartItems.innerHTML = "Your cart is empty";

        cartTotal.textContent = "0.00";

        return;

    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item,index)=>{

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <span>${item.name} - $${item.price.toFixed(2)}</span>

            <button onclick="removeFromCart(${index})">
                ❌
            </button>

        </div>

        `;

    });

    cartTotal.textContent = total.toFixed(2);

}


// ==========================
// REMOVE FROM CART
// ==========================

function removeFromCart(index){

    cart.splice(index,1);

    saveCart();

    updateCart();

}

// ==========================
// CLEAR CART
// ==========================

function clearCart(){

    cart = [];

    saveCart();

    updateCart();

}
// ==========================
// SAVE CART
// ==========================

function saveCart(){

    localStorage.setItem(

        "shatterCart",

        JSON.stringify(cart)

    );

}


// ==========================
// SHOW NOTIFICATION
// ==========================

function showNotification(productName){

    const notification =
        document.getElementById("cart-notification");

    const text =
        document.getElementById("notification-text");

    if(!notification || !text){

        return;

    }

    text.textContent = `${productName} added to your cart!`;

    notification.classList.add("show");

    setTimeout(function(){

        notification.classList.remove("show");

    },2000);

}


// ==========================
// CART OPEN / CLOSE
// ==========================

const openCart = document.getElementById("open-cart");

const closeCart = document.getElementById("close-cart");

const cartSidebar = document.querySelector(".cart-sidebar");

const cartOverlay = document.getElementById("cart-overlay");


if(openCart){

    openCart.onclick = function(e){

        e.preventDefault();

        cartSidebar.classList.add("active");

        cartOverlay.classList.add("active");

    };

}


if(closeCart){

    closeCart.onclick = function(){

        cartSidebar.classList.remove("active");

        cartOverlay.classList.remove("active");

    };

}


if(cartOverlay){

    cartOverlay.onclick = function(){

        cartSidebar.classList.remove("active");

        cartOverlay.classList.remove("active");

    };

}
// ==========================
// CHECKOUT BUTTON
// ==========================

const checkoutButton = document.querySelector(".checkout-btn");

const checkoutPopup = document.getElementById("checkout-popup");

const closeCheckoutPopup = document.getElementById("close-checkout-popup");

const cancelCheckout = document.getElementById("cancel-checkout");

const confirmCheckout = document.getElementById("confirm-checkout");


if(checkoutButton){

    checkoutButton.onclick = function(){

        if(cart.length === 0){

            alert("Your cart is empty!");

        } else {

            checkoutPopup.classList.add("active");

        }

    };

}


// CLOSE POPUP

if(closeCheckoutPopup){

    closeCheckoutPopup.onclick = function(){

        checkoutPopup.classList.remove("active");

    };

}


if(cancelCheckout){

    cancelCheckout.onclick = function(){

        checkoutPopup.classList.remove("active");

    };

}


// CONTINUE CHECKOUT

if(confirmCheckout){

    confirmCheckout.onclick = function(){

        alert("Checkout coming soon!");

        checkoutPopup.classList.remove("active");

        cartSidebar.classList.remove("active");

        cartOverlay.classList.remove("active");

    };

}


// ==========================
// INITIALIZE STORE
// ==========================

updateCart();
// ==========================
// PAYPAL CHECKOUT BUTTON
// ==========================

paypal.Buttons({

    style: {

        color: "gold",
        shape: "pill",
        label: "paypal"

    },

    createOrder: function(data, actions){

        return actions.order.create({

            purchase_units: [{

                amount: {

                    value: cart.reduce((total, item) => total + item.price, 0).toFixed(2)

                }

            }]

        });

    },

   onApprove: function(data, actions){

    return actions.order.capture().then(function(details){

        const paymentPopup = document.getElementById("payment-success-popup");

        const paymentMessage = document.getElementById("payment-success-message");

        paymentMessage.textContent =
        "Thanks " + details.payer.name.given_name + "! Your order is complete.";

        paymentPopup.classList.add("active");

    });

}, 

}).render("#paypal-button-container");
