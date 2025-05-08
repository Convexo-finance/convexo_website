/**
 * Convexo App Configuration
 * 
 * Instructions:
 * 1. Copy this file to config.js
 * 2. Replace placeholder values with your actual credentials
 * 3. DO NOT commit config.js to version control - add it to .gitignore
 */

const config = {
  // API Credentials
  privy: {
    appId: 'your_privy_app_id_here', // Get this from https://console.privy.io
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
        {name: 'solana'},
      ],
      loginMethods: ['email', 'wallet', 'phone'],
    }
  },
  
  // Blockchain Configuration
  blockchain: {
    infuraId: 'your_infura_project_id_here', // Get this from https://infura.io/dashboard
    rpcs: {
      1: 'https://mainnet.infura.io/v3/your_infura_project_id_here',
      137: 'https://polygon-mainnet.infura.io/v3/your_infura_project_id_here',
      // Add other chains as needed
    }
  },
  
  // Application Settings
  app: {
    name: 'Convexo App',
    domain: 'app.convexo.xyz',
    mainSite: 'https://convexo.xyz',
    apiUrl: 'https://api.convexo.xyz', // If you have an API backend
  },
  
  // Feature Flags
  features: {
    enableTestnet: false,
    enableEmbeddedWallets: true,
    enableSocialLogin: true,
  }
};

// Export the configuration
if (typeof module !== 'undefined') {
  module.exports = config;
} 