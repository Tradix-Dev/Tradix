# Tradix Extension

A powerful Chrome extension for copying trades on the Solana blockchain with a sleek black and white theme.

## Features

- **Copy Trading**: Automatically copy trades from successful traders
- **Customizable Settings**: Adjust copy percentage, max trade size, and auto-copy preferences
- **Real-time Monitoring**: Monitor trader transactions in real-time
- **Trade History**: Track your copied trades and success rates
- **Modern UI**: Clean dark/light theme with smooth animations
- **Live Trading Feed**: Real-time trading activity display with CoinGecko price data
- **Portfolio Management**: Track positions and P&L
- **Stop Loss Management**: Automated risk management
- **Light/Dark Theme**: Toggle between light and dark themes
- **Support System**: Direct contact support with redirect to official support page

## Extension Overview

Tradix is a powerful Chrome extension for automated Solana copy trading. It provides a comprehensive UI for managing copy trading settings, monitoring trades, and tracking performance metrics with real-time data and advanced risk management features.

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `tradix` folder
5. The Tradix extension should now appear in your extensions list

### Method 2: Install from Chrome Web Store

1. Visit the Chrome Web Store
2. Search for "Tradix Solana Copytrader"
3. Click "Add to Chrome"
4. Confirm the installation

## Usage

### Initial Setup

1. **Enter Trader Address**: Input the wallet address of the trader you want to copy
2. **Configure Settings**:
   - Set copy percentage (1-100%)
   - Set maximum trade size in SOL
   - Enable/disable auto-copy trades
3. **Start Copying**: Click "Start Copying" to begin monitoring

### Features Overview

#### Copy Trading
- Automatically copy trades from successful traders
- Real-time trade monitoring and execution
- Advanced risk management and position sizing
- Comprehensive trade history and analytics

#### Copy Trading Settings
- **Trader Address**: The wallet address of the trader to copy
- **Copy Percentage**: Percentage of the original trade size to copy (1-100%)
- **Max Trade Size**: Maximum SOL amount for any single copy trade
- **Auto-copy**: Automatically execute copy trades without manual confirmation

#### Theme System
- **Light/Dark Mode**: Toggle between light and dark themes
- **Persistent Settings**: Theme preference saved across sessions
- **Smooth Transitions**: Animated theme switching

#### Support System
- **Contact Support**: Direct contact button redirects to official support page
- **Email Support**: Direct email contact through extension
- **Help Documentation**: Comprehensive help system

#### Trade Monitoring
- Real-time monitoring of trader transactions
- Buy/sell order detection and execution
- Transaction success/failure tracking
- Trade history with timestamps

#### Statistics
- Total number of copied trades
- Success rate percentage
- Recent trade history
- Performance metrics

#### Live Trading Feed
- Real-time trading activity display
- Token price updates via CoinGecko API
- Live trading volume and market data

#### Withdraw System
- SOL withdrawal functionality
- Address validation and amount limits
- Balance checking and minimum withdrawal enforcement

## File Structure

```
tradix/
├── manifest.json          # Extension manifest
├── popup.html            # Main popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── background.js         # Background service worker

├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── src/                  # Source utilities
│   └── utils/
│       └── trading-engine.js
├── config/               # Configuration files
│   └── trading-config.json
├── SECURITY.md           # Security documentation
├── LICENSE               # MIT License
└── README.md             # This file
```

## Technical Details

### Permissions

- `storage`: Store user settings, trader data, and trade history locally using Chrome Storage API



### External APIs

- **CoinGecko API**: Used for real-time Solana price data
  - Endpoint: `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
  - Purpose: Display current SOL price in the extension

### Architecture

- **Manifest V3**: Uses the latest Chrome extension manifest version
- **Service Worker**: Background script for monitoring and trade execution
- **Popup Interface**: User-friendly settings and monitoring interface
- **Local Storage**: Secure storage of user preferences and trade data
- **Theme System**: Dynamic theme switching with persistent preferences
- **Support System**: Integrated contact support with official support page redirect

## Security Features

- Local storage of sensitive data using Chrome Storage API
- Secure external API integration for price data
- Permission-based access control (only storage permission required)
- Content Security Policy compliance
- Secure message passing between components
- Optional passcode protection for settings
- Advanced wallet security and private key protection


## Development

### Prerequisites

- Google Chrome browser
- Basic knowledge of JavaScript and Chrome extensions

### Local Development

1. Clone the repository
2. Make your changes to the code
3. Load the extension in Chrome using "Load unpacked"
4. Test your changes
5. Reload the extension to see updates

### Building for Production

1. Create icon files in the `icons/` directory
2. Update version number in `manifest.json`
3. Test thoroughly on supported platforms
4. Package for Chrome Web Store submission

## Troubleshooting

### Common Issues

**Extension not loading**
- Ensure all files are in the correct directory structure
- Check Chrome's developer console for errors
- Verify manifest.json syntax



**Copy trading not working**
- Confirm trader address is correct
- Check if auto-copy is enabled
- Verify sufficient wallet balance



**Price data not updating**
- Check internet connection
- Verify CoinGecko API is accessible
- Check browser console for API errors

### Debug Mode

Enable debug logging by opening Chrome DevTools:
1. Right-click the extension icon
2. Select "Inspect popup"
3. Check the console for debug information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

Trading cryptocurrencies involves significant risk. Always do your own research and never invest more than you can afford to lose. The developers are not responsible for any financial losses incurred through the use of this extension. Past performance does not guarantee future results.

## Support

For support, please:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information about your problem

---

**Tradix** - Empowering Solana traders with intelligent copy trading technology.
