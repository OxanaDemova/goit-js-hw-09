import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const LOCALSTORAGE_KEY = "feedback-form-state";

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);


function onFormInput(e) {
  const formData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};

  const { name, value } = e.target;
  formData[name] = value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}


function onFormSubmit(e) {
  e.preventDefault();

  const formDataObj = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '');
  
   if (!formDataObj.delay || !formDataObj.step || !formDataObj.amount) {
    return
   }
  
  let delayData = Number(formDataObj.delay);
  const stepData = Number(formDataObj.step);
  const amountData = Number(formDataObj.amount);
  
  console.log(formDataObj);
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);

  for (let amount = 0; amount < amountData; amount++) 
    
    createPromise(amount + 1, delayData += stepData)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); 
      })
      .catch(({ position, delay }) => {
     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); 
      })
  
  
  function createPromise(position, delay) {

  const promise = new Promise((resolve, reject) => {
     
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay-=stepData)
   });
  
    return promise;
  };

}





