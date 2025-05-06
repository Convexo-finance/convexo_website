/**
 * Translations for Convexo website
 * This file contains all translatable text in different languages
 */

const translations = {
  // Navigation
  navbar: {
    en: {
      home: "Home",
      about: "About",
      digitalAccess: "Digital Access",
      digitalFinance: "Digital Finance",
      signUp: "Sign Up",
      language: "EN"
    },
    es: {
      home: "Inicio",
      about: "Nosotros",
      digitalAccess: "Acceso Digital",
      digitalFinance: "Finanzas Digitales",
      signUp: "Registrarse",
      language: "ES"
    }
  },
  
  // Home Page
  homePage: {
    en: {
      // Hero Section
      heroTitle: "Join to the next-generation institutions embracing the digital asset era",
      heroBtn: "Contact Us",
      
      // Stats Section
      statsHeader: "GLOBAL TRACK RECORD",
      mainStat: "$6.5M+ Total Volume",
      stats: {
        digitalAssets: "10+ Digital Assets",
        digitalAssetsDesc: "Available for trading and payments",
        minutes: "30 Minutes",
        minutesDesc: "Average Trade Settlement Time",
        fiatCurrencies: "10+ Fiat Currencies",
        fiatCurrenciesDesc: "Available for trading and payments",
        tradedDaily: "$100K traded daily",
        tradedDailyDesc: "Average daily volume",
        clients: "100+ Clients",
        clientsDesc: "Served globally",
        countries: "10+ Countries",
        countriesDesc: "Countries covered"
      },
      
      // Digital Access Section
      digitalAccessTitle: "Digital Access",
      digitalAccessDesc: "Tailored Access for Institutional and Individual Investors with the best-in-class products and services.",
      digitalAccessCta: "Explore Digital Access Solutions",
      
      // Digital Finance Section
      digitalFinanceTitle: "Digital Financial Services",
      digitalFinanceDesc: "We support enterprises to use the digital economy to their advantage.",
      
      // Contact Section
      contactTitle: "Connect with our team.",
      contactDesc: "Get a response from us in 48 hours.",
      contactBtn: "Contact Us"
    },
    es: {
      // Hero Section
      heroTitle: "Únete a las instituciones de próxima generación que adoptan la era de los activos digitales",
      heroBtn: "Contáctanos",
      
      // Stats Section
      statsHeader: "REGISTRO GLOBAL",
      mainStat: "$6.5M+ Volumen Total",
      stats: {
        digitalAssets: "10+ Activos Digitales",
        digitalAssetsDesc: "Disponibles para trading y pagos",
        minutes: "30 Minutos",
        minutesDesc: "Tiempo promedio de liquidación",
        fiatCurrencies: "10+ Monedas Fiat",
        fiatCurrenciesDesc: "Disponibles para trading y pagos",
        tradedDaily: "$100K operados diariamente",
        tradedDailyDesc: "Volumen diario promedio",
        clients: "100+ Clientes",
        clientsDesc: "Servidos globalmente",
        countries: "10+ Países",
        countriesDesc: "Países cubiertos"
      },
      
      // Digital Access Section
      digitalAccessTitle: "Acceso Digital",
      digitalAccessDesc: "Acceso personalizado para inversores institucionales e individuales con productos y servicios de primera clase.",
      digitalAccessCta: "Explorar Soluciones de Acceso Digital",
      
      // Digital Finance Section
      digitalFinanceTitle: "Servicios Financieros Digitales",
      digitalFinanceDesc: "Apoyamos a las empresas para utilizar la economía digital en su beneficio.",
      
      // Contact Section
      contactTitle: "Conecta con nuestro equipo.",
      contactDesc: "Obtenga una respuesta de nosotros en 48 horas.",
      contactBtn: "Contáctanos"
    }
  },
  
  // Digital Access Page
  digitalAccess: {
    en: {
      title: "Digital Access",
      subtitle: "Institutional grade access to the new internet era",
      description: "We provide you with advanced tools and personal oversight to give you a safe and tailored experience to owning the digital assets of the new internet.",
      
      institutionalSection: {
        title: "Business & Professional Clients",
        description: "Comprehensive onboarding and support solutions for businesses and professionals to manage their digital assets.",
        
        otcTradingRoom: {
          title: "OTC Trading Rooms",
          privateChat: "Private Room Chat",
          privateChatDesc: "Private chat for trading instructions and notifications.",
          volumeAdjusted: "Volume Adjusted Prices",
          volumeAdjustedDesc: "High volume digital asset transactions with competitive prices and minimal market impact.",
          cta: "Trade Now"
        },
        
        web3Profiles: {
          title: "Institutional Web3 Profiles",
          web3Profiles: "Web3 Profiles",
          web3ProfilesDesc: "Profiles with ENS domains to build your identity in the metaverse.",
          paymentPoints: "Physical Payment Points Enablement",
          paymentPointsDesc: "Get easy-to-use physical payment points for your customers.",
          cta: "Learn More"
        },
        
        custodySolutions: {
          title: "Transparent Custody Solutions",
          supportedAssets: "Supported Assets",
          supportedAssetsDesc: "Access to top 100 digital assets and tokens.",
          multiSig: "Multi-Signature Wallets",
          multiSigDesc: "Enhanced multiparty security to protect your assets.",
          cta: "Learn More"
        }
      },
      
      individualSection: {
        title: "Individuals",
        description: "Comprehensive onboarding and support solutions for retail clients to manage their digital assets.",
        
        digitalWallet: {
          title: "Digital Wallet",
          wallet: "Digital Wallet",
          walletDesc: "Create your own digital wallet to manage your digital assets.",
          buyAndSell: "Buy & Sell",
          buyAndSellDesc: "We help you buy and sell digital assets from your wallet.",
          cta: "Waitlist"
        },
        
        digitalCard: {
          title: "Digital Card (coming soon)",
          card: "Digital Card",
          cardDesc: "Enjoy the onchain economy by paying at your favorite stores.",
          payEverywhere: "Pay Everywhere",
          payEverywhereDesc: "We help you access the digital card to pay everywhere.",
          cta: "Waitlist"
        }
      },
      
      contactSection: {
        title: "Contact Our Team",
        description: "Get in touch with our institutional services team to learn more about our offerings.",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        servicePlaceholder: "Select Service",
        services: {
          trading: "Trading",
          investmentBanking: "Investment Banking",
          lending: "Lending"
        },
        messagePlaceholder: "Your Message",
        submitButton: "Send Message"
      },
      
      footer: {
        copyright: "© 2024 Convexo. All rights reserved."
      }
    },
    
    es: {
      title: "Acceso Digital",
      subtitle: "Acceso de grado institucional a la nueva era de internet",
      description: "Le proporcionamos herramientas avanzadas y supervisión personal para brindarle una experiencia segura y personalizada para poseer los activos digitales del nuevo internet.",
      
      institutionalSection: {
        title: "Empresas y Clientes Profesionales",
        description: "Soluciones integrales de incorporación y soporte para que empresas y profesionales gestionen sus activos digitales.",
        
        otcTradingRoom: {
          title: "Salas de Trading OTC",
          privateChat: "Chat de Sala Privada",
          privateChatDesc: "Chat privado para instrucciones de trading y notificaciones.",
          volumeAdjusted: "Precios Ajustados por Volumen",
          volumeAdjustedDesc: "Transacciones de activos digitales de gran volumen con precios competitivos y mínimo impacto en el mercado.",
          cta: "Operar Ahora"
        },
        
        web3Profiles: {
          title: "Perfiles Web3 Institucionales",
          web3Profiles: "Perfiles Web3",
          web3ProfilesDesc: "Perfiles con dominios ENS para construir su identidad en el metaverso.",
          paymentPoints: "Habilitación de Puntos de Pago Físicos",
          paymentPointsDesc: "Obtenga puntos de pago físicos fáciles de usar para sus clientes.",
          cta: "Más Información"
        },
        
        custodySolutions: {
          title: "Soluciones de Custodia Transparentes",
          supportedAssets: "Activos Soportados",
          supportedAssetsDesc: "Acceso a los 100 principales activos digitales y tokens.",
          multiSig: "Carteras Multi-Firma",
          multiSigDesc: "Seguridad multipartita mejorada para proteger sus activos.",
          cta: "Más Información"
        }
      },
      
      individualSection: {
        title: "Individuos",
        description: "Soluciones integrales de incorporación y soporte para clientes minoristas para gestionar sus activos digitales.",
        
        digitalWallet: {
          title: "Billetera Digital",
          wallet: "Billetera Digital",
          walletDesc: "Cree su propia billetera digital para gestionar sus activos digitales.",
          buyAndSell: "Comprar y Vender",
          buyAndSellDesc: "Le ayudamos a comprar y vender activos digitales desde su billetera.",
          cta: "Lista de Espera"
        },
        
        digitalCard: {
          title: "Tarjeta Digital (próximamente)",
          card: "Tarjeta Digital",
          cardDesc: "Disfrute de la economía en cadena pagando en sus tiendas favoritas.",
          payEverywhere: "Pague en todas partes",
          payEverywhereDesc: "Le ayudamos a acceder a la tarjeta digital para pagar en todas partes.",
          cta: "Lista de Espera"
        }
      },
      
      contactSection: {
        title: "Contacte a Nuestro Equipo",
        description: "Póngase en contacto con nuestro equipo de servicios institucionales para obtener más información sobre nuestras ofertas.",
        namePlaceholder: "Su Nombre",
        emailPlaceholder: "Su Email",
        servicePlaceholder: "Seleccione Servicio",
        services: {
          trading: "Trading",
          investmentBanking: "Banca de Inversión",
          lending: "Préstamos"
        },
        messagePlaceholder: "Su Mensaje",
        submitButton: "Enviar Mensaje"
      },
      
      footer: {
        copyright: "© 2024 Convexo. Todos los derechos reservados."
      }
    }
  },
  
  // Digital Financial Services Page
  digitalFinancialServices: {
    en: {
      title: "Digital Financial Services",
      subtitle: "Next-generation financial services powered by blockchain technology",
      description: "We support enterprises to use the digital economy to their advantage with innovative financial solutions that bridge traditional and digital finance.",
      
      enterpriseSection: {
        title: "Enterprise & VIP Services",
        description: "Financial solutions designed for businesses and high-net-worth individuals.",
        
        payroll: {
          title: "Payroll",
          instant: "Instant Payments",
          instantDesc: "Pay to unlimited number of employees in seconds using high-liquid digital assets.",
          savingPlans: "Financial Saving Plans",
          savingPlansDesc: "Create financial saving plans for your employees to help them save for the future.",
          identities: "Digital Employee Identities",
          identitiesDesc: "Create identities linked to your company domain for a unique employee experience.",
          cta: "Learn More"
        },
        
        crossBorder: {
          title: "Cross-border Payments",
          transfers: "Global Wire Transfers",
          transfersDesc: "Enabling seamless experiences for cross-border wire transfers in seconds with low fees.",
          remittances: "Global Remittances",
          remittancesDesc: "Fast and affordable remittance services for international money transfers.",
          payments: "Payments in Seconds",
          paymentsDesc: "Pay contractors and employees in seconds using high-liquid digital assets.",
          cta: "Learn More"
        }
      }
    },
    
    es: {
      title: "Servicios Financieros Digitales",
      subtitle: "Servicios financieros de próxima generación impulsados por tecnología blockchain",
      description: "Apoyamos a las empresas para utilizar la economía digital en su beneficio con soluciones financieras innovadoras que conectan las finanzas tradicionales y digitales.",
      
      enterpriseSection: {
        title: "Servicios para Empresas y VIP",
        description: "Soluciones financieras diseñadas para empresas e individuos de alto patrimonio.",
        
        payroll: {
          title: "Nómina",
          instant: "Pagos Instantáneos",
          instantDesc: "Pague a un número ilimitado de empleados en segundos usando activos digitales de alta liquidez.",
          savingPlans: "Planes de Ahorro Financiero",
          savingPlansDesc: "Cree planes de ahorro financiero para sus empleados para ayudarles a ahorrar para el futuro.",
          identities: "Identidades Digitales para Empleados",
          identitiesDesc: "Cree identidades vinculadas al dominio de su empresa para una experiencia única del empleado.",
          cta: "Más Información"
        },
        
        crossBorder: {
          title: "Pagos Transfronterizos",
          transfers: "Transferencias Bancarias Globales",
          transfersDesc: "Habilitando experiencias perfectas para transferencias bancarias transfronterizas en segundos con tarifas bajas.",
          remittances: "Remesas Globales",
          remittancesDesc: "Servicios de remesas rápidos y asequibles para transferencias internacionales de dinero.",
          payments: "Pagos en Segundos",
          paymentsDesc: "Pague a contratistas y empleados en segundos usando activos digitales de alta liquidez.",
          cta: "Más Información"
        }
      }
    }
  },
  
  // Add more page translations here...
};

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
  applyTranslations();
  
  // Refresh language indicators
  updateLanguageIndicators();
}

