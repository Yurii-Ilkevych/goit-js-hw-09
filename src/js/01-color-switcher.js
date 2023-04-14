function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
let changeColorBody;

refs.stop.setAttribute('disabled', 'disabled');
refs.start.addEventListener('click', startChangeColor);
refs.stop.addEventListener('click', stopChangeColor);
function startChangeColor() {
  refs.stop.removeAttribute('disabled');
  refs.start.setAttribute('disabled', 'disabled');
  changeColorBody = setInterval(changeColor, 1000);
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
function stopChangeColor() {
  refs.start.removeAttribute('disabled');
  clearTimeout(changeColorBody);
  refs.stop.setAttribute('disabled', 'disabled');
}
