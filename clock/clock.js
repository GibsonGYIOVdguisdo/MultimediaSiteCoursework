const timeInput = document.getElementById("time-input");
const timeButton = document.getElementById("set-time");

const secondHand = document.getElementById("second-hand");
const minuteHand = document.getElementById("minute-hand");
const hourHand = document.getElementById("hour-hand");

let startingTime = new Date().getTime();
let whenWasTimeModified = new Date().getTime();

timeButton.addEventListener("click", () => {
  const splitValue = timeInput.value.split(":");
  const hours = parseInt(splitValue[0]);
  const minutes = parseInt(splitValue[1]);
  const seconds = parseInt(splitValue[2]);
  let newTime = new Date();
  newTime.setMinutes(minutes);
  newTime.setHours(hours);
  newTime.setSeconds(seconds);
  startingTime = newTime.getTime();
  whenWasTimeModified = new Date().getTime();
  updateClock();
});

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
