const voteFileUrl = 'votes.json';
const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format


let votes = {};

async function loadVotes() {
    try {
        const res = await fetch(voteFileUrl);
        votes = await res.json();
    } catch (e) {
        console.warn('Votes file not found or invalid, starting fresh.', e);
        votes = {};
    }
    updateUI();
}

function updateUI() {
    const count1 = Object.values(votes).filter(v => v === 'Coaltrane').length;
    const count2 = Object.values(votes).filter(v => v === 'Rossco').length;

    document.getElementById('count-Coaltrane').textContent = count1;
    document.getElementById('count-Rossco').textContent = count2;

    const daysPassed = Object.keys(votes).length;
    if (daysPassed < 365) {
        document.getElementById('countdown').textContent = `${365 - daysPassed} days remaining`;
    } else {
        document.getElementById('countdown').textContent = "Voting closed for the year! Come back tomorrow and ask Harrison to clear the JSON server file!";
        document.getElementById('vote-buttons').style.display = 'none';
    }
}

async function vote(dog) {
    votes[today] = dog;
    updateUI();

    try {
        const response = await fetch('save-vote.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: today, vote: dog })
        });

        const result = await response.json();
        if (result.status === "success") {
            console.log("Vote saved successfully!");
        } else {
            console.error("Failed to save vote.");
        }
    } catch (e) {
        console.error('Failed to save vote:', e);
    }
}

loadVotes();
