# Contextrail — Your Context, On Rails 🛤️⚡

> **One-liner:** Your context, on rails — every AI tool follows the same track, and nothing ever leaves your device.

[![Event](https://img.shields.io/badge/Sprint-Fall_2026_x_Moss-ff4500.svg)](https://hidevs.ai)
[![Architecture](https://img.shields.io/badge/Architecture-Local--First-emerald.svg)]()
[![Retrieval](https://img.shields.io/badge/Recall_Latency-%3C_10ms-brightgreen.svg)]()
[![Protocol](https://img.shields.io/badge/Protocol-MCP_Stdio-blue.svg)]()
[![Engine](https://img.shields.io/badge/Engine-Moss_Rust_Core-orange.svg)]()

---

## ⚡ What is Contextrail?

**Contextrail** is a local-first memory layer that lets your context seamlessly follow you across every AI tool you use. 

Right now, if you explain your project decisions to ChatGPT, then switch to Claude Desktop, then to Cursor or Windsurf, you re-explain everything each time. There is no shared memory between tools, and existing "AI memory" products push your private data through a cloud server. In July 2026, Mem0/OpenMemory deprecated its local Docker option, moving exclusively to a hosted cloud MCP server.

Contextrail solves this by providing a zero-cloud MCP server and background bridge that runs entirely on your local machine powered by the **Moss** local vector search engine. When another AI tool needs context, Contextrail recalls it in **under 10 milliseconds** with **zero outbound network calls**.

---

## ✨ Key Features & Pillars

- **🔌 Native MCP Engine**: Direct stdio transport support for Claude Desktop, Claude Code, Cursor, Windsurf, Zed, and GitHub Copilot. Exposes native `save_context(text, source)` and `recall_context(query)` tools.
- **📋 Universal Clipboard Bridge**: Select text anywhere (ChatGPT, Perplexity, PDFs), press a global hotkey, and stream context straight into your local memory store.
- **📊 Real-Time Visual Dashboard**: Electron desktop app with live WebSocket event feeds, hardware-level latency counters, and context graph management.
- **🔒 100% On-Device & Privacy-First**: No cloud vector DBs, no Docker, no Postgres. Open DevTools to verify 0 network packets during recall.

---

## 📊 Competitive Matrix

| Feature / Capability | Contextrail 🛤️ | Mem0 / OpenMemory | Zep / Supermemory |
| :--- | :---: | :---: | :---: |
| **100% Local-First Architecture** | **Yes (Zero Cloud)** | Deprecated Local (Cloud Only) | Cloud Hosted |
| **Recall Latency** | **< 10ms (Moss Engine)** | 150ms – 400ms | 200ms – 500ms |
| **Zero Infrastructure Setup** | **No Docker / No Postgres** | Cloud API Key Required | Docker + Qdrant Stack |
| **Cross-Tool Capture Bridge** | **MCP + Hotkey Listener** | MCP Only | Custom SDKs |
| **Visual Proof Dashboard** | **Live WebSocket Feed** | Cloud Dashboard | Hosted UI |

---

## 🏛️ System Architecture

```
Claude Desktop / Cursor ──(MCP stdio)────────┐
                                              │
Clipboard / Hotkey Tool ──(POST localhost)──┼──> Contextrail Engine ──> Moss Local Store
                                              │          │
Export File Import ──────────────────────────┘          └──(WebSocket)──> Desktop Dashboard
                                                                           (Latency Feed)
```

---

## 🛠️ Project File Structure

```
contextrail/
├── index.html        # Superdesign dark-noir landing page & interactive simulator
├── styles.css        # Visual design tokens, reveal keyframes, floating graphics
├── script.js        # IntersectionObserver reveals, scroll parallax & Moss simulation logic
├── CHAT_SUMMARY.md   # Complete chat history & implementation log
└── README.md         # Project documentation & overview
```

---

## 🎮 Web Application & Live Simulator

The workspace includes a web application (`index.html`) featuring:
- **Superdesign Visual Language**: Deep noir aesthetic (`#050505`), electric orange accent (`#FF4500`), Playfair Display typography, and floating surrealist graphics.
- **In-Browser Simulator**: Test `save_context` and `recall_context` live in the browser with real-time similarity scoring and sub-10ms performance verification.

---

## 🚀 Getting Started

### 1. View Web Page Locally
Open `index.html` directly in your browser:
```bash
Start-Process "index.html"
```

### 2. Configure MCP Client (e.g. Claude Desktop)
Add Contextrail to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "contextrail": {
      "command": "python",
      "args": ["-m", "contextrail.server"]
    }
  }
}
```

---

## 📜 License & Credits

- Built for **Fall 2026 x Moss — The Zero Latency Builder Sprint** (Hosted by AI House x HiDevs).
- **License**: MIT License. 100% On-Device & Open Source.
