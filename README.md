# Convexo Website

Convexo is a crypto and AI institutional-grade services company. This repository contains the code for the Convexo website.

## 📁 Project Structure

```
website/
├── src/                          # Source files (development)
│   ├── assets/                   # All static assets
│   │   ├── images/              # Images, logos, icons
│   │   │   ├── logo_convexo.png
│   │   │   ├── logologo.png
│   │   │   ├── metamask-logo.svg
│   │   │   └── walletconnect-logo.svg
│   │   ├── videos/              # Video files
│   │   │   ├── hero_video.mp4
│   │   │   └── hero_video2.mp4
│   │   └── crypto-pattern.svg   # Other assets
│   ├── components/              # Reusable HTML components
│   │   ├── navbar.html          # Navigation component
│   │   ├── footer.html          # Footer component
│   │   └── page-template.html   # Page template
│   ├── scripts/                 # JavaScript files
│   │   ├── script.js            # Main website script
│   │   ├── navbar-loader.js     # Navbar loading script
│   │   └── footer-loader.js     # Footer loading script
│   └── styles/                  # CSS files
│       └── css/                 # Organized CSS
│           ├── main.css         # Main CSS entry point
│           ├── base/            # Base styles
│           ├── components/      # Component styles
│           ├── layout/          # Layout styles
│           └── pages/           # Page-specific styles
├── public/                      # Production-ready files
│   └── index.html              # Main HTML file (production)
├── dist/                       # Build output (future use)
├── digital_access/             # Service pages
├── digital_financial_services/ # Service pages
├── about_us/                   # About page
├── kyc-page/                   # KYC page
├── lega_docs/                  # Legal documents
├── js/                         # Legacy JS (to be organized)
├── scripts/                    # Legacy scripts (to be organized)
├── server.js                   # Express server
├── package.json                # Dependencies
├── vercel.json                 # Deployment config
└── .gitignore                  # Git exclusions
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

## 🚀 Development

### **Quick Start**
```bash
# Install dependencies (requires Node.js)
npm install

# Start development server
npm run dev
```

The site will be available at http://localhost:8080

### **File Organization Rules**
1. **Edit files in `/src/` directories** - Server automatically maps paths
2. **Use absolute paths** - Always start with `/` (e.g., `/assets/images/logo.png`)
3. **Main HTML** - Located in `/public/index.html`
4. **Components** - Automatically loaded via navbar-loader.js and footer-loader.js

## 🌐 URL Structure

### **Main Sections**
- Home: `/`
- About Us: `/about_us`
- Digital Access: `/digital_access`
- Digital Financial Services: `/digital_financial_services`
- KYC: `/kyc`
- **Convexo App**: `https://app.convexo.xyz` (separate repository)

### **Digital Access Sub-Pages**
- Private Brokerage: `/digital_access/private_brokerage`
- Corporate Treasury: `/digital_access/corporate_treasury`
- Point of Sale: `/digital_access/point_of_sale`
- Digital Card: `/digital_access/digital_card`

### **Digital Financial Services Sub-Pages**
- Payroll: `/digital_financial_services/payrrol`
- Cross-border Payments: `/digital_financial_services/cross_border`
- Asset Management: `/digital_financial_services/asset-management`
- Custody Solutions: `/digital_financial_services/custody_solutions`
- RWA Tokenization: `/digital_financial_services/rwa-tokenization`

### **Legal Pages**
- Privacy Policy: `/privacy_policy`
- Terms and Conditions: `/terms_conditions`
- AMLFT Policy: `/amlft_policy`

## 🔧 Key Features

- **Clean Architecture**: Organized file structure with clear separation of concerns
- **Professional CSS**: Optimized styles with modern design patterns and accessibility
- **Component System**: Reusable navbar and footer components
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Asset Organization**: All assets properly organized in `/src/assets/`
- **No Duplicates**: Single source of truth for all files
- **Production Ready**: Clean deployment structure

## 🚀 Deployment

The site is configured for deployment on Vercel with clean URL routing.

## 📚 Documentation

For detailed information, see:
- `CLEAN_STRUCTURE_GUIDE.md` - Complete file structure guide
- `CSS_OPTIMIZATION_SUMMARY.md` - Professional CSS optimization details
- `NAVBAR_FOOTER_GUIDE.md` - Component system guide
