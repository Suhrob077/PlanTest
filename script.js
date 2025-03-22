let scores = JSON.parse(localStorage.getItem("examScores")) || [];

function saveScore() {
    let input = document.getElementById("score").value;
    let score = parseInt(input);
    
    if (isNaN(score) || score < 0 || score > 100) {
        alert("Iltimos, to'g'ri ball kiriting (0-100)!");
        return;
    }
    
    let today = new Date();
    let date = today.toISOString().split('T')[0];
    scores.unshift({ date, score }); // Oxirgi natija boshida turishi uchun

    localStorage.setItem("examScores", JSON.stringify(scores));

    updateResults();
}

function updateResults() {
    let history = document.getElementById("history");
    let progressBar = document.getElementById("progressBar");
    let progressText = document.getElementById("progressText");
    let status = document.getElementById("status");
    history.innerHTML = "";
    
    let total = 0;
    
    scores.forEach((entry, index) => {
        total += entry.score;
        let listItem = document.createElement("li");
        listItem.textContent = `${index + 1}-hafta (${entry.date}): ${entry.score}%`;
        history.appendChild(listItem);
    });

    let avg = total / scores.length;
    progressText.textContent = avg.toFixed(1) + "%";
    let dashOffset = 440 - (avg / 100) * 440;
    progressBar.style.strokeDashoffset = dashOffset;

    if (avg >= 85) {
        status.textContent = "Grand✨✔🔆";
        status.style.background = "green";
        progressBar.style.stroke = "green";
    } else if (avg >= 60) {
        status.textContent = "Kontrakt💲";
        status.style.background = "orange";
        progressBar.style.stroke = "orange";
    } else {
        status.textContent = "❗❗❗";
        status.style.background = "red";
        progressBar.style.stroke = "red";
    }
}

function toggleHistory() {
    let historyContainer = document.querySelector(".Allhistory");
    historyContainer.style.display = 
        historyContainer.style.display === "none" || historyContainer.style.display === "" 
        ? "block" 
        : "none";
}

document.querySelector(".Tarix button").addEventListener("click", toggleHistory);

updateResults();