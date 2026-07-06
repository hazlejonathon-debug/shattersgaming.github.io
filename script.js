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
// ===============================
// Twitch Live Stream Hub Connection
// ===============================

async function updateLiveStatus(){

    try {

        const response = await fetch(twitchAPI);
        const data = await response.json();

        const liveCard = document.querySelector(".live-card");
        const status = document.querySelector(".live-status p");
        const title = document.querySelector(".live-card h3");
        const game = document.querySelector(".game-playing");
        const statBoxes = document.querySelectorAll(".stat-box p");

        if(data.live){

            liveCard.classList.add("live");

            status.innerHTML = "🟢 LIVE NOW";

            title.innerHTML = "Shatter is currently LIVE!";

            game.innerHTML = "Playing: " + data.game;

            statBoxes[0].innerHTML = data.game;
            statBoxes[1].innerHTML = data.viewers;

        } else {

            liveCard.classList.remove("live");

            status.innerHTML = "🔴 OFFLINE";

            title.innerHTML = "Shatter is currently offline";

            game.innerHTML = "Last played: Call of Duty";

            statBoxes[0].innerHTML = "—";
            statBoxes[1].innerHTML = "0";

        }

    } catch(error){

        console.log("Twitch Connection Error:", error);

    }

}

updateLiveStatus();

setInterval(updateLiveStatus, 60000);
