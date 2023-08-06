const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let colorId = null;


btnStart.addEventListener('click', colorChange);
btnStop.addEventListener('click', removeColorChange);

function colorChange() {
    colorId = setInterval(() => {
        
        document.body.style.backgroundColor = getRandomHexColor();
        
    }, 1000);
    btnStart.toggleAttribute('disabled');
    btnStop.removeAttribute('disabled');

};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
function removeColorChange() {
    clearInterval(colorId);
    btnStart.removeAttribute('disabled');
    btnStop.toggleAttribute('disabled');
    
};