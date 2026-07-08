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
📦 Status:
<span class="status">
${order.status}
</span>
</p>


<h3>
Items
</h3>


${order.items.map(item=>`

<div class="item">

${item.name}

<br>

Quantity:
${item.quantity}


${item.size ? `<br>Size: ${item.size}` : ""}


${item.color ? `<br>Color: ${item.color}` : ""}


</div>

`).join("")}


</div>   
