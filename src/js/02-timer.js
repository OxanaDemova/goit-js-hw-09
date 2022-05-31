import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    dataPicker: document.querySelector('#datetime-picker'),
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
          return alert('Please choose a date in the future')
        } else {
            enableBtn()
      }
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.dataPicker, options)

