import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    dataPicker: document.querySelector('#datetime-picker'),
    timerDataDays: document.querySelector('span[data-days]'),
    timerDataHours: document.querySelector('span[data-hours]'),
    timerDataMinutes: document.querySelector('span[data-minutes]'),
    timerDataSeconds: document.querySelector('span[data-seconds]'),
};

function disabledBtn() {
    refs.startBtn.disabled = true;
}

function enableBtn() {
    refs.startBtn.disabled = false;
}

disabledBtn();

const currentTime = Date.now();

const options = {

  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
      
    if (selectedDates[0] <= currentTime) {
      disabledBtn()

      return Notiflix.Report.warning(
        'Warning',
        'Please choose a date in the future',
        'Okay',
      );
          
      // return alert('Please choose a date in the future')

    } else {
      enableBtn()
    }
    let deltaTime = selectedDates[0] - currentTime;
    let intervalId = null;

    console.log(selectedDates[0]);



    const timer = {

      isActive: false,

      start() {

        if (this.isActive) {
          return
        }
        

        intervalId = setInterval(() => {

          const currentTime = Date.now();

          this.isActive = true;
      
          deltaTime = selectedDates[0] - currentTime;

          if (deltaTime < 1000) {
            clearInterval(intervalId);
          };

          const { days, hours, minutes, seconds } = convertMs(deltaTime);
      
          // console.log(`${days}:${hours}:${minutes}:${seconds}`);

          updateTimer()

          function updateTimer() {
 
              const { days, hours, minutes, seconds } = convertMs(deltaTime);
              refs.timerDataSeconds.innerHTML = `${seconds}`;
              refs.timerDataMinutes.innerHTML = `${minutes}`;
              refs.timerDataHours.innerHTML = `${hours}`;
              refs.timerDataDays.innerHTML = `${days}`;  

          };

        }, 1000);
        
      },

    };

      refs.startBtn.addEventListener('click', () => {
      timer.start()
    })
  },
}

flatpickr(refs.dataPicker, options)


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

