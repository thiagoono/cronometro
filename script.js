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

document.getElementById("save-time-button").addEventListener("click", () => {
    saveTime();
})

const times = []
let filter = "most-recent"

function saveTime() {
    const now = new Date();
    times.unshift({
        currentTime: now,
        timePassed: time,
    })
    updateTimesList();
    resetTimer();
}

function updateTimesList() {
    sortTimes();
    document.getElementById("no-times").innerHTML = ""
    let timesListHTML = "";
    times.forEach(time => {
        const minutes = String(parseInt(time.timePassed / 6000))
        const seconds = String(parseInt(time.timePassed / 100) % 60);
        const milisseconds = String(time.timePassed % 100);

        timesListHTML += `<li class="time">${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}<span class="times-list-milisseconds">.${milisseconds.padStart(2, "0")}</span></li>`
    })

    document.getElementById("times-list").innerHTML = timesListHTML;
}

const selectFilterInput = document.getElementById("filters");

selectFilterInput.addEventListener("change", () => {
    filter = selectFilterInput.value;

    sortTimes(times.length, 0);

    updateTimesList();
})

function sortTimes(size, index) {
    if (size > 3 && size % 2 == 0) {
        sortTimes(size / 2, index);
        sortTimes(size / 2, index + size / 2);

    } else if (size > 3 && size % 2 == 1) {
        sortTimes(parseInt(size / 2), index);
        sortTimes(parseInt(size / 2), index + parseInt(size / 2) + 1);

    } else if (size > 2) {
        sortTimes(2, index);
    }

    const tmp = [];

    let index1 = index;
    let index2;
    if (size % 2 == 0)
    {
        index2 = index + size / 2;
    }
    else
    {
        index2 = index + parseInt(size / 2) + 1;
    }
    const index2_inicial = index2;

    for (let i = 0; i < size; i++)
    {
        // Descobre qual par é mais forte
        let stronger;
        if (index1 >= index2_inicial)
        {
            stronger = index2;
        }
        else if (index2 >= index + size)
        {
            stronger = index1;
        }
        else
        {
            stronger = getStronger(index1, index2);
        }

        // Coloca o par mais forte na array auxiliar
        if (stronger == index1)
        {
            tmp[i] = times[index1];
            index1++;
        }
        else
        {
            tmp[i] = times[index2];
            index2++;
        }
    }

    for (let i = 0; i < size; i++)
    {
        times[index + i] = tmp[i];
    }

    return;
}

function getStronger(index1, index2) {
    switch (filter) {
        case "slowest":
            if (times[index1].timePassed > times[index2].timePassed) {
                return index1;
            } else {
                return index2;
            }
            break;

        case "fastest":
            if (times[index1].timePassed < times[index2].timePassed) {
                return index1;
            } else {
                return index2;
            }
            break;

        case "most-recent":
            if (times[index1].currentTime > times[index2].currentTime) {
                return index1;
            } else {
                return index2;
            }
            break;
    }
}