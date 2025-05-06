/**
 * Navbar Loader Script
 * Dynamically loads the site navbar and handles navigation functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create a new nav element
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    
    // Calculate the base URL (root of the site)
    const baseUrl = window.location.protocol + '//' + window.location.host;
    
    // Fetch the navbar HTML using absolute path
    fetch('/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            nav.innerHTML = data;
            
            // Insert the navbar at the beginning of the body
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(nav);
            } else {
                document.body.insertBefore(nav, document.body.firstChild);
            }
            
            // Highlight the current page in navigation
            highlightCurrentPage();
            
            // Set up navigation functionality
            setupNavigation();
            
            // Ensure translations.js is loaded before translating
            if (typeof translations === 'undefined') {
                loadTranslations(function() {
                    // Apply language-specific translations to navbar
                    translateNavbar();
                });
            } else {
                // Apply language-specific translations to navbar immediately
                translateNavbar();
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            nav.innerHTML = '<div class="navbar-error">Error loading navbar</div>';
            document.body.insertBefore(nav, document.body.firstChild);
        });
});

/**
 * Set up navigation functionality after navbar is loaded
 */
function setupNavigation() {
    const wrapper = document.querySelector('.navbar__wrapper');
    
    // Toggle menu when wrapper is clicked
    if (wrapper) {
        wrapper.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('navbar__logo') || 
                e.target === this.querySelector('.navbar__logo a') || 
                e.target === this.querySelector('.navbar__logo-image')) {
                return; // Don't toggle if clicking on the logo
            }
            this.classList.toggle('active');
        });
        
        // Close menu when clicking the X or outside menu
        const navLinks = document.querySelector('.navbar__links');
        if (navLinks) {
            navLinks.addEventListener('click', function(e) {
                if (e.target === this || (e.clientX < 50 && e.clientY < 50)) {
                    wrapper.classList.remove('active');
                }
            });
        }
    }
    
    // Language dropdown functionality
    setupLanguageDropdown();
}

/**
 * Setup language dropdown toggle functionality
 */
function setupLanguageDropdown() {
    const toggleButton = document.querySelector('.language-btn');
    const dropdown = document.getElementById('languageDropdown');
    
    if (toggleButton && dropdown) {
        // Toggle dropdown when button is clicked
        toggleButton.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
        
        // Prevent dropdown from closing when clicking inside it
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Set up language switching
        const languageLinks = dropdown.querySelectorAll('a');
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get language code from the link
                let lang = 'en';
                if (this.getAttribute('href').includes('es')) {
                    lang = 'es';
                }
                
                // Save language preference
                localStorage.setItem('convexo_language', lang);
                
                // Apply translations
                if (typeof applyTranslations === 'function') {
                    applyTranslations();
                }
                
                // Update language indicators
                updateLanguageIndicators();
                
                // Close dropdown
                dropdown.classList.remove('active');
            });
        });
        
        // Update indicators based on current language
        updateLanguageIndicators();
    }
}

/**
 * Update language indicators in the UI
 */
function updateLanguageIndicators() {
    const lang = localStorage.getItem('convexo_language') || 'en';
    const currentLangElements = document.querySelectorAll('#current-lang');
    
    currentLangElements.forEach(el => {
        el.textContent = lang.toUpperCase();
    });
    
    // Update flag emojis
    const flags = document.querySelectorAll('.flag-emoji');
    flags.forEach(flag => {
        if (lang === 'en') {
            flag.textContent = '🇺🇸';
        } else if (lang === 'es') {
            flag.textContent = '🇪🇸';
        }
    });
    
    // Mark active language in dropdown
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    languageLinks.forEach(link => {
        if ((lang === 'en' && link.getAttribute('href') === '/') || 
            (lang === 'es' && link.getAttribute('href') === '/es')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Translate navbar elements based on current language
 */
function translateNavbar() {
    // Check if translations are available
    if (typeof translations === 'undefined' || !translations.navbar) {
        // Translations not loaded yet, try to load them
        loadTranslations();
        return;
    }
    
    const lang = localStorage.getItem('convexo_language') || 'en';
    const t = translations.navbar[lang];
    
    if (!t) return;
    
    // Update navbar links
    const homeLink = document.querySelector('.navbar__link[href="/"]');
    if (homeLink) homeLink.textContent = t.home;
    
    const aboutLink = document.querySelector('.navbar__link[href="/about_us"]');
    if (aboutLink) aboutLink.textContent = t.about;
    
    const digitalAccessLink = document.querySelector('.navbar__link[href="/digital_access"]');
    if (digitalAccessLink) digitalAccessLink.textContent = t.digitalAccess;
    
    const digitalFinanceLink = document.querySelector('.navbar__link[href="/digital_financial_services"]');
    if (digitalFinanceLink) digitalFinanceLink.textContent = t.digitalFinance;
    
    const signUpButton = document.querySelector('.signup-btn');
    if (signUpButton) signUpButton.textContent = t.signUp;
}

/**
 * Load translations script if not already loaded
 * @param {Function} callback - Function to call after translations are loaded
 */
function loadTranslations(callback) {
    if (typeof translations !== 'undefined') {
        if (callback) callback();
        return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = '/js/translations.js';
    script.onload = function() {
        // Apply translations once loaded
        if (callback) callback();
    };
    document.head.appendChild(script);
}

/**
 * Highlight the current page in the navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar__link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Skip if it's an external link or # link
        if (!linkPath || linkPath.startsWith('http') || linkPath === '#') {
            return;
        }
        
        // Check if this link corresponds to the current page
        if ((currentPath === '/' && linkPath === '/') ||
            (currentPath !== '/' && linkPath !== '/' && currentPath.includes(linkPath))) {
            link.classList.add('active-page');
        }
    });
}
