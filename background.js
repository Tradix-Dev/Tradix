// Tradix - Background Service Worker
class TradixBackground {
    constructor() {
        this.isMonitoring = false;
        this.monitoringInterval = null;
        this.settings = {
            traderAddress: '',
            copyPercentage: 10,
            maxTradeSize: 0.1,
            autoCopy: false
        };
        
        this.initializeMessageListeners();
        this.loadSettings();
    }

    initializeMessageListeners() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.action) {
                case 'startCopying':
                    this.startMonitoring(message.data);
                    break;
                case 'stopCopying':
                    this.stopMonitoring();
                    break;
                case 'getSettings':
                    sendResponse(this.settings);
                    break;
            }
        });
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get([
                'traderAddress',
                'copyPercentage',
                'maxTradeSize',
                'autoCopy'
            ]);
            
            this.settings = {
                traderAddress: result.traderAddress || '',
                copyPercentage: result.copyPercentage || 10,
                maxTradeSize: result.maxTradeSize || 0.1,
                autoCopy: result.autoCopy || false
            };
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    startMonitoring(data) {
        this.settings = { ...this.settings, ...data };
        this.isMonitoring = true;
        
        // Start monitoring trader's transactions
        this.monitoringInterval = setInterval(() => {
            this.monitorTraderTransactions();
        }, 5000); // Check every 5 seconds
        
        console.log('Tradix: Started monitoring trader transactions');
    }

    stopMonitoring() {
        this.isMonitoring = false;
        
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
        
        console.log('Tradix: Stopped monitoring trader transactions');
    }

    async monitorTraderTransactions() {
        if (!this.settings.traderAddress) {
            return;
        }

        try {
            // In a real implementation, you would:
            // 1. Query Solana blockchain for recent transactions
            // 2. Filter transactions by the trader's address
            // 3. Analyze transaction types (swaps, transfers, etc.)
            // 4. Execute copy trades if auto-copy is enabled
            
            // For demo purposes, we'll simulate finding a trade
            if (Math.random() < 0.1) { // 10% chance to simulate a trade
                this.simulateTradeDetection();
            }
            
        } catch (error) {
            console.error('Error monitoring transactions:', error);
        }
    }

    simulateTradeDetection() {
        const tradeTypes = ['BUY', 'SELL'];
        const tokens = ['SOL', 'USDC', 'RAY', 'SRM'];
        const amounts = [0.1, 0.2, 0.5, 1.0];
        
        const simulatedTrade = {
            type: tradeTypes[Math.floor(Math.random() * tradeTypes.length)],
            token: tokens[Math.floor(Math.random() * tokens.length)],
            amount: amounts[Math.floor(Math.random() * amounts.length)],
            time: new Date().toLocaleTimeString(),
            success: Math.random() > 0.3, // 70% success rate
            traderAddress: this.settings.traderAddress
        };

        // Send trade to popup
        chrome.runtime.sendMessage({
            action: 'tradeExecuted',
            trade: simulatedTrade
        });

        // If auto-copy is enabled, execute the copy trade
        if (this.settings.autoCopy) {
            this.executeCopyTrade(simulatedTrade);
        }
    }

    async executeCopyTrade(originalTrade) {
        try {
            // Calculate copy trade amount based on percentage
            const copyAmount = (originalTrade.amount * this.settings.copyPercentage) / 100;
            
            // Ensure it doesn't exceed max trade size
            const finalAmount = Math.min(copyAmount, this.settings.maxTradeSize);
            
            // In a real implementation, you would:
            // 1. Connect to user's wallet
            // 2. Create and sign the transaction
            // 3. Submit the transaction to Solana network
            // 4. Monitor transaction status
            
            console.log(`Tradix: Executing copy trade - ${originalTrade.type} ${finalAmount} ${originalTrade.token}`);
            
            // Simulate transaction execution
            setTimeout(() => {
                const copyTrade = {
                    type: originalTrade.type,
                    token: originalTrade.token,
                    amount: finalAmount,
                    time: new Date().toLocaleTimeString(),
                    success: Math.random() > 0.2, // 80% success rate for copy trades
                    isCopyTrade: true
                };

                // Send copy trade result to popup
                chrome.runtime.sendMessage({
                    action: 'tradeExecuted',
                    trade: copyTrade
                });
            }, 2000);
            
        } catch (error) {
            console.error('Error executing copy trade:', error);
        }
    }

    // Helper method to validate Solana address
    isValidSolanaAddress(address) {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }

    // Helper method to format SOL amount
    formatSolAmount(lamports) {
        return (lamports / 1000000000).toFixed(9);
    }
}

// Initialize background service worker
const tradixBackground = new TradixBackground();

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Tradix extension installed successfully');
        
        // Set default settings
        chrome.storage.sync.set({
            traderAddress: '',
            copyPercentage: 10,
            maxTradeSize: 0.1,
            autoCopy: false,
            trades: []
        });
    }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('Tradix extension started');
});

// Handle tab updates to inject content scripts
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const supportedSites = [
            'solana.com',
            'raydium.io',
            'jup.ag',
            'birdeye.so'
        ];
        
        const isSupportedSite = supportedSites.some(site => tab.url.includes(site));
        
        if (isSupportedSite) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js']
            });
        }
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup automatically due to manifest configuration
    console.log('Tradix extension icon clicked');
});
