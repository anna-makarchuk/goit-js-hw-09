import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const inputDate = document.getElementById('datetime-picker');

let timerId = null;
let timeDifference = 0;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {    
      console.log(selectedDates[0]);
      currentDifferenceDate(selectedDates[0]);
      console.log(selectedDates[0]);
  },
};
flatpickr(inputDate, options);

btnStart.setAttribute('disabled', true);
btnStart.addEventListener('click', onclick);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function currentDifferenceDate(selectedDates) {
  if (selectedDates[0]< Date.now()) {
    window.alert("Please choose a date in the future");
    return
        }
  btnStart.removeAttribute('disabled');
  
      timeDifference = selectedDates.getTime()- Date.now();
      formatDate = convertMs(timeDifference);
      renderDate(formatDate);
    
};


function renderDate() {
  days.textContent = formatDate.days;
  hours.textContent = formatDate.hours;
  minutes.textContent = formatDate.minutes;
  seconds.textContent = formatDate.seconds;
};
function onclick() {
  timerId = setInterval(startTime, 1000);
  
};

function startTime() {
  btnStart.setAttribute('disabled', true);
  inputDate.setAttribute('disabled', true);

    timeDifference -= 1000;

  if (seconds.textContent <= 0 && minutes.textContent <= 0) {
    window.alert('Time end');
    clearInterval(timerId);

  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);

  }
}

