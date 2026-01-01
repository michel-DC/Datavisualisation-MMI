<?php declare(strict_types=1); ?>

<aside id="sidebar" class="fixed top-0 left-0 h-screen w-[260px] bg-[#f2f2f2] z-50 flex flex-col py-8 pl-6 pr-2">
    
    <!-- Header -->
    <div class="flex flex-col gap-1 px-4 mb-16 mt-2">
        <span class="text-[13px] font-bold text-gray-400 uppercase tracking-widest">Dashboard</span>
        <h1 class="text-2xl font-bold text-black tracking-tight leading-none">Guadeloupe<br>Climat.</h1>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 flex flex-col gap-2 w-full">
        
        <button 
            data-section="meteo" 
            class="sidebar-item group flex items-center gap-4 w-full px-4 py-3 rounded-lg text-left cursor-pointer text-gray-500 hover:text-black transition-colors"
            aria-label="Météo">
            <i data-lucide="cloud-sun" class="w-5 h-5"></i>
            <span class="text-[15px] font-medium">Météo en direct</span>
        </button>

        <button 
            data-section="emissions" 
            class="sidebar-item group flex items-center gap-4 w-full px-4 py-3 rounded-lg text-left cursor-pointer text-gray-500 hover:text-black transition-colors"
            aria-label="Émissions">
            <i data-lucide="factory" class="w-5 h-5"></i>
            <span class="text-[15px] font-medium">Émissions CO₂</span>
        </button>

        <button 
            data-section="projections" 
            class="sidebar-item group flex items-center gap-4 w-full px-4 py-3 rounded-lg text-left cursor-pointer text-gray-500 hover:text-black transition-colors"
            aria-label="Projections">
            <i data-lucide="trending-up" class="w-5 h-5"></i>
            <span class="text-[15px] font-medium">Projections 2050</span>
        </button>

    </nav>

    <!-- Footer -->
    <div class="mt-auto px-4">
        <div class="flex items-center gap-3 py-3 border-t border-gray-200">
            <div class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                <i data-lucide="info" class="w-4 h-4 text-black"></i>
            </div>
            <div class="flex flex-col">
                <span class="text-[11px] font-bold text-black">Source certifiée</span>
                <span class="text-[10px] text-gray-500">Météo-France & CITEPA</span>
            </div>
        </div>
    </div>
</aside>