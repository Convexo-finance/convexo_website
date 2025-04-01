document.addEventListener('DOMContentLoaded', function() {
    // Create a new nav element
    const nav = document.createElement('nav');
    
    // Fetch the navbar HTML
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            nav.innerHTML = data;
            document.body.insertBefore(nav, document.body.firstChild);
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            nav.innerHTML = '<div>Error loading navbar</div>';
            document.body.insertBefore(nav, document.body.firstChild);
        });

    // After the navbar is loaded
    setTimeout(() => {
        const wrapper = document.querySelector('.wrapper');
        
        // Toggle menu when wrapper is clicked
        if (wrapper) {
            wrapper.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('logo') || e.target === this.querySelector('.logo a')) {
                    return; // Don't toggle if clicking on the logo
                }
                this.classList.toggle('active');
            });
            
            // Close menu when clicking the X
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.addEventListener('click', function(e) {
                    if (e.target === this || e.clientX < 50 && e.clientY < 50) {
                        wrapper.classList.remove('active');
                    }
                });
            }
        }
    }, 500); // Small delay to ensure navbar is loaded
});
