/**
 * Enhanced Translation System
 * Combines local translations with Google Translate API for dynamic translation capabilities
 */

// Store translations in memory cache
const translationCache = new Map();

/**
 * Get the user's preferred language from localStorage or browser settings
 * @returns {string} Language code (en, es, etc.)
 */
function getUserLanguage() {
  // First check if user has a saved preference
  const savedLang = localStorage.getItem('convexo_language');
  if (savedLang) {
    return savedLang;
  }
  
  // Otherwise, get browser language
  const browserLang = navigator.language || navigator.userLanguage;
  
  // Check if we support the browser language
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  
  // Default to English
  return 'en';
}

/**
 * Set the user's preferred language
 * @param {string} lang - Language code (en, es, etc.)
 */
function setUserLanguage(lang) {
  localStorage.setItem('convexo_language', lang);
  
  // Update the HTML lang attribute
  document.documentElement.lang = lang;
  
  // Apply translations to the page
  applyEnhancedTranslations();
  
  // Refresh language indicators
  updateLanguageIndicators();
  
  // Close dropdown menu
  const dropdown = document.getElementById('languageDropdown');
  if (dropdown) dropdown.classList.remove('active');
}

/**
 * Get translation from the cache or local translations
 * @param {string} key - Translation key
 * @param {string} lang - Language code
 * @returns {string|null} - Translated text or null if not found
 */
