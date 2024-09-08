// Sticky navbar scroll behavior
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scroll down
        navbar.style.top = '-60px'; // Adjust based on navbar height
    } else {
        // Scroll up
        navbar.style.top = '0';
    }
    lastScrollY = window.scrollY;
});

// Toggle functionality
const toggleButtons = document.querySelectorAll('.toggle-option');
const toggleSlider = document.querySelector('.toggle-slider');
const dynamicContent = document.getElementById('dynamicContent');
const providerCardsContainer = document.getElementById('providerCards');

// Fetch providers from API and render cards
async function fetchProviders() {
    try {
        // Replace with your API endpoint
        const response = await fetch('https://api.example.com/providers');
        const data = await response.json();
        renderProviderCards(data);
    } catch (error) {
        console.error('Error fetching providers:', error);
    }
}

// Render provider cards
function renderProviderCards(providers) {
    providers.forEach(provider => {
        const card = document.createElement('div');
        card.classList.add('provider-card');
        card.innerHTML = `
            <img src="${provider.logo}" alt="Provider Logo" class="provider-logo">
            <div class="provider-info">
                <span>${provider.distance} away from you</span>
                <h2>${provider.name}</h2>
                <p>${provider.rating} ★</p>
                <div class="provider-buttons">
                    <button class="map-button">Check on map</button>
                    <button class="more-button">See more</button>
                </div>
            </div>
        `;
        providerCardsContainer.appendChild(card);
    });
}

// Infinite scroll to load more cards
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        // Fetch more providers when scrolled to the bottom
        fetchProviders();
    }
});

// Initialize
fetchProviders();

// Toggle buttons behavior
toggleButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        toggleSlider.style.left = `calc(${index * 32}% + 3px)`;

        if (index === 0) {
            dynamicContent.innerHTML = '<div class="provider-cards" id="providerCards"></div>';
            fetchProviders();
        } else if (index === 1) {
            dynamicContent.innerHTML = '<!-- Events Content -->';
        } else {
            dynamicContent.innerHTML = '<!-- Map Content -->';
        }
    });
});