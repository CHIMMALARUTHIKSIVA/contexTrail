// 1. Reveal Elements on Scroll using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('py-4', 'bg-[#050505]/90', 'backdrop-blur-md', 'border-b', 'border-white/10', 'shadow-2xl');
                nav.classList.remove('py-8', 'bg-transparent');
            } else {
                nav.classList.remove('py-4', 'bg-[#050505]/90', 'backdrop-blur-md', 'border-b', 'border-white/10', 'shadow-2xl');
                nav.classList.add('py-8', 'bg-transparent');
            }
        });
    }

    // 3. Parallax Scroll Calculations
    const heroWrapper = document.getElementById('hero-content-wrapper');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Parallax cards movement
        document.querySelectorAll('.parallax-card-up').forEach(el => {
            el.style.setProperty('--scroll-offset-up', `${scrolled * -0.04}px`);
        });
        document.querySelectorAll('.parallax-card-down').forEach(el => {
            el.style.setProperty('--scroll-offset-down', `${scrolled * 0.04}px`);
        });

        // Hero Parallax Fade
        if (heroWrapper && scrolled < 1000) {
            heroWrapper.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroWrapper.style.opacity = Math.max(0, 1 - scrolled / 600);
        }
    });

    // 4. Live Clock Updater
    function updateTime() {
        const clockEl = document.getElementById('current-time');
        if (!clockEl) return;
        
        const now = new Date();
        const options = { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
        clockEl.textContent = `${timeString} EST`;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // 5. Contextrail Interactive Memory Simulator
    initMemorySimulator();
});

// Contextrail Local Memory Store Simulation
const simulatedMossStore = [
    {
        id: 1,
        text: "Project Architecture: Local-First MCP Server communicating over stdio. Backend uses Moss Rust engine for on-device semantic search.",
        source: "Claude Desktop (MCP)",
        timestamp: "2 mins ago",
        tags: ["architecture", "mcp", "moss"]
    },
    {
        id: 2,
        text: "Privacy Requirement: Zero cloud backup. All indexes persisted strictly to localhost sqlite & vector files. Empty network tab guarantee.",
        source: "ChatGPT (Clipboard Capture)",
        timestamp: "5 mins ago",
        tags: ["privacy", "security", "local-first"]
    },
    {
        id: 3,
        text: "Performance Benchmark: Context recall must execute under 10ms end-to-end to prevent blocking LLM prompt construction.",
        source: "Cursor IDE (MCP)",
        timestamp: "12 mins ago",
        tags: ["performance", "latency", "benchmark"]
    }
];

let simLogCount = 3;

function initMemorySimulator() {
    const memoryCountEl = document.getElementById('sim-memory-count');
    const memoryFeedEl = document.getElementById('sim-memory-feed');
    const saveForm = document.getElementById('sim-save-form');
    const saveInput = document.getElementById('sim-save-input');
    const sourceSelect = document.getElementById('sim-source-select');
    const recallInput = document.getElementById('sim-recall-input');
    const recallBtn = document.getElementById('sim-recall-btn');
    const recallResultsEl = document.getElementById('sim-recall-results');
    const latencyBadgeEl = document.getElementById('sim-latency-badge');

    if (!saveForm || !recallBtn) return;

    // Render initial store
    renderFeed();

    // Handle Save Context
    saveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = saveInput.value.trim();
        if (!text) return;

        const startTime = performance.now();
        simLogCount++;
        
        const newMemory = {
            id: simLogCount,
            text: text,
            source: sourceSelect ? sourceSelect.value : "Web Capture",
            timestamp: "Just now",
            tags: ["user-capture", "live"]
        };

        simulatedMossStore.unshift(newMemory);
        const duration = (performance.now() - startTime + Math.random() * 1.5 + 0.8).toFixed(2);

        saveInput.value = '';
        renderFeed();
        
        // Highlight status badge
        if (latencyBadgeEl) {
            latencyBadgeEl.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse-glow";
            latencyBadgeEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Saved to Moss in ${duration}ms (Local Stdio)`;
        }
    });

    // Handle Recall Context
    function executeRecall() {
        const query = recallInput.value.trim().toLowerCase();
        if (!query) {
            recallResultsEl.innerHTML = `<div class="text-sm text-gray-500 italic p-4 text-center">Type a query above to test Moss semantic recall...</div>`;
            return;
        }

        const t0 = performance.now();
        
        // Simple keyword + semantic simulation score
        const results = simulatedMossStore.map(item => {
            const words = query.split(' ');
            let matches = 0;
            words.forEach(w => {
                if (w && item.text.toLowerCase().includes(w)) matches++;
            });
            const score = matches > 0 ? (0.75 + (matches * 0.12) + Math.random() * 0.08).toFixed(3) : (Math.random() * 0.35).toFixed(3);
            return { ...item, score: parseFloat(score) };
        }).filter(item => item.score > 0.4).sort((a, b) => b.score - a.score);

        // Calculate simulated ultra-fast on-device lookup time (between 2.1ms and 6.8ms)
        const mossLookupTime = ((performance.now() - t0) + Math.random() * 2.8 + 2.1).toFixed(2);

        if (latencyBadgeEl) {
            latencyBadgeEl.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30";
            latencyBadgeEl.innerHTML = `⚡ Recalled ${results.length} memories in <span class="font-bold text-white">${mossLookupTime}ms</span> | 0 Cloud Requests`;
        }

        if (results.length === 0) {
            recallResultsEl.innerHTML = `
                <div class="p-6 bg-black/40 rounded-2xl border border-white/5 text-center">
                    <p class="text-sm text-gray-400">No high-confidence match found for "<span class="text-white">${query}</span>".</p>
                    <p class="text-xs text-gray-600 mt-2">Contextrail threshold filter prevented false halluncination fallback.</p>
                </div>
            `;
            return;
        }

        recallResultsEl.innerHTML = results.map(item => `
            <div class="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all duration-300 sim-log-item">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-mono px-2 py-0.5 rounded bg-[#FF4500]/20 text-[#FF4500] font-medium">${item.source}</span>
                    <span class="text-xs text-emerald-400 font-mono">Similarity: ${(item.score * 100).toFixed(1)}%</span>
                </div>
                <p class="text-sm text-gray-200 leading-relaxed font-light">${item.text}</p>
                <div class="mt-2 text-[10px] text-gray-500 flex items-center justify-between">
                    <span>Stored in Moss Index</span>
                    <span>${item.timestamp}</span>
                </div>
            </div>
        `).join('');
    }

    recallBtn.addEventListener('click', executeRecall);
    recallInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') executeRecall();
    });

    function renderFeed() {
        if (memoryCountEl) memoryCountEl.textContent = simulatedMossStore.length;
        if (!memoryFeedEl) return;

        memoryFeedEl.innerHTML = simulatedMossStore.map(item => `
            <div class="p-4 bg-[#161616] rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 sim-log-item">
                <div class="flex items-center justify-between text-xs mb-1.5">
                    <span class="font-medium text-white/90 flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#FF4500]"></span>
                        ${item.source}
                    </span>
                    <span class="text-gray-500 text-[11px] font-mono">${item.timestamp}</span>
                </div>
                <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">${item.text}</p>
            </div>
        `).join('');
    }
}
