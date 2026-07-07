// ==========================
// SHATTER'S GAMING STORE CART
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

}



// ==========================
// UPDATE CART DISPLAY
// ==========================

function updateCart(){

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");


    // Update counter

    if(cartCount){

        cartCount.innerHTML = cart.length;

    }



    if(!cartItems || !cartTotal){

        return;

    }



    if(cart.length === 0){

        cartItems.innerHTML = "Your cart is empty";

        cartTotal.innerHTML = "0.00";

        return;

    }



    let total = 0;


    cartItems.innerHTML = "";



    cart.forEach((item,index)=>{


        total += item.price;


        cartItems.innerHTML += `

        <div class="cart-item">

            <span>
            ${item.name} - $${item.price.toFixed(2)}
            </span>


            <button onclick="removeFromCart(${index})">
            ❌
            </button>

        </div>

        `;


    });



    cartTotal.innerHTML = total.toFixed(2);


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
// SAVE CART
// ==========================

function saveCart(){

    localStorage.setItem(
        "shatterCart",
        JSON.stringify(cart)
    );

}



// ==========================
// LOAD CART
// ==========================

updateCart();
/* ==========================
   CART SIDEBAR
========================== */


.cart-sidebar{

    position:fixed;

    top:0;

    right:-400px;

    width:380px;

    height:100%;

    background:#111;

    border-left:2px solid #39ff14;

    padding:30px;

    z-index:9999;

    transition:.4s;

    box-shadow:

    -10px 0 30px rgba(176,38,255,.4);

}



.cart-sidebar.active{

    right:0;

}



#cart-overlay{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.7);

    display:none;

    z-index:9998;

}



#cart-overlay.active{

    display:block;

}



#close-cart{

    float:right;

    background:none;

    border:none;

    color:white;

    font-size:20px;

    cursor:pointer;

}



.cart-sidebar h2{

    color:#39ff14;

    margin-bottom:30px;

}



.checkout-btn{

    width:100%;

    margin-top:30px;

    padding:15px;

    border:none;

    border-radius:50px;

    background:#39ff14;

    font-weight:bold;

    cursor:pointer;

}



.checkout-btn:hover{

    background:#b026ff;

    color:white;

}
