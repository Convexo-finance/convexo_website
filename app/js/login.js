document.addEventListener('DOMContentLoaded', async function() {
    // Load configuration
    await window.ConvexoConfig.load();
    const config = window.ConvexoConfig.get();
    
    // Initialize WalletConnect Provider
    const walletConnectProvider = new WalletConnectProvider.default({
        infuraId: config.blockchain.infuraId, // Using config value
        rpc: config.blockchain.rpcs, // Using config value
    });

    // Initialize Privy with your app ID
    const privy = new window.PrivySDK({
        appId: config.privy.appId, // Using config value
        config: config.privy.config, // Using config value
        onLogin: handleLogin,
        onLogout: handleLogout,
    });

    // Initialize the login component
    try {
        await privy.mountLoginButton({
            elementId: 'privy-login',
            buttonText: 'Login with Email/Phone',
        });
    } catch (error) {
        console.error('Error mounting Privy login button:', error);
        showError('Could not initialize login. Please try again later.');
    }

    // Handle MetaMask wallet connection
    document.querySelector('.wallet-button.metamask').addEventListener('click', function() {
        connectMetaMask();
    });

    // Handle WalletConnect connection
    document.querySelector('.wallet-button.walletconnect').addEventListener('click', function() {
        connectWalletConnect();
    });

    // Handle create wallet button
    document.getElementById('create-wallet-btn').addEventListener('click', function() {
        createNewWallet();
    });

    /**
     * Handle successful login
     * @param {Object} user - The user object from Privy
     */
    function handleLogin(user) {
        console.log('User logged in:', user);
        
        // Store user info in session
        sessionStorage.setItem('convexo_user', JSON.stringify({
            id: user.id,
            walletAddress: user.wallet?.address || null,
            email: user.email?.address || null,
            phone: user.phone?.number || null,
            loginMethod: user.wallet ? 'wallet' : (user.email ? 'email' : 'phone'),
            timestamp: new Date().toISOString()
        }));
        
        // Redirect to dashboard
        window.location.href = '/app/dashboard.html';
    }

    /**
     * Handle user logout
     */
    function handleLogout() {
        console.log('User logged out');
        sessionStorage.removeItem('convexo_user');
        // Redirect to login page
        window.location.href = '/app/login.html';
    }

    /**
     * Connect with MetaMask
     */
    async function connectMetaMask() {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                showError('MetaMask is not installed. Please install it to use this feature.');
                return;
            }

            // Request account access
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            
            console.log('Connected to MetaMask:', address);
            
            // Store user info in session
            sessionStorage.setItem('convexo_user', JSON.stringify({
                walletAddress: address,
                walletType: 'metamask',
                loginMethod: 'wallet',
                timestamp: new Date().toISOString()
            }));
            
            // Redirect to dashboard
            window.location.href = '/app/dashboard.html';
            
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            showError('Failed to connect to MetaMask. Please try again.');
        }
    }

    /**
     * Connect with WalletConnect
     */
    async function connectWalletConnect() {
        try {
            // Enable session (triggers QR Code modal)
            await walletConnectProvider.enable();
            
            // Create Web3Provider
            const provider = new ethers.providers.Web3Provider(walletConnectProvider);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            
            console.log('Connected with WalletConnect:', address);
            
            // Store user info in session
            sessionStorage.setItem('convexo_user', JSON.stringify({
                walletAddress: address,
                walletType: 'walletconnect',
                loginMethod: 'wallet',
                timestamp: new Date().toISOString()
            }));
            
            // Redirect to dashboard
            window.location.href = '/app/dashboard.html';
            
        } catch (error) {
            console.error('Error connecting with WalletConnect:', error);
            showError('Failed to connect with WalletConnect. Please try again.');
        }
    }

    /**
     * Create a new embedded wallet with Privy
     */
    async function createNewWallet() {
        try {
            // Open Privy login modal to create a new wallet
            await privy.login();
        } catch (error) {
            console.error('Error creating wallet:', error);
            showError('Failed to create wallet. Please try again.');
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    function showError(message) {
        // Check if error element already exists
        let errorElement = document.querySelector('.login-error');
        
        if (!errorElement) {
            // Create error element
            errorElement = document.createElement('div');
            errorElement.className = 'login-error';
            errorElement.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
            errorElement.style.color = 'var(--error-color)';
            errorElement.style.padding = '0.75rem 1rem';
            errorElement.style.borderRadius = 'var(--border-radius-md)';
            errorElement.style.marginBottom = '1rem';
            errorElement.style.textAlign = 'center';
            
            // Add to DOM after the login methods
            const loginMethods = document.querySelector('.login-methods');
            loginMethods.parentNode.insertBefore(errorElement, loginMethods.nextSibling);
        }
        
        // Set error message
        errorElement.textContent = message;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorElement.classList.add('fade-out');
            errorElement.style.opacity = '0';
            errorElement.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.parentNode.removeChild(errorElement);
                }
            }, 500);
        }, 5000);
    }

    // Add styles for error message fade-out animation
    const style = document.createElement('style');
    style.textContent = `
        .login-error {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        .fade-out {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    // Check if redirected from another page with an error message
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error');
    
    if (errorMessage) {
        showError(decodeURIComponent(errorMessage));
        // Remove the error parameter from the URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
}); 