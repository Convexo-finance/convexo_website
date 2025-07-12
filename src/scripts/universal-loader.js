/**
 * CONVEXO UNIVERSAL COMPONENT LOADER
 * Reliable navbar and footer loading system for all pages
 * Works regardless of directory structure with intelligent path detection
 */

class ConvexoUniversalLoader {
    constructor() {
        this.baseUrl = window.location.origin;
        this.currentPath = window.location.pathname;
        this.isLoading = false;
        this.loadedComponents = new Set();
        
        // Component paths to try (in order of preference)
        this.componentPaths = [
            '/src/components/',
            '/components/',
            '/'
        ];
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadComponents());
        } else {
            this.loadComponents();
        }
    }
    
    async loadComponents() {
        if (this.isLoading) return;
        this.isLoading = true;
        
        try {
            // Load navbar and footer in parallel
            await Promise.all([
                this.loadNavbar(),
                this.loadFooter()
            ]);
            
            // Initialize components after loading
            this.initializeComponents();
            
        } catch (error) {
            console.error('Error loading components:', error);
            this.handleLoadError();
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadNavbar() {
        const headerElement = document.querySelector('header');
        if (!headerElement) {
            console.warn('Header element not found');
            return;
        }
        
        try {
            const navbarHtml = await this.fetchComponent('navbar-new.html');
            headerElement.innerHTML = navbarHtml;
            this.loadedComponents.add('navbar');
            
            // Load navbar CSS
            await this.loadCSS('/src/styles/css/components/navbar-new.css');
            
            console.log('✅ Navbar loaded successfully');
        } catch (error) {
            console.error('Failed to load navbar:', error);
            this.loadFallbackNavbar(headerElement);
        }
    }
    
    async loadFooter() {
        const footerElement = document.querySelector('footer');
        if (!footerElement) {
            console.warn('Footer element not found');
            return;
        }
        
        try {
            const footerHtml = await this.fetchComponent('footer-new.html');
            footerElement.innerHTML = footerHtml;
            this.loadedComponents.add('footer');
            
            // Load footer CSS
            await this.loadCSS('/src/styles/css/components/footer-new.css');
            
            console.log('✅ Footer loaded successfully');
        } catch (error) {
            console.error('Failed to load footer:', error);
            this.loadFallbackFooter(footerElement);
        }
    }
    
    async fetchComponent(componentName) {
        let lastError;
        
        // Try each component path
        for (const basePath of this.componentPaths) {
            const componentUrl = `${this.baseUrl}${basePath}${componentName}`;
            
            try {
                const response = await fetch(componentUrl);
                if (response.ok) {
                    const html = await response.text();
                    console.log(`📁 Component loaded from: ${componentUrl}`);
                    return html;
                }
            } catch (error) {
                lastError = error;
                console.log(`❌ Failed to load from: ${componentUrl}`);
            }
        }
        
        throw new Error(`Failed to load ${componentName} from any location: ${lastError?.message}`);
    }
    
    async loadCSS(cssPath) {
        return new Promise((resolve, reject) => {
            // Check if CSS is already loaded
            const existingLink = document.querySelector(`link[href="${cssPath}"]`);
            if (existingLink) {
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            
            link.onload = () => {
                console.log(`✅ CSS loaded: ${cssPath}`);
                resolve();
            };
            
            link.onerror = () => {
                console.warn(`⚠️ CSS failed to load: ${cssPath}`);
                resolve(); // Don't reject, just continue
            };
            
            document.head.appendChild(link);
        });
    }
    
    loadFallbackNavbar(headerElement) {
        console.log('🔄 Loading fallback navbar...');
        headerElement.innerHTML = `
            <nav class="fallback-navbar">
                <div class="fallback-nav-container">
                    <div class="fallback-logo">
                        <a href="/">
                            <img src="/assets/images/logo_convexo.png" alt="Convexo" style="height: 40px;">
                        </a>
                    </div>
                    <div class="fallback-nav-links">
                        <a href="/">Home</a>
                        <a href="/about_us">About</a>
                        <a href="/digital_access">Digital Access</a>
                        <a href="/digital_financial_services">Digital Finance</a>
                        <a href="https://app.convexo.xyz" target="_blank">Login</a>
                    </div>
                </div>
            </nav>
        `;
        
        this.addFallbackStyles();
    }
    
    loadFallbackFooter(footerElement) {
        console.log('🔄 Loading fallback footer...');
        footerElement.innerHTML = `
            <div class="fallback-footer">
                <div class="fallback-footer-container">
                    <div class="fallback-footer-content">
                        <div class="fallback-footer-logo">
                            <img src="/assets/images/logo_convexo.png" alt="Convexo" style="height: 40px;">
                        </div>
                        <div class="fallback-footer-links">
                            <a href="/about_us">About</a>
                            <a href="/privacy_policy">Privacy</a>
                            <a href="/terms_conditions">Terms</a>
                        </div>
                    </div>
                    <div class="fallback-footer-bottom">
                        <p>&copy; ${new Date().getFullYear()} Convexo. All rights reserved.</p>
                    </div>
                </div>
            </div>
        `;
        
        this.addFallbackStyles();
    }
    
    addFallbackStyles() {
        if (document.querySelector('#fallback-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'fallback-styles';
        style.textContent = `
            .fallback-navbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                background: linear-gradient(135deg, #1e0138 0%, #401777 100%);
                padding: 1rem 0;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            }
            
            .fallback-nav-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .fallback-nav-links {
                display: flex;
                gap: 2rem;
                align-items: center;
            }
            
            .fallback-nav-links a {
                color: #FFF9EF;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;
            }
            
            .fallback-nav-links a:hover {
                color: #BAD6EB;
            }
            
            .fallback-footer {
                background: linear-gradient(135deg, #1e0138 0%, #401777 100%);
                color: #FFF9EF;
                padding: 2rem 0;
                margin-top: 2rem;
            }
            
            .fallback-footer-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            .fallback-footer-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .fallback-footer-links {
                display: flex;
                gap: 2rem;
            }
            
            .fallback-footer-links a {
                color: #FFF9EF;
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .fallback-footer-links a:hover {
                color: #BAD6EB;
            }
            
            .fallback-footer-bottom {
                text-align: center;
                opacity: 0.8;
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .fallback-nav-container,
                .fallback-footer-content {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .fallback-nav-links,
                .fallback-footer-links {
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    initializeComponents() {
        // Ensure body has proper padding for fixed navbar
        document.body.style.paddingTop = '80px';
        
        // Highlight current page in navigation
        this.highlightCurrentPage();
        
        // Initialize any additional component functionality
        this.initializeNavbarFunctionality();
        this.initializeFooterFunctionality();
        
        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('convexoComponentsLoaded', {
            detail: {
                loadedComponents: Array.from(this.loadedComponents)
            }
        }));
        
        console.log('🎉 All components initialized successfully');
    }
    
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('a[href]');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath || 
                (currentPath !== '/' && linkPath !== '/' && currentPath.includes(linkPath))) {
                link.classList.add('active');
                
                // Also highlight parent dropdown if it exists
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        });
    }
    
    initializeNavbarFunctionality() {
        // Mobile menu functionality is already included in navbar-new.html
        // Additional navbar initialization can be added here
    }
    
    initializeFooterFunctionality() {
        // Footer functionality is already included in footer-new.html
        // Additional footer initialization can be added here
    }
    
    handleLoadError() {
        console.error('⚠️ Component loading failed, using fallback components');
        
        // Show user-friendly error message
        const errorNotification = document.createElement('div');
        errorNotification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            font-size: 0.9rem;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        errorNotification.innerHTML = `
            <strong>⚠️ Loading Issue</strong><br>
            Some components failed to load. Using fallback navigation.
        `;
        
        document.body.appendChild(errorNotification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            errorNotification.remove();
        }, 5000);
    }
}

// Initialize the universal loader
window.ConvexoLoader = new ConvexoUniversalLoader();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConvexoUniversalLoader;
} 