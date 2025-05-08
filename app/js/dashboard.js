document.addEventListener('DOMContentLoaded', async function() {
    // Load configuration
    await window.ConvexoConfig.load();
    const config = window.ConvexoConfig.get();
    
    // Initialize Privy
    const privy = new window.PrivySDK({
        appId: config.privy.appId, // Using config value
    });

    // Initialize WalletConnect Provider (for transaction signing if needed)
    const walletConnectProvider = new WalletConnectProvider.default({
        infuraId: config.blockchain.infuraId, // Using config value
    });

    // Check if user is logged in
    await checkUserAuth();

    // Set up event listeners
    setupEventListeners();

    // Initialize dashboard data
    initDashboard();

    /**
     * Check user authentication
     */
    async function checkUserAuth() {
        // Get user from session storage
        const userJson = sessionStorage.getItem('convexo_user');
        
        if (!userJson) {
            // Redirect to login if no user data
            window.location.href = '/app/login.html?error=' + encodeURIComponent('Your session has expired. Please log in again.');
            return;
        }
        
        try {
            const user = JSON.parse(userJson);
            
            // Display user information
            updateUserInfo(user);
            
            // Verify Privy session (optional)
            try {
                const isAuthenticated = await privy.isAuthenticated();
                if (!isAuthenticated && user.loginMethod !== 'metamask' && user.loginMethod !== 'walletconnect') {
                    console.warn('Privy session expired');
                    // You might want to refresh the token or redirect to login
                    // For now, we'll keep the user logged in based on session storage
                }
            } catch (error) {
                console.error('Error checking Privy auth:', error);
            }
            
        } catch (error) {
            console.error('Error parsing user data:', error);
            window.location.href = '/app/login.html?error=' + encodeURIComponent('Session error. Please log in again.');
        }
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // User dropdown toggle
        const userInfo = document.getElementById('user-info');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        // Make dropdown visible on click instead of hover
        if (userInfo) {
            userInfo.addEventListener('click', function() {
                dropdownMenu.classList.toggle('visible');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!userInfo.contains(event.target) && !dropdownMenu.contains(event.target)) {
                    dropdownMenu.classList.remove('visible');
                }
            });
        }

        // Logout button
        document.getElementById('logout-btn').addEventListener('click', handleLogout);

        // Refresh balance button
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                // Add spinning animation
                this.querySelector('i').classList.add('fa-spin');
                
                // Refresh data
                fetchBalanceData().finally(() => {
                    // Remove spinning animation after 1 second
                    setTimeout(() => {
                        this.querySelector('i').classList.remove('fa-spin');
                    }, 1000);
                });
            });
        }

        // Add funds button
        const addFundsButtons = document.querySelectorAll('.action-button.primary');
        addFundsButtons.forEach(button => {
            if (button.textContent.includes('Add Funds')) {
                button.addEventListener('click', () => {
                    showModal('Add Funds', `
                        <div class="add-funds-options">
                            <div class="option">
                                <i class="fas fa-university"></i>
                                <h3>Bank Transfer</h3>
                                <p>Transfer funds from your bank account</p>
                                <button class="action-button primary">Connect Bank</button>
                            </div>
                            <div class="option">
                                <i class="fas fa-credit-card"></i>
                                <h3>Credit/Debit Card</h3>
                                <p>Add funds with your card</p>
                                <button class="action-button primary">Add Card</button>
                            </div>
                            <div class="option">
                                <i class="fas fa-exchange-alt"></i>
                                <h3>Crypto Transfer</h3>
                                <p>Send crypto from another wallet</p>
                                <button class="action-button primary">Show Address</button>
                            </div>
                        </div>
                    `);
                });
            }
        });

        // Send button
        const sendButton = document.querySelector('.action-button.secondary');
        if (sendButton && sendButton.textContent.includes('Send')) {
            sendButton.addEventListener('click', () => {
                showModal('Send Funds', `
                    <div class="send-form">
                        <div class="form-group">
                            <label for="asset">Asset</label>
                            <select id="asset" class="form-control">
                                <option value="eth">Ethereum (ETH)</option>
                                <option value="usdc">USD Coin (USDC)</option>
                                <option value="matic">Polygon (MATIC)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="recipient">Recipient Address</label>
                            <input type="text" id="recipient" class="form-control" placeholder="0x...">
                        </div>
                        <div class="form-group">
                            <label for="amount">Amount</label>
                            <input type="number" id="amount" class="form-control" placeholder="0.00">
                        </div>
                        <button class="action-button primary full-width">Send</button>
                    </div>
                `);
            });
        }
    }

    /**
     * Show a modal dialog
     * @param {string} title - Modal title
     * @param {string} content - Modal HTML content
     */
    function showModal(title, content) {
        // Remove any existing modal
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
            <h2>${title}</h2>
            <button class="modal-close"><i class="fas fa-times"></i></button>
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = content;
        
        // Assemble modal
        modalContainer.appendChild(modalHeader);
        modalContainer.appendChild(modalContent);
        modalOverlay.appendChild(modalContainer);
        
        // Add modal to the page
        document.body.appendChild(modalOverlay);
        
        // Add event listeners
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        const closeButton = modalContainer.querySelector('.modal-close');
        closeButton.addEventListener('click', closeModal);
        
        // Prevent scrolling on the background
        document.body.style.overflow = 'hidden';
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
                animation: fadeIn 0.3s ease;
            }
            
            .modal-container {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border-radius: var(--border-radius-lg);
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid rgba(255, 249, 239, 0.1);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.25rem 1.5rem;
                border-bottom: 1px solid rgba(255, 249, 239, 0.1);
            }
            
            .modal-header h2 {
                color: var(--accent-color);
                font-size: var(--font-size-xl);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: rgba(255, 249, 239, 0.6);
                font-size: var(--font-size-xl);
                cursor: pointer;
                transition: color 0.2s ease;
            }
            
            .modal-close:hover {
                color: var(--accent-color);
            }
            
            .modal-content {
                padding: 1.5rem;
            }
            
            .form-group {
                margin-bottom: 1.25rem;
            }
            
            label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--accent-color);
                font-size: var(--font-size-small);
            }
            
            .form-control {
                width: 100%;
                padding: 0.75rem;
                border-radius: var(--border-radius-md);
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 249, 239, 0.1);
                color: var(--accent-color);
                font-family: var(--font-family-primary);
                font-size: var(--font-size-base);
            }
            
            .form-control:focus {
                outline: none;
                border-color: rgba(255, 249, 239, 0.3);
            }
            
            .full-width {
                width: 100%;
            }
            
            .add-funds-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 1rem;
            }
            
            .option {
                padding: 1.25rem;
                border-radius: var(--border-radius-md);
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 249, 239, 0.1);
                text-align: center;
                transition: var(--transition-base);
            }
            
            .option:hover {
                transform: translateY(-3px);
                border-color: rgba(255, 249, 239, 0.2);
            }
            
            .option i {
                font-size: 2rem;
                color: var(--accent-color);
                margin-bottom: 1rem;
            }
            
            .option h3 {
                color: var(--accent-color);
                margin-bottom: 0.5rem;
            }
            
            .option p {
                color: rgba(255, 249, 239, 0.7);
                margin-bottom: 1rem;
                font-size: var(--font-size-small);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from {
                    transform: translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .add-funds-options {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
        
        /**
         * Close the modal
         */
        function closeModal() {
            modalOverlay.classList.add('fade-out');
            setTimeout(() => {
                modalOverlay.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }

    /**
     * Initialize dashboard with data
     */
    function initDashboard() {
        // Fetch wallet balance
        fetchBalanceData();
        
        // Fetch assets
        fetchAssets();
        
        // Fetch recent transactions
        fetchTransactions();
    }

    /**
     * Update user info in the UI
     * @param {Object} user - User data
     */
    function updateUserInfo(user) {
        const userNameElement = document.getElementById('user-name');
        
        if (user.email) {
            userNameElement.textContent = user.email;
        } else if (user.walletAddress) {
            userNameElement.textContent = shortenAddress(user.walletAddress);
        } else {
            userNameElement.textContent = 'User';
        }
    }

    /**
     * Handle logout
     */
    async function handleLogout() {
        try {
            // Try to logout from Privy
            await privy.logout();
            
            // Check if we need to disconnect WalletConnect
            const user = JSON.parse(sessionStorage.getItem('convexo_user') || '{}');
            if (user.walletType === 'walletconnect') {
                await walletConnectProvider.disconnect();
            }
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            // Clear session storage
            sessionStorage.removeItem('convexo_user');
            // Redirect to login
            window.location.href = '/app/login.html';
        }
    }

    /**
     * Fetch balance data
     * In a real app, this would call your API
     * @returns {Promise<void>}
     */
    async function fetchBalanceData() {
        // For demo purposes, we're using mock data
        // In a real app, you would fetch this from your backend
        
        return new Promise((resolve) => {
            // Simulate API delay
            setTimeout(() => {
                // Update total balance
                document.getElementById('total-balance').textContent = '$2,450.00';
                
                // Update change percentage with random value between -2% and +5%
                const changePercent = (Math.random() * 7 - 2).toFixed(2);
                const changePercentElement = document.getElementById('balance-change-percentage');
                
                if (parseFloat(changePercent) >= 0) {
                    changePercentElement.textContent = `+${changePercent}%`;
                    changePercentElement.style.color = 'var(--success-color)';
                } else {
                    changePercentElement.textContent = `${changePercent}%`;
                    changePercentElement.style.color = 'var(--error-color)';
                }
                
                // Update asset count
                document.getElementById('asset-count').textContent = '3';
                
                // Update transaction count
                document.getElementById('transaction-count').textContent = '5';
                
                resolve();
            }, 500);
        });
    }

    /**
     * Fetch assets data
     * In a real app, this would call your API
     */
    function fetchAssets() {
        // For demo purposes, we're using mock data
        const mockAssets = [
            {
                id: 'eth',
                name: 'Ethereum',
                symbol: 'ETH',
                balance: '0.342',
                value: '$821.54',
                iconColor: '#627EEA'
            },
            {
                id: 'usdc',
                name: 'USD Coin',
                symbol: 'USDC',
                balance: '1,250.00',
                value: '$1,250.00',
                iconColor: '#2775CA'
            },
            {
                id: 'matic',
                name: 'Polygon',
                symbol: 'MATIC',
                balance: '380.45',
                value: '$378.46',
                iconColor: '#8247E5'
            }
        ];
        
        // Check if we have the assets grid
        const assetsGrid = document.getElementById('assets-grid');
        if (!assetsGrid) return;
        
        // If we have assets, clear the empty state and display them
        if (mockAssets.length > 0) {
            assetsGrid.innerHTML = '';
            
            mockAssets.forEach(asset => {
                const assetCard = document.createElement('div');
                assetCard.className = 'asset-card';
                assetCard.innerHTML = `
                    <div class="asset-icon" style="background-color: ${asset.iconColor}20; color: ${asset.iconColor}">
                        ${asset.symbol.charAt(0)}
                    </div>
                    <div class="asset-name">${asset.name} (${asset.symbol})</div>
                    <div class="asset-balance">${asset.balance} ${asset.symbol}</div>
                    <div class="asset-value">${asset.value}</div>
                `;
                assetsGrid.appendChild(assetCard);
            });
        }
    }

    /**
     * Fetch transactions data
     * In a real app, this would call your API
     */
    function fetchTransactions() {
        // For demo purposes, we're using mock data
        const mockTransactions = [
            {
                id: '1',
                type: 'received',
                title: 'Received ETH',
                description: 'From: 0x1a2b...3c4d',
                amount: '+0.1 ETH',
                value: '+$240.50',
                date: '2023-05-15T14:30:00Z'
            },
            {
                id: '2',
                type: 'sent',
                title: 'Sent USDC',
                description: 'To: 0x5e6f...7g8h',
                amount: '-250 USDC',
                value: '-$250.00',
                date: '2023-05-14T09:15:00Z'
            },
            {
                id: '3',
                type: 'received',
                title: 'Received MATIC',
                description: 'From: 0x9i0j...1k2l',
                amount: '+180 MATIC',
                value: '+$178.20',
                date: '2023-05-12T11:45:00Z'
            }
        ];
        
        // Check if we have the transactions list
        const transactionsList = document.getElementById('transactions-list');
        if (!transactionsList) return;
        
        // If we have transactions, clear the empty state and display them
        if (mockTransactions.length > 0) {
            transactionsList.innerHTML = '';
            
            mockTransactions.forEach(tx => {
                const txItem = document.createElement('div');
                txItem.className = 'transaction-item';
                
                const formattedDate = new Date(tx.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                
                txItem.innerHTML = `
                    <div class="transaction-icon ${tx.type}">
                        <i class="fas fa-${tx.type === 'received' ? 'arrow-down' : 'arrow-up'}"></i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-title">${tx.title}</div>
                        <div class="transaction-date">${formattedDate}</div>
                    </div>
                    <div class="transaction-amount ${tx.type}">${tx.value}</div>
                `;
                
                transactionsList.appendChild(txItem);
            });
        }
    }

    /**
     * Utility: Shorten wallet address for display
     * @param {string} address - Wallet address
     * @returns {string} - Shortened address
     */
    function shortenAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
}); 