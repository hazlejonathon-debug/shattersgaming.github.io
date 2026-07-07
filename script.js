// ===============================
// Merchandise Popup
// ===============================

const modal = document.getElementById("comingSoonModal");
const notifyButtons = document.querySelectorAll(".notify-btn");
const closeBtn = document.querySelector(".close");

notifyButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        if(modal){
            modal.style.display = "block";
        }

    });

});

if(closeBtn){

    closeBtn.addEventListener("click", function(){

        modal.style.display = "none";

    });

}

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

            entry.target.classList.add("show");

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


// ===============================
// Back To Top Button
// ===============================

const backToTop = document.getElementById("backToTop");

if(backToTop){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 500){

            backToTop.style.display = "block";

        } else {

            backToTop.style.display = "none";

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}
