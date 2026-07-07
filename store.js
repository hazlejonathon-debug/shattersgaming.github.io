// ==========================
// SHATTER'S GAMING STORE CART
// ==========================


let cart = [];

let cartCount = document.getElementById("cart-count");


// ==========================
// ADD ITEM TO CART
// ==========================

function addToCart(productName, productPrice){

    cart.push({

        name: productName,
        price: productPrice

    });


    updateCart();

}



// ==========================
// UPDATE CART DISPLAY
// ==========================

function updateCart(){

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");


    if(!cartItems || !cartTotal){
        return;
    }


    if(cart.length === 0){

        cartItems.innerHTML = "Your cart is empty";

     if(cartCount){

    cartCount.innerHTML = cart.length;

}

        return;

    }



    let total = 0;


    cartItems.innerHTML = "";



    cart.forEach((item,index)=>{


        total += item.price;



        cartItems.innerHTML += `

        <div class="cart-item">

            <span>
                ${item.name}
                - $${item.price.toFixed(2)}
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
// REMOVE ITEM FROM CART
// ==========================

function removeFromCart(index){

    cart.splice(index,1);

    updateCart();

}



// ==========================
// LOAD CART
// ==========================

updateCart();
