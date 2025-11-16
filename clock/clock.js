const sec = document.getElementById("sec");
const min = document.getElementById("min");
const hour = document.getElementById("hour");

function update() {
  const now = new Date();
  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours();

  sec.style.transform = `rotate(${s / 60}turn)`;
  min.style.transform = `rotate(${m / 60}turn)`;
  hour.style.transform = `rotate(${h / 60}turn)`;
}
update();
setInterval(update, 1000);
