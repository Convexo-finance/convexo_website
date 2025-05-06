/**
 * Footer Loader Script
 * Dynamically loads the site footer with consistent paths across all pages
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get the footer element
    const footerElement = document.querySelector('footer');
    
    if (!footerElement) {
        console.error('Footer element not found in the document');
        return;
    }
    
    // Calculate the base URL (root of the site)
    const baseUrl = window.location.protocol + '//' + window.location.host;
    
    // Load the footer content using absolute path
    fetch('/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load footer (${response.status})`);
            }
            return response.text();
        })
        .then(data => {
            // Insert the footer HTML
            footerElement.innerHTML = data;
            
            // Update copyright year to current year
            updateCopyrightYear(footerElement);
            
            // Initialize footer functionality
            initializeFooter();
        })
        .catch(error => {
            console.error('Error loading the footer:', error);
            footerElement.innerHTML = `
                <div class="footer-error">
                    <p>Footer temporarily unavailable</p>
                    <small>Please try refreshing the page</small>
                </div>
            `;
        });
});

/**
 * Update the copyright year to the current year
 * @param {HTMLElement} footerElement - The footer DOM element
 */
function updateCopyrightYear(footerElement) {
    const copyrightElement = footerElement.querySelector('.footer-bottom p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace(/\d{4}/, currentYear);
    }
}

/**
 * Initialize any footer-specific functionality
 */
function initializeFooter() {
    // Social media link tracking (if needed)
    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const platform = this.querySelector('i').className.split('-').pop();
                // Analytics tracking could be added here
                console.log(`Social click: ${platform}`);
            });
        });
    }
    
    // Newsletter subscription (if implemented)
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle newsletter subscription
            const email = this.querySelector('input[type="email"]').value;
            // Here would be the code to handle the subscription
            console.log(`Newsletter signup: ${email}`);
            this.reset();
            alert('Thank you for subscribing to our newsletter!');
        });
    }
} 