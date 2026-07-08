/* ==========================================
   SHATTER'S GAMING STORE.JS
   Version 1.0

   Handles:
   - Add to cart
   - Remove items
   - Clear cart
   - Cart count
   - Cart sidebar
   - Checkout popup
   - Payment success popup
========================================== */


/* ==========================================
   LOAD SAVED CART
   Keeps items after refresh
========================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];



/* ==========================================
   SAVE CART
========================================== */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



/* ==========================================
   ADD ITEM TO CART

   Matches your HTML:
   addToCart('Classic Tee',25)
========================================== */

function addToCart(name, price){

    const existingItem = cart.find(item => item.name === name);


    if(existingItem){

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,
            price: price,
            quantity: 1

        });

    }


    saveCart();

    updateCart();


    showNotification(
        name + " added!"
    );

}



/* ==========================================
   REMOVE ITEM
========================================== */

function removeFromCart(index){


    cart.splice(index,1);


    saveCart();


    updateCart();

}
function changeQuantity(index, amount){

    cart[index].quantity += amount;


    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }


    saveCart();

    updateCart();

}


/* ==========================================
   CLEAR CART BUTTON
========================================== */

function clearCart(){


    cart = [];


    saveCart();


    updateCart();

}



/* ==========================================
   UPDATE CART DISPLAY
========================================== */

function updateCart(){


    const cartItems =
    document.getElementById("cart-items");


    const cartTotal =
    document.getElementById("cart-total");


    const cartCount =
    document.getElementById("cart-count");



    if(!cartItems) return;



    cartItems.innerHTML = "";



  let total = 0;


if(cart.length === 0){

    cartItems.innerHTML =
    "Your cart is empty";

} else {


cart.forEach((item,index)=>{

    if(!item.quantity){

        item.quantity = 1;

    }


    total += item.price * item.quantity;


    cartItems.innerHTML += `

    <div class="cart-item">

        <span>
        ${item.name}
        </span>


        <span>
        $${(item.price * item.quantity).toFixed(2)}
        </span>


        <div class="quantity-controls">

            <button onclick="changeQuantity(${index}, -1)">
                -
            </button>


            <span>
                ${item.quantity}
            </span>


            <button onclick="changeQuantity(${index}, 1)">
                +
            </button>

        </div>


        <button onclick="removeFromCart(${index})">
            ❌
        </button>


    </div>

    `;


});

}  
    cartTotal.innerHTML =
    total.toFixed(2);



    cartCount.innerHTML =
    cart.length;


}



/* ==========================================
   CART SIDEBAR OPEN/CLOSE
========================================== */


const cartButton =
document.getElementById("open-cart");


const cartSidebar =
document.querySelector(".cart-sidebar");


const cartOverlay =
document.getElementById("cart-overlay");


const closeCart =
document.getElementById("close-cart");



