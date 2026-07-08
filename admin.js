import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";


import { 
    getFirestore,
    collection,
    getDocs
} 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



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



async function loadOrders(){


    try {


        const snapshot = await getDocs(
            collection(db,"orders")
        );


        ordersDiv.innerHTML = "";



        if(snapshot.empty){


            ordersDiv.innerHTML = `

            <div class="product-card">

                <h3>
                No Orders Yet
                </h3>

                <p>
                Orders will appear here after payment.
                </p>

            </div>

            `;


            return;

        }



        snapshot.forEach((doc)=>{


            const order = doc.data();



            ordersDiv.innerHTML += `


            <div class="product-card">


                <h3>
                🎮 ${order.customerName || "Unknown"}
                </h3>


                <p>
                📧 ${order.email || "No Email"}
                </p>


                <p>
                💰 Total:
                $${order.total}
                </p>


                <p>
                📦 Status:
                ${order.status}
                </p>


                <h4>
                Items:
                </h4>


                ${order.items.map(item => `

                    <p>
                    ${item.name}
                    x${item.quantity}

                    ${
                    item.size 
                    ? " | Size: " + item.size 
                    : ""
                    }

                    ${
                    item.color 
                    ? " | Color: " + item.color 
                    : ""
                    }

                    </p>

                `).join("")}


            </div>


            `;


        });



    }
    catch(error){


        console.error(
            "❌ Admin Firebase Error:",
            error
        );


        ordersDiv.innerHTML =
        "Error loading orders.";

    }


}



loadOrders();
