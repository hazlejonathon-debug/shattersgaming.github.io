/* ==========================================
   SHATTER'S GAMING STORE.JS
   CLEAN VERSION
========================================== */
window.addEventListener("load", () => {

    console.log("Firebase check:");
    console.log(window.db);

/* ==========================================
   CART DATA
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
   ADD NORMAL PRODUCT
========================================== */

function addToCart(name, price){

    let existing = cart.find(
        item => item.name === name
    );


    if(existing){

        existing.quantity++;

    } 
    else {

        cart.push({

            name:name,
            price:price,
            quantity:1

        });

    }


    saveCart();

    updateCart();

    showNotification(
        name + " added!"
    );

}



/* ==========================================
   ADD HOODIE
========================================== */

function addHoodieToCart(){

    const size =
    document.getElementById("hoodie-size").value;


    const color =
    document.getElementById("hoodie-color").value;



    cart.push({

        name:"Elite Hoodie",

        size:size,

        color:color,

        price:59.99,

        quantity:1,

        provider:"Printify",

        product:"Gildan 18000"

    });


    saveCart();

    updateCart();


    showNotification(
        "Elite Hoodie added!"
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
   CHANGE QUANTITY
========================================== */

function changeQuantity(index,amount){


    cart[index].quantity += amount;


    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }


    saveCart();

    updateCart();

}



/* ==========================================
   CLEAR CART
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


    const items =
    document.getElementById("cart-items");


    const totalBox =
    document.getElementById("cart-total");


    const count =
    document.getElementById("cart-count");



    if(!items) return;



    items.innerHTML="";


    let total = 0;



    if(cart.length === 0){


        items.innerHTML =
        "Your cart is empty";


    }
    else{


        cart.forEach((item,index)=>{


            total +=
            item.price * item.quantity;



            items.innerHTML += `


<div class="cart-item">


<span>

${item.name}

${item.size ?
"<br>Size: "+item.size
:""}

${item.color ?
"<br>Color: "+item.color
:""}

</span>


<span>

$${(
item.price * item.quantity
).toFixed(2)}

</span>



<div class="quantity-controls">


<button onclick="changeQuantity(${index},-1)">
-
</button>


<span>
${item.quantity}
</span>


<button onclick="changeQuantity(${index},1)">
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



    totalBox.innerHTML =
    total.toFixed(2);



    count.innerHTML =
    cart.reduce(
        (sum,item)=>sum+item.quantity,
        0
    );


}
/* ==========================================
   CART SIDEBAR CONTROLS
========================================== */


document.addEventListener(
"DOMContentLoaded",
function(){


updateCart();



const openCart =
document.getElementById("open-cart");


const closeCart =
document.getElementById("close-cart");


const cartSidebar =
document.querySelector(".cart-sidebar");


const cartOverlay =
document.getElementById("cart-overlay");



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



/* ==========================================
   CHECKOUT POPUP
========================================== */


const checkoutButton =
document.querySelector(".checkout-btn");


const checkoutPopup =
document.getElementById("checkout-popup");



if(checkoutButton && checkoutPopup){


checkoutButton.onclick=function(){


    checkoutPopup.classList.add("active");


};


}



const cancelCheckout =
document.getElementById("cancel-checkout");


const closeCheckout =
document.getElementById("close-checkout-popup");



function closeCheckoutPopup(){

    checkoutPopup.classList.remove("active");

}



if(cancelCheckout){

cancelCheckout.onclick =
closeCheckoutPopup;

}



if(closeCheckout){

closeCheckout.onclick =
closeCheckoutPopup;

}



});



/* ==========================================
   CART NOTIFICATION
========================================== */


function showNotification(message){


const box =
document.getElementById("cart-notification");


const text =
document.getElementById("notification-text");



if(!box) return;



text.innerHTML = message;



box.classList.add("show");



setTimeout(()=>{


box.classList.remove("show");


},2000);



}



/* ==========================================
   GET CART TOTAL
========================================== */


function getCartTotal(){


let total = 0;



cart.forEach(item=>{


total +=
item.price * item.quantity;


});



return total.toFixed(2);


}



/* ==========================================
   PAYPAL CHECKOUT
========================================== */


const confirmCheckout =
document.getElementById("confirm-checkout");



if(confirmCheckout){


confirmCheckout.onclick=function(){


confirmCheckout.disabled=true;

confirmCheckout.innerHTML =
"Loading...";


loadPayPal();


};


}



function loadPayPal(){


const container =
document.getElementById(
"paypal-button-container"
);


const actions =
document.querySelector(
".checkout-actions"
);



container.innerHTML="";



paypal.Buttons({



createOrder:function(data,actions){


return actions.order.create({


purchase_units:[{


amount:{


value:getCartTotal()


}


}]


});


},



onApprove:function(data,actions){


    return actions.order.capture()

    .then(async function(details){


        console.log(
            "Payment completed",
            details
        );


        /* FIREBASE SAVE */

        if(
            window.db &&
            window.addDoc &&
            window.collection
        ){


            await window.addDoc(

                window.collection(
                    window.db,
                    "orders"
                ),

                {

                    customerName:"Test Customer",

                    email:"test@email.com",

                    items:cart,

                    total:cartTotal,

                    paypalOrderID:data.orderID,

                    status:"Ready for Printify",

                    createdAt:
                    window.serverTimestamp()

                }

            );


        }


    });


}


console.log(
"🔥 Order saved to Firebase"
);


}





document
.getElementById(
"checkout-popup"
)
.classList.remove("active");



document
.getElementById(
"payment-success-popup"
)
.classList.add("active");



cart=[];


saveCart();

updateCart();



container.innerHTML="";


confirmCheckout.disabled=false;


confirmCheckout.innerHTML=
"Continue";



});


},



onCancel:function(){


container.innerHTML="";


actions.style.display="flex";


confirmCheckout.disabled=false;


confirmCheckout.innerHTML=
"Continue";


},



onError:function(error){


console.error(
"PayPal Error:",
error
);


alert(
"PayPal encountered an error."
);



container.innerHTML="";


confirmCheckout.disabled=false;


confirmCheckout.innerHTML=
"Continue";


}



})


.render(
"#paypal-button-container"
)

.then(()=>{


actions.style.display="none";


});


}
/* ==========================================
   PAYMENT SUCCESS POPUP
========================================== */


document.addEventListener(
"DOMContentLoaded",
function(){


const successButton =
document.getElementById(
"close-payment-success"
);


const successPopup =
document.getElementById(
"payment-success-popup"
);



if(successButton && successPopup){


successButton.onclick=function(){


successPopup.classList.remove(
"active"
);


};


}



});



/* ==========================================
   FIREBASE DEBUG CHECK
========================================== */


console.log(
"🔥 Store.js loaded"
);


if(window.db){

console.log(
"🔥 Firebase connection available"
);

}
else{

console.log(
"⚠️ Waiting for Firebase connection"
);

}



/* ==========================================
   MAKE FUNCTIONS AVAILABLE TO HTML
========================================== */


window.addToCart =
addToCart;


window.addHoodieToCart =
addHoodieToCart;


window.clearCart =
clearCart;


window.changeQuantity =
changeQuantity;


window.removeFromCart =
removeFromCart;

