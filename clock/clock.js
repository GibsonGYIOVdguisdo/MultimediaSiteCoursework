const timeInput = document.getElementById("time-input");
const setTimeButton = document.getElementById("set-time-button");
const resetTimeButton = document.getElementById("reset-time-button");

const secondHand = document.getElementById("second-hand");
const minuteHand = document.getElementById("minute-hand");
const hourHand = document.getElementById("hour-hand");

const storedTime = parseInt(localStorage.getItem("startingTime"));
const storedModificationTime = parseInt(
  localStorage.getItem("whenWasTimeModified")
);
let startingTime = storedTime || new Date().getTime();
let whenWasTimeModified = storedModificationTime || new Date().getTime();

setTimeButton.addEventListener("click", () => {
  const splitValue = timeInput.value.split(":");
  const hours = parseInt(splitValue[0]) || 0;
  const minutes = parseInt(splitValue[1]) || 0;
  const seconds = parseInt(splitValue[2]) || 0;
  let newTime = new Date();
  newTime.setMinutes(minutes);
  newTime.setHours(hours);
  newTime.setSeconds(seconds);
  startingTime = newTime.getTime();
  whenWasTimeModified = new Date().getTime();
  saveCurrentTime();
  updateClock();
});

resetTimeButton.addEventListener("click", () => {
  startingTime = new Date().getTime();
  whenWasTimeModified = new Date().getTime();
  saveCurrentTime();
  updateClock();
});

function saveCurrentTime() {
  localStorage.setItem("startingTime", startingTime);
  localStorage.setItem("whenWasTimeModified", whenWasTimeModified);
}

function setClockTime(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
  let tickMilliseconds = 100;

  let secondHandRotation = seconds / 60;

  if (milliseconds > 1000 - tickMilliseconds / 2) {
    secondHandRotation =
      secondHandRotation + 1 / 120 + ((1 / 60) * (milliseconds - 900)) / 100;
  } else if (milliseconds > 1000 - tickMilliseconds) {
    secondHandRotation =
      secondHandRotation + ((1 / 60) * (milliseconds - 900)) / 200;
  }
  secondHand.style.transform = `rotate(${secondHandRotation}turn)`;
  minuteHand.style.transform = `rotate(${minutes / 60}turn)`;
  hourHand.style.transform = `rotate(${hours / 12}turn)`;
}

function updateClock() {
  const timeOffset = new Date().getTime() - whenWasTimeModified;
  const time = new Date(startingTime + timeOffset);
  const milliseconds = time.getMilliseconds();
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  setClockTime(hours, minutes, seconds, milliseconds);
}

updateClock();
setInterval(updateClock, 1);