/**
 * Apply translations to the current page
 */
function applyTranslations() {
  const lang = getUserLanguage();
  const path = window.location.pathname;
  
  // Determine which page we're on and apply the appropriate translations
  if (path.includes('digital_access') || path === '/digital_access') {
    applyDigitalAccessTranslations(lang);
  } else if (path.includes('digital_financial_services') || path === '/digital_financial_services') {
    applyDigitalFinancialServicesTranslations(lang);
  } else if (path === '/' || path.includes('index')) {
    applyHomePageTranslations(lang);
  }
  // Add more page conditions as needed
}

/**
 * Apply Home page translations
 * @param {string} lang - Language code
 */
function applyHomePageTranslations(lang) {
  const t = translations.homePage[lang];
  if (!t) return;
  
  // Use data-i18n attributes to select elements for translation
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Fallback for elements without data-i18n attributes
  
  // Update stats section
  const statsHeader = document.querySelector('#trading-stats .stats-header h2');
  if (statsHeader) statsHeader.textContent = t.statsHeader;
  
  // Update stats items - can be expanded if we need to translate these
  const statItems = document.querySelectorAll('#trading-stats .stat-item');
  if (statItems.length > 0) {
    // Example of updating a specific stat item if needed
    // const digitalAssetsItem = statItems[0];
    // if (digitalAssetsItem) {
    //   digitalAssetsItem.querySelector('h3').innerHTML = t.stats.digitalAssets;
    //   digitalAssetsItem.querySelector('p').textContent = t.stats.digitalAssetsDesc;
    // }
  }
}

