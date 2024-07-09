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
let maxValue = 10000;
let step = 25; // Крок зростання в доларах

updateSliderValue(minValue);

sliderImg.addEventListener('mousedown', startDrag);
sliderImg.addEventListener('touchstart', startDrag);

function startDrag(e) {
  if (e.type === 'mousedown' && e.button !== 0) return; // Перевірка на ліву кнопку миші

  isDragging = true;
  startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
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

  const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  const diffX = currentX - startX;
  const newPosition = startLeft + diffX;

  if (newPosition < sliderLeft) {
    sliderImg.style.left = `${sliderLeft}px`;
  } else if (newPosition > sliderRight) {
    sliderImg.style.left = `${sliderRight}px`;
  } else {
    sliderImg.style.left = `${newPosition}px`;
  }

  const currentPosition = parseFloat(sliderImg.style.left);
  const percentage =
    (currentPosition - sliderLeft) / (sliderRight - sliderLeft);
  const value =
    minValue + Math.round(((maxValue - minValue) * percentage) / step) * step;
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

//cards
document.addEventListener('DOMContentLoaded', function () {
  const feedbackData = [
    {
      imgSrc: './img/feedback-girl.png',
      name: 'Lilly Kane',
      profession: 'Biology teacher',
      profit: 'Profit of $7,300',
      desc: 'Investments have always been something out of my reach, but I came across an advertisement on the Internet about investing in the transportation of oil and gas to Europe, got interested and applied. A company representative called me and explained step-by-step how to invest and what kind of income I could expect. My investment paid off within a month.',
    },
    {
      imgSrc: './img/feedback-man.png',
      name: 'Elliot Graham',
      profession: 'Retired person',
      profit: 'Profit of $12,700',
      desc: 'Dear friends, I would like to share my investment experience. Although I am over 70 years old, l am not afraid to take risks and look for new ways to make money. I must say that investing has been a real discovery for me! Suncor Energy is my most profitable investment.',
    },
    {
      imgSrc: './img/feedback-woomen2.jpg',
      name: 'Emma Watson',
      profession: 'Software Engineer',
      profit: 'Profit of $9,800',
      desc: "I have always been skeptical about investments, but after reading about this opportunity online, I decided to give it a try. The process was straightforward, and the returns exceeded my expectations. I've already reinvested my profits!",
    },
    {
      imgSrc: './img/feedbach-man2.jpg',
      name: 'John Doe',
      profession: 'Marketing Manager',
      profit: 'Profit of $11,500',
      desc: "Investing in renewable energy projects seemed daunting at first, but this platform made it accessible and profitable. The support team was helpful throughout, and I'm thrilled with the returns on my investment.",
    },
    {
      imgSrc: './img/feedback-girl2.jpg',
      name: 'Sophia Garcia',
      profession: 'Financial Analyst',
      profit: 'Profit of $13,200',
      desc: "As a financial analyst, I'm always on the lookout for promising investment opportunities. Investing in tech startups through this platform was a game-changer for me. The returns have been impressive, and I'm eager to explore more investment options.",
    },
    {
      imgSrc: './img/feedbach-man3.jpg',
      name: 'Michael Johnson',
      profession: 'Real Estate Investor',
      profit: 'Profit of $15,000',
      desc: "Real estate has always been my go-to investment, but diversifying into emerging markets through this platform has been a rewarding experience. The platform's transparency and robust returns have exceeded my expectations.",
    },
    {
      imgSrc: './img/feedbach-girl3.jpg',
      name: 'Jessica Lee',
      profession: 'Entrepreneur',
      profit: 'Profit of $10,700',
      desc: "As an entrepreneur, I understand the value of strategic investments. Investing in sustainable agriculture projects through this platform was a decision I'm glad I made. The returns have been steady, and I'm confident in my investment portfolio.",
    },
    {
      imgSrc: './img/man4.jpg',
      name: 'Robert Johnson',
      profession: 'Investment Advisor',
      profit: 'Profit of $12,400',
      desc: "As an investment advisor, I am always cautious about where I put my money. This platform has impressed me with its diverse investment options and solid returns. It's a reliable choice for both seasoned investors and newcomers.",
    },
    {
      imgSrc: './img/girl5.jpg',
      name: 'Emily Clark',
      profession: 'Accountant',
      profit: 'Profit of $14,600',
      desc: "Investing in green energy projects through this platform was a strategic move for me. The platform's user-friendly interface and knowledgeable support team made the process smooth. I've already recommended it to colleagues.",
    },
    {
      imgSrc: './img/man4.jpg',
      name: 'David Smith',
      profession: 'Stock Trader',
      profit: 'Profit of $16,200',
      desc: "Dabbling in cryptocurrencies has been exciting, and this platform made it accessible. The returns have been impressive, and the platform's security measures provide peace of mind. It's a game-changer in the digital asset space.",
    },
  ];

  const container = document.getElementById('feedbackBlock');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let numToShow = 3; // Initially show 3 cards

  let currentIndex = 0;
  let intervalId;

  function showFeedback(startIndex) {
    container.innerHTML = ''; // Clear container before adding new cards

    for (let i = startIndex; i < startIndex + numToShow; i++) {
      const indexToShow = i % feedbackData.length; // Ensure index wraps around
      addFeedback(indexToShow);
    }
  }

  function addFeedback(index) {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback__container');
    feedbackContainer.style.width = '100%'; // Full width for mobile view
    feedbackContainer.style.backgroundColor = '#fbfbfb'; // Set the background color

    const feedbackBlockFix = document.createElement('div');
    feedbackBlockFix.classList.add('feedbach__block-fix');

    const img = document.createElement('img');
    img.src = feedbackData[index].imgSrc;
    img.alt = '';
    feedbackBlockFix.appendChild(img);

    const name = document.createElement('h4');
    name.classList.add('feedback__name');
    name.textContent = feedbackData[index].name;
    feedbackBlockFix.appendChild(name);

    const profession = document.createElement('p');
    profession.classList.add('feedback__profession');
    profession.textContent = feedbackData[index].profession;
    feedbackBlockFix.appendChild(profession);

    const profit = document.createElement('h3');
    profit.classList.add('feedback__profit');
    profit.textContent = feedbackData[index].profit;
    feedbackBlockFix.appendChild(profit);

    const desc = document.createElement('p');
    desc.classList.add('feedback__desc');
    desc.textContent = feedbackData[index].desc;
    feedbackBlockFix.appendChild(desc);

    feedbackContainer.appendChild(feedbackBlockFix);

    const imgPlaceholder = document.createElement('img');
    imgPlaceholder.classList.add('feedback__img');
    imgPlaceholder.src = './img/Rectangle-3.png';
    imgPlaceholder.alt = '';
    feedbackContainer.appendChild(imgPlaceholder);

    container.appendChild(feedbackContainer);
  }

  function updateNumToShow() {
    if (window.innerWidth < 768) {
      numToShow = 1; // Show 1 card for mobile view
    } else {
      numToShow = 3; // Show 3 cards for larger screens
    }
    showFeedback(currentIndex);
  }

  // Initial display of first set of cards
  updateNumToShow();

  // Event listener for window resize
  window.addEventListener('resize', updateNumToShow);

  function showNextFeedback() {
    currentIndex += numToShow;
    showFeedback(currentIndex);
  }

  function showPrevFeedback() {
    currentIndex -= numToShow;
    if (currentIndex < 0) {
      currentIndex = feedbackData.length - numToShow;
    }
    showFeedback(currentIndex);
  }

  // Event handlers for next and previous buttons
  nextBtn.addEventListener('click', function () {
    clearInterval(intervalId); // Clear interval before switching
    showNextFeedback();
    intervalId = setInterval(showNextFeedback, 10000); // Restart automatic switching
  });

  prevBtn.addEventListener('click', function () {
    clearInterval(intervalId); // Clear interval before switching
    showPrevFeedback();
    intervalId = setInterval(showNextFeedback, 10000); // Restart automatic switching
  });

  // Automatic switching every 10 seconds
  intervalId = setInterval(showNextFeedback, 10000);
});
