var timeEl = document.getElementById("time-el");
var dayEl = document.getElementById("day-el");
var hourEl = document.getElementById("hour-el");
var minuteEl = document.getElementById("minute-el");
var sleepTimeEl = document.getElementById("sleeptime-el");
var amEl = document.getElementById("AMRadio");
var pmEl = document.getElementById("PMRadio");

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateTime() {
    var now = new Date();
    let nowString = now.toLocaleString();
    dayEl.textContent = weekday[now.getDay()]
    timeEl.textContent = nowString.substring(nowString.indexOf(",") + 2, nowString.length);
}

updateTime()
updateSleepTime()

var intervalId = window.setInterval(function() {
    updateTime()
    updateSleepTime()
}, 1000);

function decrementHour(){
    let text = hourEl.textContent;
    let hour = parseInt(text);
    hour -= 1;
    if (hour === 0){
        hour = 12;
    }
    var outPutText = hour.toString();
    outPutText = outPutText.padStart(2, "0");
    hourEl.textContent = outPutText;
    updateSleepTime()
}

function incrementHour(){
    let text = hourEl.textContent;
    let hour = parseInt(text);
    hour += 1;
    if(hour === 13){
        hour = 1;
    }
    var outPutText = hour.toString();
    outPutText = outPutText.padStart(2,"0");
    hourEl.textContent = outPutText;
    updateSleepTime()

}

function decrementMinute() {
    let text = minuteEl.textContent;
    let minute = parseInt(text);
    minute -= 1;
    if(minute === -1){
        minute = 59;
    }
    var outPutText = minute.toString();
    outPutText = outPutText.padStart(2, "0");
    minuteEl.textContent = outPutText; 
    updateSleepTime()

}

function incrementMinute() {
    let text = minuteEl.textContent;
    let minute = parseInt(text);
    minute += 1;
    if(minute === 60){
        minute = 1;
    }
    var outPutText = minute.toString();
    outPutText = outPutText.padStart(2, "0");
    minuteEl.textContent = outPutText; 
    updateSleepTime()

}

/*
show date like the one on top of the screen
that shows current time + alarm time
1. get current hour
2. get current minute
3. ? add time to current time
4. ? show it under selection menu
*/
function updateSleepTime(){
    let now = new Date();

    let hourText = hourEl.textContent;
    let minuteText = minuteEl.textContent;

    let hour = parseInt(hourText);

    // if pm is checked, hour += 12
    // else do nothing
   
    if (pmEl.checked){
        hour += 12
    }


    let minute = parseInt(minuteText);

    let selectedTime = new Date(0, 0, 0, hour, minute);
    let currentTime = new Date(0, 0, 0, now.getHours(), now.getMinutes());
    let timeDifference = selectedTime.getTime() - currentTime.getTime();

    // selected time > current time
    // positive output => same day

    // selectime < current time
    // negative output => next time (2am 3am)



    let newHour;
    let newMinute;

    if (timeDifference > 0){
        newHour = Math.floor(timeDifference / 1000 / 60 / 60);
        newMinute = Math.floor(timeDifference / 1000 / 60) % 60;
    } else {
        timeDifference += 1000 * 60 * 60 * 24;
        newHour = Math.floor(timeDifference / 1000 / 60 / 60);
        newMinute = Math.floor(timeDifference / 1000 / 60) % 60;
    }

    let hourOutput = newHour.toString();
    hourOutput = hourOutput.padStart(2, "0");
    let minuteOutput = newMinute.toString();
    minuteOutput = minuteOutput.padStart(2, "0");

    sleepTimeEl.textContent = hourOutput + ":" + minuteOutput;
}

amEl.addEventListener("change", function() {
    updateSleepTime();
})
pmEl.addEventListener("change", function() {
    updateSleepTime();
})