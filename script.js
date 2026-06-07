const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const intro = document.getElementById("intro");
const introHeartField = document.createElement("div");
introHeartField.id = "introHeartField";
intro.appendChild(introHeartField);

const introHeartEmojis = ["💗","💕","💞","❣️","❤️","💘","💖"];
let introHeartInterval;

let caught = 0;

startBtn.onclick = () => {

    stopIntroHearts();
    intro.style.display = "none";
    gameArea.style.display = "block";

    const bg = document.getElementById("bgVideo");
    if(bg){
        const playPromise = bg.play();
        if(playPromise !== undefined){
            playPromise.catch((err) => {
                console.log('bgVideo autoplay prevented:', err);
            });
        }
    }

    const music = document.getElementById("music");
    if(music){
        const mp = music.play();
        if(mp !== undefined){
            mp.catch(() => {});
        }
    }

    createButterflies();
};

function createButterflies(){

    for(let i=0;i<5;i++){

        const b = document.createElement("div");

        b.className = "butterfly";
        b.innerHTML = "🦋";

        b.style.left =
        (5 + Math.random()*90)+"vw";

        b.style.top =
        (8 + Math.random()*80)+"vh";

        b.style.animationDuration =
        (6 + Math.random()*5)+"s";

        b.style.animationDelay =
        (-Math.random()*4)+"s";

        b.onclick = () => {

            b.remove();

            caught++;

            document.getElementById("count").innerText = caught;

            if(caught === 5){

                setTimeout(openGift,1000);

            }

        };

        gameArea.appendChild(b);
    }
}

function openGift(){

    gameArea.style.display = "none";

    document.getElementById("mainContent").style.display = "block";
    document.getElementById("mainContent").removeAttribute('aria-hidden');

    document
        .getElementById("music")
        .play();

    window.scrollTo(0,0);
    requestAnimationFrame(() => {
        const gift = document.getElementById("giftBtn");
        gift.classList.add("bounce");
    });
}

document
.getElementById("giftBtn")
.addEventListener("click", () => {
    const gift = document.getElementById("giftBtn");
    gift.disabled = true;
    gift.classList.add("active");
    document.querySelector(".final").classList.add("explode");

    const overlay = document.createElement("div");
    overlay.className = "explosionOverlay";
    document.body.appendChild(overlay);

    const colors = ["#ff5fe4","#ffb3db","#ffd6eb","#ff8ac7","#ff6ca6","#ffdbf0"];
    const symbols = ["🎉","✨","💖","💝","💗"];

    for(let i=0;i<220;i++){
        const confetti = document.createElement("div");
        const isHeart = Math.random() < 0.18;
        if(isHeart){
            confetti.className = "confetti heart";
            confetti.innerText = symbols[Math.floor(Math.random()*symbols.length)];
        } else {
            confetti.className = "confetti";
            confetti.style.background = colors[Math.floor(Math.random()*colors.length)];
        }

        confetti.style.left = Math.random()*100+"vw";
        confetti.style.top = "-20px";
        confetti.style.width = isHeart ? "18px" : (6 + Math.random()*10) + "px";
        confetti.style.height = isHeart ? "18px" : (6 + Math.random()*10) + "px";
        confetti.style.animationDuration = (2 + Math.random()*3)+"s";
        confetti.style.opacity = (0.7 + Math.random()*0.25).toFixed(2);
        if(isHeart){
            confetti.style.fontSize = (14 + Math.random()*12) + "px";
        }

        document.body.appendChild(confetti);
        setTimeout(()=> confetti.remove(), 5200);
    }

    setTimeout(() => overlay.remove(), 900);

    setTimeout(() => {
        alert(
            "❤️ Happy Birthday ❤️\n\nTerima kasih sudah hadir di hidupku."
        );
    }, 700);
});

function createFloatingHearts(){
    const heartEmojis = ["💗","💕","💞","❣️","❤️"];

    setInterval(()=>{
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerText = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
        heart.style.left = Math.random()*100 + "vw";
        heart.style.fontSize = (18 + Math.random()*18) + "px";
        heart.style.opacity = (0.35 + Math.random()*0.45).toFixed(2);
        heart.style.animationDuration = (5 + Math.random()*3) + "s";

        document.getElementById("heartField").appendChild(heart);

        setTimeout(()=>heart.remove(), 9000);
    }, 900);
}

function spawnIntroHeart(){
    const heart = document.createElement("div");
    heart.className = "intro-heart";
    heart.innerText = introHeartEmojis[Math.floor(Math.random()*introHeartEmojis.length)];
    heart.style.left = Math.max(0, Math.min(95, Math.random()*110 - 5)) + "%";
    heart.style.fontSize = (16 + Math.random()*24) + "px";
    heart.style.opacity = (0.4 + Math.random()*0.5).toFixed(2);
    heart.style.animationDuration = (4 + Math.random()*2) + "s";
    introHeartField.appendChild(heart);

    setTimeout(()=>heart.remove(), 8500);
}

function createIntroHearts(){
    introHeartInterval = setInterval(()=>{
        for(let i=0;i<3;i++){
            spawnIntroHeart();
        }
    }, 450);
}

function stopIntroHearts(){
    clearInterval(introHeartInterval);
}

function setupImageFallbacks(){
    const fallback = 'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="250" height="320"><rect width="100%" height="100%" fill="%23ffe6f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23646" font-size="22" font-family="Arial,sans-serif">Foto</text></svg>');
    document.querySelectorAll('.photos img').forEach(img => {
        img.onerror = () => {
            if (img.src !== fallback) {
                img.src = fallback;
            }
        };
    });
}

createFloatingHearts();
createIntroHearts();
setupImageFallbacks();
 