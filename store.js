/* ==========================================
   SHATTER'S GAMING STORE.JS
========================================== */

console.log("Firebase Objects:", {
    db,
    collection,
    addDoc,
    serverTimestamp
});

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

${
item.size 
? `<br>Size: ${item.size}` 
: ""
}

${
item.color 
? `<br>Color: ${item.color}` 
: ""
}

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

/* ==========================
   CONFIRM CHECKOUT BUTTON
========================== */

const confirmCheckout =
document.getElementById("confirm-checkout");

if(confirmCheckout){

    confirmCheckout.onclick = function(){

        // Disable button while PayPal loads
        confirmCheckout.disabled = true;
        confirmCheckout.innerHTML = "Loading...";

        loadPayPal();

    };

}

/* ==========================
   LOAD PAYPAL
========================== */

function loadPayPal() {

    const paypalContainer =
        document.getElementById("paypal-button-container");

    const checkoutActions =
        document.querySelector(".checkout-actions");

    paypalContainer.innerHTML = "";

    paypal.Buttons({

        createOrder: function(data, actions){

            return actions.order.create({

                purchase_units: [{
                    amount: {
                        value: getCartTotal()
                    }
                }]

            });

        },

        onApprove: function(data, actions){

            return actions.order.capture().then(function(details){
               
const db = window.db;
const collection = window.collection;
const addDoc = window.addDoc;
const serverTimestamp = window.serverTimestamp;

               console.log("Saving order...", {
    db,
    collection,
    addDoc,
    serverTimestamp
});

               addDoc(
    collection(db, "orders"),
    {

        customerName:
            details.payer.name.given_name +
            " " +
            details.payer.name.surname,

        email:
            details.payer.email_address,

        items: cart,

        total: getCartTotal(),

        paypalOrderID: data.orderID,

        status: "Ready for Printify",

        createdAt: serverTimestamp()

    }
)
.then(() => {

    console.log("🔥 Order saved to Firebase");

})
.catch((error) => {

    console.error("Firebase Error:", error);

});
                // Hide popup
                document
                    .getElementById("checkout-popup")
                    .classList.remove("active");

                // Show success popup
                document
                    .getElementById("payment-success-popup")
                    .classList.add("active");

                paypalContainer.innerHTML = "";

                checkoutActions.style.display = "flex";

                confirmCheckout.disabled = false;
                confirmCheckout.innerHTML = "Continue";

                cart = [];

                saveCart();
                updateCart();

            });

        },

        onCancel: function(){

            paypalContainer.innerHTML = "";

            checkoutActions.style.display = "flex";

            confirmCheckout.disabled = false;
            confirmCheckout.innerHTML = "Continue";

        },

        onError: function(err){

            console.error(err);

            alert("PayPal encountered an error.");

            paypalContainer.innerHTML = "";

            checkoutActions.style.display = "flex";

            confirmCheckout.disabled = false;
            confirmCheckout.innerHTML = "Continue";

        }

    }).render("#paypal-button-container")

    .then(function(){

        // Only hide the buttons AFTER PayPal successfully renders
        checkoutActions.style.display = "none";

    })

    .catch(function(error){

        console.error("PayPal failed to load:", error);

        paypalContainer.innerHTML = "";

        checkoutActions.style.display = "flex";

        confirmCheckout.disabled = false;
        confirmCheckout.innerHTML = "Continue";

    });

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
function addHoodieToCart(){

    const size =
    document.getElementById("hoodie-size").value;


    const color =
    document.getElementById("hoodie-color").value;


    cart.push({

        name: "Elite Hoodie",

        size: size,

        color: color,

        price: 59.99,

        quantity: 1,

        provider: "Printify",

        product: "Gildan 18000"

    });


    saveCart();

    updateCart();


    showNotification(
        "Elite Hoodie added!"
    );

}
/* ==========================================
   FIREBASE TEST BUTTON
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    const firebaseTest =
    document.getElementById("firebase-test");


    if(firebaseTest){

        firebaseTest.onclick = async function(){

            console.log("Firebase test clicked");


            try{

                await window.addDoc(

                    window.collection(
                        window.db,
                        "orders"
                    ),

                    {

                        customerName:"Test Customer",

                        email:"test@shattersgaming.com",

                        items:[
                            {
                                name:"Elite Hoodie",
                                size:"Medium",
                                color:"Black",
                                quantity:1,
                                price:59.99
                            }
                        ],

                        total:59.99,

                        paypalOrderID:"TEST123",

                        status:"Ready for Printify",

                        createdAt:
                        window.serverTimestamp()

                    }

                );


                alert("🔥 Test order saved!");

            }


            catch(error){

                console.error(
                    "Firebase test error:",
                    error
                );


                alert(
                    "Firebase Error: " +
                    error.message
                );

            }

        };

    }

});  
