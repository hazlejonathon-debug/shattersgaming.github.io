/* ==========================================
   SHATTER'S GAMING STORE.JS
   CLEAN REBUILD
========================================== */


/* ==========================================
   CART DATA
========================================== */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];



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
   GET CART TOTAL
========================================== */

function getCartTotal(){

    let total = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

    });


    return total.toFixed(2);

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

    else{


        cart.push({

            name:name,

            price:Number(price),

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
    document.getElementById(
        "hoodie-size"
    ).value;



    const color =
    document.getElementById(
        "hoodie-color"
    ).value;



    cart.push({

        name:"Elite Hoodie",

        price:59.99,

        size:size,

        color:color,

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
   ADD CLASSIC TEE
========================================== */

function addTeeToCart(){

    const size =
    document.getElementById("tee-size").value;

    const color =
    document.getElementById("tee-color").value;

    cart.push({

        name:"Classic Tee",

        size:size,

        color:color,

        price:28.00,

        quantity:1,

        provider:"Printify"

    });

    saveCart();

    updateCart();

    showNotification(
        "Classic Tee added!"
    );

}



/* ==========================================
   ADD PRO CAP
========================================== */

function addCapToCart(){

    const color =
    document.getElementById("cap-color").value;

    cart.push({

        name:"Pro Cap",

        color:color,

        price:34.99,

        quantity:1,

        provider:"Printify"

    });

    saveCart();

    updateCart();

    showNotification(
        "Pro Cap added!"
    );

}



/* ==========================================
   ADD STREAMER MUG
========================================== */

function addMugToCart(){

    const color =
    document.getElementById("mug-color").value;

    cart.push({

        name:"Streamer Mug",

        color:color,

        price:39.99,

        quantity:1,

        provider:"Printify"

    });

    saveCart();

    updateCart();

    showNotification(
        "Streamer Mug added!"
    );

}

/* ==========================================
   REMOVE ITEM
========================================== */

function removeFromCart(index){


    cart.splice(
        index,
        1
    );


    saveCart();

    updateCart();


}



/* ==========================================
   CHANGE QUANTITY
========================================== */

function changeQuantity(index, amount){


    if(!cart[index]) return;



    cart[index].quantity += amount;



    if(cart[index].quantity <= 0){

        cart.splice(
            index,
            1
        );

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
    document.getElementById(
        "cart-items"
    );


    const totalBox =
    document.getElementById(
        "cart-total"
    );


    const count =
    document.getElementById(
        "cart-count"
    );



    if(!items) return;



    items.innerHTML = "";



    let total = 0;



    if(cart.length === 0){


        items.innerHTML =
        "Your cart is empty";


    }

    else{


        cart.forEach((item,index)=>{


            total +=
            item.price *
            item.quantity;



            items.innerHTML += `


<div class="cart-item">


<span>

${item.name}

${
item.size
?
"<br>Size: " + item.size
:
""
}

${
item.color
?
"<br>Color: " + item.color
:
""
}

</span>



<span>

$${(
item.price *
item.quantity
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



    if(totalBox){

        totalBox.innerHTML =
        total.toFixed(2);

    }



    if(count){

        count.innerHTML =
        cart.reduce(
            (sum,item)=>
            sum + item.quantity,
            0
        );

    }


}
 
/* ==========================================
   CART SIDEBAR CONTROLS
========================================== */


document.addEventListener(
"DOMContentLoaded",
function(){



    updateCart();



    const openCart =
    document.getElementById(
        "open-cart"
    );



    const closeCart =
    document.getElementById(
        "close-cart"
    );



    const cartSidebar =
    document.querySelector(
        ".cart-sidebar"
    );



    const cartOverlay =
    document.getElementById(
        "cart-overlay"
    );




    if(openCart && cartSidebar){


        openCart.onclick = function(e){


            e.preventDefault();


            cartSidebar.classList.add(
                "active"
            );


            if(cartOverlay){

                cartOverlay.classList.add(
                    "active"
                );

            }


        };


    }





    if(closeCart && cartSidebar){


        closeCart.onclick = function(){


            cartSidebar.classList.remove(
                "active"
            );


            if(cartOverlay){

                cartOverlay.classList.remove(
                    "active"
                );

            }


        };


    }





    if(cartOverlay){


        cartOverlay.onclick = function(){


            cartSidebar.classList.remove(
                "active"
            );


            cartOverlay.classList.remove(
                "active"
            );


        };


    }




/* ==========================================
   CHECKOUT POPUP
========================================== */


const checkoutButton =
document.querySelector(
    ".checkout-btn"
);



const checkoutPopup =
document.getElementById(
    "checkout-popup"
);




if(checkoutButton && checkoutPopup){


    checkoutButton.onclick=function(){


        checkoutPopup.classList.add(
            "active"
        );


    };


}





const cancelCheckout =
document.getElementById(
    "cancel-checkout"
);



const closeCheckout =
document.getElementById(
    "close-checkout-popup"
);




function closeCheckoutPopup(){


    if(checkoutPopup){

        checkoutPopup.classList.remove(
            "active"
        );

    }


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
    document.getElementById(
        "cart-notification"
    );



    const text =
    document.getElementById(
        "notification-text"
    );



    if(!box || !text){

        return;

    }



    text.innerHTML =
    message;



    box.classList.add(
        "show"
    );



    setTimeout(()=>{


        box.classList.remove(
            "show"
        );


    },2000);



}




/* ==========================================
   PAYPAL CHECKOUT
========================================== */


const confirmCheckout =
document.getElementById(
    "confirm-checkout"
);




if(confirmCheckout){



confirmCheckout.onclick=function(){



    confirmCheckout.disabled=true;



    confirmCheckout.innerHTML =
    "Loading...";



    startPayPal();



};



}




function startPayPal(){



const container =
document.getElementById(
    "paypal-button-container"
);



const actionsBox =
document.querySelector(
    ".checkout-actions"
);



if(!container){

    return;

}




container.innerHTML="";



if(typeof paypal === "undefined"){


    console.error(
        "PayPal not loaded"
    );


    return;


}





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

 
/* ==========================================
   FIREBASE ORDER SAVE
========================================== */


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


            customerName:
            "Test Customer",


            email:
            "test@shattersgaming.com",


            items:
            cart,


            total:
            Number(getCartTotal()),


            paypalOrderID:
            data.orderID,


            status:
            "Ready for Printify",


            createdAt:
            window.serverTimestamp()


        }


    );



    console.log(
        "🔥 Order saved to Firebase"
    );


}

else{


    console.warn(
        "⚠️ Firebase not ready"
    );


}





/* ==========================================
   PAYMENT SUCCESS
========================================== */


const checkoutPopup =
document.getElementById(
    "checkout-popup"
);



const successPopup =
document.getElementById(
    "payment-success-popup"
);



if(checkoutPopup){


    checkoutPopup.classList.remove(
        "active"
    );


}



if(successPopup){

confirmCheckout.disabled=false;



confirmCheckout.innerHTML =
"Continue";

   
    successPopup.classList.add(
        "active"
    );


}





cart = [];


saveCart();


updateCart();



container.innerHTML="";







});



},




onCancel:function(){



    container.innerHTML="";



    if(actionsBox){


        actionsBox.style.display =
        "flex";


    }



    confirmCheckout.disabled=false;



    confirmCheckout.innerHTML =
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



    confirmCheckout.innerHTML =
    "Continue";



}



})



.render(
    "#paypal-button-container"
);



}




/* ==========================================
   PAYMENT SUCCESS BUTTON
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
   DEBUG
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
   MAKE HTML BUTTONS WORK
========================================== */

window.addToCart =
addToCart;

window.addHoodieToCart =
addHoodieToCart;

window.addTeeToCart =
addTeeToCart;

window.addCapToCart =
addCapToCart;

window.addMugToCart =
addMugToCart;

window.clearCart =
clearCart;

window.changeQuantity =
changeQuantity;

window.removeFromCart =
removeFromCart;
