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

// Variables to track current image and related images
let currentImageIndex = 0;
let currentImageSet = [];
let currentAppName = '';

// Make app carousel images clickable
function setupImageModals() {
  const appSections = document.querySelectorAll('.app-section');
  appSections.forEach(section => {
    const appHeader = section.querySelector('.app-header');
    const appName = appHeader.querySelector('h2').textContent;
    const carouselImg = section.querySelector('.carousel-container img');
    
    // Make carousel image clickable
    carouselImg.style.cursor = 'pointer';
    carouselImg.addEventListener('click', function() {
      openModal(this, appName);
    });
  });

  // Make Tracer section images clickable
  const tracerMainImg = document.getElementById('tracer-main');
  const tracerThumbs = document.querySelectorAll('#tracer-thumbs img');

  // Make main tracer image clickable
  tracerMainImg.style.cursor = 'pointer';
  tracerMainImg.addEventListener('click', function() {
    openModal(this, 'Kaspa Visualizer');
  });

  // Make tracer thumbnail images clickable
  tracerThumbs.forEach(thumb => {
    thumb.style.cursor = 'pointer';
    // Keep the original onclick function (selectTracer) and add our modal functionality
    const originalOnClick = thumb.onclick;
    thumb.onclick = function(e) {
      // Call the original function first
      if (originalOnClick) originalOnClick.call(this);
      // Then open in modal after a short delay to allow the main image to update
      setTimeout(() => {
        const mainImg = document.getElementById('tracer-main');
        openModal(mainImg, 'Kaspa Visualizer');
      }, 50);
    };
  });
}

// Function to open the modal
function openModal(img, appName) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  
  // Set the modal image source and display the modal
  modalImg.src = img.src;
  modal.style.display = 'flex';
  modalCaption.textContent = appName;
  currentAppName = appName;
  
  // Determine which image set we're viewing
  if (appName === 'Kaspa Visualizer') {
    currentImageSet = tracerImgs;
    currentImageIndex = tracerImgs.indexOf(img.src);
  } else {
    currentImageSet = screenshots[appName];
    currentImageIndex = parseInt(img.dataset.index) || 0;
  }
  
  // Update navigation button visibility
  updateNavButtons();
  
  // Add scroll lock to body
  document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Remove scroll lock
}

// Update navigation buttons visibility
function updateNavButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  prevBtn.style.display = currentImageIndex > 0 ? 'flex' : 'none';
  nextBtn.style.display = currentImageIndex < currentImageSet.length - 1 ? 'flex' : 'none';
}

// Navigate to previous image
function navigatePrev() {
  const modalImg = document.getElementById('modalImg');
  
  if (currentImageIndex > 0) {
    currentImageIndex--;
    modalImg.src = currentImageSet[currentImageIndex];
    updateNavButtons();
  }
}

// Navigate to next image
function navigateNext() {
  const modalImg = document.getElementById('modalImg');
  
  if (currentImageIndex < currentImageSet.length - 1) {
    currentImageIndex++;
    modalImg.src = currentImageSet[currentImageIndex];
    updateNavButtons();
  }
}

// Set up event listeners for modal
function setupModalListeners() {
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.close-modal');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Close button event
  closeBtn.addEventListener('click', closeModal);
  
  // Click outside image to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  
  // Navigation buttons
  prevBtn.addEventListener('click', navigatePrev);
  nextBtn.addEventListener('click', navigateNext);
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigatePrev();
      if (e.key === 'ArrowRight') navigateNext();
    }
  });
}

// Call setup functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupImageModals();
  setupModalListeners();
});



