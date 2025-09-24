# Convexo Website

Institutional-grade financial website for Convexo.xyz - Digital asset trading, custody, and financial services.

## 📁 Current Structure

```
convexo_website/
├── src/
│   ├── assets/
│   │   ├── brading/             # Brand assets & logos
│   │   ├── images/              # Website images
│   │   └── videos/              # Video content
│   ├── components/
│   │   ├── navbar-new.html      # Navigation component
│   │   └── footer-new.html      # Footer component
│   ├── pages/                   # All website pages
│   │   ├── about_us/
│   │   ├── defi_trading/        # Institutional Trading
│   │   ├── digital_access/      # Digital Access services
│   │   ├── digital_financial_services/
│   │   └── lega_docs/           # Legal documents
│   ├── scripts/                 # JavaScript files
│   └── styles/                  # CSS files
├── index.html                   # Homepage
├── server.js                    # Express server
├── package.json                 # Dependencies
├── vercel.json                  # Deployment config
└── .gitignore                   # Git exclusions (includes node_modules/)
```

## 🔗 File Paths & Asset URLs

### **Asset References**
- **Images**: `/assets/images/filename.ext`
- **Videos**: `/assets/videos/filename.ext`
- **Scripts**: `/scripts/filename.js`
- **Styles**: `/styles/css/filename.css`
- **Components**: `/components/filename.html`

### **Adding New Files**
- Images → `/src/assets/images/`
- Videos → `/src/assets/videos/`
- Scripts → `/src/scripts/`
- Styles → `/src/styles/css/`
- Components → `/src/components/`

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Site runs at: http://localhost:8080

## 🌐 URL Structure

```
convexo.xyz/
├── /                            # Homepage
├── /about_us                    # About us
├── /institutional_trading       # Institutional Trading
│   ├── /private_brokerage      # Private Brokerage
│   └── /stablecoins            # Stablecoins
├── /digital_access             # Digital Access
│   ├── /convexo_app            # Convexo App
│   ├── /corporate_treasury     # Corporate Treasury
│   ├── /point_of_sale          # Point of Sale
│   └── /digital_card           # Digital Card
├── /financial_services         # Digital Financial Services
│   ├── /asset-management       # Asset Management
│   ├── /cross_border           # Cross-Border Payments
│   ├── /custody_solutions      # Custody Solutions
│   ├── /payrrol               # Payroll
│   └── /rwa-tokenization      # RWA Tokenization
└── /legal_compliance           # Legal & Compliance
    ├── /amlft_policy          # AML/CFT Policy
    ├── /Privacy_policy        # Privacy Policy
    ├── /risk_warnings         # Risk Warnings
    └── /Terms_conditions      # Terms & Conditions
```

## 🚀 Deployment

Configured for Vercel with clean URL routing.

```bash
git add .
git commit -m "Update website"
git push origin main
```

## ⚠️ Important Notes

- ✅ **node_modules/** is properly excluded in .gitignore
- ✅ **Never commit node_modules** to the repository
- ✅ **Always run `npm install`** after cloning
- ✅ **Use `npm start`** for development server
