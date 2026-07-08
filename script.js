let time = 0;
let intervalID;

function startPause() {
    const startButton = document.getElementById("start-pause-button");
    const resetButton = document.getElementById("reset-button");

    startButton.classList.toggle("paused");
    startButton.classList.toggle("started");

    if (startButton.classList.contains("paused")) {
        startButton.innerText = "Iniciar";
        stopTimer();
    } else {
        startButton.innerText = "Pausar";
        resetButton.disabled = false
        startTimer();
    }
} 

function startTimer() {
    intervalID = setInterval(() => {
        time++;
        updateChronometer();
    }, 10)
}

function updateChronometer() {
    const minutes = String(parseInt(time / 6000))
    const seconds = String(parseInt(time / 100) % 60);
    const milisseconds = String(time % 100);

    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const milissecondsDisplay = document.getElementById("milisseconds");

    minutesDisplay.innerText = minutes.padStart(2, "0");
    secondsDisplay.innerText = seconds.padStart(2, "0");
    milissecondsDisplay.innerText = milisseconds.padStart(3, ".0");
}

function stopTimer() {
    clearInterval(intervalID);
}

function resetTimer() {
    time = 0;
    clearInterval(intervalID);
    updateChronometer();
    document.getElementById("reset-button").disabled = true;
    if (document.getElementById("start-pause-button").classList.contains("started")) {
        startPause();
    }
}

document.getElementById("start-pause-button").addEventListener("click", () => {
    startPause();
})

document.getElementById("reset-button").addEventListener("click", () => {
    resetTimer();
})