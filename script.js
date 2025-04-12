// --- Full JavaScript File for Our Anniversary Page ---

document.addEventListener("DOMContentLoaded", () => {
    // Initialize countdown and together-time displays
    updateCountdown();
    updateTogetherTime();
    setInterval(updateCountdown, 1000);
    setInterval(updateTogetherTime, 1000);

    // Create hearts animation periodically
    setInterval(() => createHearts(), 400);

    // Try unmuting music after a short delay
    setTimeout(() => {

        showFallbackButton();
    }, 500);

    // Remove fallback overlay if any click happens elsewhere
    document.addEventListener("click", removeFallbackOverlay);
});

// Image reveal on scroll
let lastScrollTop = window.scrollY;

document.addEventListener("scroll", () => {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Image center relative to viewport center
        const imageCenterY = rect.top + rect.height / 2;
        const viewportCenterY = windowHeight / 2;

        const distance = Math.abs(imageCenterY - viewportCenterY);
        const maxDistance = windowHeight / 1.2; // How far before it's fully hidden
        const visibility = Math.max(0, 1 - distance / maxDistance); // 0 to 1

        img.style.opacity = visibility;
        img.style.transform = `translateY(${(1 - visibility) * 10}px)`;

        if (visibility > 0.1) {
            img.classList.add("show");
        } else {
            img.classList.remove("show");
        }
    });

    if (window.scrollY > 200) {
        // Scrolling down
        document.querySelector(".scroll-down").style.display = "none";
    }
});

// Countdown timer updater
function updateCountdown() {
    const anniversaryDate = new Date("2025-04-14T00:00:00");
    const now = new Date();
    const timeLeft = anniversaryDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerText =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Together-time updater
function updateTogetherTime() {
    const startDate = new Date("2024-04-14T00:00:00");
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById('together-time').innerText =
        years > 0
            ? `We've been together for ${years} years, ${months} months, and ${days} days!`
            : `We've been together for ${months} months and ${days} days!`;
}

// Function for falling hearts animation
function createHearts() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "❤️";

            // Random X across the viewport width and a random Y near the top
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * 100;

            heart.style.position = "absolute";
            heart.style.left = `${randomX}px`;
            heart.style.top = `${randomY}px`;
            heart.style.fontSize = `${Math.random() * 15 + 15}px`;
            heart.style.animationDuration = `${Math.random() * 3 + 2}s`;

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 200);
    }
}

// Unmute music and gradually fade in volume
async function unmuteMusic() {
    const audio = document.getElementById("love-song");
    if (!audio) throw new Error("Audio element not found");

    // Unmute and set starting volume to 0
    audio.muted = false;
    audio.volume = 0;

    // Attempt to start playback (this will throw if blocked)
    await audio.play();

    // Gradually increase volume to 1 over about 10 seconds
    let volume = 0;
    return new Promise((resolve) => {
        const fadeInterval = setInterval(() => {
            volume += 0.01;
            audio.volume = Math.min(volume, 1);
            if (volume >= 1) {
                clearInterval(fadeInterval);
                resolve();
            }
        }, 100);
    });
}

// Display a fallback overlay button if autoplay fails
function showFallbackButton() {
    let overlay = document.createElement('div');
    overlay.id = 'audio-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `<button style="padding:20px 40px; font-size:18px;">Tap to enable music</button>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        unmuteMusic().finally(removeFallbackOverlay);
    });
}

// Remove the fallback overlay if it exists
function removeFallbackOverlay() {
    let overlay = document.getElementById('audio-overlay');
    if (overlay) overlay.remove();
}
