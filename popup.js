// Real-time Trading Dashboard
class TradingDashboard {
    constructor() {
        this.tradingFeed = document.getElementById('tradingFeed');
        this.actions = ['Bought', 'Sold'];
        this.maxTrades = 10;
        this.trades = [];
        this.solanaPrice = 0;
        
        this.fetchSolanaPrice();
        this.startTradingFeed();
        
        // Update Solana price every 30 seconds
        setInterval(() => {
            this.fetchSolanaPrice();
        }, 30000);
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

    generatePNL() {
        const isPositive = Math.random() > 0.5;
        // 70% chance of small amounts ($1-$50), 25% chance of medium ($51-$200), 5% chance of larger ($201-$500)
        const rand = Math.random();
        let maxAmount;
        if (rand < 0.7) {
            maxAmount = 50; // Small trades
        } else if (rand < 0.95) {
            maxAmount = 200; // Medium trades
        } else {
            maxAmount = 500; // Larger trades
        }
        const amount = (Math.random() * maxAmount + 1).toFixed(2);
        return {
            value: isPositive ? `+$${amount}` : `-$${amount}`,
            isPositive: isPositive
        };
    }

    createTradeItem() {
        const wallet = this.generateWalletAddress();
        const action = this.actions[Math.floor(Math.random() * this.actions.length)];
        const token = this.generateRandomToken();
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
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TradingDashboard();
});
