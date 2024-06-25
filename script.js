// all important variables
const playBtn = document.querySelector('#play-btn');
const resetBtn = document.querySelector('#reset-btn');
const lapBtn = document.querySelector('#lap-btn');
const clearLapBtn = document.getElementById("clear-lap-list");
const lapList = document.getElementsByClassName("lap-list")[0];
const milisec = document.getElementsByClassName("msec")[0];
const sec = document.getElementsByClassName("sec")[0];
const minute = document.getElementsByClassName("minute")[0];
let [mseconds, seconds, minutes] = [0, 0, 0];
let timer = null;
let isRunning = false;
let countLap = 1;

function stopwatch(){
    mseconds++;
    if(mseconds == 100) {
        mseconds = 0;
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
        }
    }
    let ms = mseconds < 10 ? "0" + mseconds : mseconds;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    milisec.innerHTML = ms;
    sec.innerHTML = s + " : ";
    minute.innerHTML = m + " : ";
}

resetBtn.addEventListener('click', () => {
    // we clear the time interval to make it count from the start make make isRunning false
    isRunning = false;
    clearInterval(timer);
    // change HTMLs
    minute.innerHTML = "00 : ";
    sec.innerHTML = "00 : ";
    milisec.innerHTML = "00";
    playBtn.innerHTML = "Play";
    // set all the variables to zero
    [mseconds, seconds, minutes] = [0, 0, 0];
    clearLaps();
    resetBtn.style.visibility = "hidden";
    lapBtn.style.visibility = "hidden";
});

playBtn.addEventListener('click',() => {
    if(!isRunning) {
        // if it is not running then it should start counter and provide pause option
        timer = setInterval(stopwatch,10);
        playBtn.innerHTML = "Pause";
        isRunning = true;
    } else {
        // if it is counting then it should stop counting and provide play option
        playBtn.innerHTML = "Play";
        isRunning = false;
        // for stopping the counting
        clearInterval(timer);
    }
    lapBtn.style.visibility = "visible";
    resetBtn.style.visibility = "visible";
});

lapBtn.addEventListener('click', () => {
    if(!isRunning) {
        return;
    }
    clearLapBtn.style.visibility = "visible";
    let [var_ms, var_sec, var_min] = [milisec.innerHTML, sec.innerHTML, minute.innerHTML];
    const listItem = document.createElement("li");
    listItem.className = "item";
    const numberSpanTag = document.createElement("span");
    numberSpanTag.textContent = countLap++;
    const timeSpanTag = document.createElement("span")
    timeSpanTag.textContent = `${var_min} : ${var_sec} : ${var_ms}`;
    listItem.appendChild(numberSpanTag);
    listItem.appendChild(timeSpanTag);
    lapList.appendChild(listItem);
});

function clearLaps() {
    lapList.innerHTML = '';
    countLap = 0;
    clearLapBtn.style.visibility = "hidden";
}

clearLapBtn.addEventListener('click', clearLaps);