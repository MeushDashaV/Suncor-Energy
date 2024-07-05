const sliderImg = document.querySelector('.slider-img');
const sliderValue = document.querySelector('.slider-value');
const investmentAmount = document.querySelector('#investmentAmount');
const earnAmount = document.querySelector('#earnAmount');

let isDragging = false;
let startX;
let startLeft;
let sliderLeft;
let sliderRight;
let minValue = 250; // Мінімальне значення ($250)
let maxValue = 1000; // Максимальне значення ($1000) (змінити на потрібне)

// Встановлюємо початкове значення
updateSliderValue(minValue);

sliderImg.addEventListener('mousedown', e => {
  if (e.button !== 0) return; // Перевіряємо, чи це лівий клік миші (кнопка 0)

  isDragging = true;
  const rect = sliderImg.getBoundingClientRect();
  startX = e.clientX;
  startLeft = rect.left;
  sliderLeft = 0;
  sliderRight = sliderImg.parentElement.clientWidth - sliderImg.clientWidth;

  // Відключаємо стандартну дію браузера для події 'mousedown'
  e.preventDefault();
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const newLeft = e.clientX - startX + startLeft;

  if (newLeft < sliderLeft) {
    sliderImg.style.left = `${sliderLeft}px`;
  } else if (newLeft > sliderRight) {
    sliderImg.style.left = `${sliderRight}px`;
  } else {
    sliderImg.style.left = `${newLeft}px`;
  }

  // Оновлюємо значення в залежності від положення повзунка
  const currentPosition = parseFloat(sliderImg.style.left);
  const percentage = (currentPosition / sliderRight) * 100;
  const value =
    minValue + Math.round((maxValue - minValue) * (percentage / 100));
  updateSliderValue(value);

  // Оновлюємо вивід значення інвестиції
  investmentAmount.textContent = `$${value}`;

  // Оновлюємо вивід значення прибутку
  const earnValue = value * 1.7; // Розраховуємо прибуток (+70%)
  earnAmount.textContent = `$${earnValue.toFixed(2)}`;

  // Оновлюємо положення тексту зі значенням
  const sliderWidth = sliderImg.clientWidth;
  const valuePosition =
    currentPosition + sliderWidth / 2 - sliderValue.clientWidth / 2;
  sliderValue.style.left = `${valuePosition}px`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

function updateSliderValue(value) {
  const percentage = (value - minValue) / (maxValue - minValue);
  const newPosition =
    percentage * (sliderImg.parentElement.clientWidth - sliderImg.clientWidth);
  sliderImg.style.left = `${newPosition}px`;
  sliderValue.textContent = `$${value}`;
}
