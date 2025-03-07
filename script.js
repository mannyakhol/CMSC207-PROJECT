import CONFIG from './scripts/config.js';
import { initSmoothScroll } from './scripts/utils.js';
import { ThemeManager } from './scripts/themeManager.js'
import { initChatbot } from './scripts/chatbot.js';
import { initContactForm } from './scripts/contact.js';

// Hamburger menu functionality
const initMobileNav = () => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create overlay element if it doesn't exist
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);
    }
    
    if (!hamburger || !navList) return;
    
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
    };
    
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
};

// Decorative elements
function createFloatingStickers() {
    const stickers = CONFIG.stickers;
    const container = document.createElement('div');
    container.className = 'sticker-container';
    
    for (let i = 0; i < 15; i++) {
        const sticker = document.createElement('div');
        sticker.className = 'sticker-decoration';
        sticker.textContent = stickers[Math.floor(Math.random() * stickers.length)];
        sticker.style.left = `${Math.random() * 100}vw`;
        sticker.style.top = `${Math.random() * 100}vh`;
        sticker.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(sticker);
    }
    
    document.body.appendChild(container);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    initSmoothScroll();
    initMobileNav();
    createFloatingStickers();
    initChatbot();
    initContactForm();
});
