const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(helmet()); // Adds security headers
app.use(cors());

// Serve static files from organized directories
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/scripts', express.static(path.join(__dirname, 'src/scripts')));
app.use('/styles', express.static(path.join(__dirname, 'src/styles')));
app.use('/components', express.static(path.join(__dirname, 'src/components')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './')));

// Base routes for main sections
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Home page route
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/home/index.html'));
});

// Digital Access section and sub-pages
app.get('/digital_access', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_access/digital_access.html'));
});

app.get('/digital_access/corporate_treasury', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_access/corporate_treasury/corporate_treasury.html'));
});

app.get('/digital_access/digital_card', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_access/digital_card/digital_card.html'));
});

app.get('/digital_access/point_of_sale', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_access/point_of_sale/point_of_sale.html'));
});

app.get('/digital_access/private_brokerage', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/defi_trading/private_brokerage/private_brokerage.html'));
});

app.get('/digital_access/private_brokerage/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/defi_trading/private_brokerage/calculator/calculator.html'));
});

// Digital Financial Services section and sub-pages
app.get('/digital_financial_services', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_financial_services/digital_financial_services.html'));
});

app.get('/digital_financial_services/payroll', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_financial_services/payrrol/payrrol.html'));
});

app.get('/digital_financial_services/cross_border', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_financial_services/cross_border/cross_border.html'));
});

app.get('/digital_financial_services/custody_solutions', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_financial_services/custody_solutions/custody_solutions.html'));
});

app.get('/digital_financial_services/asset_management', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_financial_services/asset-management/asset-management.html'));
});

app.get('/digital_financial_services/rwa_tokenization', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/digital_financial_services/rwa-tokenization/rwa-tokenization.html'));
});

app.get('/digital_financial_services/stablecoins', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/defi_trading/Stablecoins/stablecoins.html'));
});

app.get('/digital_financial_services/liquidity_provision', (req, res) => {
  // Redirect to stablecoins page since liquidity-provision doesn't exist yet
  res.redirect('/digital_financial_services/stablecoins');
});

// Legal pages
app.get('/privacy_policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/lega_docs/Privacy_Policy/Privacy_policy.html'));
});

app.get('/terms_conditions', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/lega_docs/Terms_conditions/Terms_conditions.html'));
});

app.get('/amlft_policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/lega_docs/AMLFT_policy/amlft_policy.html'));
});

// About Us
app.get('/about_us', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/about_us/about_us.html'));
});

// KYC Page
app.get('/kyc', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/scripts/kyc-page/kyc.html'));
});

// Fallback - serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
