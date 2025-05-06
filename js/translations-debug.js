/**
 * Debug version of the translations script
 * This adds console.log statements to help troubleshoot language switching issues
 */

// Save a reference to the original JS script
const originalScriptSrc = '/js/translations.js';

console.log('🔍 Translation Debug Mode Active');

// Create a log section in the page
function createDebugPanel() {
  const debugPanel = document.createElement('div');
  debugPanel.id = 'translation-debug-panel';
  debugPanel.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 200px;
    background: rgba(0,0,0,0.8);
    color: lime;
    font-family: monospace;
    padding: 10px;
    overflow: auto;
    z-index: 9999;
    font-size: 12px;
  `;
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 3px 8px;
    cursor: pointer;
  `;
  closeButton.onclick = () => document.body.removeChild(debugPanel);
  
  const title = document.createElement('h3');
  title.textContent = 'Translation Debug';
  title.style.margin = '0 0 10px 0';
  
  const logContainer = document.createElement('div');
  logContainer.id = 'translation-debug-log';
  
  debugPanel.appendChild(closeButton);
  debugPanel.appendChild(title);
  debugPanel.appendChild(logContainer);
  
  document.body.appendChild(debugPanel);
  
  return logContainer;
}

// Log to debug panel
function debugLog(message) {
  console.log('🔍 ' + message);
  
  // Create or get the debug panel
  let logContainer = document.getElementById('translation-debug-log');
  if (!logContainer) {
    logContainer = createDebugPanel();
  }
  
  const logEntry = document.createElement('div');
  logEntry.textContent = '➤ ' + message;
  logEntry.style.marginBottom = '5px';
  logContainer.appendChild(logEntry);
  
  // Scroll to bottom
  logContainer.scrollTop = logContainer.scrollHeight;
}

// Load the original translations script
function loadOriginalScript() {
  debugLog('Loading original translations script: ' + originalScriptSrc);
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = originalScriptSrc;
    script.onload = () => {
      debugLog('Original translations script loaded successfully');
      resolve();
    };
    script.onerror = (err) => {
      debugLog('ERROR loading original script: ' + err);
      reject(err);
    };
    document.head.appendChild(script);
  });
}

// Monitor localStorage changes
function monitorLocalStorage() {
  debugLog('Setting up localStorage monitoring');
  
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    debugLog(`localStorage.setItem('${key}', '${value}')`);
    originalSetItem.apply(this, arguments);
  };
  
  const originalGetItem = localStorage.getItem;
  localStorage.getItem = function(key) {
    const value = originalGetItem.apply(this, arguments);
    debugLog(`localStorage.getItem('${key}') => '${value}'`);
    return value;
  };
}

// Override setUserLanguage function
function overrideTranslationFunctions() {
  debugLog('Waiting for translations script to load...');
  
  // Check every 100ms if the functions are available
  const checkInterval = setInterval(() => {
    if (typeof setUserLanguage === 'function') {
      clearInterval(checkInterval);
      debugLog('Found setUserLanguage function, overriding...');
      
      // Save original function
      const originalSetUserLanguage = setUserLanguage;
      
      // Override setUserLanguage
      window.setUserLanguage = function(lang) {
        debugLog(`setUserLanguage('${lang}') called`);
        return originalSetUserLanguage(lang);
      };
      
      // Save original applyTranslations
      const originalApplyTranslations = applyTranslations;
      
      // Override applyTranslations
      window.applyTranslations = function() {
        debugLog('applyTranslations() called');
        const result = originalApplyTranslations();
        debugLog('applyTranslations() completed');
        return result;
      };
      
      // Inspect translations object
      debugLog(`Found translations for languages: ${Object.keys(translations).join(', ')}`);
      
      // Check current language
      const currentLang = getUserLanguage();
      debugLog(`Current language: ${currentLang}`);
      
      // Log data-i18n elements
      const dataI18nElements = document.querySelectorAll('[data-i18n]');
      debugLog(`Found ${dataI18nElements.length} elements with data-i18n attributes`);
      if (dataI18nElements.length > 0) {
        debugLog('Keys: ' + Array.from(dataI18nElements).map(el => el.getAttribute('data-i18n')).join(', '));
      }
    }
  }, 100);
}

// Initialize debug mode
document.addEventListener('DOMContentLoaded', function() {
  debugLog('DOM loaded, initializing debug mode');
  monitorLocalStorage();
  
  loadOriginalScript()
    .then(() => {
      overrideTranslationFunctions();
    })
    .catch((err) => {
      debugLog('Failed to initialize: ' + err);
    });
}); 