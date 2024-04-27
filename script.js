let currentTime = document.querySelector(".time");
let alarmsListWrap = document.querySelector(".setting-alarm");
let alarmsListTitle = document.querySelector(".setting-alarm h5");
let submitBtn = document.querySelector(".submit-btn");
let allInput = Array.from(document.querySelectorAll("input"));
let hourInput = document.getElementById("hour");
let minInput = document.getElementById("min");
let secInput = document.getElementById("sec");

let alarmId = 0;
const alarms = [];

/**
 * Set the time
 */
function setTimeonClock() {
  setInterval(() => {
    let currentTiming = new Date().toLocaleString(Date.UTC, {
      hour: "2-digit",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    currentTime.textContent = currentTiming;

    alarms.forEach((alarm) => {
      if (alarm.alarmTime === currentTime.textContent) {
        alert("Alarm Ringing");
      }
    });
  }, 1000);
}

/**
 * Add Zero before a single digit hour OR min OR sec
 * @param {string} tm
 * @returns
 */
function addZero(tm) {
  if (tm.length === 1) {
    return `0${tm}`;
  } else {
    return tm;
  }
}

/**
 * to take up the last max value when entering the values above the range and
   taking up the min value when entering the values below the range
 * @param {object} inp 
 * @returns 
 */
function enforceMinMax(inp) {
  if (inp.value != "") {
    if (parseInt(inp.value) < parseInt(inp.min)) {
      inp.value = inp.min;
      return inp.min;
    }
    if (parseInt(inp.value) > parseInt(inp.max)) {
      inp.value = inp.max;
      return inp.max;
    }
  }
  return inp.value;
}

//to avoid entering decimal values
function validateDecimal() {
  allInput.forEach((input) => {
    input.addEventListener("input", function () {
      input.value = Math.round(this.value);
    });
  });
}

//Event handler function to add an alarm to the list when clicked
function submitAlarm(e) {
  e.preventDefault();
  alarmId += 1;

  let alarmHr = enforceMinMax(hourInput);
  let alarmMin = enforceMinMax(minInput);
  let alarmSec = enforceMinMax(secInput);
  let alarmAmPm = document.getElementById("ampm").value;

  //addZero
  let alarmTime =
    addZero(alarmHr) +
    ":" +
    addZero(alarmMin) +
    ":" +
    addZero(alarmSec) +
    " " +
    alarmAmPm;
  alarms.push({ alarmId, alarmTime });
  if (alarms.length > 0) {
    alarmsListTitle.textContent = "Alarms List";
  }

  //rendering the alarm on DOM
  let newDiv = document.createElement("div");
  newDiv.classList.add("alarm-wrap");
  newDiv.setAttribute("data-id", alarmId);
  let alarmDiv = document.createElement("div");
  alarmDiv.textContent = alarmTime;

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "DELETE";
  deleteButton.setAttribute("id", alarmId);

  newDiv.append(alarmDiv, deleteButton);
  alarmsListWrap.appendChild(newDiv);
  deleteButton.addEventListener("click", function () {
    let alarmRemoveInd = alarms.findIndex((alarm) => {
      return alarm.alarmId === Number(deleteButton.id);
    });
    deleteButton.parentNode.remove();
    alarms.splice(alarmRemoveInd, 1);
    if (alarms.length === 0) {
      alarmsListTitle.textContent = "No Alarms Added";
    }
  });
}

// Call initial functions and event handlers
setTimeonClock();
validateDecimal();
submitBtn.addEventListener("click", submitAlarm);
