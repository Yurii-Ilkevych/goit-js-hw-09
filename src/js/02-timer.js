import flatpickr from 'flatpickr';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'flatpickr/dist/flatpickr.min.css';
let startId = null;
const refs = {
  dataTime: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
  timerValue: document.querySelectorAll('.value'),
};

const flatpickr = require('flatpickr');
const setting = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (new Date().getTime() < selectedDates[0].getTime()) {
      refs.startBtn.removeAttribute('disabled');
      refs.startBtn.style.color = 'green';

      return;
    }
    Notify.failure('Please choose a date in the future', {
      position: 'center-top',
      timeout: 3000,
      fontSize: '18px',
      distance: '150px',
      borderRadius: '50px',
      failure: {
        textColor: '#000',
      },
    });
  },
};
const choiseDateTime = flatpickr(refs.dataTime, setting);
refs.startBtn.addEventListener('click', getTimeChoisen);

function getTimeChoisen() {
  const selectTime = choiseDateTime.latestSelectedDateObj.getTime();
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.startBtn.style.color = 'red';
  startId = setInterval(startTime, 1000, selectTime);
}

function startTime(selectTime) {
  const { days, hours, minutes, seconds } = convertMs(
    selectTime - new Date().getTime()
  );
  getTimeDate(days, hours, minutes, seconds);
}

function getTimeDate(days, hours, minutes, seconds) {
  if (days === -1) {
    clearTimeout(startId);
    return;
  }

  addLeadingZero(days, hours, minutes, seconds);
}

function addLeadingZero(days, hours, minutes, seconds) {
  refs.dataDays.textContent = String(days).padStart(2, '0');
  refs.dataHours.textContent = String(hours).padStart(2, '0');
  refs.dataMinutes.textContent = String(minutes).padStart(2, '0');
  refs.dataSeconds.textContent = String(seconds).padStart(2, '0');
}

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
}

reloadedPage();
function reloadedPage() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.startBtn.style.color = 'red';
}

refs.timer.style.display = 'flex';
refs.timer.style.columnGap = '25px';
refs.timer.style.marginTop = '10px';

refs.startBtn.style.borderRadius = '5px';
refs.startBtn.style.borderColor = '#000';
refs.startBtn.style.paddingLeft = '15px';
refs.startBtn.style.paddingRight = '15px';
refs.startBtn.style.fontWeight = '700';

refs.timerValue.forEach(function (element) {
  element.style.display = 'flex';
  element.style.justifyContent = 'center';
  element.style.fontWeight = '700';
});
