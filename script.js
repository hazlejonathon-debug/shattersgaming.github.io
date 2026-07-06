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

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            // Animate the section
            entry.target.classList.add("show");

            // Animate each card
            const cards = entry.target.querySelectorAll(".card");

            cards.forEach(card=>{

                card.classList.add("show");

            });

        }

    });

},{
    threshold:.2
});

sections.forEach(section=>observer.observe(section));
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

cards.forEach(card => {
    observer.observe(card);
});
