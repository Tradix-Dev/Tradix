// Real-time Trading Dashboard
class TradingDashboard {
    constructor() {
        this.tradingFeed = document.getElementById('tradingFeed');
        this.homeContent = document.querySelector('.home-content');
        this.dashboardContent = document.querySelector('.dashboard-content');
        this.tradesContent = document.querySelector('.trades-content');
        this.walletsContent = document.querySelector('.wallets-content');
        this.pnlContent = document.querySelector('.pnl-content');
        this.actions = ['Bought', 'Sold'];
        this.maxTrades = 10;
        this.trades = [];
        this.solanaPrice = 0;
        this.currentView = 'home'; // Track current view
        
        if (this.tradingFeed) {
            this.fetchSolanaPrice();
            this.startTradingFeed();
            
            // Update Solana price every 30 seconds
            setInterval(() => {
                this.fetchSolanaPrice();
            }, 30000);
        }
    }

    showNotification(message, type = 'error', duration = 1500) {
        const container = document.getElementById('notificationContainer');
        const notification = document.getElementById('notification');
        const messageEl = document.getElementById('notificationMessage');
        const closeBtn = document.getElementById('notificationClose');

        if (!container || !notification || !messageEl) return;

        // Set message and type
        messageEl.textContent = message;
        notification.className = `notification ${type}`;

        // Show notification
        notification.classList.add('show');

        // Auto-hide after duration
        const autoHide = setTimeout(() => {
            this.hideNotification();
        }, duration);

        // Close button functionality
        if (closeBtn) {
            closeBtn.onclick = () => {
                clearTimeout(autoHide);
                this.hideNotification();
            };
        }
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.classList.remove('show');
        }
    }

    async fetchSolanaPrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
            const data = await response.json();
            this.solanaPrice = data.solana.usd;
            
            // Update the SOL amount display in header
            const solAmountElement = document.querySelector('.header-solana-amount');
            if (solAmountElement) {
                const solBalance = 0; // This would come from wallet connection
                solAmountElement.textContent = `${solBalance} SOL`;
            }
        } catch (error) {
            console.error('Error fetching Solana price:', error);
            // Fallback price if API fails
            this.solanaPrice = 180;
        }
    }

    generateToken() {
        const tokens = [
            'PURL', 'BIP', 'KORI', 'Course', 'valhalla', 'NIVI', 'fatgirls', 'KibbleCoin', 'Pearl', 'FORK', 'Neko', 'BOBER',
            'BONK', 'WIF', 'POPCAT', 'BOOK', 'MYRO', 'FLOKI', 'DOGE', 'SHIB', 'PEPE', 'MOON', 'CAT', 'DOG', 'BIRD', 'FISH',
            'ROCK', 'STAR', 'SUN', 'MOON', 'EARTH', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO',
            'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'CHERRY', 'LEMON', 'LIME', 'MANGO', 'PINEAPPLE', 'STRAWBERRY',
            'CAR', 'BIKE', 'BOAT', 'PLANE', 'TRAIN', 'BUS', 'TRUCK', 'MOTO', 'SCOOTER', 'HELICOPTER',
            'GAME', 'PLAY', 'FUN', 'HAPPY', 'SMILE', 'LAUGH', 'JOY', 'LOVE', 'HEART', 'SOUL',
            'TECH', 'CODE', 'HACK', 'BUG', 'FIX', 'PATCH', 'UPDATE', 'UPGRADE', 'SYSTEM', 'NETWORK',
            'MUSIC', 'SONG', 'BEAT', 'RHYTHM', 'MELODY', 'HARMONY', 'CHORD', 'NOTE', 'TUNE', 'SOUND',
            'ART', 'PAINT', 'DRAW', 'SKETCH', 'DESIGN', 'CREATE', 'BUILD', 'MAKE', 'FORM', 'SHAPE',
            'SPORT', 'BALL', 'GOAL', 'SCORE', 'WIN', 'LOSE', 'TIE', 'MATCH', 'GAME', 'PLAY',
            'FOOD', 'EAT', 'DRINK', 'COOK', 'BAKE', 'GRILL', 'FRY', 'BOIL', 'STEAM', 'ROAST',
            'NATURE', 'TREE', 'FLOWER', 'GRASS', 'LEAF', 'BUSH', 'PLANT', 'SEED', 'ROOT', 'STEM',
            'SPACE', 'GALAXY', 'UNIVERSE', 'COSMOS', 'NEBULA', 'QUASAR', 'PULSAR', 'BLACKHOLE', 'WORMHOLE', 'TIMEWARP',
            'MAGIC', 'SPELL', 'WIZARD', 'WITCH', 'POTION', 'CRYSTAL', 'GEM', 'JEWEL', 'DIAMOND', 'RUBY',
            'HERO', 'VILLAIN', 'SUPER', 'POWER', 'FORCE', 'ENERGY', 'STRENGTH', 'MIGHT', 'BRAVE', 'BOLD',
            'DREAM', 'SLEEP', 'WAKE', 'REST', 'RELAX', 'CALM', 'PEACE', 'QUIET', 'SILENT', 'STILL',
            'FIRE', 'WATER', 'EARTH', 'AIR', 'WIND', 'STORM', 'RAIN', 'SNOW', 'ICE', 'FROST',
            'LIGHT', 'DARK', 'SHADOW', 'GHOST', 'SPIRIT', 'SOUL', 'MIND', 'BODY', 'HEART', 'BRAIN'
        ];
        
        // 80% chance to use a token, 20% chance to generate a new one
        if (Math.random() < 0.8) {
            return tokens[Math.floor(Math.random() * tokens.length)];
        } else {
            // Generate a new token for variety
            const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
            const vowels = 'AEIOU';
            const numbers = '0123456789';
            
            const length = Math.floor(Math.random() * 3) + 3; // 3-5 letters
            let token = '';
            
            for (let i = 0; i < length; i++) {
                if (i === 0) {
                    token += consonants.charAt(Math.floor(Math.random() * consonants.length));
                } else {
                    const charType = Math.random();
                    if (charType < 0.7) {
                        token += consonants.charAt(Math.floor(Math.random() * consonants.length));
                    } else if (charType < 0.85) {
                        token += vowels.charAt(Math.floor(Math.random() * vowels.length));
                    } else {
                        token += numbers.charAt(Math.floor(Math.random() * numbers.length));
                    }
                }
            }
            
            return token.toUpperCase();
        }
    }

    generateWalletAddress() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let firstPart = '';
        let lastPart = '';
        
        for (let i = 0; i < 4; i++) {
            firstPart += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        for (let i = 0; i < 4; i++) {
            lastPart += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return firstPart + '...' + lastPart;
    }



    createTradeItem() {
        const wallet = this.generateWalletAddress();
        const action = this.actions[Math.floor(Math.random() * this.actions.length)];
        const token = this.generateToken();
        const tokenAmount = (Math.random() * 1000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // Generate SOL amount with realistic distribution
        const rand = Math.random();
        let solAmount;
        if (rand < 0.7) {
            // 70% chance of small amounts (0.05 to 1 SOL)
            solAmount = (Math.random() * 0.95 + 0.05).toFixed(2);
        } else if (rand < 0.95) {
            // 25% chance of medium amounts (1 to 10 SOL)
            solAmount = (Math.random() * 9 + 1).toFixed(2);
        } else {
            // 5% chance of large amounts (10 to 13 SOL)
            solAmount = (Math.random() * 3 + 10).toFixed(2);
        }
        
        // Calculate PnL based on SOL amount and current price
        const pnlValue = (solAmount * this.solanaPrice * (Math.random() * 0.4 + 0.8)).toFixed(2); // 80-120% of SOL value
        
        let pnl;
        if (action === 'Bought') {
            // When buying, it's always negative (spending money)
            pnl = {
                value: `-$${pnlValue}`,
                isPositive: false
            };
        } else {
            // When selling, it can be positive or negative (profit or loss)
            // 60% chance of positive (profit), 40% chance of negative (loss)
            const isPositive = Math.random() > 0.4;
            pnl = {
                value: isPositive ? `+$${pnlValue}` : `-$${pnlValue}`,
                isPositive: isPositive
            };
        }

        const tradeItem = document.createElement('div');
        tradeItem.className = 'trade-item';
        tradeItem.innerHTML = `
            <div class="trade-info">
                <div class="wallet-address">${wallet}</div>
                <div class="trade-action">${action} ${tokenAmount} <span class="trade-token">${token}</span></div>
            </div>
            <div class="trade-right">
                <div class="sol-amount">${solAmount} SOL</div>
                <div class="pnl ${pnl.isPositive ? 'positive' : 'negative'}">${pnl.value}</div>
            </div>
        `;

        return tradeItem;
    }

    addNewTrade() {
        if (!this.tradingFeed) return;
        
        const newTrade = this.createTradeItem();
        this.tradingFeed.insertBefore(newTrade, this.tradingFeed.firstChild);
        
        // Keep only the latest trades
        if (this.tradingFeed.children.length > this.maxTrades) {
            this.tradingFeed.removeChild(this.tradingFeed.lastChild);
        }
    }

    startTradingFeed() {
        // Show loading spinner for 0.4-0.7 seconds, then add 7 trades instantly
        const loadingTime = Math.random() * 300 + 400; // Random time between 400-700ms
        setTimeout(() => {
            // Hide loading spinner
            const loadingSpinner = document.getElementById('loadingSpinner');
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
            
            // Add 7 trades instantly
            for (let i = 0; i < 7; i++) {
                this.addNewTrade();
            }
            
            // Then start adding new trades every 0.2-0.6 seconds
            setInterval(() => {
                this.addNewTrade();
            }, Math.random() * 400 + 200); // Random interval between 0.2-0.6 seconds
        }, loadingTime);
    }

    showHomeView() {
        if (this.homeContent) this.homeContent.style.display = 'block';
        if (this.dashboardContent) this.dashboardContent.style.display = 'none';
        if (this.tradesContent) this.tradesContent.style.display = 'none';
        this.currentView = 'home';
    }

    showDashboardView() {
        if (this.homeContent) this.homeContent.style.display = 'none';
        if (this.dashboardContent) this.dashboardContent.style.display = 'block';
        if (this.tradesContent) this.tradesContent.style.display = 'none';
        this.currentView = 'dashboard';
        this.initDashboard();
        
        // Force setup stop loss after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.setupStopLoss();
        }, 100);
    }

    showTradesView() {
        if (this.homeContent) this.homeContent.style.display = 'none';
        if (this.dashboardContent) this.dashboardContent.style.display = 'none';
        if (this.tradesContent) this.tradesContent.style.display = 'block';
        if (this.walletsContent) this.walletsContent.style.display = 'none';
        if (this.pnlContent) this.pnlContent.style.display = 'none';
        this.currentView = 'trades';
        this.initTrades();
    }

    showWalletsView() {
        if (this.homeContent) this.homeContent.style.display = 'none';
        if (this.dashboardContent) this.dashboardContent.style.display = 'none';
        if (this.tradesContent) this.tradesContent.style.display = 'none';
        if (this.walletsContent) this.walletsContent.style.display = 'block';
        if (this.pnlContent) this.pnlContent.style.display = 'none';
        this.currentView = 'wallets';
        this.initWallets();
    }

    showPnlView() {
        if (this.homeContent) this.homeContent.style.display = 'none';
        if (this.dashboardContent) this.dashboardContent.style.display = 'none';
        if (this.tradesContent) this.tradesContent.style.display = 'none';
        if (this.walletsContent) this.walletsContent.style.display = 'none';
        if (this.pnlContent) this.pnlContent.style.display = 'block';
        this.currentView = 'pnl';
        this.initPnl();
    }

    initDashboard() {
        this.setupCopyTrading();
        this.setupTokenSniping();
        this.setupStopLoss();
        this.loadSavedData();
    }

    initTrades() {
        this.loadActivePositions();
        this.loadTradeHistory();
    }

    initWallets() {
        this.loadWalletBalance();
        this.loadDepositAddress();
        this.loadTraderAllocations();
        this.loadTransactionHistory();
    }

    initPnl() {
        this.loadPnlData();
        this.updatePnlChart();
    }

    setupCopyTrading() {
        const addTraderBtn = document.querySelector('.add-trader-btn');
        const traderAddressInput = document.getElementById('traderAddress');
        const tradersList = document.getElementById('tradersList');

        if (addTraderBtn && traderAddressInput && tradersList) {
            addTraderBtn.addEventListener('click', () => {
                const address = traderAddressInput.value.trim();
                if (address && this.isValidSolanaAddress(address)) {
                    if (this.isDuplicateTrader(address)) {
                        this.showNotification('This trader address is already added', 'error');
                        return;
                    }
                    this.addTrader(address);
                    traderAddressInput.value = '';
                    this.showNotification('Trader added successfully', 'success');
                } else {
                    this.showNotification('Please enter a valid Solana address', 'error');
                }
            });
        }
    }



    setupTokenSniping() {
        const startSnipingBtn = document.querySelector('.start-sniping-btn');
        const stopSnipingBtn = document.querySelector('.stop-sniping-btn');

        if (startSnipingBtn) {
            startSnipingBtn.addEventListener('click', () => {
                this.startSniping();
            });
        }

        if (stopSnipingBtn) {
            stopSnipingBtn.addEventListener('click', () => {
                this.stopSniping();
            });
        }
    }

    setupStopLoss() {
        console.log('setupStopLoss called');
        const autoSellEnabled = document.getElementById('autoSellEnabled');
        const profitMC = document.getElementById('profitMC');
        const profitPercent = document.getElementById('profitPercent');
        const stopLossMC = document.getElementById('stopLossMC');
        const stopLossPercent = document.getElementById('stopLossPercent');
        const sellDelay = document.getElementById('sellDelay');

        console.log('sellDelay element:', sellDelay);
        console.log('autoSellEnabled element:', autoSellEnabled);

        // Force disable sell delay input immediately
        if (sellDelay) {
            console.log('Disabling sell delay input');
            sellDelay.disabled = true;
            sellDelay.setAttribute('readonly', true);
            sellDelay.style.opacity = '0.5';
            sellDelay.style.background = '#1a1a1a';
            sellDelay.style.color = '#666';
            sellDelay.style.cursor = 'not-allowed';
            console.log('Sell delay disabled:', sellDelay.disabled);
        } else {
            console.log('sellDelay element not found!');
        }

        // Setup auto sell toggle functionality
        if (autoSellEnabled && sellDelay) {
            // Always start with auto sell OFF and sell delay greyed out
            autoSellEnabled.checked = false;
            sellDelay.disabled = true;
            sellDelay.style.opacity = '0.5';
            sellDelay.style.background = '#1a1a1a';
            sellDelay.style.color = '#666';
            
            autoSellEnabled.addEventListener('change', () => {
                if (autoSellEnabled.checked) {
                    // Auto sell ON - enable sell delay
                    sellDelay.disabled = false;
                    sellDelay.style.opacity = '1';
                    sellDelay.style.background = '#2A2A2A';
                    sellDelay.style.color = '#fff';
                } else {
                    // Auto sell OFF - grey out sell delay
                    sellDelay.disabled = true;
                    sellDelay.style.opacity = '0.5';
                    sellDelay.style.background = '#1a1a1a';
                    sellDelay.style.color = '#666';
                }
                this.saveStopLossSettings();
            });
        }

        // Add event listeners for auto-save
        [profitMC, profitPercent, stopLossMC, stopLossPercent, sellDelay].forEach(element => {
            if (element) {
                element.addEventListener('input', () => {
                    this.saveStopLossSettings();
                });
            }
        });

        // Setup profit MC/Percent toggle functionality
        if (profitMC && profitPercent) {
            // Initially disable profit percent
            const profitPercentWrapper = document.querySelector('.profit-percent-wrapper');
            if (profitPercentWrapper) {
                profitPercentWrapper.classList.add('disabled');
            }

            profitMC.addEventListener('click', () => {
                document.querySelector('.profit-percent-wrapper').classList.add('disabled');
                document.querySelector('.profit-mc-wrapper').classList.remove('disabled');
                profitMC.focus();
            });

            profitPercent.addEventListener('click', () => {
                document.querySelector('.profit-mc-wrapper').classList.add('disabled');
                document.querySelector('.profit-percent-wrapper').classList.remove('disabled');
                profitPercent.focus();
            });
        }

        // Setup stop loss MC/Percent toggle functionality
        if (stopLossMC && stopLossPercent) {
            // Initially disable stop loss percent
            const stopLossPercentWrapper = document.querySelector('.stop-loss-percent-wrapper');
            if (stopLossPercentWrapper) {
                stopLossPercentWrapper.classList.add('disabled');
            }

            stopLossMC.addEventListener('click', () => {
                document.querySelector('.stop-loss-percent-wrapper').classList.add('disabled');
                document.querySelector('.stop-loss-mc-wrapper').classList.remove('disabled');
                stopLossMC.focus();
            });

            stopLossPercent.addEventListener('click', () => {
                document.querySelector('.stop-loss-mc-wrapper').classList.add('disabled');
                document.querySelector('.stop-loss-percent-wrapper').classList.remove('disabled');
                stopLossPercent.focus();
            });
        }
    }

    saveStopLossSettings() {
        const settings = {
            autoSellEnabled: document.getElementById('autoSellEnabled').checked,
            profitMC: document.getElementById('profitMC').value,
            profitPercent: document.getElementById('profitPercent').value,
            stopLossMC: document.getElementById('stopLossMC').value,
            stopLossPercent: document.getElementById('stopLossPercent').value,
            sellDelay: document.getElementById('sellDelay').value
        };
        
        chrome.storage.local.set({ stopLossSettings: settings }, () => {
            console.log('Stop loss settings saved');
        });
    }

    checkStopLossConditions(token, currentMC, entryMC) {
        const settings = this.getStopLossSettings();
        if (!settings.autoSellEnabled) return false;

        const entryMCValue = parseFloat(entryMC);
        const currentMCValue = parseFloat(currentMC);
        const priceChange = ((currentMCValue - entryMCValue) / entryMCValue) * 100;

        // Check profit target
        if (currentMCValue >= parseFloat(settings.profitMC) || priceChange >= parseFloat(settings.profitPercent)) {
            this.triggerAutoSell(token, 'profit', currentMCValue, priceChange);
            return true;
        }

        // Check stop loss
        if (currentMCValue <= parseFloat(settings.stopLossMC) || priceChange <= -parseFloat(settings.stopLossPercent)) {
            this.triggerAutoSell(token, 'stop_loss', currentMCValue, priceChange);
            return true;
        }

        return false;
    }

    triggerAutoSell(token, reason, currentMC, priceChange) {
        const settings = this.getStopLossSettings();
        const delay = parseInt(settings.sellDelay) * 1000;

        this.showNotification(`Auto-selling ${token} (${reason})`, 'warning');

        setTimeout(() => {
            // Simulate the sell action
            console.log(`Auto-selling ${token} after ${settings.sellDelay} seconds`);
            this.showNotification(`${token} sold automatically`, 'success');
            
            // Here you would implement the actual sell logic
            // this.executeSell(token, currentMC);
        }, delay);
    }

    getStopLossSettings() {
        // This would normally load from storage, but for now return defaults
        return {
            autoSellEnabled: document.getElementById('autoSellEnabled')?.checked || false,
            profitMC: document.getElementById('profitMC')?.value || '1000000',
            profitPercent: document.getElementById('profitPercent')?.value || '50',
            stopLossMC: document.getElementById('stopLossMC')?.value || '500000',
            stopLossPercent: document.getElementById('stopLossPercent')?.value || '20',
            sellDelay: document.getElementById('sellDelay')?.value || '5'
        };
    }

    showSettingsPopup() {
        const overlay = document.getElementById('settingsOverlay');
        if (overlay) {
            overlay.classList.add('show');
            this.loadSettings();
            this.setupSettingsEventListeners();
        }
    }

    hideSettingsPopup() {
        const overlay = document.getElementById('settingsOverlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    setupSettingsEventListeners() {
        const closeBtn = document.getElementById('settingsClose');
        const overlay = document.getElementById('settingsOverlay');
        const passcodeEnabled = document.getElementById('passcodeEnabled');
        const passcodeInputContainer = document.getElementById('passcodeInputContainer');
        const themeButtons = document.querySelectorAll('.theme-btn');
        const viewWalletsBtn = document.getElementById('viewWalletsBtn');
        const exportDataBtn = document.getElementById('exportDataBtn');
        const clearDataBtn = document.getElementById('clearDataBtn');

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideSettingsPopup();
            });
        }

        // Close on overlay click
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hideSettingsPopup();
                }
            });
        }

        // Passcode toggle
        if (passcodeEnabled && passcodeInputContainer) {
            passcodeEnabled.addEventListener('change', () => {
                if (passcodeEnabled.checked) {
                    passcodeInputContainer.style.display = 'block';
                } else {
                    passcodeInputContainer.style.display = 'none';
                }
                this.saveSettings();
            });
        }

        // Theme buttons
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                themeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const theme = button.getAttribute('data-theme');
                this.applyTheme(theme);
                this.saveSettings();
            });
        });

        // View wallets button
        if (viewWalletsBtn) {
            viewWalletsBtn.addEventListener('click', () => {
                this.showWalletsModal();
            });
        }

        // Export data button
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => {
                this.exportData();
            });
        }

        // Clear data button
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                    this.clearAllData();
                }
            });
        }

        // Auto-save for input fields
        const inputs = document.querySelectorAll('#settingsOverlay input[type="number"], #settingsOverlay input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveSettings();
            });
        });

        // Auto-save for toggles
        const toggles = document.querySelectorAll('#settingsOverlay input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                this.saveSettings();
            });
        });
    }

    loadSettings() {
        chrome.storage.local.get(['appSettings'], (result) => {
            const settings = result.appSettings || {};
            
            // Load passcode settings
            const passcodeEnabled = document.getElementById('passcodeEnabled');
            const passcodeInput = document.getElementById('passcodeInput');
            if (passcodeEnabled) {
                passcodeEnabled.checked = settings.passcodeEnabled || false;
                if (passcodeEnabled.checked) {
                    document.getElementById('passcodeInputContainer').style.display = 'block';
                }
            }
            if (passcodeInput) {
                passcodeInput.value = settings.passcode || '';
            }

            // Load theme
            const currentTheme = settings.theme || 'dark';
            const themeButtons = document.querySelectorAll('.theme-btn');
            themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-theme') === currentTheme) {
                    btn.classList.add('active');
                }
            });

            // Load other settings
            const defaultSlippage = document.getElementById('defaultSlippage');
            const defaultSolAmount = document.getElementById('defaultSolAmount');
            const autoConfirmTrades = document.getElementById('autoConfirmTrades');
            const tradeNotifications = document.getElementById('tradeNotifications');
            const priceAlerts = document.getElementById('priceAlerts');

            if (defaultSlippage) defaultSlippage.value = settings.defaultSlippage || '5';
            if (defaultSolAmount) defaultSolAmount.value = settings.defaultSolAmount || '0.1';
            if (autoConfirmTrades) autoConfirmTrades.checked = settings.autoConfirmTrades || false;
            if (tradeNotifications) tradeNotifications.checked = settings.tradeNotifications !== false;
            if (priceAlerts) priceAlerts.checked = settings.priceAlerts || false;
        });
    }

    saveSettings() {
        const settings = {
            passcodeEnabled: document.getElementById('passcodeEnabled').checked,
            passcode: document.getElementById('passcodeInput').value,
            theme: document.querySelector('.theme-btn.active').getAttribute('data-theme'),
            defaultSlippage: document.getElementById('defaultSlippage').value,
            defaultSolAmount: document.getElementById('defaultSolAmount').value,
            autoConfirmTrades: document.getElementById('autoConfirmTrades').checked,
            tradeNotifications: document.getElementById('tradeNotifications').checked,
            priceAlerts: document.getElementById('priceAlerts').checked
        };

        chrome.storage.local.set({ appSettings: settings }, () => {
            console.log('Settings saved');
        });
    }

    applyTheme(theme) {
        // Remove existing theme classes
        document.body.classList.remove('theme-dark', 'theme-blue', 'theme-green', 'theme-purple');
        // Add new theme class
        document.body.classList.add(`theme-${theme}`);
    }

    showWalletsModal() {
        const modal = document.getElementById('walletsModal');
        if (modal) {
            modal.classList.add('show');
            this.loadWallets();
            this.setupWalletsModalEventListeners();
        }
    }

    hideWalletsModal() {
        const modal = document.getElementById('walletsModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    setupWalletsModalEventListeners() {
        const closeBtn = document.getElementById('walletsModalClose');
        const modal = document.getElementById('walletsModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideWalletsModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideWalletsModal();
                }
            });
        }
    }

    loadWallets() {
        const walletsList = document.getElementById('walletsList');
        if (!walletsList) return;

        // Sample wallet data - in real app this would come from storage
        const wallets = [
            {
                name: 'Main Trading Wallet',
                balance: '2.5 SOL',
                publicKey: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
                privateKey: '4dmKkXNHJmuxEz4YvbyQdH9aFyBrEaK8n25XH6MqYyPz'
            },
            {
                name: 'Copy Trading Wallet 1',
                balance: '1.2 SOL',
                publicKey: '9yLYtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV',
                privateKey: '5dmKkXNHJmuxEz4YvbyQdH9aFyBrEaK8n25XH6MqYyPz'
            }
        ];

        if (wallets.length === 0) {
            walletsList.innerHTML = '<div class="no-wallets">No wallets found</div>';
            return;
        }

        walletsList.innerHTML = '';
        wallets.forEach(wallet => {
            this.addWalletItem(wallet);
        });
    }

    addWalletItem(wallet) {
        const walletsList = document.getElementById('walletsList');
        if (!walletsList) return;

        const walletItem = document.createElement('div');
        walletItem.className = 'wallet-item';
        walletItem.innerHTML = `
            <div class="wallet-header">
                <div class="wallet-name">${wallet.name}</div>
                <div class="wallet-balance">${wallet.balance}</div>
            </div>
            <div class="wallet-details">
                <div class="wallet-public-key">${wallet.publicKey}</div>
                <div class="wallet-private-key">${wallet.privateKey}</div>
            </div>
            <div class="wallet-actions">
                <button class="reveal-key-btn">Reveal Private Key</button>
                <button class="copy-key-btn">Copy Public Key</button>
            </div>
        `;

        // Add event listeners
        const revealBtn = walletItem.querySelector('.reveal-key-btn');
        const copyBtn = walletItem.querySelector('.copy-key-btn');
        const privateKey = walletItem.querySelector('.wallet-private-key');

        revealBtn.addEventListener('click', () => {
            if (privateKey.style.display === 'none') {
                privateKey.style.display = 'block';
                revealBtn.textContent = 'Hide Private Key';
                revealBtn.classList.add('revealed');
            } else {
                privateKey.style.display = 'none';
                revealBtn.textContent = 'Reveal Private Key';
                revealBtn.classList.remove('revealed');
            }
        });

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(wallet.publicKey).then(() => {
                this.showNotification('Public key copied to clipboard', 'success');
            });
        });

        walletsList.appendChild(walletItem);
    }

    exportData() {
        chrome.storage.local.get(null, (data) => {
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'tradix-data.json';
            link.click();
            URL.revokeObjectURL(url);
            this.showNotification('Data exported successfully', 'success');
        });
    }

    clearAllData() {
        chrome.storage.local.clear(() => {
            this.showNotification('All data cleared', 'warning');
            // Reload the page or reset the UI
            location.reload();
        });
    }

    // Wallets functionality
    loadWalletBalance() {
        const walletBalance = document.getElementById('walletBalance');
        const balanceValue = document.getElementById('balanceValue');
        
        if (walletBalance && balanceValue) {
            // Load from storage or use default
            chrome.storage.local.get(['walletBalance'], (result) => {
                const balance = result.walletBalance || 0;
                walletBalance.textContent = `${balance.toFixed(2)} SOL`;
                balanceValue.textContent = `$${(balance * this.solanaPrice).toFixed(2)} USD`;
            });
        }
    }

    loadDepositAddress() {
        const depositAddress = document.getElementById('depositAddress');
        const copyAddressBtn = document.getElementById('copyAddressBtn');
        
        if (depositAddress) {
            // Generate or load deposit address
            chrome.storage.local.get(['depositAddress'], (result) => {
                if (result.depositAddress) {
                    depositAddress.textContent = result.depositAddress;
                } else {
                    // Generate a sample address
                    const sampleAddress = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
                    depositAddress.textContent = sampleAddress;
                    chrome.storage.local.set({ depositAddress: sampleAddress });
                }
            });
        }

        if (copyAddressBtn) {
            copyAddressBtn.addEventListener('click', () => {
                const address = depositAddress.textContent;
                navigator.clipboard.writeText(address).then(() => {
                    this.showNotification('Deposit address copied to clipboard', 'success');
                });
            });
        }
    }

    loadTraderAllocations() {
        const traderAllocations = document.getElementById('traderAllocations');
        if (!traderAllocations) return;

        // Load from storage
        chrome.storage.local.get(['traderAllocations'], (result) => {
            const allocations = result.traderAllocations || [];
            
            if (allocations.length === 0) {
                traderAllocations.innerHTML = '<div class="no-allocations">No allocations set</div>';
                return;
            }

            traderAllocations.innerHTML = '';
            allocations.forEach(allocation => {
                this.addAllocationItem(allocation);
            });
        });
    }

    addAllocationItem(allocation) {
        const traderAllocations = document.getElementById('traderAllocations');
        if (!traderAllocations) return;

        const allocationItem = document.createElement('div');
        allocationItem.className = 'allocation-item';
        allocationItem.innerHTML = `
            <div class="allocation-trader">
                <div class="trader-name">${allocation.traderName}</div>
                <div class="trader-address-short">${allocation.address.slice(0, 8)}...${allocation.address.slice(-8)}</div>
            </div>
            <div class="allocation-amount">
                <div class="amount-label">Allocated</div>
                <div class="amount-value">${allocation.amount} SOL</div>
            </div>
        `;

        traderAllocations.appendChild(allocationItem);
    }

    loadTransactionHistory() {
        const transactionHistory = document.getElementById('transactionHistory');
        if (!transactionHistory) return;

        // Load from storage
        chrome.storage.local.get(['transactionHistory'], (result) => {
            const transactions = result.transactionHistory || [];
            
            if (transactions.length === 0) {
                transactionHistory.innerHTML = '<div class="no-transactions">No transactions yet</div>';
                return;
            }

            transactionHistory.innerHTML = '';
            transactions.forEach(transaction => {
                this.addTransactionItem(transaction);
            });
        });
    }

    addTransactionItem(transaction) {
        const transactionHistory = document.getElementById('transactionHistory');
        if (!transactionHistory) return;

        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-type">${transaction.type}</div>
                <div class="transaction-date">${transaction.date}</div>
            </div>
            <div class="transaction-amount">
                <div class="transaction-sol">${transaction.amount} SOL</div>
                <div class="transaction-status status-${transaction.status}">${transaction.status}</div>
            </div>
        `;

        transactionHistory.appendChild(transactionItem);
    }

    // PNL functionality
    loadPnlData() {
        // Load PNL data from storage
        chrome.storage.local.get(['pnlData'], (result) => {
            const pnlData = result.pnlData || {
                overallPnl: 0,
                overallPnlPercent: 0,
                totalTrades: 0,
                winRate: 0,
                avgWin: 0,
                avgLoss: 0
            };

            this.updatePnlDisplay(pnlData);
        });
    }

    updatePnlDisplay(pnlData) {
        const overallPnl = document.getElementById('overallPnl');
        const overallPnlPercent = document.getElementById('overallPnlPercent');
        const totalTrades = document.getElementById('totalTrades');
        const winRate = document.getElementById('winRate');
        const avgWin = document.getElementById('avgWin');
        const avgLoss = document.getElementById('avgLoss');

        if (overallPnl) {
            overallPnl.textContent = `${pnlData.overallPnl >= 0 ? '+' : ''}${pnlData.overallPnl.toFixed(2)} SOL`;
            overallPnl.className = `pnl-amount ${pnlData.overallPnl >= 0 ? '' : 'negative'}`;
        }

        if (overallPnlPercent) {
            overallPnlPercent.textContent = `${pnlData.overallPnlPercent >= 0 ? '+' : ''}${pnlData.overallPnlPercent.toFixed(2)}%`;
        }

        if (totalTrades) totalTrades.textContent = pnlData.totalTrades;
        if (winRate) winRate.textContent = `${pnlData.winRate.toFixed(1)}%`;
        if (avgWin) avgWin.textContent = `${pnlData.avgWin.toFixed(2)} SOL`;
        if (avgLoss) avgLoss.textContent = `${pnlData.avgLoss.toFixed(2)} SOL`;
    }

    updatePnlChart() {
        const canvas = document.getElementById('pnlChart');
        if (!canvas) return;

        // Simple chart implementation
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw a straight line for no trading data
        ctx.strokeStyle = '#44ff44';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Draw a horizontal line in the middle of the chart
        const middleY = height / 2;
        ctx.moveTo(0, middleY);
        ctx.lineTo(width, middleY);
        ctx.stroke();
    }

    isValidSolanaAddress(address) {
        // Basic Solana address validation (44 characters, base58)
        return /^[1-9A-HJ-NP-Za-km-z]{44}$/.test(address);
    }

    isDuplicateTrader(address) {
        const existingTraders = document.querySelectorAll('.trader-address');
        for (let trader of existingTraders) {
            if (trader.textContent === address) {
                return true;
            }
        }
        return false;
    }

    addTrader(address) {
        const tradersList = document.getElementById('tradersList');
        if (!tradersList) return;

        const traderItem = document.createElement('div');
        traderItem.className = 'trader-item';
        traderItem.innerHTML = `
            <div class="trader-main">
                <div class="trader-address">${address}</div>
                <div class="trader-controls">
                    <button class="toggle-trader-btn" data-address="${address}">
                        <span class="toggle-text">Inactive</span>
                    </button>
                    <button class="remove-trader-btn">×</button>
                </div>
            </div>
            
        `;

        // Add event listeners
        const toggleBtn = traderItem.querySelector('.toggle-trader-btn');
        const removeBtn = traderItem.querySelector('.remove-trader-btn');
        const sellButtons = traderItem.querySelectorAll('.sell-btn-small');
        const traderMain = traderItem.querySelector('.trader-main');

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the main click
            this.toggleTrader(toggleBtn, address);
        });

        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the main click
            this.removeTrader(traderItem);
        });

                    // Click on trader main to activate trading settings
            traderMain.addEventListener('click', () => {
                this.activateTradingSettings(address);
            });

        // Setup sell percentage buttons for this trader
        sellButtons.forEach(button => {
            button.addEventListener('click', () => {
                sellButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.saveTraderSettings(address);
            });
        });

        // Add input change listeners for auto-save
        const inputs = traderItem.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveTraderSettings(address);
            });
        });

        tradersList.appendChild(traderItem);
        this.saveTraders();
    }

    removeTrader(traderItem) {
        if (traderItem) {
            const address = traderItem.querySelector('.trader-address').textContent;
            // Remove trader settings from storage
            chrome.storage.local.remove([`trader_${address}`], () => {
                traderItem.remove();
                this.saveTraders();
            });
        }
    }

    toggleTrader(button, address) {
        const isActive = button.classList.contains('active');
        const toggleText = button.querySelector('.toggle-text');
        
        if (isActive) {
            button.classList.remove('active');
            toggleText.textContent = 'Inactive';
            this.showNotification(`Trader ${address.slice(0, 8)}... deactivated`, 'warning');
        } else {
            button.classList.add('active');
            toggleText.textContent = 'Active';
            this.showNotification(`Trader ${address.slice(0, 8)}... activated`, 'success');
        }
        
        this.saveTraderStatus(address, !isActive);
    }

    activateTradingSettings(traderAddress) {
        const selectedTrader = document.querySelector(`[data-address="${traderAddress}"]`).closest('.trader-item');
        const settingsContainer = document.querySelector('.settings-container');
        const stopLossContainer = document.querySelector('.stop-loss-container');
        
        // Check if this trader is already active
        const isCurrentlyActive = selectedTrader.classList.contains('active-trader');
        
        if (isCurrentlyActive) {
            // Deactivate - remove active class from all trader items
            const allTraderItems = document.querySelectorAll('.trader-item');
            allTraderItems.forEach(item => {
                item.classList.remove('active-trader');
            });
            
            // Deactivate trading settings and stop loss sections
            if (settingsContainer) {
                settingsContainer.classList.remove('active');
            }
            if (stopLossContainer) {
                stopLossContainer.classList.remove('active');
            }
            
            // Disable sell delay when no trader is selected
            const sellDelay = document.getElementById('sellDelay');
            if (sellDelay) {
                sellDelay.disabled = true;
                sellDelay.setAttribute('readonly', true);
                sellDelay.style.opacity = '0.5';
                sellDelay.style.background = '#1a1a1a';
                sellDelay.style.color = '#666';
                sellDelay.style.cursor = 'not-allowed';
            }
            
            this.showNotification(`Trader ${traderAddress.slice(0, 8)}... deselected`, 'warning', 1500);
        } else {
            // Activate - remove active class from all other trader items
            const allTraderItems = document.querySelectorAll('.trader-item');
            allTraderItems.forEach(item => {
                item.classList.remove('active-trader');
            });
            
            // Add active class to selected trader
            selectedTrader.classList.add('active-trader');
            
            // Activate trading settings and stop loss sections
            if (settingsContainer) {
                settingsContainer.classList.add('active');
            }
            if (stopLossContainer) {
                stopLossContainer.classList.add('active');
            }
            

            
            // Load trader-specific settings
            this.loadTraderSettings(traderAddress);
            
            this.showNotification(`Trader ${traderAddress.slice(0, 8)}... selected`, 'success', 1500);
        }
    }

    loadTraderSettings(traderAddress) {
        chrome.storage.local.get([`trader_${traderAddress}`], (result) => {
            const settings = result[`trader_${traderAddress}`] || {
                slippage: 5,
                solAmount: 0.1,
                buyAmount: 0.1,
                sellAmount: 100,
                buyDelay: 0,
                sellDelay: 0
            };

            // Update the main trading settings form with trader-specific values
            document.getElementById('slippage').value = settings.slippage;
            document.getElementById('solAmount').value = settings.solAmount;
            document.getElementById('buyAmount').value = settings.buyAmount;
            document.getElementById('buyDelay').value = settings.buyDelay;
            
            // Don't update sell delay value - keep it greyed out until auto sell is enabled
            // document.getElementById('sellDelay').value = settings.sellDelay;

            // Update sell percentage buttons
            const sellButtons = document.querySelectorAll('.sell-btn');
            sellButtons.forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`.sell-btn[data-value="${settings.sellAmount}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        });
    }

    saveTraderSettings(address) {
        const traderItem = document.querySelector(`[data-address="${address}"]`).closest('.trader-item');
        const settings = {
            slippage: traderItem.querySelector('.trader-slippage').value,
            solAmount: traderItem.querySelector('.trader-sol-amount').value,
            buyAmount: traderItem.querySelector('.trader-buy-amount').value,
            sellAmount: traderItem.querySelector('.sell-btn-small.active').getAttribute('data-value'),
            buyDelay: traderItem.querySelector('.trader-buy-delay').value,
            sellDelay: traderItem.querySelector('.trader-sell-delay').value
        };
        
        chrome.storage.local.set({ [`trader_${address}`]: settings }, () => {
            console.log(`Settings saved for trader ${address}`);
        });
    }

    saveTraderStatus(address, isActive) {
        chrome.storage.local.set({ [`trader_status_${address}`]: isActive }, () => {
            console.log(`Status saved for trader ${address}`);
        });
    }

    setDefaultSettings() {
        document.getElementById('slippage').value = '5';
        document.getElementById('solAmount').value = '0.1';
        document.getElementById('buyAmount').value = '0.1';
        document.getElementById('buyDelay').value = '0';
        document.getElementById('sellDelay').value = '0';
        
        // Reset sell percentage buttons
        const sellButtons = document.querySelectorAll('.sell-btn');
        sellButtons.forEach(btn => btn.classList.remove('active'));
        const defaultBtn = document.querySelector('.sell-btn[data-value="100"]');
        if (defaultBtn) {
            defaultBtn.classList.add('active');
        }
        this.selectedSellPercentage = '100';
    }

    saveSettings() {
        // Find the currently active trader
        const activeTrader = document.querySelector('.trader-item.active-trader');
        if (!activeTrader) {
            this.showNotification('Please select a trader first', 'warning');
            return;
        }

        const traderAddress = activeTrader.querySelector('.toggle-trader-btn').getAttribute('data-address');
        const settings = {
            slippage: document.getElementById('slippage').value,
            solAmount: document.getElementById('solAmount').value,
            buyAmount: document.getElementById('buyAmount').value,
            sellAmount: this.selectedSellPercentage || '100',
            buyDelay: document.getElementById('buyDelay').value,
            sellDelay: document.getElementById('sellDelay').value
        };
        
        chrome.storage.local.set({ [`trader_${traderAddress}`]: settings }, () => {
            this.showNotification('Settings saved successfully', 'success');
        });
    }

    startSniping() {
        const keywords = document.getElementById('tokenKeywords').value.trim();
        const interval = document.getElementById('snipeInterval').value;
        
        if (!keywords) {
            this.showNotification('Please enter keywords to snipe', 'warning');
            return;
        }

        this.snipingActive = true;
        this.snipingInterval = setInterval(() => {
            this.checkForNewTokens(keywords);
        }, interval * 1000);

        this.updateSnipingStatus('active', 'Sniping active...');
        document.querySelector('.start-sniping-btn').style.display = 'none';
        document.querySelector('.stop-sniping-btn').style.display = 'block';
        this.showNotification('Token sniping started', 'success');
    }

    stopSniping() {
        this.snipingActive = false;
        if (this.snipingInterval) {
            clearInterval(this.snipingInterval);
        }
        
        this.updateSnipingStatus('inactive', 'Sniping stopped');
        document.querySelector('.start-sniping-btn').style.display = 'block';
        document.querySelector('.stop-sniping-btn').style.display = 'none';
        this.showNotification('Token sniping stopped', 'warning');
    }

    checkForNewTokens(keywords) {
        // Simulate checking for new tokens
        const keywordList = keywords.split(',').map(k => k.trim());
        const randomKeyword = keywordList[Math.floor(Math.random() * keywordList.length)];
        
        // Simulate finding a new token (10% chance)
        if (Math.random() < 0.1) {
            this.snipeToken(randomKeyword);
        }
    }

    snipeToken(keyword) {
        console.log(`Sniping token with keyword: ${keyword}`);
        // Here you would implement the actual token sniping logic
        this.addActiveTrade(keyword, 'buying');
    }

    addActiveTrade(token, status) {
        const activeTrades = document.getElementById('activeTrades');
        if (!activeTrades) return;

        // Remove "no trades" message if it exists
        const noTrades = activeTrades.querySelector('.no-trades');
        if (noTrades) {
            noTrades.remove();
        }

        const tradeItem = document.createElement('div');
        tradeItem.className = 'trade-item-dashboard';
        tradeItem.innerHTML = `
            <div class="trade-info-dashboard">
                <div class="trade-token-dashboard">${token}</div>
                <div class="trade-amount-dashboard">0.1 SOL</div>
            </div>
            <div class="trade-status-dashboard status-${status}">${status}</div>
        `;

        activeTrades.appendChild(tradeItem);
    }

    updateSnipingStatus(status, text) {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        if (statusDot && statusText) {
            statusDot.className = `status-dot ${status}`;
            statusText.textContent = text;
        }
    }

    saveTraders() {
        const traders = [];
        const traderItems = document.querySelectorAll('.trader-item');
        traderItems.forEach(item => {
            const address = item.querySelector('.trader-address').textContent;
            traders.push(address);
        });
        
        chrome.storage.local.set({ traders: traders }, () => {
            console.log('Traders saved');
        });
    }

    loadSavedData() {
        // Load saved traders
        chrome.storage.local.get(['traders', 'stopLossSettings'], (result) => {
            // Clear existing traders list before loading
            const tradersList = document.getElementById('tradersList');
            if (tradersList) {
                tradersList.innerHTML = '';
            }
            
            if (result.traders) {
                result.traders.forEach(address => {
                    this.addTrader(address);
                    this.loadTraderData(address);
                });
            }

            // Load stop loss settings
            if (result.stopLossSettings) {
                document.getElementById('autoSellEnabled').checked = result.stopLossSettings.autoSellEnabled || false;
                document.getElementById('profitMC').value = result.stopLossSettings.profitMC || '1000000';
                document.getElementById('profitPercent').value = result.stopLossSettings.profitPercent || '50';
                document.getElementById('stopLossMC').value = result.stopLossSettings.stopLossMC || '500000';
                document.getElementById('stopLossPercent').value = result.stopLossSettings.stopLossPercent || '20';
                document.getElementById('sellDelay').value = result.stopLossSettings.sellDelay || '5';
            }
        });
    }

    loadTraderData(address) {
        chrome.storage.local.get([`trader_${address}`, `trader_status_${address}`], (result) => {
            const traderItem = document.querySelector(`[data-address="${address}"]`).closest('.trader-item');
            if (!traderItem) return;

            // Load trader status
            const isActive = result[`trader_status_${address}`] !== false; // Default to true
            const toggleBtn = traderItem.querySelector('.toggle-trader-btn');
            const toggleText = toggleBtn.querySelector('.toggle-text');
            
            if (isActive) {
                toggleBtn.classList.add('active');
                toggleText.textContent = 'Active';
            } else {
                toggleBtn.classList.remove('active');
                toggleText.textContent = 'Inactive';
            }

            // Load trader settings
            const settings = result[`trader_${address}`];
            if (settings) {
                traderItem.querySelector('.trader-slippage').value = settings.slippage || '5';
                traderItem.querySelector('.trader-sol-amount').value = settings.solAmount || '0.1';
                traderItem.querySelector('.trader-buy-amount').value = settings.buyAmount || '100';
                traderItem.querySelector('.trader-buy-delay').value = settings.buyDelay || '0';
                traderItem.querySelector('.trader-sell-delay').value = settings.sellDelay || '0';
                
                // Set sell percentage button
                const sellAmount = settings.sellAmount || '100';
                const sellButtons = traderItem.querySelectorAll('.sell-btn-small');
                sellButtons.forEach(btn => btn.classList.remove('active'));
                const activeBtn = traderItem.querySelector(`.sell-btn-small[data-value="${sellAmount}"]`);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
            }
        });
    }

    loadActivePositions() {
        const activePositions = document.getElementById('activePositions');
        if (!activePositions) return;

        // Clear existing positions
        activePositions.innerHTML = '';

        // Load from storage
        chrome.storage.local.get(['activePositions'], (result) => {
            const positions = result.activePositions || [];
            
            if (positions.length === 0) {
                activePositions.innerHTML = '<div class="no-positions">No active positions</div>';
                return;
            }

            positions.forEach(position => {
                this.addActivePosition(position);
            });
        });
    }

    loadTradeHistory() {
        const tradeHistory = document.getElementById('tradeHistory');
        if (!tradeHistory) return;

        // Clear existing history
        tradeHistory.innerHTML = '';

        // Load from storage
        chrome.storage.local.get(['tradeHistory'], (result) => {
            const history = result.tradeHistory || [];
            
            if (history.length === 0) {
                tradeHistory.innerHTML = '<div class="no-history">No trade history</div>';
                return;
            }

            history.forEach(trade => {
                this.addTradeHistory(trade);
            });
        });
    }

    addActivePosition(position) {
        const activePositions = document.getElementById('activePositions');
        if (!activePositions) return;

        // Remove "no positions" message if it exists
        const noPositions = activePositions.querySelector('.no-positions');
        if (noPositions) {
            noPositions.remove();
        }

        const positionItem = document.createElement('div');
        positionItem.className = 'position-item';
        positionItem.innerHTML = `
            <div class="position-info">
                <div class="position-token">${position.token}</div>
                <div class="position-details">
                    <div class="position-mc">
                        <div class="mc-label">Market Cap</div>
                        <div class="mc-value">$${position.marketCap}</div>
                    </div>
                    <div class="position-amount">
                        <div class="amount-label">Amount</div>
                        <div class="amount-value">${position.amount} SOL</div>
                    </div>
                </div>
            </div>
            <div class="position-status status-holding">Holding</div>
        `;

        activePositions.appendChild(positionItem);
    }

    addTradeHistory(trade) {
        const tradeHistory = document.getElementById('tradeHistory');
        if (!tradeHistory) return;

        // Remove "no history" message if it exists
        const noHistory = tradeHistory.querySelector('.no-history');
        if (noHistory) {
            noHistory.remove();
        }

        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-header">
                <div class="history-token">${trade.token}</div>
                <div class="history-date">${trade.date}</div>
            </div>
            <div class="history-trades">
                <div class="trade-entry">
                    <div class="trade-type buy">Buy</div>
                    <div class="trade-details">
                        <div class="trade-mc">
                            <div class="mc-label">MC at Entry</div>
                            <div class="mc-value">$${trade.entryMC}</div>
                        </div>
                        <div class="trade-amount">
                            <div class="amount-label">Amount</div>
                            <div class="amount-value">${trade.entryAmount} SOL</div>
                        </div>
                    </div>
                </div>
                <div class="trade-exit">
                    <div class="trade-type sell">Sell</div>
                    <div class="trade-details">
                        <div class="trade-mc">
                            <div class="mc-label">MC at Exit</div>
                            <div class="mc-value">$${trade.exitMC}</div>
                        </div>
                        <div class="trade-amount">
                            <div class="amount-label">Amount</div>
                            <div class="amount-value">${trade.exitAmount} SOL</div>
                        </div>
                    </div>
                    <div class="trade-pnl ${trade.pnl >= 0 ? 'pnl-positive' : 'pnl-negative'}">
                        ${trade.pnl >= 0 ? '+' : ''}${trade.pnl}%
                    </div>
                </div>
            </div>
        `;

        tradeHistory.appendChild(historyItem);
    }

    // Method to add sample data for testing
    addSampleTradeData() {
        // Sample active positions
        const samplePositions = [
            {
                token: 'PEPE',
                marketCap: '1.2M',
                amount: '0.5'
            },
            {
                token: 'BONK',
                marketCap: '850K',
                amount: '0.3'
            }
        ];

        // Sample trade history
        const sampleHistory = [
            {
                token: 'WIF',
                date: '2024-01-15 14:30',
                entryMC: '500K',
                entryAmount: '0.2',
                exitMC: '750K',
                exitAmount: '0.2',
                pnl: 50
            },
            {
                token: 'MYRO',
                date: '2024-01-14 16:45',
                entryMC: '300K',
                entryAmount: '0.1',
                exitMC: '250K',
                exitAmount: '0.1',
                pnl: -16.7
            }
        ];

        chrome.storage.local.set({
            activePositions: samplePositions,
            tradeHistory: sampleHistory
        }, () => {
            this.loadActivePositions();
            this.loadTradeHistory();
        });
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tradingDashboard = new TradingDashboard();
    
    // Add dashboard button functionality
    const dashboardButton = document.querySelector('.dashboard-button');
    if (dashboardButton) {
        dashboardButton.addEventListener('click', () => {
            tradingDashboard.showDashboardView();
        });
    }
    
    // Add navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Handle navigation based on index
            switch(index) {
                case 0: // Home
                    tradingDashboard.showHomeView();
                    break;
                case 1: // Trades
                    tradingDashboard.showTradesView();
                    break;
                case 2: // Wallets
                    tradingDashboard.showWalletsView();
                    break;
                case 3: // PNL
                    tradingDashboard.showPnlView();
                    break;
            }
        });
    });
    
    // Add click handlers for header icons
    const clockIcon = document.querySelector('.clock-icon');
    const settingsIcon = document.querySelector('.settings-icon');
    const tradixIcon = document.querySelector('.tradix-icon');
    
    if (clockIcon) {
        clockIcon.addEventListener('click', () => {
            // TODO: Handle clock icon click
            console.log('Clock icon clicked');
        });
    }
    
        if (settingsIcon) {
            settingsIcon.addEventListener('click', () => {
                tradingDashboard.showSettingsPopup();
            });
        }
    
    if (tradixIcon) {
        tradixIcon.addEventListener('click', () => {
            window.open('https://x.com/Tradix_0x', '_blank');
        });
    }
});
