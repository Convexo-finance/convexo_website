/**
 * Configuration Loader for Convexo App
 * This script loads configuration from the config.js file
 * and exposes it to the application components.
 */

// Initialize empty config object with default values
let appConfig = {
  privy: {
    appId: '',
    config: {
      appearance: {
        theme: 'dark',
        accentColor: '#FFF9EF',
        logo: '/logo_convexo.png',
        showWalletLoginFirst: true,
      },
      embeddedWallets: {
        createOnLogin: true,
        noPromptOnSignature: false,
      },
      supportedChains: [
        {name: 'ethereum', chainId: 1},
        {name: 'polygon', chainId: 137},
      ],
      loginMethods: ['email', 'wallet', 'phone'],
    }
  },
  blockchain: {
    infuraId: '',
    rpcs: {
      1: '',
      137: '',
    }
  },
  app: {
    name: 'Convexo App',
    domain: 'app.convexo.xyz',
    mainSite: 'https://convexo.xyz',
  },
  features: {
    enableTestnet: false,
    enableEmbeddedWallets: true,
    enableSocialLogin: true,
  }
};

// Function to load config
async function loadConfig() {
  try {
    // Try to load configuration from the server
    const response = await fetch('/config.js');
    if (response.ok) {
      const configText = await response.text();
      // Extract the config object from the script text
      const configMatch = configText.match(/const\s+config\s*=\s*({[\s\S]*?});/);
      if (configMatch && configMatch[1]) {
        // Parse the config object
        const loadedConfig = Function(`'use strict'; return ${configMatch[1]}`)();
        // Merge with default config
        appConfig = deepMerge(appConfig, loadedConfig);
        console.log('Configuration loaded successfully');
      }
    }
  } catch (error) {
    console.warn('Failed to load external configuration, using defaults:', error);
  }
  
  // Check for required values and show warning if missing
  if (!appConfig.privy.appId) {
    console.warn('Missing Privy App ID in configuration. Please set your Privy App ID in config.js.');
  }
  
  if (!appConfig.blockchain.infuraId) {
    console.warn('Missing Infura ID in configuration. Please set your Infura ID in config.js.');
  }
  
  return appConfig;
}

// Helper function for deep merging objects
function deepMerge(target, source) {
  const output = Object.assign({}, target);
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

// Helper function to check if a value is an object
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

// Export the config loader
window.ConvexoConfig = {
  load: loadConfig,
  get: function() {
    return appConfig;
  }
}; 