function getLocalTranslation(key, lang) {
  // Check cache first
  const cacheKey = `${lang}:${key}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }
  
  // Try to get from local translations
  // Check if we're on a page with specific translations loaded
  let translation = null;
  
  // Try stablecoins translations
  if (typeof stablecoinsTranslations !== 'undefined' && 
      stablecoinsTranslations[lang] && 
      stablecoinsTranslations[lang][key]) {
    translation = stablecoinsTranslations[lang][key];
  }
  
  // Try general translations (if available)
  if (!translation && typeof translations !== 'undefined') {
    // Check home page translations
    if (translations.homePage && translations.homePage[lang] && 
        translations.homePage[lang][key]) {
      translation = translations.homePage[lang][key];
    }
    
    // Check digital access translations
    if (!translation && translations.digitalAccess && translations.digitalAccess[lang] && 
        translations.digitalAccess[lang][key]) {
      translation = translations.digitalAccess[lang][key];
    }
    
    // Check digital financial services translations
    if (!translation && translations.digitalFinancialServices && 
        translations.digitalFinancialServices[lang] && 
        translations.digitalFinancialServices[lang][key]) {
      translation = translations.digitalFinancialServices[lang][key];
    }
    
    // Check navbar translations
    if (!translation && key.startsWith('navbar_') && translations.navbar && 
        translations.navbar[lang]) {
      const navbarKey = key.replace('navbar_', '');
      translation = translations.navbar[lang][navbarKey];
    }
  }
  
  // Cache the result
  if (translation) {
    translationCache.set(cacheKey, translation);
  }
  
  return translation;
}

/**
 * Translate text using Google Translate API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} - Translated text
 */
async function translateWithGoogleAPI(text, targetLang) {
  try {
    // For demonstration - in production, you would call the actual Google Translate API
    // This is a simplified version that mimics the Google Translate API behavior
    
    // Check if Google Translate API script is loaded
    if (!window.google || !window.google.translate) {
      console.warn('Google Translate API not loaded');
      return text;
    }
    
    // Use Google Translate API
    return new Promise((resolve, reject) => {
      const translator = new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: targetLang,
        autoDisplay: false
      });
      
      // This is a simplified mock of how you might handle translation with Google's API
      // In reality, you'd use their proper API calls
      translator.translateText(text, targetLang, (result) => {
        if (result && result.translatedText) {
          // Cache the result
          const cacheKey = `${targetLang}:${text}`;
          translationCache.set(cacheKey, result.translatedText);
          resolve(result.translatedText);
        } else {
          reject(new Error('Translation failed'));
        }
      });
    });
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
}

/**
 * Get translation for a key, with Google Translate fallback
 * @param {string} key - Translation key
 * @param {string} defaultText - Default text if key not found
 * @param {string} lang - Language code
 * @returns {Promise<string>} - Translated text
 */
async function getTranslation(key, defaultText, lang) {
  // First try to get from local translations
  const localTranslation = getLocalTranslation(key, lang);
  if (localTranslation) {
    return localTranslation;
  }
  
  // If not in local translations and not in English, try Google Translate
  if (lang !== 'en' && defaultText) {
    // Only use Google API if enabled in settings
    const useGoogleTranslate = localStorage.getItem('use_google_translate') === 'true';
    
    if (useGoogleTranslate) {
      try {
        const translated = await translateWithGoogleAPI(defaultText, lang);
        // Cache the result
        translationCache.set(`${lang}:${key}`, translated);
        return translated;
      } catch (error) {
        console.error('Google Translate error:', error);
      }
    }
  }
  
  // Fallback to default text
  return defaultText || key;
}

/**
 * Apply translations to all elements with data-i18n attributes
 */
async function applyEnhancedTranslations() {
  const lang = getUserLanguage();
  const elements = document.querySelectorAll('[data-i18n]');
  
  console.log(`Applying enhanced translations for ${elements.length} elements in ${lang} language`);
  
  // Handle each element with data-i18n attribute
  for (const el of elements) {
    const key = el.getAttribute('data-i18n');
    const defaultText = el.textContent.trim();
    
    try {
      const translated = await getTranslation(key, defaultText, lang);
      el.textContent = translated;
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
    }
  }
  
  // Update common UI elements
  updateCommonUIElements(lang);
}

/**
 * Update common UI elements like navbar, footer, etc.
 * @param {string} lang - Language code
 */
function updateCommonUIElements(lang) {
  // Update language switcher display
  const currentLangElements = document.querySelectorAll('#current-lang');
  currentLangElements.forEach(el => {
    el.textContent = lang.toUpperCase();
  });
  
  // Update flag emojis
  const flagElements = document.querySelectorAll('.language-btn .flag-emoji');
  flagElements.forEach(el => {
    if (lang === 'en') {
      el.textContent = '🇺🇸';
    } else if (lang === 'es') {
      el.textContent = '🇪🇸';
    }
  });
  
  // Update active class on language links
  const languageLinks = document.querySelectorAll('.language-option');
  languageLinks.forEach(link => {
    const linkLang = link.getAttribute('data-lang');
    if (linkLang === lang) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Update language indicators in the UI
 */
function updateLanguageIndicators() {
  const lang = getUserLanguage();
  
  // Update language display in UI
  const currentLangElements = document.querySelectorAll('#current-lang');
  currentLangElements.forEach(el => {
    el.textContent = lang.toUpperCase();
  });
  
  // Update flag emojis
  const flagElements = document.querySelectorAll('.language-btn .flag-emoji');
  flagElements.forEach(el => {
    if (lang === 'en') {
      el.textContent = '🇺🇸';
    } else if (lang === 'es') {
      el.textContent = '🇪🇸';
    }
  });
  
  // Update active class on language links
  const languageLinks = document.querySelectorAll('.language-option');
  languageLinks.forEach(link => {
    const linkLang = link.getAttribute('data-lang');
    if (linkLang === lang) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Load Google Translate API script
 */
function loadGoogleTranslateAPI() {
  const useGoogleTranslate = localStorage.getItem('use_google_translate') === 'true';
  
  if (useGoogleTranslate && !window.googleTranslateApiLoaded) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
    
    // Define the callback function
    window.googleTranslateElementInit = function() {
      window.googleTranslateApiLoaded = true;
      
      // Create a hidden translation element
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: false,
        includedLanguages: 'es,en' // Add more languages as needed
      }, 'google_translate_element');
      
      // Apply translations again after API is loaded
      applyEnhancedTranslations();
    };
  }
}

/**
 * Toggle Google Translate integration on/off
 * @param {boolean} enable - Whether to enable Google Translate
 */
function toggleGoogleTranslate(enable) {
  localStorage.setItem('use_google_translate', enable ? 'true' : 'false');
  
  if (enable && !window.googleTranslateApiLoaded) {
    loadGoogleTranslateAPI();
  }
  
  // Apply translations with the new setting
  applyEnhancedTranslations();
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Create a hidden element for Google Translate
  if (!document.getElementById('google_translate_element')) {
    const translateElement = document.createElement('div');
    translateElement.id = 'google_translate_element';
    translateElement.style.display = 'none';
    document.body.appendChild(translateElement);
  }
  
  // Apply translations
  applyEnhancedTranslations();
  
  // Load Google Translate API if enabled
  loadGoogleTranslateAPI();
  
  // Set up language toggle click handler
  document.addEventListener('click', function(e) {
    // Toggle dropdown when language button is clicked
    if (e.target.closest('.language-btn')) {
      const dropdown = document.getElementById('languageDropdown');
      if (dropdown) {
        dropdown.classList.toggle('active');
        e.stopPropagation();
      }
    }
    // Handle language selection
    else if (e.target.closest('.language-option')) {
      const link = e.target.closest('.language-option');
      const lang = link.getAttribute('data-lang') || 'en';
      setUserLanguage(lang);
      e.preventDefault();
      e.stopPropagation();
    }
    // Close dropdown when clicking elsewhere
    else {
      const dropdown = document.getElementById('languageDropdown');
      if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
      }
    }
  });
  
  // Add a settings option for Google Translate in the language dropdown
  const languageDropdown = document.getElementById('languageDropdown');
  if (languageDropdown) {
    const settingsDiv = document.createElement('div');
    settingsDiv.className = 'translate-settings';
    
    const useGoogleTranslate = localStorage.getItem('use_google_translate') === 'true';
    
    settingsDiv.innerHTML = `
      <label class="google-translate-toggle">
        <input type="checkbox" id="google-translate-checkbox" ${useGoogleTranslate ? 'checked' : ''}>
        <span>Use Google Translate</span>
      </label>
    `;
    
    languageDropdown.appendChild(settingsDiv);
    
    // Add event listener to the checkbox
    const checkbox = document.getElementById('google-translate-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        toggleGoogleTranslate(this.checked);
      });
    }
  }
});

// For compatibility with the old translation system
if (typeof applyTranslations !== 'function') {
  // Provide a global applyTranslations function for backward compatibility
  window.applyTranslations = applyEnhancedTranslations;
} 