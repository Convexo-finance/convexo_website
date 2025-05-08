document.addEventListener('DOMContentLoaded', function() {
    // Initialize Privy
    const privy = new Privy({
        appId: 'YOUR_PRIVY_APP_ID', // Replace with your actual Privy App ID
        config: {
            appearance: {
                theme: 'dark',
                accentColor: '#FFF9EF',
                logo: '/logologo.png',
                showWalletLoginFirst: true,
            },
            embeddedWallets: {
                createOnLogin: true,
                noPromptOnSignature: false,
            },
            supportedChains: [
                'ethereum',
                'polygon',
                'solana',
            ],
        },
        onLogin: handleLogin,
        onLogout: handleLogout,
    });

    // Initialize the login component
    privy.mountLoginButton({
        elementId: 'privy-login',
        buttonText: 'Login with Email/Phone',
    });

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
        sessionStorage.setItem('user', JSON.stringify({
            id: user.id,
            walletAddress: user.wallet?.address || null,
            email: user.email?.address || null,
            phone: user.phone?.number || null,
        }));
        
        // Redirect to dashboard or homepage
        window.location.href = '/dashboard.html';
    }

    /**
     * Handle user logout
     */
    function handleLogout() {
        console.log('User logged out');
        sessionStorage.removeItem('user');
        // Redirect to homepage
        window.location.href = '/index.html';
    }

    /**
     * Connect with MetaMask
     */
    async function connectMetaMask() {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                alert('MetaMask is not installed. Please install it to use this feature.');
                return;
            }

            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];
            
            console.log('Connected to MetaMask:', address);
            
            // You can either use this address directly or link it with Privy
            // Here's a simple implementation without Privy
            sessionStorage.setItem('user', JSON.stringify({
                walletAddress: address,
                walletType: 'metamask'
            }));
            
            // Redirect to dashboard
            window.location.href = '/dashboard.html';
            
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    }

    /**
     * Connect with WalletConnect
     */
    async function connectWalletConnect() {
        alert('WalletConnect integration requires additional setup. Please use Privy or MetaMask for now.');
        // This would require integrating the WalletConnect library
        // Implementation would depend on your specific requirements
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
            alert('Failed to create wallet. Please try again.');
        }
    }
}); 