/**
 * Apply Digital Access page translations
 * @param {string} lang - Language code
 */
function applyDigitalAccessTranslations(lang) {
  const t = translations.digitalAccess[lang];
  if (!t) return;
  
  // Update page title and meta tags
  document.title = t.title;
  
  // Use data-i18n attributes to select elements for translation
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Fallback for elements without data-i18n attributes
  
  // Update main content sections
  const heroTitle = document.querySelector('#hero h1, #hero h2');
  if (heroTitle && !heroTitle.hasAttribute('data-i18n')) heroTitle.textContent = t.title;
  
  const heroSubtitle = document.querySelector('#hero p');
  if (heroSubtitle && !heroSubtitle.hasAttribute('data-i18n')) heroSubtitle.textContent = t.subtitle;
  
  // Update institutional section
  const institutionalTitle = document.querySelector('#products-institutional .section-header h2');
  if (institutionalTitle && !institutionalTitle.hasAttribute('data-i18n')) 
    institutionalTitle.textContent = t.institutionalSection.title;
  
  const institutionalDesc = document.querySelector('#products-institutional .section-header p');
  if (institutionalDesc && !institutionalDesc.hasAttribute('data-i18n')) 
    institutionalDesc.textContent = t.institutionalSection.description;
  
  // Update individual section
  const individualTitle = document.querySelector('#products-individuals .section-header h2');
  if (individualTitle && !individualTitle.hasAttribute('data-i18n')) 
    individualTitle.textContent = t.individualSection.title;
  
  const individualDesc = document.querySelector('#products-individuals .section-header p');
  if (individualDesc && !individualDesc.hasAttribute('data-i18n')) 
    individualDesc.textContent = t.individualSection.description;
  
  // Update contact section
  const contactTitle = document.querySelector('#contact h2');
  if (contactTitle && !contactTitle.hasAttribute('data-i18n')) 
    contactTitle.textContent = t.contactSection.title;
  
  const contactDesc = document.querySelector('#contact p');
  if (contactDesc && !contactDesc.hasAttribute('data-i18n')) 
    contactDesc.textContent = t.contactSection.description;
  
  // Update form placeholders if form exists
  const nameInput = document.querySelector('#name');
  if (nameInput) nameInput.placeholder = t.contactSection.namePlaceholder;
  
  const emailInput = document.querySelector('#email');
  if (emailInput) emailInput.placeholder = t.contactSection.emailPlaceholder;
  
  const serviceSelect = document.querySelector('#service');
  if (serviceSelect && serviceSelect.options[0]) 
    serviceSelect.options[0].text = t.contactSection.servicePlaceholder;
  
  const messageInput = document.querySelector('#message');
  if (messageInput) messageInput.placeholder = t.contactSection.messagePlaceholder;
  
  const submitButton = document.querySelector('.submit-button');
  if (submitButton && !submitButton.hasAttribute('data-i18n')) 
    submitButton.textContent = t.contactSection.submitButton;
  
  // Update footer
  const footerCopyright = document.querySelector('footer p');
  if (footerCopyright) footerCopyright.textContent = t.footer.copyright;
}

