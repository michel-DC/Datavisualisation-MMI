<?php declare(strict_types=1); ?>

<aside id="sidebar" class="fixed top-6 left-6 bottom-6 w-[84px] z-50 flex flex-col gap-4">
    
    <!-- Header Block -->
    <div class="bg-white rounded-[24px] border border-gray-100 p-4 shadow-sm flex items-center justify-center">
        <div class="flex flex-col items-center">
            <span class="text-[18px] font-black text-black tracking-tighter">G.</span>
        </div>
    </div>

    <!-- Navigation Block (Content) -->
    <nav class="flex-1 bg-white rounded-[24px] border border-gray-100 p-3 shadow-sm flex flex-col items-center gap-4">
        <button 
            data-section="meteo" 
            class="sidebar-item group relative flex items-center justify-center w-12 h-12 rounded-xl text-gray-500 hover:text-black hover:bg-gray-50 transition-all"
            aria-label="Météo">
            <i data-lucide="cloud-sun" class="w-5 h-5"></i>
            <span class="absolute left-full ml-4 px-3 py-2 bg-black text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 uppercase tracking-widest shadow-xl">
                Météo en direct
            </span>
        </button>

        <button 
            data-section="emissions" 
            class="sidebar-item group relative flex items-center justify-center w-12 h-12 rounded-xl text-gray-500 hover:text-black hover:bg-gray-50 transition-all"
            aria-label="Émissions">
            <i data-lucide="factory" class="w-5 h-5"></i>
            <span class="absolute left-full ml-4 px-3 py-2 bg-black text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 uppercase tracking-widest shadow-xl">
                Émissions CO₂
            </span>
        </button>

        <button 
            data-section="projections" 
            class="sidebar-item group relative flex items-center justify-center w-12 h-12 rounded-xl text-gray-500 hover:text-black hover:bg-gray-50 transition-all"
            aria-label="Projections">
            <i data-lucide="trending-up" class="w-5 h-5"></i>
            <span class="absolute left-full ml-4 px-3 py-2 bg-black text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 uppercase tracking-widest shadow-xl">
                Projections 2050
            </span>
        </button>
    </nav>

    <!-- Footer Block -->
    <div class="bg-white rounded-[24px] border border-gray-100 p-4 shadow-sm flex items-center justify-center">
        <div class="group relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center cursor-help">
                <i data-lucide="info" class="w-4 h-4 text-black"></i>
            </div>
            <span class="absolute left-full ml-4 px-3 py-2 bg-black text-white text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 uppercase tracking-widest shadow-xl">
                Source: Météo-France & CITEPA
            </span>
        </div>
    </div>
</aside>