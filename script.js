let cryptoPrices = {};
let exchangeRates = {
    USD: 1,
    COP: 3900  // Valor por defecto hasta que obtengamos el real
};

// Function to get USD/COP exchange rate
async function getExchangeRate() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        exchangeRates.COP = data.rates.COP;
        console.log('Updated COP rate:', exchangeRates.COP);
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
    }
}

function formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: currency === 'COP' ? 0 : 2
    }).format(price);
}

function calculatePrice(event) {
    const input = event.target;
    const cryptoAmount = parseFloat(input.value) || 0;
    const cryptoType = input.dataset.crypto;
    const price = cryptoPrices[cryptoType];
    const calculator = input.closest('.crypto-calculator');
    if (!calculator) return;
    
    const currencySelect = calculator.querySelector('.currency-select');
    if (!currencySelect) return;
    
    const selectedCurrency = currencySelect.value;
    const usdValue = cryptoAmount * price;
    const finalValue = usdValue * exchangeRates[selectedCurrency];
    
    const resultElement = calculator.querySelector('.calculator-result');
    if (resultElement) {
        resultElement.textContent = `≈ ${formatPrice(finalValue, selectedCurrency)}`;
    }
}

async function getCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,dogecoin,ripple&vs_currencies=usd');
        const data = await response.json();
        
        cryptoPrices = {
            BTC: data.bitcoin.usd,
            ETH: data.ethereum.usd,
            SOL: data.solana.usd,
            USDT: data.tether.usd,
            DOGE: data.dogecoin.usd,
            XRP: data.ripple.usd
        };

        const priceElements = document.querySelectorAll('.price[data-crypto]');
        if (priceElements.length > 0) {
            priceElements.forEach(priceElement => {
                const cryptoType = priceElement.dataset.crypto;
                if (cryptoPrices[cryptoType]) {
                    priceElement.textContent = formatPrice(cryptoPrices[cryptoType], 'USD');
                }
            });
        }
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}

// Initialize only on the home page
function initHomePage() {
    // Check if we're on the home page by looking for crypto elements
    const cryptoElements = document.querySelector('.crypto-grid');
    if (!cryptoElements) return; // Not on home page, exit
    
    console.log("Initializing home page functionality");
    
    // Initialize exchange rates and crypto prices
    getExchangeRate();
    getCryptoPrices();
    
    // Set up price updates
    setInterval(getCryptoPrices, 30000);
    setInterval(getExchangeRate, 3600000);
    
    // Set initial loading state
    const priceElements = document.querySelectorAll('.crypto-card .price');
    if (priceElements.length > 0) {
        priceElements.forEach(element => {
            element.textContent = 'Loading...';
        });
    }
    
    // Set up calculators
    const calculatorInputs = document.querySelectorAll('.crypto-calculator input');
    if (calculatorInputs.length > 0) {
        calculatorInputs.forEach(input => {
            input.addEventListener('input', calculatePrice);
        });
    }
    
    // Set up currency selectors
    const currencySelects = document.querySelectorAll('.currency-select');
    if (currencySelects.length > 0) {
        currencySelects.forEach(select => {
            select.addEventListener('change', (e) => {
                const input = select.closest('.crypto-calculator').querySelector('input');
                if (input) {
                    calculatePrice({ target: input });
                }
            });
        });
    }
}

// Initialize contact form on any page
function initContactForm() {
    const standardContactForm = document.getElementById('standard-contact-form');
    if (standardContactForm) {
        // Form validation
        standardContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            
            if (validateForm(standardContactForm)) {
                // Simulate form submission
                const submitButton = standardContactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate API call
                setTimeout(function() {
                    // Show success message
                    const successMessage = standardContactForm.querySelector('.form-success-message');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                    
                    // Reset form
                    standardContactForm.reset();
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        if (successMessage) {
                            successMessage.style.display = 'none';
                        }
                    }, 5000);
                }, 1500);
            }
        });
        
        // Input validation on blur
        const inputs = standardContactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                // Clear validation messages on input
                const validationMessage = this.parentElement.querySelector('.validation-message');
                if (validationMessage) {
                    validationMessage.textContent = '';
                    validationMessage.classList.remove('show');
                }
                this.classList.remove('invalid');
            });
        });
    }
    
    // Initialize legacy contact form if it exists
    const legacyContactForm = document.getElementById('contact-form');
    if (legacyContactForm) {
        legacyContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Legacy contact form submitted');
            // Add your form submission logic here
        });
    }
    
    // Initialize service selector if it exists
    const mainServiceSelect = document.getElementById('mainService');
    if (mainServiceSelect) {
        const subServiceGroup = document.getElementById('subServiceGroup');
        const subServiceSelect = document.getElementById('subService');
        
        const serviceOptions = {
            'digital-access': [
                'OTC Trading',
                'Custody Solutions',
                'Web3 Point of Sale',
                'Digital Wallet',
                'Digital Card'
            ],
            'financial-services': [
                'Digital Payments',
                'Asset Management',
                'RWA Tokenization'
            ]
        };
        
        mainServiceSelect.addEventListener('change', function() {
            const selectedService = this.value;
            
            if (selectedService && serviceOptions[selectedService]) {
                // Clear and populate sub-service options
                subServiceSelect.innerHTML = '<option value="">Select Specific Service</option>';
                
                serviceOptions[selectedService].forEach(subService => {
                    const option = document.createElement('option');
                    option.value = subService.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = subService;
                    subServiceSelect.appendChild(option);
                });
                
                // Show sub-service select
                subServiceGroup.style.display = 'block';
            } else {
                // Hide sub-service select if no main service is selected
                subServiceGroup.style.display = 'none';
            }
        });
    }
}

// Validation functions
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(input) {
    const validationMessage = input.parentElement.querySelector('.validation-message');
    let isValid = true;
    
    // Check if empty
    if (input.required && !input.value.trim()) {
        if (validationMessage) {
            validationMessage.textContent = 'This field is required';
            validationMessage.classList.add('show');
        }
        input.classList.add('invalid');
        isValid = false;
    } 
    // Email validation
    else if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            if (validationMessage) {
                validationMessage.textContent = 'Please enter a valid email address';
                validationMessage.classList.add('show');
            }
            input.classList.add('invalid');
            isValid = false;
        }
    }
    // If valid, remove invalid class
    else {
        input.classList.remove('invalid');
        if (validationMessage) {
            validationMessage.textContent = '';
            validationMessage.classList.remove('show');
        }
    }
    
    return isValid;
}

// Initialize mobile menu
function initMobileMenu() {
    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = dropdown.parentElement;
                    parent.classList.toggle('active');
                }
            });
        });
    }
}

// Initialize smooth scrolling only for same-page links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only prevent default for same-page links
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initialize different components
    initHomePage();
    initContactForm();
    initMobileMenu();
    initSmoothScroll();
});

// Safe check for ethereum provider
if (typeof window.ethereum !== 'undefined') {
    console.log("Ethereum provider detected");
    // Your ethereum code here
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Link clicked:', this.href);
    });
});

document.cookie = "nombre=valor; Secure; HttpOnly; SameSite=Strict";

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('languageDropdown');
    const btn = event.target.closest('.language-btn');
    if (!btn && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
    }
});