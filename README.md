# Tradix Extension

A powerful Chrome extension for copying trades on the Solana blockchain with a sleek black and white theme.

## Features

- **Wallet Integration**: Connect your Phantom wallet for seamless trading
- **Copy Trading**: Automatically copy trades from successful traders
- **Customizable Settings**: Adjust copy percentage, max trade size, and auto-copy preferences
- **Real-time Monitoring**: Monitor trader transactions in real-time
- **Trade History**: Track your copied trades and success rates
- **Multi-site Support**: Works on popular Solana trading platforms
- **Modern UI**: Clean black and white theme with smooth animations

## Supported Platforms

- Solana Explorer (solana.com)
- Raydium (raydium.io)
- Jupiter (jup.ag)
- Birdeye (birdeye.so)

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `tradix` folder
5. The Tradix extension should now appear in your extensions list

### Method 2: Install from Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "Tradix Solana Copytrader"
3. Click "Add to Chrome"
4. Confirm the installation

## Usage

### Initial Setup

1. **Connect Wallet**: Click the Tradix extension icon and click "Connect Wallet"
2. **Enter Trader Address**: Input the wallet address of the trader you want to copy
3. **Configure Settings**:
   - Set copy percentage (1-100%)
   - Set maximum trade size in SOL
   - Enable/disable auto-copy trades
4. **Start Copying**: Click "Start Copying" to begin monitoring

### Features Overview

#### Wallet Connection
- Supports Phantom wallet integration
- Displays wallet address and balance
- Secure connection with proper permissions

#### Copy Trading Settings
- **Trader Address**: The wallet address of the trader to copy
- **Copy Percentage**: Percentage of the original trade size to copy (1-100%)
- **Max Trade Size**: Maximum SOL amount for any single copy trade
- **Auto-copy**: Automatically execute copy trades without manual confirmation

#### Trade Monitoring
- Real-time monitoring of trader transactions
- Automatic detection of buy/sell orders
- Transaction success/failure tracking
- Trade history with timestamps

#### Statistics
- Total number of copied trades
- Success rate percentage
- Recent trade history
- Performance metrics

## File Structure

```
tradix/
├── manifest.json          # Extension manifest
├── popup.html            # Main popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── content.js            # Content script for websites
├── content.css           # Content script styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Technical Details

### Permissions

- `activeTab`: Access to the current active tab
- `storage`: Store user settings and trade history
- `scripting`: Inject content scripts into supported websites

### Host Permissions

- `https://*.solana.com/*`: Solana Explorer
- `https://*.raydium.io/*`: Raydium DEX
- `https://*.jup.ag/*`: Jupiter aggregator
- `https://*.birdeye.so/*`: Birdeye analytics

### Architecture

- **Manifest V3**: Uses the latest Chrome extension manifest version
- **Service Worker**: Background script for monitoring and trade execution
- **Content Scripts**: Injected into supported trading websites
- **Popup Interface**: User-friendly settings and monitoring interface

## Security Features

- Secure wallet connection through Phantom
- Local storage of sensitive data
- No external API calls for trade execution
- Permission-based access control

## Development

### Prerequisites

- Google Chrome browser
- Basic knowledge of JavaScript and Chrome extensions
- Phantom wallet extension (for testing)

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

**Wallet connection issues**
- Make sure Phantom wallet extension is installed
- Check if wallet is unlocked
- Verify network connection

**Copy trading not working**
- Confirm trader address is correct
- Check if auto-copy is enabled
- Verify sufficient wallet balance

**Content script not injecting**
- Ensure you're on a supported website
- Check host permissions in manifest.json
- Reload the extension

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

This extension is for educational and development purposes. Trading cryptocurrencies involves significant risk. Always do your own research and never invest more than you can afford to lose. The developers are not responsible for any financial losses incurred through the use of this extension.

## Support

For support, please:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information about your problem

## Roadmap

- [ ] Additional wallet support (Solflare, Backpack)
- [ ] Advanced trading strategies
- [ ] Portfolio analytics
- [ ] Social trading features
- [ ] Mobile app companion
- [ ] API integration for more platforms

---

**Tradix** - Empowering Solana traders with intelligent copy trading technology.
