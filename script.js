const apps = [
  { 
    name: 'Kaspa Charger', 
    logo: 'images/charger.png', 
    description: 'Generates a QR code with price (and optional tip). Fast, seamless payments'
  },
  { 
    name: 'Kaspa Wallet', 
    logo: 'images/wallet.png',
    description: 'Secure & intuitive cryptocurrency management. Supports Kaspa charger.'
  },
  { 
    name: 'Kaspa Business Map', 
    logo: 'images/map.png',
    description: 'Discover Kaspa-accepting businesses worldwide'
  },
  { 
    name: 'Kaspa Scanner', 
    logo: 'images/scanner.png',
    description: 'Add wallets (your own or whales) to watch lists - for monitoring activity'
  },
  { 
    name: 'Kaspa Security Center', 
    logo: 'images/security.png',
    description: 'Report problems and open investigations for scams or hacks'
  },
];

const screenshots = {
  'Kaspa Charger': ['images/charger1.jpeg','images/charger2.jpeg'],
  'Kaspa Wallet': ['images/wallet1.jpeg','images/wallet2.jpeg','images/wallet3.jpeg','images/wallet4.jpeg'],
  'Kaspa Business Map': ['images/map1.jpeg','images/map2.jpeg'],
  'Kaspa Scanner': ['images/scanner1.jpeg','images/scanner2.jpeg','images/scanner3.jpeg'],
  'Kaspa Security Center': ['images/security1.jpeg','images/security2.jpeg']
};

const appsContainer = document.getElementById('apps-container');

apps.forEach(app => {
  const wrapper = document.createElement('section');
  wrapper.className = 'app-section';

  const header = document.createElement('div');
  header.className = 'app-header';
  header.innerHTML = `
    <img src="${app.logo}" alt="${app.name} Logo">
    <div>
      <h2>${app.name}</h2>
      <p>${app.description}</p>
    </div>
  `;

  const carousel = document.createElement('div');
  carousel.className = 'carousel-container';

  const img = document.createElement('img');
  img.src = screenshots[app.name][0];
  img.alt = app.name + ' Screenshot';
  img.dataset.index = "0";
  carousel.appendChild(img);

  const left = document.createElement('div');
  left.className = 'carousel-arrow arrow-left hidden';
  left.innerHTML = '<i class="fas fa-chevron-left"></i>';
  const right = document.createElement('div');
  right.className = 'carousel-arrow arrow-right';
  right.innerHTML = '<i class="fas fa-chevron-right"></i>';

  left.onclick = () => navigate(app.name, img, -1, left, right);
  right.onclick = () => navigate(app.name, img, 1, left, right);

  carousel.appendChild(left);
  carousel.appendChild(right);

  wrapper.appendChild(header);
  wrapper.appendChild(carousel);
  appsContainer.appendChild(wrapper);
});

function navigate(appName, imgEl, direction, leftArrow, rightArrow) {
  const list = screenshots[appName];
  let index = parseInt(imgEl.dataset.index);
  index += direction;
  imgEl.dataset.index = index;
  imgEl.src = list[index];

  leftArrow.classList.toggle('hidden', index === 0);
  rightArrow.classList.toggle('hidden', index === list.length - 1);
}

// Kaspa Visualizer logic
const tracerImgs = ['images/tracer1.png','images/tracer2.png','images/tracer3.png','images/tracer4.png','images/tracer5.png','images/tracer6.png'];
function selectTracer(index) {
  const main = document.getElementById('tracer-main');
  main.src = tracerImgs[index];
  document.querySelectorAll('#tracer-thumbs img').forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}