if(cartButton){

cartButton.onclick = function(){

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



/* ==========================================
   CART NOTIFICATION
========================================== */

function showNotification(message){


    const notification =
    document.getElementById("cart-notification");


    const text =
    document.getElementById("notification-text");



    if(notification){


        text.innerHTML = message;


        notification.classList.add("show");



        setTimeout(()=>{


            notification.classList.remove("show");


        },2000);


    }


}

/* ==========================================
   CHECKOUT + POPUP CONTROLS
========================================== */


document.addEventListener(
"DOMContentLoaded",
function(){


    // Update cart when page loads
    updateCart();



    // ==========================
    // CHECKOUT BUTTON
    // ==========================

    const checkoutButton =
    document.querySelector(".checkout-btn");


    const checkoutPopup =
    document.getElementById("checkout-popup");



    if(checkoutButton && checkoutPopup){


     checkoutButton.onclick = function(){

    checkoutPopup.classList.add("active");

};


    }



    // ==========================
    // CLOSE CHECKOUT POPUP
    // ==========================

    const cancelCheckout =
    document.getElementById("cancel-checkout");


    const closeCheckout =
    document.getElementById("close-checkout-popup");



   function closeCheckoutWindow(){

    checkoutPopup.classList.remove("active");

}



    if(cancelCheckout){


        cancelCheckout.onclick =
        closeCheckoutWindow;


    }



    if(closeCheckout){


        closeCheckout.onclick =
        closeCheckoutWindow;


    }



    // ==========================
    // PAYMENT SUCCESS CONTINUE
    // ==========================

    const paymentContinue =
    document.getElementById("close-payment-success");


    const paymentPopup =
    document.getElementById("payment-success-popup");



    if(paymentContinue && paymentPopup){


        paymentContinue.onclick = function(){


          paymentPopup.classList.remove("active");  


        };


    }



});

// ==========================
// CONFIRM CHECKOUT BUTTON
// LOAD PAYPAL
// ==========================

const confirmCheckout =
document.getElementById("confirm-checkout");


if(confirmCheckout){


    confirmCheckout.onclick = function(){


        // Hide the Continue / Cancel buttons
        document.querySelector(".checkout-actions").style.display = "none";


        // Load PayPal
        loadPayPal();


    };


}

/* ==========================
   LOAD PAYPAL
========================== */

function loadPayPal() {

    const paypalContainer =
        document.getElementById("paypal-button-container");

    paypalContainer.innerHTML = "";

    paypal.Buttons({

        createOrder: function (data, actions) {

            return actions.order.create({

                purchase_units: [{
                    amount: {
                        value: getCartTotal()
                    }
                }]

            });

        },
onApprove: function (data, actions) {

    return actions.order.capture().then(function (details) {

        console.log("Payment Complete");
       
// SAVE ORDER TO FIREBASE

addDoc(
    collection(db, "orders"),
    {

        customerName:
        details.payer.name.given_name +
        " " +
        details.payer.name.surname,

        email:
        details.payer.email_address,

        items:
        cart,

        total:
        getCartTotal(),

        paypalOrderID:
        data.orderID,

        status:
        "Ready for Printify",

        createdAt:
        serverTimestamp()

    }
)
.then(() => {

    console.log("🔥 Order saved to Firebase");

})
.catch((error)=>{

    console.error(
        "Firebase order error:",
        error
    );

});
        // Customer information
        console.log("Customer:", details.payer.name.given_name + " " + details.payer.name.surname);
        console.log("Email:", details.payer.email_address);

        if (details.purchase_units[0].shipping) {

            const shipping = details.purchase_units[0].shipping;

            console.log("Ship To:", shipping.name.full_name);
            console.log("Address:", shipping.address.address_line_1);
            console.log("City:", shipping.address.admin_area_2);
            console.log("State:", shipping.address.admin_area_1);
            console.log("ZIP:", shipping.address.postal_code);
            console.log("Country:", shipping.address.country_code);

        }

        console.log("Items Ordered:", cart);

        // Close checkout popup
        document
            .getElementById("checkout-popup")
            .classList.remove("active");

        // Show success popup
        document
            .getElementById("payment-success-popup")
            .classList.add("active");

        // Reset PayPal area
        document
            .getElementById("paypal-button-container")
            .innerHTML = "";

        // Show buttons again
        document
            .querySelector(".checkout-actions")
            .style.display = "flex";

        // Empty cart
        cart = [];

        saveCart();
        updateCart();

    });

},

        onCancel: function () {

            alert("Payment cancelled.");

            document
                .querySelector(".checkout-actions")
                .style.display = "flex";

            document
                .getElementById("paypal-button-container")
                .innerHTML = "";

        },

        onError: function (err) {

            console.error(err);

            alert("PayPal encountered an error.");

            document
                .querySelector(".checkout-actions")
                .style.display = "flex";

            document
                .getElementById("paypal-button-container")
                .innerHTML = "";

        }

    }).render("#paypal-button-container");

}



/* ==========================
   GET CART TOTAL
========================== */

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return total.toFixed(2);

}
