const sliderImg = document.querySelector('.slider-img');
const sliderValue = document.querySelector('.slider-value');
const investmentAmount = document.querySelector('#investmentAmount');
const earnAmount = document.querySelector('#earnAmount');

let isDragging = false;
let startX;
let startLeft;
let sliderLeft;
let sliderRight;
let minValue = 250;
let maxValue = 1000;

updateSliderValue(minValue);

sliderImg.addEventListener('mousedown', startDrag);
sliderImg.addEventListener('touchstart', startDrag);

function startDrag(e) {
  if (e.type === 'mousedown' && e.button !== 0) return; // Перевірка на ліву кнопку миші

  isDragging = true;
  const startXPos = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  const rect = sliderImg.getBoundingClientRect();
  startX = startXPos;
  startLeft = parseFloat(window.getComputedStyle(sliderImg).left);
  sliderLeft = 0;
  sliderRight = sliderImg.parentElement.clientWidth - sliderImg.clientWidth;

  e.preventDefault();

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
}

function drag(e) {
  if (!isDragging) return;

  const currentXPos = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  const newLeft = startLeft + currentXPos - startX;

  if (newLeft < sliderLeft) {
    sliderImg.style.left = `${sliderLeft}px`;
  } else if (newLeft > sliderRight) {
    sliderImg.style.left = `${sliderRight}px`;
  } else {
    sliderImg.style.left = `${newLeft}px`;
  }

  const currentPosition = parseFloat(sliderImg.style.left);
  const percentage = (currentPosition / sliderRight) * 100;
  const value =
    minValue + Math.round((maxValue - minValue) * (percentage / 100));
  updateSliderValue(value);

  investmentAmount.textContent = `$${value}`;

  const earnValue = value * 1.7;
  earnAmount.textContent = `$${earnValue.toFixed(2)}`;

  const sliderWidth = sliderImg.clientWidth;
  const valuePosition =
    currentPosition + sliderWidth / 2 - sliderValue.clientWidth / 2;
  sliderValue.style.left = `${valuePosition}px`;

  e.preventDefault();
}

function endDrag() {
  isDragging = false;

  document.removeEventListener('mousemove', drag);
  document.removeEventListener('touchmove', drag);

  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
}

function updateSliderValue(value) {
  const percentage = (value - minValue) / (maxValue - minValue);
  const newPosition =
    percentage * (sliderImg.parentElement.clientWidth - sliderImg.clientWidth);
  sliderImg.style.left = `${newPosition}px`;
  sliderValue.textContent = `$${value}`;
}
