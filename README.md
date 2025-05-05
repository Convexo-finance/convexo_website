# Convexo Website

Convexo is a crypto and AI institutional-grade services company. This repository contains the code for the Convexo website.

## Clean URL Structure

The website implements a clean URL structure for improved user experience:

### Main Sections
- Home: `/`
- About Us: `/about_us`
- Digital Access: `/digital_access`
- Digital Financial Services: `/digital_financial_services`
- KYC: `/kyc`

### Digital Access Sub-Pages
- Private Brokerage: `/digital_access/private_brokerage`
- Corporate Treasury: `/digital_access/corporate_treasury`
- Point of Sale: `/digital_access/point_of_sale`
- Digital Wallet: `/digital_access/digital_wallet`
- Digital Card: `/digital_access/digital_card`

### Digital Financial Services Sub-Pages
- Payroll: `/digital_financial_services/payrrol`
- Cross-border Payments: `/digital_financial_services/cross_border`
- Asset Management: `/digital_financial_services/asset-management`
- Custody Solutions: `/digital_financial_services/custody_solutions`
- RWA Tokenization: `/digital_financial_services/rwa-tokenization`

### Legal Pages
- Privacy Policy: `/privacy_policy`
- Terms and Conditions: `/terms_conditions`
- AMLFT Policy: `/amlft_policy`

## Development

To run the website locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at http://localhost:8080

## Deployment

The site is configured for deployment on Vercel with clean URL routing.
