document.addEventListener('DOMContentLoaded', function() {
    // Initialize Privy for authentication check
    const privy = new Privy({
        appId: 'YOUR_PRIVY_APP_ID', // Replace with your actual Privy App ID
    });

    // Check if user is logged in
    checkUserAuth();

    // Set up navigation
    setupNavigation();

    // Add event listeners
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    /**
     * Check user authentication
     */
    function checkUserAuth() {
        // Get user from session storage
        const userJson = sessionStorage.getItem('user');
        
        if (!userJson) {
            // No user in session, redirect to login
            window.location.href = '/login.html';
            return;
        }
        
        try {
            const user = JSON.parse(userJson);
            
            // Update user greeting
            const userGreeting = document.getElementById('user-greeting');
            if (user.email) {
                userGreeting.textContent = `Welcome, ${user.email}`;
            } else if (user.walletAddress) {
                const shortenedAddress = shortenAddress(user.walletAddress);
                userGreeting.textContent = `Welcome, ${shortenedAddress}`;
            } else {
                userGreeting.textContent = 'Welcome to your dashboard';
            }
            
            // You can also check if the user is still authenticated with Privy
            checkPrivyAuth();
            
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Redirect to login on error
            window.location.href = '/login.html';
        }
    }
    
    /**
     * Check authentication with Privy
     */
    async function checkPrivyAuth() {
        try {
            const isAuthenticated = await privy.isAuthenticated();
            
            if (!isAuthenticated) {
                console.log('Privy session expired');
                // Optional: You can either force logout or let the user continue
                // with the current session
                
                // handleLogout();
            }
        } catch (error) {
            console.error('Error checking Privy auth:', error);
        }
    }

    /**
     * Handle logout
     */
    async function handleLogout() {
        try {
            // Try to logout from Privy
            await privy.logout();
        } catch (error) {
            console.error('Error logging out from Privy:', error);
        } finally {
            // Clear session storage
            sessionStorage.removeItem('user');
            // Redirect to login
            window.location.href = '/login.html';
        }
    }

    /**
     * Set up dashboard navigation
     */
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        const panels = document.querySelectorAll('.dashboard-panel');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target panel id from the href attribute
                const targetId = this.getAttribute('href').substring(1);
                
                // Remove active class from all links and panels
                navLinks.forEach(l => l.parentElement.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked link and corresponding panel
                this.parentElement.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    /**
     * Shorten wallet address for display
     * @param {string} address - The wallet address
     * @returns {string} - Shortened address
     */
    function shortenAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    // For demonstration purposes, you might want to simulate some dashboard data
    function initDemoData() {
        // This function would populate the dashboard with demo data
        // For a real implementation, you would fetch this data from your API
        
        // For example, update the balance
        document.querySelector('.balance-amount').textContent = '$2,450.00';
        document.querySelector('.asset-count').textContent = '3 assets';
        document.querySelector('.activity-status').textContent = '5 transactions this week';
        
        // Here you would also implement real functionality for the action buttons
        // like deposit funds, transfers, etc.
    }
    
    // Initialize demo data for display purposes
    // In a real app, you'd replace this with actual data fetching
    initDemoData();
}); 