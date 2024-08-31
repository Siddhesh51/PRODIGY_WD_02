// Get the display and button elements
const display = document.getElementById('display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const lapButton = document.getElementById('lap-button');
const resetButton = document.getElementById('reset-button');
const lapTimesList = document.getElementById('lap-times');

// Initialize variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapTimes = [];
let isRunning = false;

// Function to update the display
function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    display.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

// Function to pad numbers with leading zeros
function padZero(number, length = 2) {
    return String(number).padStart(length, '0');
}

// Function to start the timer
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1);
        isRunning = true;
    }
}

// Function to stop the timer
function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

// Function to lap
function lap() {
    const lapTime = elapsedTime;
    lapTimes.push(lapTime);
    const lapTimeElement = document.createElement('LI');
    lapTimeElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
    lapTimesList.appendChild(lapTimeElement);
}

// Function to reset the timer
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = 0;
    lapTimes = [];
    lapTimesList.innerHTML = '';
    updateDisplay();
    isRunning = false;
}

// Function to format time for lap display
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

// Add event listeners to buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);