import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    dataPicker: document.querySelector('#datetime-picker'),
};

const currentTime = Date.now();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates <= currentTime) {
          return alert('Please choose a date in the future')
      }
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.dataPicker, options)

// onClose(){
//       if (selectedDates <= currentTime) {
//           return alert('Please choose a date in the future')
//       }

// }