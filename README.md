# 🔗 OG Intelligence Hub

> **OpenGradient Ecosystem Analytics Dashboard**  
> 🌐 Live: [https://og-intelligence-hub.vercel.app](https://og-intelligence-hub.vercel.app)

![OG Intelligence Hub Preview](https://og-intelligence-hub.vercel.app/og-preview.png)

---

## 📋 About

**OG Intelligence Hub** is an interactive dashboard for analyzing the OpenGradient ecosystem. The project combines three useful tools in a single interface with tab-based navigation.

### 🎯 Who is this for?

- 🔍 Researchers exploring the OpenGradient ecosystem
- 📊 DeFi analysts looking for profitable liquidity pools
- 🤖 AI developers deploying models in Model Hub
- 🔐 Users who want to check their wallet security

---

## ✨ Features

### 📈 Tab 1: BitQuant DeFi Analytics
| Feature | Description |
|---------|-------------|
| 🏊 Liquidity Pools | Sortable table of pools by TVL, APY, and volume |
| 📊 APY History | Interactive 7-day yield chart |
| 🎨 Risk Visualization | Color-coded indicators: 🟢 low / 🟠 medium / 🔴 high |
| 📥 Export CSV | Download pool data as CSV |

### 🤖 Tab 2: Model Hub Activity Monitor
| Feature | Description |
|---------|-------------|
| 📦 Model Cards | Model cards with metrics: deployments, inferences, status |
| 📈 Weekly Activity | Chart showing inference and TEE-proof activity |
| 🥧 Model Status | Pie chart of active vs. inactive models |
| 🔗 TEE Proofs Table | Recent cryptographic proof transactions |
| 📥 Export CSV | Download model data as CSV |

### 🧠 Tab 3: MemSync Data Viewer
| Feature | Description |
|---------|-------------|
| 📊 Stats Dashboard | Cards: total items, encrypted, storage used, last backup |
| 🔗 Connected Sources | List of connected data sources with sync status |
| 🔐 Encryption Status | Information about TEE encryption |

### 🔍 Wallet Security Checker (Optional)
| Check | Description |
|-------|-------------|
| 💰 ETH Balance | Display ETH balance on Base Sepolia |
| 💰 $OPG Balance | Display $OPG token balance |
| 📊 Transaction Count | Number of transactions (wallet "age" indicator) |
| ⚠️ Risk Score | Simplified risk assessment: new wallet, low balance, etc. |
| 🔔 Security Warnings | Alerts about potential risks |

> ⚠️ **Important: Wallet Security**  
> - Wallet connection is **read-only**  
> - **No transaction signing** or private key access is requested  
> - Uses **public RPC endpoints** (Base Sepolia testnet)  
> - You can **disconnect anytime** with the "Disconnect" button

---

## 🎨 Design & UX

- 🌈 **Animated gradient background** with digital grid overlay
- 🪟 **Glassmorphism cards** with blur effects and neon glow
- 🔄 **Smooth tab transitions** (Framer Motion)
- 📱 **Fully responsive** design for mobile devices
- 🎯 **Square buttons** (border-radius: 2%) matching brand style
- 🕐 **Auto-refresh** every 30 seconds with timestamp indicator

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | JavaScript (React) |
| **Styling** | Tailwind CSS + Custom CSS |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Web3** | Viem (read-only, Base Sepolia) |
| **Hosting** | Vercel (Serverless + Edge) |
| **Version Control** | GitHub |

---

⚠️ Disclaimer
This project is for educational and informational purposes only.
Pool and model data may be inaccurate or outdated
Wallet risk assessment is simplified and does not replace professional auditing
Always do your own research (DYOR) before interacting with any smart contract
This project runs on Base Sepolia testnet — do not use mainnet funds
