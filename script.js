console.log("Welcome to Shatter's Gaming!");

const buttons = document.querySelectorAll(".button");

buttons.forEach(button=>{
    button.addEventListener("mouseenter",()=>{
        button.style.boxShadow="0 0 25px #39ff14";
    });

    button.addEventListener("mouseleave",()=>{
        button.style.boxShadow="none";
    });
});

window.addEventListener("scroll",()=>{

    const hero=document.querySelector(".hero");

    hero.style.backgroundPositionY=window.scrollY*0.3+"px";

});
