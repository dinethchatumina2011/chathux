# 🤖 DCT MINI BOT

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <br>
  <img src="https://img.shields.io/github/stars/yourusername/dct-mini-bot?style=social" alt="GitHub stars"/>
  <img src="https://img.shields.io/github/forks/yourusername/dct-mini-bot?style=social" alt="GitHub forks"/>
</div>

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [🎯 Usage](#-usage)
- [📸 Screenshots](#-screenshots)
- [🔧 Commands](#-commands)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

---

## ✨ Features

<div align="center">
  <img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/assets/features-banner.png" alt="Features Banner" width="800"/>
</div>

### 🎵 **Media Management**
- ✅ Download songs from YouTube
- ✅ Download videos from YouTube
- ✅ TikTok video downloader
- ✅ Facebook video downloader
- ✅ MediaFire file downloader
- ✅ APK download functionality

### 🎬 **Movie Downloads**
- ✅ Cinesubz movie search & download
- ✅ Baiscopes movie search & download

### 🌐 **General Utilities**
- ✅ URL shortener
- ✅ Text-to-speech conversion
- ✅ Weather information
- ✅ Dictionary lookup
- ✅ Translation services

### ⚙️ **Advanced Settings**
- ✅ 22-category interactive settings panel
- ✅ Auto-view status toggle
- ✅ Auto-like functionality
- ✅ Custom emoji reactions
- ✅ Recording preferences

### 👥 **Group Management**
- ✅ Group info display
- ✅ Member management
- ✅ Admin controls
- ✅ Group link management

### 📰 **News & Channels**
- ✅ **Channel Following System** - Follow WhatsApp channels automatically
- ✅ **Auto-Reactions** - React to all messages in followed channels
- ✅ **Channel Info** - Get detailed information about channels
- ✅ **Newsletter Management** - Manage followed newsletters

### 🔧 **Admin Features**
- ✅ Multi-number support
- ✅ Session management
- ✅ Admin panel access
- ✅ Bot statistics

### 🚀 **Performance Optimized**
- ✅ MongoDB connection pooling
- ✅ 5-minute TTL caching
- ✅ Efficient memory usage
- ✅ Fast response times

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- WhatsApp account for bot

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dct-mini-bot.git
   cd dct-mini-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   cp .env.example .env

   # Edit .env with your configuration
   nano .env
   ```

4. **Set up MongoDB**
   ```javascript
   // Make sure MongoDB is running
   // Update MONGO_URI in config.js or .env
   ```

5. **Start the bot**
   ```bash
   npm start
   ```

6. **Access the web interface**
   ```
   http://localhost:8000
   ```

---

## ⚙️ Configuration

### Environment Variables (.env)
```env
MONGO_URI=mongodb://localhost:27017/dctbot
PORT=8000
SESSION_SECRET=your_secret_key
OWNER_NUMBER=94721164497
BOT_NAME=DCT MINI BOT
```

### Config.js Settings
```javascript
module.exports = {
  AUTO_VIEW_STATUS: 'true',
  AUTO_LIKE_STATUS: 'true',
  AUTO_RECORDING: 'true',
  PREFIX: '.',
  MAX_RETRIES: 3,
  BOT_NAME: 'DCT MINI BOT',
  OWNER_NAME: 'DCT MD BOT',
  BOT_VERSION: '1.0.0'
};
```

---

## 🎯 Usage

### 🤖 Bot Setup
1. Start the bot with `npm start`
2. Open `http://localhost:8000` in your browser
3. Scan the QR code with WhatsApp Web
4. Bot is ready to use!

### 📱 Basic Commands
```
.menu          - Show main menu
.help          - Get help
.ping          - Check bot status
.info          - Bot information
```

### 📺 Channel Following
```
.channelfollow <link>    - Follow a WhatsApp channel
.followedchannels        - List followed channels
.unfollowchannel <id>    - Unfollow a channel
.channelinfo <link>      - Get channel information
```

---

## 📸 Screenshots

<div align="center">

### 🏠 Main Menu Interface
<img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/screenshots/menu.png" alt="Main Menu" width="300"/>

### 📱 Mobile Interface
<img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/screenshots/mobile-menu.png" alt="Mobile Menu" width="300"/>

### ⚙️ Settings Panel
<img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/screenshots/settings.png" alt="Settings Panel" width="300"/>

### 📰 Channel Following
<img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/screenshots/channel-follow.png" alt="Channel Following" width="300"/>

### 📊 Admin Dashboard
<img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/screenshots/admin-panel.png" alt="Admin Panel" width="300"/>

</div>

---

## 🔧 Commands

### 🎵 Media Commands
| Command | Description | Example |
|---------|-------------|---------|
| `.song <name>` | Download song from YouTube | `.song Shape of You` |
| `.video <name>` | Download video from YouTube | `.video Funny Cats` |
| `.tiktok <url>` | Download TikTok video | `.tiktok https://tiktok.com/...` |
| `.fb <url>` | Download Facebook video | `.fb https://facebook.com/...` |

### 🎬 Movie Commands
| Command | Description | Example |
|---------|-------------|---------|
| `.cinesubz <movie>` | Search Cinesubz | `.cinesubz Avengers` |
| `.baiscopes <movie>` | Search Baiscopes | `.baiscopes Spider Man` |

### 🌐 General Commands
| Command | Description | Example |
|---------|-------------|---------|
| `.weather <city>` | Get weather info | `.weather Colombo` |
| `.translate <text>` | Translate text | `.translate Hello` |
| `.tts <text>` | Text to speech | `.tts Hello world` |

### 📰 Channel Commands
| Command | Description | Example |
|---------|-------------|---------|
| `.channelfollow <link>` | Follow channel | `.channelfollow https://wa.me/...` |
| `.followedchannels` | List followed channels | `.followedchannels` |
| `.unfollowchannel <id>` | Unfollow channel | `.unfollowchannel 123` |
| `.channelinfo <link>` | Get channel info | `.channelinfo https://wa.me/...` |

### ⚙️ Settings Commands
| Command | Description |
|---------|-------------|
| `.settings` | Open settings panel |
| `.autosettings` | Auto settings menu |
| `.adminsettings` | Admin settings |

---

## 🏗️ Project Structure

```
dct-mini-bot/
├── 📁 assets/           # Images and static files
├── 📁 screenshots/      # Screenshots for README
├── 📄 index.js          # Main server file
├── 📄 pair.js           # WhatsApp bot logic
├── 📄 config.js         # Configuration file
├── 📄 package.json      # Dependencies
├── 📄 README.md         # This file
├── 📄 pair.html         # Web interface
└── 📄 main.html         # Main web page
```

---

## 🤝 Contributing

<div align="center">
  <img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/assets/contributing.png" alt="Contributing" width="600"/>
</div>

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"/>
</div>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

<div align="center">

### 📧 Contact Information
**Owner:** DCT MD BOT  
**WhatsApp:** +94 721 164 497  
**Email:** dctbot@example.com  

### 🌟 Show Your Support
If you find this project helpful, please give it a ⭐ star!

<a href="https://www.buymeacoffee.com/dctbot" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="200"/>
</a>

</div>

---

<div align="center">

## 🙏 Acknowledgments

- **Baileys** - WhatsApp Web API library
- **MongoDB** - Database solution
- **Express.js** - Web framework
- **Node.js** - Runtime environment

---

**Made with ❤️ by DCT Team**

<img src="https://raw.githubusercontent.com/yourusername/dct-mini-bot/main/assets/footer.png" alt="Footer" width="800"/>

</div></content>
<parameter name="filePath">c:\Users\camal\Downloads\dct-nova-main (11)\dct-nova-main\README.md
