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


    const item = {

        name: name,
        price: price

    };


    cart.push(item);


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



    cart.forEach((item,index)=>{


        total += item.price;



        cartItems.innerHTML += `

        <div class="cart-item">

            <span>
            ${item.name}
            </span>


            <span>
            $${item.price.toFixed(2)}
            </span>


            <button onclick="removeFromCart(${index})">
            ❌
            </button>


        </div>

        `;


    });



    if(cart.length === 0){

        cartItems.innerHTML =
        "Your cart is empty";

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
   CHECKOUT BUTTON

   Opens your custom checkout popup
========================================== */


const checkoutButton =
document.querySelector(".checkout-btn");


const checkoutPopup =
document.getElementById("checkout-popup");



if(checkoutButton){


checkoutButton.onclick = function(){


    checkoutPopup.style.display="flex";


};


}



/* ==========================================
   CLOSE CHECKOUT POPUP
========================================== */


const cancelCheckout =
document.getElementById("cancel-checkout");


const closeCheckout =
document.getElementById("close-checkout-popup");



function closeCheckoutWindow(){


    checkoutPopup.style.display="none";


}



if(cancelCheckout){

cancelCheckout.onclick =
closeCheckoutWindow;

}



if(closeCheckout){

closeCheckout.onclick =
closeCheckoutWindow;

}



/* ==========================================
   PAYMENT SUCCESS CONTINUE BUTTON

========================================== */


const paymentContinue =
document.getElementById("close-payment-success");


if(paymentContinue){


paymentContinue.onclick=function(){


document.getElementById(
"payment-success-popup"
).style.display="none";


};


}



/* ==========================================
   START STORE
========================================== */

document.addEventListener(
"DOMContentLoaded",
function(){

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

            checkoutPopup.style.display = "flex";

        };


    }



});
 
