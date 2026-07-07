/* ==========================================
   SHATTER'S GAMING STORE JAVASCRIPT
   Version 1.0 - Basic Store Functions
========================================== */


/* ==========================================
   CART STORAGE
   This keeps the cart saved even if the page
   refreshes.
========================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ==========================================
   STORE PRODUCTS

   Add your products here later.
   Each product needs:
   id
   name
   price
========================================== */

const products = [
    {
        id: 1,
        name: "Shatter's Gaming Hoodie",
        price: 40
    },

    {
        id: 2,
        name: "Shatter's Gaming T-Shirt",
        price: 25
    }
];



/* ==========================================
   ADD ITEM TO CART
========================================== */

function addToCart(productID){

    const product = products.find(item => item.id === productID);

    if(!product){
        console.log("Product not found");
        return;
    }


    cart.push(product);


    saveCart();

    updateCartDisplay();

}



/* ==========================================
   REMOVE ITEM FROM CART
========================================== */

function removeFromCart(index){

    cart.splice(index,1);

    saveCart();

    updateCartDisplay();

}



/* ==========================================
   CLEAR ENTIRE CART
========================================== */

function clearCart(){

    cart = [];

    saveCart();

    updateCartDisplay();

}



/* ==========================================
   SAVE CART
   Saves cart to browser memory
========================================== */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



/* ==========================================
   UPDATE CART DISPLAY
   Changes the shopping sidebar contents
========================================== */

function updateCartDisplay(){

    const cartItems =
    document.getElementById("cart-items");


    const cartTotal =
    document.getElementById("cart-total");



    if(!cartItems){
        return;
    }



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
            $${item.price}
            </span>


            <button onclick="removeFromCart(${index})">
            Remove
            </button>

        </div>

        `;


    });



    if(cartTotal){

        cartTotal.innerHTML =
        "Total: $" + total;

    }


}



/* ==========================================
   OPEN CHECKOUT POPUP

   This replaces the ugly PayPal popup.
========================================== */

function openCheckout(){


    const popup =
    document.getElementById("checkout-popup");


    if(popup){

        popup.style.display = "flex";

    }

}



/* ==========================================
   CLOSE CHECKOUT POPUP
========================================== */

function closeCheckout(){


    const popup =
    document.getElementById("checkout-popup");


    if(popup){

        popup.style.display = "none";

    }

}



/* ==========================================
   PAYMENT COMPLETE BUTTON

   For now this only closes the popup.
   Later we connect PayPal here.
========================================== */

function paymentComplete(){


    alert(
        "Payment Complete! Thank you for supporting Shatter's Gaming!"
    );


    cart = [];


    saveCart();


    updateCartDisplay();


    closeCheckout();


}



/* ==========================================
   LOAD STORE WHEN PAGE OPENS
========================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

    updateCartDisplay();

});
