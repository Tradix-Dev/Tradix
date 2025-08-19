// Tradix - Content Script
// This script is injected into supported Solana trading websites

class TradixContent {
    constructor() {
        this.isActive = false;
        this.settings = {};
        this.initialize();
    }

    initialize() {
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.loadSettings();
        this.createTradixOverlay();
        this.observePageChanges();
        this.listenForMessages();
        
        console.log('Tradix: Content script initialized');
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

    createTradixOverlay() {
        // Create floating Tradix indicator
        const overlay = document.createElement('div');
        overlay.id = 'tradix-overlay';
        overlay.innerHTML = `
            <div class="tradix-indicator">
                <div class="tradix-logo">TRADIX</div>
                <div class="tradix-status" id="tradix-status">Inactive</div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #tradix-overlay {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .tradix-indicator {
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid #333;
                border-radius: 8px;
                padding: 12px 16px;
                color: #ffffff;
                font-size: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            
            .tradix-indicator:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
            }
            
            .tradix-logo {
                font-weight: 700;
                letter-spacing: 1px;
                margin-bottom: 4px;
                color: #ffffff;
            }
            
            .tradix-status {
                font-size: 10px;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .tradix-status.active {
                color: #44ff44;
            }
            
            .tradix-status.monitoring {
                color: #ffff44;
            }
            
            .tradix-trade-notification {
                position: fixed;
                top: 80px;
                right: 20px;
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid #333;
                border-radius: 6px;
                padding: 10px 12px;
                color: #ffffff;
                font-size: 11px;
                z-index: 10001;
                max-width: 200px;
                animation: tradixSlideIn 0.3s ease;
            }
            
            @keyframes tradixSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .tradix-trade-notification.success {
                border-left: 3px solid #44ff44;
            }
            
            .tradix-trade-notification.failed {
                border-left: 3px solid #ff4444;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(overlay);
        
        // Make overlay draggable
        this.makeDraggable(overlay);
    }

    makeDraggable(element) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        element.addEventListener('mousedown', (e) => {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === element || element.contains(e.target)) {
                isDragging = true;
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    observePageChanges() {
        // Monitor for trading-related elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.detectTradingElements();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    detectTradingElements() {
        // Look for common trading interface elements
        const tradingSelectors = [
            '[data-testid*="swap"]',
            '[data-testid*="trade"]',
            '.swap-button',
            '.trade-button',
            'button[class*="swap"]',
            'button[class*="trade"]'
        ];
        
        tradingSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.hasAttribute('data-tradix-monitored')) {
                    element.setAttribute('data-tradix-monitored', 'true');
                    this.monitorTradingElement(element);
                }
            });
        });
    }

    monitorTradingElement(element) {
        // Monitor clicks on trading elements
        element.addEventListener('click', (e) => {
            this.handleTradingAction(e, element);
        });
        
        // Monitor form submissions
        const form = element.closest('form');
        if (form && !form.hasAttribute('data-tradix-monitored')) {
            form.setAttribute('data-tradix-monitored', 'true');
            form.addEventListener('submit', (e) => {
                this.handleTradingAction(e, form);
            });
        }
    }

    handleTradingAction(event, element) {
        if (!this.isActive) return;
        
        // Extract trading information from the page
        const tradeInfo = this.extractTradeInfo(element);
        
        if (tradeInfo) {
            this.showTradeNotification(tradeInfo);
            
            // Send trade info to background script
            chrome.runtime.sendMessage({
                action: 'tradeDetected',
                trade: tradeInfo
            });
        }
    }

    extractTradeInfo(element) {
        // Try to extract trading information from the page
        // This is a simplified version - in reality, you'd need to adapt to each site's structure
        
        const tradeInfo = {
            type: 'UNKNOWN',
            token: 'UNKNOWN',
            amount: 0,
            timestamp: new Date().toISOString()
        };
        
        // Look for amount inputs
        const amountInputs = document.querySelectorAll('input[type="number"], input[placeholder*="amount"], input[placeholder*="Amount"]');
        if (amountInputs.length > 0) {
            const amountInput = amountInputs[0];
            tradeInfo.amount = parseFloat(amountInput.value) || 0;
        }
        
        // Look for token selectors
        const tokenElements = document.querySelectorAll('[data-testid*="token"], .token-selector, .token-symbol');
        if (tokenElements.length > 0) {
            tradeInfo.token = tokenElements[0].textContent || 'UNKNOWN';
        }
        
        // Determine trade type based on button text or context
        const buttonText = element.textContent?.toLowerCase() || '';
        if (buttonText.includes('buy') || buttonText.includes('swap')) {
            tradeInfo.type = 'BUY';
        } else if (buttonText.includes('sell')) {
            tradeInfo.type = 'SELL';
        }
        
        return tradeInfo.amount > 0 ? tradeInfo : null;
    }

    showTradeNotification(tradeInfo) {
        const notification = document.createElement('div');
        notification.className = 'tradix-trade-notification';
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px;">${tradeInfo.type} ${tradeInfo.token}</div>
            <div style="color: #ccc;">${tradeInfo.amount} SOL</div>
            <div style="font-size: 10px; color: #888; margin-top: 4px;">${new Date().toLocaleTimeString()}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'tradixSlideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    listenForMessages() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.action) {
                case 'setActive':
                    this.setActive(message.active);
                    break;
                case 'updateSettings':
                    this.settings = { ...this.settings, ...message.settings };
                    break;
            }
        });
    }

    setActive(active) {
        this.isActive = active;
        const statusElement = document.getElementById('tradix-status');
        
        if (statusElement) {
            statusElement.textContent = active ? 'Active' : 'Inactive';
            statusElement.className = `tradix-status ${active ? 'active' : ''}`;
        }
    }

    updateStatus(status) {
        const statusElement = document.getElementById('tradix-status');
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.className = `tradix-status ${status.toLowerCase()}`;
        }
    }
}

// Initialize content script
const tradixContent = new TradixContent();

// Add slideOut animation to existing styles
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes tradixSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(additionalStyle);
