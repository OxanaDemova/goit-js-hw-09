const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;

function onButtonStart() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onButtonStop() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    
}

refs.startBtn.addEventListener('click', onButtonStart);
refs.stopBtn.addEventListener('click', onButtonStop)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

