/**
 * Enhanced Crypto Price Updater
 * 
 * Provides live price updates, chart visualization, and price change indicators
 * for cryptocurrency cards used in the private brokerage page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize price data
    const cryptoPrices = {
        'BTC': { price: 55000, change: 2.5 },
        'ETH': { price: 3000, change: 1.8 },
        'SOL': { price: 120, change: 5.2 },
        'USDT': { price: 1, change: 0.01 },
        'DOGE': { price: 0.12, change: -3.5 },
        'XRP': { price: 0.5, change: -1.2 }
    };
    
    const exchangeRates = {
        'USD': 1,
        'COP': 3800
    };
    
    // Add mini charts to crypto cards
    function addMiniCharts() {
        const priceElements = document.querySelectorAll('.price[data-crypto]');
        
        priceElements.forEach(element => {
            const crypto = element.getAttribute('data-crypto');
            const change = cryptoPrices[crypto]?.change || 0;
            
            // Add price and change indicator
            const price = cryptoPrices[crypto]?.price || 0;
            element.textContent = `$${price.toLocaleString()}`;
            
            // Add price change indicator
            const changeEl = document.createElement('span');
            changeEl.className = 'price-change ' + (change >= 0 ? 'positive' : 'negative');
            changeEl.textContent = `${change >= 0 ? '+' : ''}${change}%`;
            element.appendChild(changeEl);
            
            // Add class for price direction
            element.classList.add(change >= 0 ? 'increase' : 'decrease');
            
            // Add mini chart
            const miniChart = document.createElement('div');
            miniChart.className = 'mini-chart';
            
            const chartLine = document.createElement('div');
            chartLine.className = 'mini-chart-line ' + (change >= 0 ? 'increase' : 'decrease');
            
            miniChart.appendChild(chartLine);
            element.insertAdjacentElement('afterend', miniChart);
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
    
    // Initialize everything
    function init() {
        addMiniCharts();
        setupCalculators();
        createCryptoTicker();
        simulatePriceUpdates();
        
        // Initial calculation update
        updateAllCalculations();
    }
    
    // Run initialization
    init();
}); 