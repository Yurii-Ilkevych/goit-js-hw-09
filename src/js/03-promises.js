import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  form: document.querySelector('.form'),
  FirstDelay: document.querySelector("input[name='delay']"),
  delayStep: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  btnSubmit: document.querySelector('button'),
};
refs.form.addEventListener('input', getValueForm);
refs.btnSubmit.addEventListener('click', open);
const STORAGE_KEY_DELAY = 'promise-delay';
const STORAGE_KEY_STEP = 'promise-step';
const STORAGE_KEY_AMOUNT = 'promise-amount';
let startId = null;
let count = 0;
reloadedPage();
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  //const DALAY = 1000;
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    if (shouldResolve) {
      resolve({ position: `${position}`, delay: `${delay}` }); // Fulfill
    } else {
      reject({ position: `${position}`, delay: `${delay}` }); // Reject
    }
    //}, DALAY);
  });
}

function open(evt) {
  evt.preventDefault();

  if (
    localStorage.getItem(STORAGE_KEY_DELAY) === null &&
    localStorage.getItem(STORAGE_KEY_STEP) === null &&
    localStorage.getItem(STORAGE_KEY_AMOUNT) === null
  ) {
    Notify.warning('Всі поля форми повинні бути заповнені', {
      position: 'center-top',
      timeout: 1250,
      fontSize: '20px',
      distance: '150px',
      borderRadius: '25px',
      failure: {
        textColor: '#ааа',
      },
    });
    return;
  }

  let delayTime = Number(JSON.parse(localStorage.getItem(STORAGE_KEY_DELAY)));
  startId = setTimeout(
    start,
    Number(JSON.parse(localStorage.getItem(STORAGE_KEY_DELAY))),
    delayTime
  );
  clearTextForm();
}






function start(delayTime) {
  if (count < Number(JSON.parse(localStorage.getItem(STORAGE_KEY_AMOUNT)))) {
    count += 1;
    createPromise(count, delayTime)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`, {
          position: 'center-top',
          timeout: 3000,
          fontSize: '16px',
          distance: '150px',
          borderRadius: '15px',
          failure: {
            textColor: '#ааа',
          },
        });
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`, {
          position: 'center-top',
          timeout: 3000,
          fontSize: '16px',
          distance: '150px',
          borderRadius: '15px',
          failure: {
            textColor: '#ааа',
          },
        });
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
      });
    delayTime += Number(JSON.parse(localStorage.getItem(STORAGE_KEY_STEP)));

    startId = setTimeout(start, Number(JSON.parse(localStorage.getItem(STORAGE_KEY_STEP))), delayTime);
  } else {
    clearInterval(startId);
    localStorage.removeItem(STORAGE_KEY_DELAY);
    localStorage.removeItem(STORAGE_KEY_STEP);
    localStorage.removeItem(STORAGE_KEY_AMOUNT);
    count = 0;
    delayTime = 0;
  }
}

function clearTextForm() {
  refs.FirstDelay.value = '';
  refs.delayStep.value = '';
  refs.amount.value = '';
}

function getValueForm(event) {
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  const delayForm = delay.value;
  const stepForm = step.value;
  const amountForm = amount.value;
  if (delayForm !== '' && stepForm !== '' && amountForm !== '') {
    localStorage.setItem(STORAGE_KEY_DELAY, JSON.stringify(delayForm));
    localStorage.setItem(STORAGE_KEY_STEP, JSON.stringify(stepForm));
    localStorage.setItem(STORAGE_KEY_AMOUNT, JSON.stringify(amountForm));
  }
}

function reloadedPage() {
  localStorage.removeItem(STORAGE_KEY_DELAY);
  localStorage.removeItem(STORAGE_KEY_STEP);
  localStorage.removeItem(STORAGE_KEY_AMOUNT);
}
