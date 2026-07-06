// ===============================
// Merchandise Popup
// ===============================

const modal = document.getElementById("comingSoonModal");
const notifyButtons = document.querySelectorAll(".notify-btn");
const closeBtn = document.querySelector(".close");

notifyButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        modal.style.display = "block";

    });

});

closeBtn.addEventListener("click", function(){

    modal.style.display = "none";

});

window.addEventListener("click", function(e){

    if(e.target === modal){

        modal.style.display = "none";

    }

});


// ===============================
// Scroll Animations
// ===============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((el)=>observer.observe(el));
