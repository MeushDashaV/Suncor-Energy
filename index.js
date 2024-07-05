const sliderImg = document.querySelector('.slider-img');
const sliderValue = document.querySelector('.slider-value');
let isDragging = false;
let startX;
let sliderLeft;
let sliderRight;
let minValue = 250; // Мінімальне значення ($250)
let maxValue = 425; // Максимальне значення ($425)

// Встановлюємо початкове значення
updateSliderValue(minValue);

sliderImg.addEventListener('mousedown', e => {
  if (e.button !== 0) return; // Перевіряємо, чи це лівий клік миші (кнопка 0)

  isDragging = true;
  const rect = sliderImg.getBoundingClientRect();
  startX = e.clientX - rect.left;
  sliderLeft = 0;
  sliderRight = sliderImg.parentElement.clientWidth - sliderImg.clientWidth;
  sliderImg.style.cursor = 'grabbing';

  // Відключаємо стандартну дію браузера для події 'mousedown'
  e.preventDefault();
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;

  let newLeft = e.clientX - startX;

  if (newLeft < sliderLeft) {
    newLeft = sliderLeft;
  } else if (newLeft > sliderRight) {
    newLeft = sliderRight;
  }

  sliderImg.style.left = `${newLeft}px`;

  // Оновлюємо значення в залежності від положення повзунка
  const percentage = (newLeft / sliderRight) * 100;
  const value =
    minValue + Math.round((maxValue - minValue) * (percentage / 100));
  updateSliderValue(value);

  // Оновлюємо положення тексту зі значенням
  const sliderWidth = sliderImg.clientWidth;
  const valuePosition = newLeft + sliderWidth / 2 - sliderValue.clientWidth / 2;
  sliderValue.style.left = `${valuePosition}px`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  sliderImg.style.cursor = 'grab';
});

function updateSliderValue(value) {
  sliderValue.textContent = `$${value}`;
}
