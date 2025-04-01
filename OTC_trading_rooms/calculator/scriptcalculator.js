        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('calculator-form');
            const cryptoSelect = document.getElementById('crypto');
            const cryptoSymbol = document.getElementById('crypto-symbol');
            const resultDiv = document.getElementById('result');
            const loadingDiv = document.getElementById('loading');
            const errorDiv = document.getElementById('error');
            const clearButton = document.getElementById('clear-all');
            
            // Hide result div by default
            resultDiv.style.display = 'none';

            // Get button elements
            const buyRadio = document.getElementById('buy');
            const sellRadio = document.getElementById('sell');
            const buyLabel = document.getElementById('buyLabel');
            const sellLabel = document.getElementById('sellLabel');
            
            // Set initial state (BUY selected)
            buyLabel.style.backgroundColor = '#28a745';
            buyLabel.style.color = 'white';
            sellLabel.style.backgroundColor = '#e9ecef';
            sellLabel.style.color = '#6c757d';
            
            // Add event listeners
            buyRadio.addEventListener('click', function() {
                buyLabel.style.backgroundColor = '#28a745';
                buyLabel.style.color = 'white';
                sellLabel.style.backgroundColor = '#e9ecef';
                sellLabel.style.color = '#6c757d';
            });
            
            sellRadio.addEventListener('click', function() {
                sellLabel.style.backgroundColor = '#dc3545';
                sellLabel.style.color = 'white';
                buyLabel.style.backgroundColor = '#e9ecef';
                buyLabel.style.color = '#6c757d';
            });
            
            // Clear All Data functionality
            clearButton.addEventListener('click', function() {
                // Clear form inputs
                form.reset();
                
                // Reset crypto symbol to default
                cryptoSymbol.textContent = 'BTC';
                
                // Hide result div
                resultDiv.style.display = 'none';
                
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
                
                // Reset button styles
                resetButtonStyles();
            });
            
            // Update crypto symbol when selection changes
            cryptoSelect.addEventListener('change', function() {
                const cryptoMap = {
                    'bitcoin': 'BTC',
                    'ethereum': 'ETH',
                    'solana': 'SOL',
                    'usd-coin': 'USDC'
                };
                cryptoSymbol.textContent = cryptoMap[this.value] || 'CRYPTO';
            });
            
            // Ensure BUY/SELL buttons are properly styled on load
            resetButtonStyles();

            // Form submission handler
            form.addEventListener('submit', async function(e) {
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
                    
                    // Fetch crypto price
                    let price;
                    if (operation === 'buy') {
                        price = await fetchCryptoPrice(cryptoValue, fiat.value);
                    } else if (operation === 'sell') {
                        price = await fetchCryptoPrice(cryptoValue, fiat.value);
                        price *= 0.98; // Apply a 2% spread for selling
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
                    document.getElementById('generation-date').textContent = now.toLocaleString();
                    document.getElementById('last-updated').textContent = `Last updated: ${now.toLocaleString()}`;
                    
                    // Show result
                    resultDiv.style.display = 'block';
                    loadingDiv.style.display = 'none';
                    
                    // Scroll to the result
                    resultDiv.scrollIntoView({ behavior: 'smooth' });
                    
                } catch (error) {
                    loadingDiv.style.display = 'none';
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = `Error: ${error.message}`;
                }
            });

            // Copy quote functionality
            document.getElementById('copy-quote').addEventListener('click', function() {
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
                
                const quoteText = `QUOTE RESULT
                
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
Date of Generation: ${date}`;
                
                navigator.clipboard.writeText(quoteText)
                    .then(() => {
                        alert('Quote copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        alert('Failed to copy quote. Please try again.');
                    });
            });
            
            // Send quote functionality (placeholder)
            document.getElementById('send-quote').addEventListener('click', function() {
                alert('Quote would be sent to your email. This feature is coming soon!');
            });

            // Add this line to set up the operation buttons
            setupOperationButtons();
        });

        // Format currency helper
        function formatCurrency(amount, currency) {
            const currencyMap = {
                'usd': 'USD',
                'eur': 'EUR',
                'cop': 'COP'
            };
            
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currencyMap[currency] || 'USD',
                minimumFractionDigits: 2
            }).format(amount);
        }

        // Fetch crypto price helper
        async function fetchCryptoPrice(cryptoId, currency) {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=${currency}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                
                if (!data[cryptoId] || !data[cryptoId][currency]) {
                    throw new Error('Price data not available');
                }
                
                return data[cryptoId][currency];
            } catch (error) {
                console.error('Error fetching price:', error);
                throw new Error('Failed to fetch current prices. Please try again later.');
            }
        }

        // Reset button styles
        function resetButtonStyles() {
            const buyRadio = document.getElementById('buy');
            const sellRadio = document.getElementById('sell');
            const buyLabel = document.querySelector('label[for="buy"]');
            const sellLabel = document.querySelector('label[for="sell"]');
            
            // Initial state - reset to default
            if (buyLabel && sellLabel) {
                // Default state - BUY selected
                buyLabel.style.backgroundColor = '#28a745';
                buyLabel.style.color = 'white';
                sellLabel.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
                sellLabel.style.color = '#6c757d';
                
                // Event listeners for radio buttons
                buyRadio.addEventListener('change', function() {
                    if (this.checked) {
                        buyLabel.style.backgroundColor = '#28a745';
                        buyLabel.style.color = 'white';
                        sellLabel.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
                        sellLabel.style.color = '#6c757d';
                    }
                });
                
                sellRadio.addEventListener('change', function() {
                    if (this.checked) {
                        sellLabel.style.backgroundColor = '#dc3545';
                        sellLabel.style.color = 'white';
                        buyLabel.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
                        buyLabel.style.color = '#6c757d';
                    }
                });
            }
        }

        // Add this function at the end of your script
        function setupOperationButtons() {
            const buyRadio = document.getElementById('buy');
            const sellRadio = document.getElementById('sell');
            const buyLabel = document.querySelector('label[for="buy"]');
            const sellLabel = document.querySelector('label[for="sell"]');

            // Function to update button styles
            function updateButtonStyles(selectedOperation) {
                if (selectedOperation === 'buy') {
                    buyLabel.style.backgroundColor = '#28a745';
                    buyLabel.style.color = 'white';
                    sellLabel.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
                    sellLabel.style.color = '#6c757d';
                } else {
                    sellLabel.style.backgroundColor = '#dc3545';
                    sellLabel.style.color = 'white';
                    buyLabel.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
                    buyLabel.style.color = '#6c757d';
                }
            }

            // Initial setup - BUY selected by default
            updateButtonStyles('buy');

            // Add event listeners
            buyRadio.addEventListener('change', function() {
                if (this.checked) {
                    updateButtonStyles('buy');
                }
            });

            sellRadio.addEventListener('change', function() {
                if (this.checked) {
                    updateButtonStyles('sell');
                }
            });
        }