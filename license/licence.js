// Dynamically load the full legal code from Creative Commons
const legalCodeUrl = "https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt";

async function loadLegalCode() {
    const pre = document.getElementById("legalCode");
    try {
        const response = await fetch(legalCodeUrl);
        const text = await response.text();
        pre.textContent = text;
    } catch (error) {
        pre.textContent = "Failed to load the legal code. Please visit the official site.";
        console.error("Error loading legal code:", error);
    }
}

loadLegalCode();
