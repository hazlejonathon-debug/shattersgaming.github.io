/* ==========================================
   SHATTER'S GAMING ADMIN DASHBOARD
========================================== */


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";


import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc
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



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);



const ordersDiv =
document.getElementById("orders");



/* ==========================================
   LOAD ORDERS
========================================== */


async function loadOrders(){


    try{


        const snapshot =
        await getDocs(
            collection(db,"orders")
        );



        ordersDiv.innerHTML = "";



        if(snapshot.empty){


            ordersDiv.innerHTML = `

            <div class="order-card">

                <h2>
                No Orders Yet
                </h2>

                <p>
                Orders will appear here after payment.
                </p>

            </div>

            `;


            return;


        }



        snapshot.forEach((document)=>{


            const order =
            document.data();


            const orderID =
            document.id;



            ordersDiv.innerHTML += `


            <div class="order-card">


                <h2>
                🎮 ${order.customerName || "Unknown Customer"}
                </h2>


                <p>
                📧 ${order.email || "No Email"}
                </p>


                <p>
                💰 Total:
                $${order.total}
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
                order.items.map(item=>`

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
                }



                <br>



                <label>
                Update Status:
                </label>



                <select id="status-${orderID}">


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



                <button onclick="updateOrderStatus('${orderID}')">

                💾 Save Status

                </button>



            </div>


            `;



        });



    }


    catch(error){


        console.error(
            "Firebase Admin Error:",
            error
        );


        ordersDiv.innerHTML =
        "Error loading orders.";


    }


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
            "Update Error:",
            error
        );


        alert(
            "❌ Could not update order"
        );


    }


};





/* ==========================================
   START DASHBOARD
========================================== */


loadOrders();


console.log(
"🔥 Admin Dashboard Loaded"
);
