let timer;
let minutes = 15;
let seconds = 0;
let isPaused = false;
let enteredTime = null;
let sessionCount = 0;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
    
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        document.getElementById('alarm')?.play();
        sessionCount++;
        document.getElementById('session-count').textContent = sessionCount;
        alert('Time is up! Take a break.');
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
        updateProgress();
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function togglePauseResume() {
    const pauseResumeButton = document.getElementById('pause-resume');
    isPaused = !isPaused;
    
    if (isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'Resume';
    } else {
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}

function restartTimer() {
    clearInterval(timer);
    minutes = enteredTime || 15;
    seconds = 0;
    isPaused = false;
    document.getElementById('timer').textContent = formatTime(minutes, seconds);
    document.getElementById('pause-resume').textContent = 'Pause';
    updateProgress();
    startTimer();
}

function chooseTime() {
    const newTime = prompt('Enter new time in minutes:');
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = false;
        document.getElementById('timer').textContent = formatTime(minutes, seconds);
        clearInterval(timer);
        document.getElementById('pause-resume').textContent = 'Pause';
        updateProgress();
        startTimer();
    } else {
        alert('Invalid input. Please enter a valid number greater than 0.');
    }
}

function updateProgress() {
    const totalSeconds = (enteredTime || 15) * 60;
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const progressCircle = document.getElementById('progress-circle');
    const dashOffset = 565.48 * (1 - elapsedSeconds / totalSeconds);
    progressCircle.style.strokeDashoffset = dashOffset;
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

window.onload = () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
};

function addTask() {
    const taskInput = document.getElementById('task-input').value;
    document.getElementById('current-task').textContent = taskInput ? `Current Task: ${taskInput}` : '';
}

document.getElementById('pause-resume').addEventListener('click', togglePauseResume);
document.getElementById('restart').addEventListener('click', restartTimer);
document.getElementById('choose-time').addEventListener('click', chooseTime);

document.getElementById('set-task').addEventListener('click', addTask);

startTimer();
