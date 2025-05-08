# Convexo App Deployment Guide

This guide provides step-by-step instructions for deploying the Convexo App to production.

## Prerequisites

Before deploying, you'll need:

1. A Privy account and App ID from [console.privy.io](https://console.privy.io)
2. An Infura account and Project ID from [infura.io/dashboard](https://infura.io/dashboard)
3. A domain (app.convexo.xyz) with DNS configuration access
4. A Vercel account for hosting (recommended) or another web hosting service

## Configuration Steps

### 1. API Credentials Setup

1. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```

2. Edit `config.js` with your actual credentials:
   - Replace `your_privy_app_id_here` with your Privy App ID
   - Replace `your_infura_project_id_here` with your Infura Project ID
   - Update any other settings as needed

3. Update the application files to use the configuration:

   **In app/js/login.js** and **app/js/dashboard.js**:
   - Replace hardcoded credentials with references to your config file
   - Import the config.js at the top of each file

### 2. DNS Configuration

1. Set up DNS for app.convexo.xyz:
   - Add a CNAME record pointing to your hosting provider (e.g., `cname.vercel-dns.com` for Vercel)
   - Or set up an A record to your server's IP address if using traditional hosting

2. (Optional) Set up SSL certificate:
   - If using Vercel, SSL will be handled automatically
   - If using another hosting service, set up SSL with Let's Encrypt or another provider

### 3. Deployment Options

#### Option A: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel login
   vercel --prod
   ```

3. Add environment variables in the Vercel dashboard:
   - Go to your project settings
   - Add PRIVY_APP_ID and INFURA_ID as environment variables

#### Option B: Deploy to Traditional Hosting

1. Set up a web server (Apache, Nginx, etc.)

2. Configure the server to serve static files:
   
   **For Apache (.htaccess file):**
   ```
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

   **For Nginx (nginx.conf snippet):**
   ```
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

3. Upload the files to your web server:
   ```bash
   # Using rsync example
   rsync -avz --exclude 'node_modules' --exclude '.git' ./ user@your-server:/path/to/webroot/
   ```

### 4. Backend Integration (Optional)

If you need to connect to backend services:

1. Set up API endpoints for:
   - User accounts and balances
   - Transaction history
   - Asset management

2. Update the fetchBalanceData(), fetchAssets(), and fetchTransactions() functions in dashboard.js to make actual API calls instead of using mock data

## Post-Deployment Checklist

1. Test all login methods:
   - Email/phone authentication
   - MetaMask wallet connection
   - WalletConnect integration
   - Creating embedded wallets

2. Verify dashboard functionality:
   - Asset display
   - Transaction history
   - Funds transfer

3. Test responsive design on various devices

4. Review for security issues:
   - No exposed API keys in frontend code
   - Proper HTTPS configuration
   - Content Security Policy headers

## Troubleshooting

If you encounter issues with wallet connections:

1. Check that your Infura ID is correctly set in all locations
2. Verify that the Privy configuration includes all needed chains
3. Ensure RPC endpoints are correctly formatted

For Privy integration issues:

1. Verify your Privy APP ID is correctly set
2. Check the Privy dashboard for error logs
3. Ensure all required Privy settings are configured in the dashboard

## Additional Resources

- [Privy Documentation](https://docs.privy.io/)
- [Infura Documentation](https://docs.infura.io/)
- [Vercel Deployment Documentation](https://vercel.com/docs/deployments)
- [WalletConnect Documentation](https://docs.walletconnect.com/) 