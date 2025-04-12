// --- Full JavaScript File for Our Anniversary Page ---

document.addEventListener("DOMContentLoaded", () => {
    // Initialize countdown and together-time displays
    updateCountdown();
    updateTogetherTime();
    setInterval(updateCountdown, 1000);
    setInterval(updateTogetherTime, 1000);

    // Create hearts animation periodically

    for (i = 0; i < 15; i++) {
        setTimeout(() => {
            createHearts();
        }, i * 200);
    }

    // Try unmuting music after a short delay
    setTimeout(() => {
        showFallbackButton();
    }, 500);

    // Remove fallback overlay if any click happens elsewhere
    document.addEventListener("click", removeFallbackOverlay);


});

document.addEventListener("click", () => {
    createHearts();
});


// Image reveal on scroll
let lastScrollTop = window.scrollY;
let typingStarted = false;
document.addEventListener("scroll", () => {
    const images = document.querySelectorAll("img");

    images.forEach((img, i) => {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const imageCenterY = rect.top + rect.height / 2;
        const viewportCenterY = windowHeight / 2;

        const distance = Math.abs(imageCenterY - viewportCenterY);
        const maxDistance = windowHeight / 1.5;
        const visibility = Math.max(0, 1 - distance / maxDistance);

        // Slide from left or right based on index
        const direction = i % 2 === 0 ? -1 : 1; // Alternate left/right
        const maxOffset = 200; // Max horizontal offset in px
        const translateX = direction * (1 - visibility) * maxOffset;

        img.style.opacity = visibility;
        img.style.transform = `translateX(${translateX}px)`;

        // Optional: still show/hide scroll arrow
        if (window.scrollY > 400) {
            document.querySelector(".scroll-down").style.display = "none";
        }
    });

    const noteElement = document.querySelector("#note");
    const rect = noteElement.getBoundingClientRect();
    const allImages = document.querySelectorAll("img");
    const lastImage = allImages[allImages.length - 1];
    const lastImageRect = lastImage.getBoundingClientRect();

    // Check if bottom of last image is above the viewport (i.e., you've scrolled past it)
    if (
        lastImageRect.bottom < window.innerHeight &&
        !typingStarted
    ) {
        typingStarted = true;
        noteElement.style.opacity = 1;
        noteElement.innerHTML = "";

        index = 0;
        typeChars("Dear Estella,<br> This year has been one of my favorites", () => {
            setTimeout(() => {
                deleteChars(19, () => {
                    index = 0;
                    typeChars("my favorite and I am so grateful to have you in my life.<br>Thank you for always being there for me and believing in me. I can't wait to see what the future holds for us! <br> Love, Harrison");
                });
            }, 1000);
        });
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
    overlay.style.background = 'rgba(0, 0, 0, 0.75)';
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



function deleteChars(number, callback) {
    let currentText = document.querySelector('#note').innerHTML;
    let i = 0;

    function deleteNext() {
        if (i < number) {
            if (currentText.endsWith('<br>')) {
                currentText = currentText.slice(0, -4);
            } else {
                currentText = currentText.slice(0, -1);
            }
            document.querySelector('#note').innerHTML = currentText;
            i++;
            setTimeout(deleteNext, 75);
        } else if (callback) {
            callback();
        }
    }

    deleteNext();
}


let index = 0; // Initialize index globally

function typeChars(sentence, callback) {
    const formatted = sentence.replace(/\n/g, '<br>');
    const noteEl = document.querySelector('#note');

    function typeNext() {
        if (index < formatted.length) {
            if (formatted.substring(index, index + 4) === '<br>') {
                noteEl.innerHTML += '<br>';
                index += 4;
            } else {
                noteEl.innerHTML += formatted.charAt(index);
                index++;
            }

            // Scroll it into view
            noteEl.scrollIntoView({ behavior: 'smooth', block: 'end' });

            setTimeout(typeNext, 100);
        } else if (callback) {
            callback();
        }
    }

    typeNext();
}


