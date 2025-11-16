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

function setClockTime(hours = 0, minutes = 0, seconds = 0) {
  console.log(hours, minutes, seconds);
  secondHand.style.transform = `rotate(${seconds / 60}turn)`;
  minuteHand.style.transform = `rotate(${minutes / 60}turn)`;
  hourHand.style.transform = `rotate(${hours / 12}turn)`;
}

function updateClock() {
  const timeOffset = new Date().getTime() - whenWasTimeModified;
  const time = new Date(startingTime + timeOffset);
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  setClockTime(hours, minutes, seconds);
}

updateClock();
setInterval(updateClock, 1000);
