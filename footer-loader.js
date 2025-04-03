/**
 * Footer Loader Script
 * Dynamically loads the site footer and adjusts link paths as needed
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get the footer element
    const footerElement = document.querySelector('footer');
    
    if (!footerElement) {
        console.error('Footer element not found in the document');
        return;
    }
    
    // Determine the base path for the footer.html file
    // This is relative to the current page
    let basePath = '';
    
    // Check if we're in a subdirectory by looking at the current path
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    
    // Calculate the path depth
    if (pathSegments.length > 0) {
        // For each directory level, add "../" to go up one level
        for (let i = 0; i < pathSegments.length; i++) {
            if (pathSegments[i].includes('.html')) {
                // If it's a file, don't count it as a directory level
                continue;
            }
            basePath += '../';
        }
    }
    
    // If basePath is still empty, we're at the root
    if (basePath === '') {
        basePath = './';
    }
    
    // Load the footer content
    fetch(basePath + 'footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load footer (${response.status})`);
            }
            return response.text();
        })
        .then(data => {
            // Insert the footer HTML
            footerElement.innerHTML = data;
            
            // Fix any relative paths in footer links
            fixFooterLinks(footerElement, basePath);
            
            // Update copyright year to current year
            updateCopyrightYear(footerElement);
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
 * Fix relative paths in footer links based on current page location
 * @param {HTMLElement} footerElement - The footer DOM element
 * @param {string} basePath - The calculated base path to the root
 */
function fixFooterLinks(footerElement, basePath) {
    const links = footerElement.querySelectorAll('a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip if it's an absolute URL, anchor, or already starts with /
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('/')) {
            return;
        }
        
        // Fix the path by prepending the base path
        link.setAttribute('href', basePath + href);
    });
}

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