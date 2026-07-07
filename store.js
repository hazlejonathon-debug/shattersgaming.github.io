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

showNotification(productName);
   
}

// ==========================
// SHOW NOTIFICATION
// ==========================

function showNotification(productName){

    const notification =
        document.getElementById("cart-notification");

    const text =
        document.getElementById("notification-text");

    text.innerHTML =
        productName + " added to cart!";

    notification.classList.add("show");

    setTimeout(function(){

        notification.classList.remove("show");

    },2000);

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
