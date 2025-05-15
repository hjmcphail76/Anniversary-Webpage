// Dynamically load the full legal code for the CC BY-NC-ND 4.0 License
const legalCodeUrl = "https://harrisonmcphail.ddns.net/license/legalcode.txt";

async function loadLegalCode() {
    const pre = document.getElementById("legalCode");
    try {
        const response = await fetch(legalCodeUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const text = await response.text();
        pre.textContent = text;
    } catch (error) {
        pre.textContent = "⚠️ Failed to load the legal code. You can view it directly at: https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode";
        console.error("Error loading legal code:", error);
    }
}

loadLegalCode();
