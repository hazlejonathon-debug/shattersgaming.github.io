/* ==========================================
   SHATTER'S GAMING ADMIN DASHBOARD
   FEATURES:
   - Load Firebase Orders
   - Search Orders
   - Update Order Status
   - Delete Orders
========================================== */

/* ==========================================
   SHATTER'S GAMING ADMIN SECURITY
   FIREBASE AUTH PROTECTION
========================================== */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {

getFirestore,
collection,
getDocs,
doc,
updateDoc,
deleteDoc

}

from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* ==========================================
   FIREBASE CONFIG
========================================== */


const firebaseConfig = {

    apiKey: "AIzaSyDWtyteQ1nli-d6fOlUqd5Rj9O7wmE8O-U",

    authDomain: "shattersgamingstore.firebaseapp.com",

    projectId: "shattersgamingstore",

    storageBucket: "shattersgamingstore.firebasestorage.app",

    messagingSenderId: "1064932478413",

    appId: "1:1064932478413:web:4620aa3228ae9728b58884"

};

/* ==========================================
   INITIALIZE FIREBASE
========================================== */


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getFirestore(app);


/* ==========================================
   GLOBAL VARIABLES
========================================== */


const ordersDiv =
document.getElementById("orders");


const searchBox =
document.getElementById("order-search");


let allOrders = [];



/* ==========================================
   LOAD ORDERS FROM FIREBASE
========================================== */


async function loadOrders(){


    try{


        const snapshot =
        await getDocs(
            collection(db,"orders")
        );



        allOrders = [];



        snapshot.forEach((document)=>{


            allOrders.push({

                id: document.id,

                ...document.data()

            });


        });



        displayOrders(allOrders);



    }


    catch(error){


        console.error(
            "Firebase Load Error:",
            error
        );


        ordersDiv.innerHTML =
        "❌ Error loading orders";


    }


}




/* ==========================================
   DISPLAY ORDERS
========================================== */


function displayOrders(orders){



    ordersDiv.innerHTML = "";



    if(orders.length === 0){


        ordersDiv.innerHTML = `

        <div class="order-card">

            <h2>
            No Orders Found
            </h2>

            <p>
            Try another search.
            </p>

        </div>

        `;


        return;

    }



    orders.forEach((order)=>{



        ordersDiv.innerHTML += `


        <div class="order-card">


            <h2>
            🎮 ${order.customerName || "Unknown"}
            </h2>



            <p>
            📧 ${order.email || "No Email"}
            </p>



            <p>
            💰 Total:
            $${order.total || "0.00"}
            </p>



            <p>
            🆔 PayPal:
            ${order.paypalOrderID || "N/A"}
            </p>



            <p>
            📦 Status:

            <span class="status">
            ${order.status || "Pending"}
            </span>

            </p>



            <h3>
            Items
            </h3>



            ${
            order.items?.map(item=>`

                <div class="item">

                🎮 ${item.name}

                <br>

                Quantity:
                ${item.quantity}


                ${
                item.size
                ?
                `<br>Size: ${item.size}`
                :
                ""
                }


                ${
                item.color
                ?
                `<br>Color: ${item.color}`
                :
                ""
                }


                </div>


            `).join("")
            ||
            "No Items"

            }



            <br>


            <label>
            Update Status:
            </label>



            <select id="status-${order.id}">


                <option value="Ready for Printify"
                ${order.status==="Ready for Printify"?"selected":""}>

                Ready for Printify

                </option>



                <option value="Printing"
                ${order.status==="Printing"?"selected":""}>

                Printing

                </option>



                <option value="Shipped"
                ${order.status==="Shipped"?"selected":""}>

                Shipped

                </option>



                <option value="Complete"
                ${order.status==="Complete"?"selected":""}>

                Complete

                </option>


            </select>



            <br>



            <button onclick="updateOrderStatus('${order.id}')">

            💾 Save Status

            </button>



            <button class="delete-btn"
            onclick="deleteOrder('${order.id}')">

            🗑️ Delete Order

            </button>



        </div>


        `;



    });



}




/* ==========================================
   SEARCH ORDERS
========================================== */


if(searchBox){


    searchBox.addEventListener(
    "input",
    function(){


        const search =
        this.value.toLowerCase();



        const filtered =
        allOrders.filter(order=>{


            return (

                order.customerName
                ?.toLowerCase()
                .includes(search)


                ||

                order.email
                ?.toLowerCase()
                .includes(search)


                ||

                order.status
                ?.toLowerCase()
                .includes(search)


                ||

                JSON.stringify(order.items)
                .toLowerCase()
                .includes(search)


            );


        });



        displayOrders(filtered);



    });


}





/* ==========================================
   UPDATE ORDER STATUS
========================================== */


window.updateOrderStatus =
async function(orderID){


    const newStatus =
    document.getElementById(
        "status-" + orderID
    ).value;



    try{


        await updateDoc(

            doc(
                db,
                "orders",
                orderID
            ),

            {

                status:newStatus

            }

        );



        alert(
            "✅ Order Updated"
        );



        loadOrders();



    }


    catch(error){


        console.error(
            error
        );


        alert(
            "❌ Update failed"
        );


    }


};





/* ==========================================
   DELETE ORDER
========================================== */


window.deleteOrder =
async function(orderID){



    if(
        !confirm(
        "Delete this order?"
        )
    ){

        return;

    }



    try{


        await deleteDoc(

            doc(
                db,
                "orders",
                orderID
            )

        );



        alert(
            "🗑️ Order Deleted"
        );



        loadOrders();



    }


    catch(error){


        console.error(
            error
        );


        alert(
            "❌ Delete failed"
        );


    }


};



/* ==========================================
   ADMIN PAGE SECURITY CHECK
========================================== */


const ADMIN_EMAIL =
"hazlejonathon@gmail.com";


onAuthStateChanged(auth,(user)=>{


if(user && user.email === ADMIN_EMAIL){


console.log(
"🔥 Admin verified:",
user.email
);


loadOrders();


}


else{


console.log(
"⚠️ Unauthorized access attempt"
);



signOut(auth);


window.location.href =
"login.html";


}


});


console.log(
"🔥 Shatter's Gaming Admin Dashboard Loaded"
);


/* ==========================================
   LOGOUT BUTTON
========================================== */


const logoutButton =
document.getElementById("logout-btn");



if(logoutButton){


logoutButton.onclick = async()=>{


await signOut(auth);



window.location.href =
"login.html";


};


}



console.log(
"🔥 Admin Security Loaded"
);
