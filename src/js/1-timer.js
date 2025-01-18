import iziToast from "izitoast";
import flatpickr from "flatpickr";

const options = {
  enableTime: true,
  disableMobile: true,
  time_24hr: true,
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], 
      longhand: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    months: {
      shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
      longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
    }
  },
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; 

    if (userSelectedDate <= Date.now()) { 
        iziToast.error({
         title: "Error",
        titleColor: '#fff',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        position: 'topRight',
        color: '#ef4040',
      });
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
    },
};

new flatpickr('#datetime-picker', options);

let userSelectedDate;

const dateInput = document.querySelector('input');
dateInput.className = 'timer_input';

const startBtn = document.querySelector('button[data-start]');
startBtn.className = "timer_btn";

startBtn.disabled = true;

startBtn.addEventListener('click', () => {
    if (userSelectedDate) {
        startCountDown(userSelectedDate);
    }
    iziToast.success({
        title: "OK",
        titleColor: '#fff',
        message: 'Timer started',
        messageColor: '#fff',
        position: 'topRight',
        color: '#59a10d',
      });
    startBtn.disabled = true;
    dateInput.forEach(input => {
         input.disabled = true;
    });
});

function startCountDown(userSelectedDate) {
    const interval = setInterval(() => {
    const ms = userSelectedDate - Date.now();

     if (ms <= 0) {
        clearInterval(interval);
        dateInput.forEach(input => {
        input.disabled = false;
    }); 
    } else {
        const timeVal = convertMs(ms);
      updateUI(timeVal); 
    }
    }, 1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

function updateUI(timeVal) {
    dataDays.textContent = addLeadingZero(timeVal.days);
    dataHours.textContent = addLeadingZero(timeVal.hours);
    dataMinutes.textContent = addLeadingZero(timeVal.minutes);
    dataSeconds.textContent = addLeadingZero(timeVal.seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};