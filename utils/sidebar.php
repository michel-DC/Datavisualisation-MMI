<?php declare(strict_types=1); ?>

<aside id="sidebar" class="fixed top-0 left-0 h-screen w-[220px] bg-white z-50 flex flex-col items-center py-8">
    
    <!-- Header -->
    <div class="flex items-center gap-3 self-start px-8 mb-24">
        <div class="w-12 h-12 bg-blue-100 rounded-[14px] flex items-center justify-center">
            <i data-lucide="sun" class="w-6 h-6 text-blue-600"></i>
        </div>
        <div class="flex flex-col leading-none">
            <span class="text-[17px] font-bold text-blue-600">Météo</span>
            <span class="text-[17px] font-medium text-slate-800">Guadeloupe</span>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 flex flex-col justify-center gap-10 w-full px-8">
        
        <button 
            data-section="meteo" 
            data-color="text-slate-800"
            class="sidebar-item group flex items-center justify-center w-full transition-all cursor-pointer"
            aria-label="Météo">
            <i data-lucide="layout-grid" class="w-[26px] h-[26px] text-slate-500 transition-colors group-hover:text-slate-800"></i>
            <span class="sr-only">Météo</span>
        </button>

        <button 
            data-section="emissions" 
            data-color="text-slate-800"
            class="sidebar-item group flex items-center justify-center w-full transition-all cursor-pointer"
            aria-label="Émissions">
            <i data-lucide="factory" class="w-[26px] h-[26px] text-slate-500 transition-colors group-hover:text-slate-800"></i>
            <span class="sr-only">Émissions</span>
        </button>

        <button 
            data-section="projections" 
            data-color="text-slate-800"
            class="sidebar-item group flex items-center justify-center w-full transition-all cursor-pointer"
            aria-label="Projections">
            <i data-lucide="trending-up" class="w-[26px] h-[26px] text-slate-500 transition-colors group-hover:text-slate-800"></i>
            <span class="sr-only">Projections</span>
        </button>

    </nav>
    <!-- Footer -->
    <div class="mt-auto mb-10 relative group">
        <button class="flex items-center justify-center w-12 h-12 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300" aria-label="Sources des données">
            <i data-lucide="info" class="w-6 h-6"></i>
        </button>

        <!-- Tooltip -->
        <div class="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64 p-4 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none z-50">
            <div class="flex flex-col gap-1">
                <span class="text-[13px] font-bold text-slate-900">Sources des données</span>
                <span class="text-[11px] text-slate-500 leading-relaxed">Données collectées en temps réel via Météo-France et les réseaux de capteurs locaux certifiés.</span>
            </div>
        </div>
    </div>

    
</aside>
