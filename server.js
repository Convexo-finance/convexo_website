const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(helmet()); // Adds security headers
app.use(cors());
app.use(express.static(path.join(__dirname, './')));

// Base routes for main sections
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Digital Access section and sub-pages
app.get('/digital_access', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_access/digital_access.html'));
});

app.get('/digital_access/corporate_treasury', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_access/corporate_treasury/corporate_treasury.html'));
});

app.get('/digital_access/digital_wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_access/digital_wallet/digital_wallet.html'));
});

app.get('/digital_access/digital_card', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_access/digital_card/digital_card.html'));
});

app.get('/digital_access/point_of_sale', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_access/point_of_sale/point_of_sale.html'));
});

app.get('/digital_access/private_brokerage', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_access/private_brokerage/private_brokerage.html'));
});

app.get('/digital_access/private_brokerage/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_access/private_brokerage/calculator/calculator.html'));
});

// Digital Financial Services section and sub-pages
app.get('/digital_financial_services', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/digital_financial_services.html'));
});

app.get('/digital_financial_services/payroll', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/payrrol/payrrol.html'));
});

app.get('/digital_financial_services/cross_border', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/cross_border/cross_border.html'));
});

app.get('/digital_financial_services/custody_solutions', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/custody_solutions/custody_solutions.html'));
});

app.get('/digital_financial_services/asset_management', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/asset-management/asset-management.html'));
});

app.get('/digital_financial_services/rwa_tokenization', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/rwa-tokenization/rwa-tokenization.html'));
});

app.get('/digital_financial_services/stablecoins', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/Stablecoins/stablecoins.html'));
});

app.get('/digital_financial_services/liquidity_provision', (req, res) => {
  res.sendFile(path.join(__dirname, 'digital_financial_services/Stablecoins/liquidity-provision.html'));
});

// Legal pages
app.get('/privacy_policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'lega_docs/Privacy_Policy/Privacy_policy.html'));
});

app.get('/terms_conditions', (req, res) => {
  res.sendFile(path.join(__dirname, 'lega_docs/Terms_conditions/Terms_conditions.html'));
});

app.get('/amlft_policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'lega_docs/AMLFT_policy/amlft_policy.html'));
});

// About Us
app.get('/about_us', (req, res) => {
  res.sendFile(path.join(__dirname, 'about_us/about_us.html'));
});

// KYC Page
app.get('/kyc', (req, res) => {
  res.sendFile(path.join(__dirname, 'kyc-page/kyc.html'));
});

// Fallback - serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
