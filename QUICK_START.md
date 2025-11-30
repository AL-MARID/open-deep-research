# Quick Start Guide

## Prerequisites

1. **Node.js 20+**
2. **Ollama** installed with account authentication for cloud AI models

## Installation & Setup

### Step 1: Install Ollama

#### Linux & macOS

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### Windows

Download and install from https://ollama.com/download/windows

### Step 2: Setup & Login

#### Initial Setup & Authentication

**Start Ollama Server**

```bash
# Terminal 1 - Start the server
ollama serve
```

**Device Pairing & Login**

```bash
# Terminal 2 - Sign in to your Ollama account
ollama signin
```

**Follow these steps after running the command:**

1. You'll receive a unique authentication URL
2. Open the URL in your browser
3. You'll see: "Connect device - This device will be paired with your account"
4. Click the "Connect" button
5. Return to terminal - authentication complete!

### Step 3: Project Setup

1. **Clone the repository:**

```bash
git clone https://github.com/AL-MARID/open-deep-research
cd open-deep-research
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Build the project:**

```bash
pnpm build
```

4. **Start the app:**

```bash
pnpm start
```

Open `localhost:3000` in your browser.

## Features Overview

### Core Capabilities

- **Web Search**: Uses DuckDuckGo for comprehensive search results
- **AI Processing**: All AI processing done via Ollama cloud models
- **Local File Support**: Upload and analyze TXT, PDF, DOCX files
- **Knowledge Base**: Save and access reports locally
- **Export Options**: PDF, Word, Text downloads

## Configuration

Edit the configuration file to:

- Enable or disable specific cloud models
- Adjust search settings and behavior
- Customize export options and UI preferences
- Configure knowledge base functionality

## Troubleshooting

### Common Issues

**Ollama Connection**
- Make sure Ollama is running with `ollama serve`

**Authentication**
- Verify your Ollama account is properly connected

**Cloud Models**
- All models are cloud-based, no local downloads needed

**Search Problems**
- DuckDuckGo search should work automatically

**Application Won't Start**
- Check Node.js version (20+) and try reinstalling dependencies

**Port Conflicts**
- Default port is 3000, make sure it's available

## Need Help?

- Read the full [README.md](README.md) for details
- Check [lib/config.ts](lib/config.ts) to modify settings
- Make sure Ollama is logged in

---

**Ready to go! Run `pnpm start` and visit `localhost:3000`**
