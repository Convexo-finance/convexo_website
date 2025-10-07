/**
 * Enhanced Crypto Price Updater with Real API Integration
 * 
 * Provides live price updates from CoinGecko API and Google for USD/COP conversion
 * with clear visual cards and better contrast for the private brokerage page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize price data with real API integration
    const cryptoPrices = {
        'BTC': { price: 0, change: 0, symbol: 'BTC', name: 'Bitcoin' },
        'ETH': { price: 0, change: 0, symbol: 'ETH', name: 'Ethereum' },
        'SOL': { price: 0, change: 0, symbol: 'SOL', name: 'Solana' },
        'USDT': { price: 0, change: 0, symbol: 'USDT', name: 'Tether' },
        'DOGE': { price: 0, change: 0, symbol: 'DOGE', name: 'Dogecoin' },
        'XRP': { price: 0, change: 0, symbol: 'XRP', name: 'XRP' }
    };
    
    const exchangeRates = {
        'USD': 1,
        'COP': 0 // Will be fetched from Google
    };
    
    // CoinGecko API mapping
    const coinGeckoMapping = {
        'BTC': 'bitcoin',
        'ETH': 'ethereum', 
        'SOL': 'solana',
        'USDT': 'tether',
        'DOGE': 'dogecoin',
        'XRP': 'ripple'
    };
    
    // Fetch real crypto prices from CoinGecko API
    async function fetchCryptoPrices() {
        try {
            const coinIds = Object.values(coinGeckoMapping).join(',');
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&precision=4`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch crypto prices');
            }
            
            const data = await response.json();
            
            // Update our crypto prices with real data
            Object.keys(coinGeckoMapping).forEach(symbol => {
                const coinId = coinGeckoMapping[symbol];
                if (data[coinId]) {
                    cryptoPrices[symbol].price = data[coinId].usd;
                    cryptoPrices[symbol].change = data[coinId].usd_24h_change || 0;
                }
            });
            
            console.log('Crypto prices updated:', cryptoPrices);
            return data;
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
            // Fallback to default prices
            cryptoPrices.BTC.price = 55000;
            cryptoPrices.ETH.price = 3000;
            cryptoPrices.SOL.price = 120;
            cryptoPrices.USDT.price = 1;
            cryptoPrices.DOGE.price = 0.12;
            cryptoPrices.XRP.price = 0.5;
            return null;
        }
    }
    
    // Fetch USD/COP exchange rate from Google (using a free API)
    async function fetchUSDCOP() {
        try {
            // Using exchangerate-api.com as a free alternative
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }
            
            const data = await response.json();
            exchangeRates.COP = data.rates.COP;
            console.log('USD/COP rate updated:', exchangeRates.COP);
            return data.rates.COP;
        } catch (error) {
            console.error('Error fetching USD/COP rate:', error);
            // Fallback to default rate
            exchangeRates.COP = 3800;
            return 3800;
        }
    }
    
    // Create enhanced crypto price cards with better contrast
    function createCryptoPriceCards() {
        const pricingSection = document.querySelector('#pricing');
        if (!pricingSection) return;
        
        // Remove existing ticker if present
        const existingTicker = document.querySelector('.live-prices-ticker');
        if (existingTicker) {
            existingTicker.remove();
        }
        
        // Create crypto cards container
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'crypto-cards-container';
        cardsContainer.innerHTML = `
            <div class="crypto-cards-grid">
                ${Object.keys(cryptoPrices).map(symbol => `
                    <div class="crypto-card" data-crypto="${symbol}">
                        <div class="crypto-card-header">
                            <div class="crypto-icon">
                                <img src="https://assets.coingecko.com/coins/images/${getCoinImageId(symbol)}/small/${getCoinImageName(symbol)}.png" 
                                     alt="${cryptoPrices[symbol].name}" 
                                     onerror="this.src='https://via.placeholder.com/32x32/401777/ffffff?text=${symbol}'">
                            </div>
                            <div class="crypto-info">
                                <h4 class="crypto-symbol">${symbol}</h4>
                                <p class="crypto-name">${cryptoPrices[symbol].name}</p>
                            </div>
                        </div>
                        <div class="crypto-price-section">
                            <div class="price-usd">
                                <span class="price-label">USD</span>
                                <span class="price-value" data-currency="USD">$0.00</span>
                            </div>
                            <div class="price-cop">
                                <span class="price-label">COP</span>
                                <span class="price-value" data-currency="COP">COP 0</span>
                            </div>
                        </div>
                        <div class="crypto-change">
                            <span class="change-indicator" data-change="0">0.00%</span>
                        </div>
                        <div class="crypto-chart">
                            <div class="mini-chart-line"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Insert after section header
        const sectionHeader = pricingSection.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.insertAdjacentElement('afterend', cardsContainer);
        }
    }
    
    // Helper function to get coin image IDs
    function getCoinImageId(symbol) {
        const imageIds = {
            'BTC': '1',
            'ETH': '279', 
            'SOL': '4128',
            'USDT': '325',
            'DOGE': '5',
            'XRP': '44'
        };
        return imageIds[symbol] || '1';
    }
    
    // Helper function to get coin image names
    function getCoinImageName(symbol) {
        const imageNames = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'SOL': 'solana',
            'USDT': 'Tether',
            'DOGE': 'dogecoin',
            'XRP': 'xrp-symbol-white-128'
        };
        return imageNames[symbol] || 'bitcoin';
    }
    
    // Update crypto cards with real data
    function updateCryptoCards() {
        Object.keys(cryptoPrices).forEach(symbol => {
            const card = document.querySelector(`.crypto-card[data-crypto="${symbol}"]`);
            if (!card) return;
            
            const priceData = cryptoPrices[symbol];
            const usdPrice = priceData.price;
            const copPrice = usdPrice * exchangeRates.COP;
            const change = priceData.change;
            
            // Update USD price
            const usdPriceEl = card.querySelector('[data-currency="USD"]');
            if (usdPriceEl) {
                usdPriceEl.textContent = `$${usdPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: usdPrice < 1 ? 6 : 2
                })}`;
            }
            
            // Update COP price
            const copPriceEl = card.querySelector('[data-currency="COP"]');
            if (copPriceEl) {
                copPriceEl.textContent = `COP ${copPrice.toLocaleString('es-CO', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })}`;
            }
            
            // Update change indicator
            const changeEl = card.querySelector('.change-indicator');
            if (changeEl) {
                changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
                changeEl.className = `change-indicator ${change >= 0 ? 'positive' : 'negative'}`;
            }
            
            // Update chart line
            const chartLine = card.querySelector('.mini-chart-line');
            if (chartLine) {
                chartLine.className = `mini-chart-line ${change >= 0 ? 'increase' : 'decrease'}`;
            }
            
            // Add animation class
            card.classList.add('updated');
            setTimeout(() => {
                card.classList.remove('updated');
            }, 1000);
        });
    }
    
    // Update calculation results whenever inputs change
    function setupCalculators() {
        const cryptoInputs = document.querySelectorAll('.crypto-calculator input');
        const currencySelects = document.querySelectorAll('.currency-select');
        
        // Add event listeners
        cryptoInputs.forEach(input => {
            input.addEventListener('input', updateCalculation);
        });
        
        currencySelects.forEach(select => {
            select.addEventListener('change', updateCalculation);
        });
    }
    
    // Simulate live price updates
    function simulatePriceUpdates() {
        const priceElements = document.querySelectorAll('.price[data-crypto]');
        
        // Update one random crypto price every few seconds
        setInterval(() => {
            // Choose a random crypto
            const cryptos = Object.keys(cryptoPrices);
            const randomCrypto = cryptos[Math.floor(Math.random() * cryptos.length)];
            
            // Generate random price change (-1% to +1%)
            const changePercent = (Math.random() * 2 - 1) * 1;
            const currentPrice = cryptoPrices[randomCrypto].price;
            const newPrice = currentPrice * (1 + changePercent / 100);
            
            // Update cumulative change
            cryptoPrices[randomCrypto].change += changePercent;
            cryptoPrices[randomCrypto].price = newPrice;
            
            // Update UI
            updatePriceUI(randomCrypto);
        }, 8000);
        
        // Smaller, more frequent updates for visual effect only
        setInterval(() => {
            const cryptos = Object.keys(cryptoPrices);
            const randomCrypto = cryptos[Math.floor(Math.random() * cryptos.length)];
            
            // Find UI element for this crypto
            const priceEl = document.querySelector(`.price[data-crypto="${randomCrypto}"]`);
            if (priceEl) {
                priceEl.classList.add('refreshing');
                
                setTimeout(() => {
                    priceEl.classList.remove('refreshing');
                }, 1500);
            }
        }, 3000);
    }
    
    // Update UI for specific crypto
    function updatePriceUI(crypto) {
        const priceEl = document.querySelector(`.price[data-crypto="${crypto}"]`);
        if (!priceEl) return;
        
        const price = cryptoPrices[crypto].price;
        const change = cryptoPrices[crypto].change;
        
        // Update price display
        priceEl.textContent = `$${price.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
        
        // Update change indicator
        let changeEl = priceEl.querySelector('.price-change');
        if (!changeEl) {
            changeEl = document.createElement('span');
            changeEl.className = 'price-change';
            priceEl.appendChild(changeEl);
        }
        
        changeEl.className = 'price-change ' + (change >= 0 ? 'positive' : 'negative');
        changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
        
        // Update price direction class
        priceEl.classList.remove('increase', 'decrease');
        priceEl.classList.add(change >= 0 ? 'increase' : 'decrease');
        
        // Update mini chart (just change the class)
        const miniChart = priceEl.nextElementSibling;
        if (miniChart && miniChart.classList.contains('mini-chart')) {
            const chartLine = miniChart.querySelector('.mini-chart-line');
            if (chartLine) {
                chartLine.classList.remove('increase', 'decrease');
                chartLine.classList.add(change >= 0 ? 'increase' : 'decrease');
            }
        }
        
        // Update any active calculations
        updateAllCalculations();
    }
    
    // Update a specific calculation
    function updateCalculation(e) {
        const input = e.target.closest('.calculator-inputs').querySelector('input');
        const select = e.target.closest('.calculator-inputs').querySelector('select');
        const resultElement = e.target.closest('.crypto-calculator').querySelector('.calculator-result');
        
        const crypto = input.getAttribute('data-crypto');
        const amount = parseFloat(input.value) || 0;
        const currency = select.value;
        
        // Get latest price from our data structure
        const priceInUSD = amount * cryptoPrices[crypto].price;
        const priceInCurrency = priceInUSD * exchangeRates[currency];
        
        const currencySymbol = currency === 'USD' ? '$' : currency === 'COP' ? 'COP ' : '';
        const result = `≈ ${currencySymbol}${priceInCurrency.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
        
        // Add animation if result changes
        if (resultElement.textContent !== result) {
            resultElement.classList.add('highlight');
            setTimeout(() => {
                resultElement.classList.remove('highlight');
            }, 1000);
        }
        
        resultElement.textContent = result;
    }
    
    // Update all calculations on the page
    function updateAllCalculations() {
        const calculators = document.querySelectorAll('.crypto-calculator');
        
        calculators.forEach(calculator => {
            const input = calculator.querySelector('input');
            const select = calculator.querySelector('select');
            const resultElement = calculator.querySelector('.calculator-result');
            
            if (!input || !select || !resultElement) return;
            
            const crypto = input.getAttribute('data-crypto');
            const amount = parseFloat(input.value) || 0;
            const currency = select.value;
            
            // Skip if no input value
            if (amount === 0) return;
            
            // Get latest price
            const priceInUSD = amount * cryptoPrices[crypto].price;
            const priceInCurrency = priceInUSD * exchangeRates[currency];
            
            const currencySymbol = currency === 'USD' ? '$' : currency === 'COP' ? 'COP ' : '';
            const result = `≈ ${currencySymbol}${priceInCurrency.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
            
            // Add animation if result changes
            if (resultElement.textContent !== result) {
                resultElement.classList.add('highlight');
                setTimeout(() => {
                    resultElement.classList.remove('highlight');
                }, 1000);
            }
            
            resultElement.textContent = result;
        });
    }
    
    // Create a crypto ticker for the top of the pricing section
    function createCryptoTicker() {
        const cryptoMarquee = document.querySelector('#coinmarketcap-widget-marquee');
        
        // If the CMC widget is there, don't replace it
        if (cryptoMarquee) return;
        
        // Otherwise create our own ticker
        const tickerContainer = document.createElement('div');
        tickerContainer.className = 'live-prices-ticker animate-fade-in-up delay-300';
        
        const scrollWrapper = document.createElement('div');
        scrollWrapper.className = 'prices-scroll';
        
        // Add crypto items
        const cryptos = [
            { symbol: 'BTC', name: 'Bitcoin', img: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
            { symbol: 'ETH', name: 'Ethereum', img: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
            { symbol: 'SOL', name: 'Solana', img: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
            { symbol: 'USDT', name: 'Tether', img: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
            { symbol: 'DOGE', name: 'Dogecoin', img: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
            { symbol: 'XRP', name: 'XRP', img: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' }
        ];
        
        // Create each price item (duplicate to make the animation work)
        const createItems = () => {
            cryptos.forEach(crypto => {
                const price = cryptoPrices[crypto.symbol].price;
                const change = cryptoPrices[crypto.symbol].change;
                
                const item = document.createElement('div');
                item.className = 'price-item';
                
                item.innerHTML = `
                    <img src="${crypto.img}" alt="${crypto.name}">
                    <span class="symbol">${crypto.symbol}</span>
                    <span class="value">$${price.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                    <span class="change ${change >= 0 ? 'positive' : 'negative'}">
                        ${change >= 0 ? '+' : ''}${change.toFixed(2)}%
                    </span>
                `;
                
                scrollWrapper.appendChild(item);
            });
        };
        
        // Create items twice for continuous scrolling
        createItems();
        createItems();
        
        tickerContainer.appendChild(scrollWrapper);
        
        // Find where to insert the ticker
        const sectionHeader = document.querySelector('#pricing .section-header');
        if (sectionHeader) {
            sectionHeader.appendChild(tickerContainer);
        }
    }
    
    // Initialize everything with real API data
    async function init() {
        // Create crypto cards first
        createCryptoPriceCards();
        
        // Fetch real data
        try {
            await Promise.all([
                fetchCryptoPrices(),
                fetchUSDCOP()
            ]);
            
            // Update cards with real data
            updateCryptoCards();
            
            // Set up periodic updates (every 30 seconds)
            setInterval(async () => {
                await fetchCryptoPrices();
                updateCryptoCards();
            }, 30000);
            
        } catch (error) {
            console.error('Error initializing crypto prices:', error);
            // Still show cards with fallback data
            updateCryptoCards();
        }
        
        setupCalculators();
        updateAllCalculations();
    }
    
    // Run initialization
    init();
}); 