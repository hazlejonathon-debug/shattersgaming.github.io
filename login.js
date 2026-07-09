/* ==========================================
   SHATTER'S GAMING ADMIN LOGIN V2.0
   FIREBASE AUTHENTICATION
========================================== */


/* ==========================================
   FIREBASE IMPORTS
========================================== */


import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";


import {

getAuth,
signInWithEmailAndPassword,
setPersistence,
browserLocalPersistence,
onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";



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


const auth = getAuth(app);




/* ==========================================
   ELEMENTS
========================================== */


const emailInput =
document.getElementById("email");


const passwordInput =
document.getElementById("password");


const loginButton =
document.getElementById("login-btn");


const message =
document.getElementById("login-message");


const showPassword =
document.getElementById("show-password");


const rememberMe =
document.getElementById("remember-me");



/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */


showPassword.onclick = function(){


if(passwordInput.type === "password"){


passwordInput.type="text";


showPassword.innerHTML =
'<i class="fa-solid fa-eye-slash"></i>';


}

else{


passwordInput.type="password";


showPassword.innerHTML =
'<i class="fa-solid fa-eye"></i>';


}


};




/* ==========================================
   LOGIN FUNCTION
========================================== */


loginButton.onclick = async function(){


const email =
emailInput.value.trim();


const password =
passwordInput.value.trim();



if(!email || !password){


message.innerHTML =
"⚠ Please enter email and password";


return;


}



/* BUTTON LOADING */


loginButton.disabled=true;


document.querySelector(".button-text")
.style.display="none";


document.querySelector(".button-loader")
.style.display="inline";



try{


await setPersistence(

auth,

browserLocalPersistence

);



await signInWithEmailAndPassword(

auth,

email,

password

);



/* SUCCESS */


document
.getElementById("success-overlay")
.style.display="flex";



setTimeout(()=>{


window.location.href =
"admin.html";


},1500);



}



catch(error){


console.error(
"Login Error:",
error
);



message.innerHTML =
"❌ Invalid email or password";



loginButton.disabled=false;


document.querySelector(".button-text")
.style.display="inline";


document.querySelector(".button-loader")
.style.display="none";


}



};




/* ==========================================
   CHECK EXISTING SESSION
========================================== */


onAuthStateChanged(

auth,

(user)=>{


if(user){


console.log(

"🔥 Admin already logged in:",

user.email

);


}


}



);



console.log(
"🔥 Admin Login Loaded"
);
