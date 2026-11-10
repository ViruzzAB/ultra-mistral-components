function initUltraMistralLayout() {
    const BASE_URL = "https://sites.google.com/view/ultra-mistral";

    // 1. Injection du Header
    const headerEl = document.getElementById('dynamic-header');
    if (headerEl) {
        headerEl.innerHTML = `
        <header id="navbar" class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b-2 border-mistralCobalt/15 shadow-sm transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col items-center justify-center gap-2">
                <div class="w-full flex items-center justify-between lg:justify-center relative">
                    <div class="hidden lg:flex items-center gap-2 absolute left-0 text-[11px] font-mono font-bold text-mistralDeep bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        <span class="w-2 h-2 rounded-full bg-mistralCobalt"></span>
                        <span>BLASON : GRAGAMs & ALEX</span>
                    </div>

                    <a href="${BASE_URL}/accueil" target="_parent" class="flex flex-col items-center group focus:outline-none">
                        <div class="flex items-center gap-2.5">
                            <span class="w-6 h-1 bg-mistralYellow rounded-full hidden sm:inline-block transition-all group-hover:w-10"></span>
                            <span class="text-xl sm:text-2xl md:text-3xl logo-refined tracking-[0.16em] text-mistralCobalt">
                                ULTRA <span class="text-mistralDeep bg-mistralYellow px-2 py-0.5 rounded-md shadow-sm">MISTRAL</span>
                            </span>
                            <span class="w-6 h-1 bg-mistralCobalt rounded-full hidden sm:inline-block transition-all group-hover:w-10"></span>
                        </div>
                    </a>

                    <div class="hidden lg:flex items-center gap-2 absolute right-0">
                        <span id="cloud-sync-pill" class="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live
                        </span>
                    </div>

                    <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-xl text-mistralDeep hover:bg-slate-100 focus:outline-none" aria-label="Menu">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>

                <nav class="hidden lg:flex items-center bg-slate-100/95 p-1 rounded-full border border-slate-200/90 shadow-inner space-x-1" id="desktop-pill-nav">
                    <a href="${BASE_URL}/accueil" target="_parent" class="nav-pill-item px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-mistralDeep hover:text-mistralCobalt transition">
                        <i data-lucide="compass" class="w-3.5 h-3.5"></i> L'Aventure & Défis
                    </a>
                    <a href="${BASE_URL}/telemetrie" target="_parent" class="nav-pill-item px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-mistralDeep hover:text-stravaOrange transition">
                        <span class="w-2 h-2 rounded-full bg-stravaOrange animate-ping"></span> Télémétrie & Courbes
                    </a>
                    <a href="${BASE_URL}/accueil#lab" target="_parent" class="nav-pill-item px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-mistralDeep hover:text-mistralCobalt transition">
                        <i data-lucide="microscope" class="w-3.5 h-3.5"></i> Le Lab & Débunk
                    </a>
                    <a href="${BASE_URL}/accueil#calendrier" target="_parent" class="nav-pill-item px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-mistralDeep hover:text-mistralCobalt transition">
                        <i data-lucide="mountain-snow" class="w-3.5 h-3.5"></i> Radar UTMB & Courses
                    </a>
                    <a href="${BASE_URL}/accueil#vestiaire" target="_parent" class="nav-pill-item px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-mistralDeep hover:text-mistralCobalt transition">
                        <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> Shop Asso
                    </a>
                </nav>
            </div>

            <div id="mobile-menu" class="hidden lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-4 space-y-2.5 text-xs font-extrabold uppercase tracking-wider text-mistralDeep">
                <a href="${BASE_URL}/accueil" target="_parent" class="w-full text-left flex items-center gap-2 py-2 hover:text-mistralCobalt"><i data-lucide="compass" class="w-4 h-4 text-mistralCobalt"></i> L'Aventure & Défis</a>
                <a href="${BASE_URL}/telemetrie" target="_parent" class="w-full text-left flex items-center gap-2 py-2 text-stravaOrange"><i data-lucide="activity" class="w-4 h-4"></i> Télémétrie & Courbes</a>
                <a href="${BASE_URL}/accueil#lab" target="_parent" class="w-full text-left flex items-center gap-2 py-2 text-mistralCobalt"><i data-lucide="microscope" class="w-4 h-4"></i> Le Lab & Débunk</a>
                <a href="${BASE_URL}/accueil#calendrier" target="_parent" class="w-full text-left flex items-center gap-2 py-2 hover:text-mistralCobalt"><i data-lucide="mountain-snow" class="w-4 h-4 text-mistralCobalt"></i> Radar UTMB</a>
                <a href="${BASE_URL}/accueil#vestiaire" target="_parent" class="w-full text-left flex items-center gap-2 py-2 hover:text-mistralCobalt"><i data-lucide="shopping-bag" class="w-4 h-4 text-mistralCobalt"></i> Shop Asso</a>
            </div>
        </header>
        `;

        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.onclick = function() { menu.classList.toggle('hidden'); };
        }
    }

    // 2. Injection du Footer
    const footerEl = document.getElementById('dynamic-footer');
    if (footerEl) {
        footerEl.innerHTML = `
        <footer class="bg-mistralDeep text-white py-12 px-4 sm:px-6 lg:px-8 border-t-4 border-mistralYellow mt-12">
            <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="text-center md:text-left space-y-1.5">
                    <span class="text-2xl logo-refined tracking-[0.18em] text-white block">
                        ULTRA <span class="text-mistralYellow">MISTRAL</span>
                    </span>
                    <p class="text-xs text-slate-300 italic font-serif">
                        « L'art de la patience, la rigueur du réel, l'appel des cimes. » • <strong>GRAGAMs & ALEX</strong>
                    </p>
                </div>
                <div class="flex flex-col items-center md:items-end space-y-1.5 text-xs text-slate-400 font-mono">
                    <span class="text-mistralYellow">Marseille-Cassis (47e) → Veni Vici (33K) → UTMB 100M & Diagonale</span>
                    <p>© 2026 Association ULTRA MISTRAL</p>
                </div>
            </div>
        </footer>
        `;
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

// Exécution directe et sécurisée
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUltraMistralLayout);
} else {
    initUltraMistralLayout();
}