/**
 * Apply Digital Financial Services page translations
 * @param {string} lang - Language code
 */
function applyDigitalFinancialServicesTranslations(lang) {
  const t = translations.digitalFinancialServices[lang];
  if (!t) return;
  
  // Update page title and meta tags
  document.title = t.title;
  
  // Update main sections
  // Add code here to update the Digital Financial Services page elements
}

/**
 * Update language indicators in the UI
 */
function updateLanguageIndicators() {
  const lang = getUserLanguage();
  const currentLangElements = document.querySelectorAll('#current-lang');
  
  currentLangElements.forEach(el => {
    el.textContent = lang.toUpperCase();
  });
  
  // Update flag emojis if needed
  const flagElements = document.querySelectorAll('.flag-emoji');
  flagElements.forEach(el => {
    if (lang === 'en') {
      el.textContent = '🇺🇸';
    } else if (lang === 'es') {
      el.textContent = '🇪🇸';
    }
  });
  
  // Update active class on language links
  const languageLinks = document.querySelectorAll('.language-dropdown a');
  languageLinks.forEach(link => {
    if ((lang === 'en' && link.getAttribute('onclick').includes("'en'")) || 
        (lang === 'es' && link.getAttribute('onclick').includes("'es'"))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize translations when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Apply translations before the page is fully visible
  applyTranslations();
  
  // Set up language switcher in the navbar
  setupLanguageSwitcher();
});

/**
 * Set up the language switcher functionality
 */
function setupLanguageSwitcher() {
  // We're now using direct onclick attributes in the navbar.html
  // This function remains for backward compatibility
  
  // Update language indicators based on current setting
  updateLanguageIndicators();
  
  // Initialize with the current language
  const currentLang = getUserLanguage();
  setUserLanguage(currentLang);
} 