/**
 * OTC Quote Calculator Script
 * Handles price fetching, calculation, and user interface interactions for OTC trading quotes
 */
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const form = document.getElementById('calculator-form');
    const cryptoSelect = document.getElementById('crypto');
    const cryptoSymbol = document.getElementById('crypto-symbol');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const clearButton = document.getElementById('clear-all');
    const buyRadio = document.getElementById('buy');
    const sellRadio = document.getElementById('sell');
    const buyLabel = document.getElementById('buyLabel');
    const sellLabel = document.getElementById('sellLabel');
    const backToFormButton = document.getElementById('back-to-form');
    
    // Cryptocurrency data mapping
    const cryptoData = {
        'bitcoin': { symbol: 'BTC', name: 'Bitcoin' },
        'ethereum': { symbol: 'ETH', name: 'Ethereum' },
        'solana': { symbol: 'SOL', name: 'Solana' },
        'usd-coin': { symbol: 'USDC', name: 'USD Coin' },
        'tether': { symbol: 'USDT', name: 'Tether' },
        'dogecoin': { symbol: 'DOGE', name: 'Dogecoin' },
        'ripple': { symbol: 'XRP', name: 'Ripple' }
    };
    
    // Currency data mapping
    const currencyData = {
        'usd': { symbol: '$', name: 'USD', fullName: 'US Dollar' },
        'eur': { symbol: '€', name: 'EUR', fullName: 'Euro' },
        'cop': { symbol: 'COP$', name: 'COP', fullName: 'Colombian Peso' }
    };
    
    // Initialize UI state
    initializeUI();
    
    // Event listeners
    setupEventListeners();

    /**
     * Initialize the UI state
     */
    function initializeUI() {
        // Hide result and error divs initially
        resultDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        loadingDiv.style.display = 'none';
        
        // Set initial operation button styles
        updateOperationButtonStyles('buy');
        
        // Set initial crypto symbol
        cryptoSymbol.innerHTML = '<i class="fas fa-coins"></i>';
    }
    
    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Operation button events
        buyRadio.addEventListener('change', () => {
            if (buyRadio.checked) {
                updateOperationButtonStyles('buy');
                document.getElementById('buy-help').style.display = 'inline';
                document.getElementById('sell-help').style.display = 'none';
            }
        });
        
        sellRadio.addEventListener('change', () => {
            if (sellRadio.checked) {
                updateOperationButtonStyles('sell');
                document.getElementById('buy-help').style.display = 'none';
                document.getElementById('sell-help').style.display = 'inline';
            }
        });
        
        // Crypto selection event
        cryptoSelect.addEventListener('change', function() {
            const selectedCrypto = this.value;
            if (selectedCrypto && cryptoData[selectedCrypto]) {
                const symbol = cryptoData[selectedCrypto].symbol;
                cryptoSymbol.innerHTML = `<i class="fas fa-coins"></i> ${symbol}`;
            } else {
                cryptoSymbol.innerHTML = '<i class="fas fa-coins"></i>';
            }
        });
        
        // Clear form button
        clearButton.addEventListener('click', resetForm);
        
        // Form submission
        form.addEventListener('submit', handleFormSubmit);
        
        // Copy quote button
        document.getElementById('copy-quote').addEventListener('click', copyQuoteToClipboard);
        
        // Send quote button (placeholder for now)
        document.getElementById('send-quote').addEventListener('click', function() {
            alert('Your quote will be sent to the email registered with your account. This feature is coming soon!');
        });
        
        // Back to form button
        backToFormButton.addEventListener('click', function() {
            resultDiv.style.display = 'none';
            form.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    /**
     * Update the operation button styles based on selection
     * @param {string} operation - The selected operation ('buy' or 'sell')
     */
    function updateOperationButtonStyles(operation) {
        if (operation === 'buy') {
            buyLabel.style.backgroundColor = '#28a745';
            buyLabel.style.color = 'white';
            sellLabel.style.backgroundColor = '#e9ecef';
            sellLabel.style.color = '#6c757d';
        } else {
            sellLabel.style.backgroundColor = '#dc3545';
            sellLabel.style.color = 'white';
            buyLabel.style.backgroundColor = '#e9ecef';
            buyLabel.style.color = '#6c757d';
        }
    }
    
    /**
     * Reset the form to its initial state
     */
    function resetForm() {
        // Reset form inputs
        form.reset();
        
        // Reset crypto symbol
        cryptoSymbol.innerHTML = '<i class="fas fa-coins"></i>';
        
        // Hide result div
        resultDiv.style.display = 'none';
        
        // Reset operation buttons
        updateOperationButtonStyles('buy');
        
        // Show buy help text, hide sell help text
        document.getElementById('buy-help').style.display = 'inline';
        document.getElementById('sell-help').style.display = 'none';
        
        // Clear all result spans
        const resultSpans = resultDiv.querySelectorAll('span[id^="result-"]');
        resultSpans.forEach(span => {
            span.textContent = '';
        });
        
        // Clear generation date and last updated
        document.getElementById('generation-date').textContent = '';
        document.getElementById('last-updated').textContent = '';
        
        // Hide any error messages
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }
    
    /**
     * Handle form submission
     * @param {Event} e - The form submission event
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Show loading indicator
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        
        try {
            // Get form values
            const operation = document.querySelector('input[name="operation"]:checked').value;
            const crypto = document.getElementById('crypto');
            const cryptoName = crypto.options[crypto.selectedIndex].text;
            const cryptoValue = crypto.value;
            const amount = parseFloat(document.getElementById('amount').value);
            
            // Get the blockchain and wallet address
            const blockchain = document.getElementById('blockchain');
            const blockchainName = blockchain.options[blockchain.selectedIndex].text;
            const walletAddress = document.getElementById('wallet_address').value;
            
            // Get bank information
            const bankName = document.getElementById('bank_name').value;
            const fiat = document.getElementById('fiat');
            const fiatName = fiat.options[fiat.selectedIndex].text;
            const country = document.getElementById('country');
            const countryName = country.options[country.selectedIndex].text;
            const accountOwner = document.getElementById('account_owner').value;
            const ownerId = document.getElementById('owner_id').value;
            const accountNumber = document.getElementById('account_number').value;
            const accountType = document.getElementById('account_type');
            const accountTypeName = accountType.options[accountType.selectedIndex].text;
            
            // Fetch crypto price with retry logic
            let price;
            let attempts = 0;
            const maxAttempts = 3;
            
            while (attempts < maxAttempts) {
                try {
                    price = await fetchCryptoPrice(cryptoValue, fiat.value);
                    break;
                } catch (error) {
                    attempts++;
                    if (attempts === maxAttempts) {
                        throw error;
                    }
                    // Wait before retrying (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
                }
            }
            
            // Apply price adjustment for selling (with a 2% spread)
            if (operation === 'sell') {
                price *= 0.98;
            }
            
            // Calculate total
            const total = amount * price;
            
            // Update result fields
            document.getElementById('result-operation').textContent = operation.toUpperCase();
            document.getElementById('result-asset').textContent = cryptoName;
            document.getElementById('result-blockchain').textContent = blockchainName;
            document.getElementById('result-wallet-address').textContent = walletAddress;
            document.getElementById('result-amount').textContent = `${amount} ${cryptoName.split(' ')[1]}`;
            document.getElementById('result-price').textContent = formatCurrency(price, fiat.value);
            document.getElementById('result-total').textContent = formatCurrency(total, fiat.value);
            
            document.getElementById('result-bank-name').textContent = bankName;
            document.getElementById('result-fiat').textContent = fiatName;
            document.getElementById('result-country').textContent = countryName;
            document.getElementById('result-account-owner').textContent = accountOwner;
            document.getElementById('result-owner-id').textContent = ownerId;
            document.getElementById('result-account-number').textContent = accountNumber;
            document.getElementById('result-account-type').textContent = accountTypeName;
            
            // Set date
            const now = new Date();
            const formattedDate = now.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            document.getElementById('generation-date').textContent = formattedDate;
            document.getElementById('last-updated').textContent = `Last updated: ${formattedDate}`;
            
            // Show result
            loadingDiv.style.display = 'none';
            resultDiv.style.display = 'block';
            
            // Scroll to the result
            resultDiv.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.textContent = `Error: ${error.message || 'Failed to generate quote. Please try again.'}`;
        }
    }
    
    /**
     * Copy the quote details to clipboard
     */
    function copyQuoteToClipboard() {
        try {
            const operation = document.getElementById('result-operation').textContent;
            const asset = document.getElementById('result-asset').textContent;
            const blockchain = document.getElementById('result-blockchain').textContent;
            const walletAddress = document.getElementById('result-wallet-address').textContent;
            const amount = document.getElementById('result-amount').textContent;
            const price = document.getElementById('result-price').textContent;
            const total = document.getElementById('result-total').textContent;
            
            const bankName = document.getElementById('result-bank-name').textContent;
            const fiat = document.getElementById('result-fiat').textContent;
            const country = document.getElementById('result-country').textContent;
            const accountOwner = document.getElementById('result-account-owner').textContent;
            const ownerId = document.getElementById('result-owner-id').textContent;
            const accountNumber = document.getElementById('result-account-number').textContent;
            const accountType = document.getElementById('result-account-type').textContent;
            const date = document.getElementById('generation-date').textContent;
            
            const quoteText = `CONVEXO OTC TRADING QUOTE
            
DIGITAL ASSET
Operation: ${operation}
Digital Asset: ${asset}
Blockchain: ${blockchain}
Wallet Address: ${walletAddress}
Amount: ${amount}
Unit Price: ${price}
Total Price: ${total}

BANK INFORMATION
Bank Name: ${bankName}
Fiat Currency: ${fiat}
Country Bank: ${country}
Account Owner: ${accountOwner}
Owner ID: ${ownerId}
Account Number: ${accountNumber}
Account Type: ${accountType}
Date of Generation: ${date}

For assistance, contact us at: otc@convexo.com`;
            
            navigator.clipboard.writeText(quoteText)
                .then(() => {
                    // Show a success message
                    const copyButton = document.getElementById('copy-quote');
                    const originalText = copyButton.innerHTML;
                    copyButton.innerHTML = '<i class="fas fa-check me-2"></i>Quote Copied!';
                    copyButton.classList.add('btn-success');
                    copyButton.classList.remove('btn-outline-primary');
                    
                    // Reset the button after 2 seconds
                    setTimeout(() => {
                        copyButton.innerHTML = originalText;
                        copyButton.classList.remove('btn-success');
                        copyButton.classList.add('btn-outline-primary');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy quote. Please try again.');
                });
        } catch (error) {
            console.error('Error copying quote:', error);
            alert('Failed to copy quote. Please try again.');
        }
    }
});

/**
 * Format currency based on the provided currency code
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (e.g., 'usd', 'eur')
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency) {
    const currencyMap = {
        'usd': { code: 'USD', locale: 'en-US' },
        'eur': { code: 'EUR', locale: 'de-DE' },
        'cop': { code: 'COP', locale: 'es-CO' }
    };
    
    const currencyInfo = currencyMap[currency] || { code: 'USD', locale: 'en-US' };
    
    return new Intl.NumberFormat(currencyInfo.locale, {
        style: 'currency',
        currency: currencyInfo.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Fetch crypto price from the CoinGecko API
 * @param {string} cryptoId - The cryptocurrency ID in CoinGecko format
 * @param {string} currency - The currency code (e.g., 'usd', 'eur')
 * @returns {Promise<number>} The current price of the cryptocurrency
 */
async function fetchCryptoPrice(cryptoId, currency) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=${currency}`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.error || 
                `Network response error (${response.status}). Please try again later.`
            );
        }
        
        const data = await response.json();
        
        if (!data[cryptoId] || !data[cryptoId][currency]) {
            throw new Error('Price data not available for the selected cryptocurrency and currency.');
        }
        
        return data[cryptoId][currency];
    } catch (error) {
        console.error('Error fetching price:', error);
        throw new Error('Failed to fetch current prices. Please try again later.');
    }
}