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
    fetch('/src/components/navbar.html')
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
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.navbar__links');
    
    // Toggle mobile menu when menu button is clicked
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking the X or outside the menu
    if (navLinks) {
        // Close when clicking the X (pseudo-element)
        navLinks.addEventListener('click', function(e) {
            const rect = navLinks.getBoundingClientRect();
            // Check if click is near the top-right corner (where the X is)
            if (e.clientX > rect.right - 70 && e.clientY < rect.top + 70) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Set up all dropdown items for both mobile and desktop
        setupDropdownItems();
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && e.target !== mobileMenuToggle) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Language dropdown functionality
    setupLanguageDropdown();
    
    // Handle resize events
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
}

/**
 * Set up dropdown items for both mobile and desktop
 */
function setupDropdownItems() {
    const dropdownItems = document.querySelectorAll('.navbar__item.has-dropdown');
    const isMobile = window.innerWidth <= 970;
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.navbar__link');
        const menu = item.querySelector('.mega-menu') || item.querySelector('.dropdown-menu');
        
        if (link) {
            // Remove any existing event listeners (clean slate)
            link.removeEventListener('click', handleDropdownClick);
            
            // Add proper event listener based on device type
            if (isMobile) {
                link.addEventListener('click', handleDropdownClick);
            }
            
            // Add touch-specific event for mobile
            if (isMobile && 'ontouchstart' in window) {
                link.addEventListener('touchstart', function() {
                    link.classList.add('touch-active');
                });
                
                link.addEventListener('touchend', function() {
                    setTimeout(() => {
                        link.classList.remove('touch-active');
                    }, 300);
                });
            }
        }
    });
}

/**
 * Handle dropdown click event (for mobile)
 * @param {Event} e - Click event
 */
function handleDropdownClick(e) {
    if (window.innerWidth <= 970) {
        e.preventDefault();
        const item = this.parentNode;
        
        // Close other open dropdowns
        const openItems = document.querySelectorAll('.navbar__item.has-dropdown.active');
        openItems.forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('active');
            }
        });
        
        // Toggle this dropdown
        item.classList.toggle('active');
    }
}

/**
 * Handle window resize events
 */
function handleResize() {
    const isMobile = window.innerWidth <= 970;
    const navLinks = document.querySelector('.navbar__links');
    
    // Reset body overflow if switching to desktop view
    if (!isMobile && navLinks) {
        document.body.style.overflow = '';
    }
    
    // Reset all dropdown items
    setupDropdownItems();
}

/**
 * Setup language dropdown toggle functionality
 */
function setupLanguageDropdown() {
    // First look for ID, then fallback to class
    const toggleButton = document.getElementById('language-toggle-btn') || document.querySelector('.language-btn');
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
        const languageLinks = dropdown.querySelectorAll('a.language-option');
        
        if (languageLinks.length > 0) {
            // If we have language-option classes, use the new method
            languageLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get language from data-lang attribute
                    const lang = this.getAttribute('data-lang') || 'en';
                    
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
        } else {
            // Fallback to old method
            const oldLanguageLinks = dropdown.querySelectorAll('a');
            oldLanguageLinks.forEach(link => {
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
        }
        
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
    
    // Update flag emojis in the button (not in the dropdown options)
    const flags = document.querySelectorAll('.language-btn .flag-emoji');
    flags.forEach(flag => {
        if (lang === 'en') {
            flag.textContent = '🇺🇸';
        } else if (lang === 'es') {
            flag.textContent = '🇪🇸';
        }
    });
    
    // Mark active language in dropdown - check for new structure first
    const newLanguageLinks = document.querySelectorAll('.language-option');
    if (newLanguageLinks.length > 0) {
        newLanguageLinks.forEach(link => {
            const linkLang = link.getAttribute('data-lang');
            if (linkLang === lang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } else {
        // Fallback to old structure
        const oldLanguageLinks = document.querySelectorAll('.language-dropdown a');
        oldLanguageLinks.forEach(link => {
            if ((lang === 'en' && link.getAttribute('href') === '/') || 
                (lang === 'es' && link.getAttribute('href') === '/es')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
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
