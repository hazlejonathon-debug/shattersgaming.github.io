const modal = document.getElementById("comingSoonModal");

const buttons = document.querySelectorAll(".notify-btn");

const closeBtn = document.querySelector(".close");

buttons.forEach(button => {

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
