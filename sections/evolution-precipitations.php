<?php

declare(strict_types=1); ?>
<section id="section-evolution-precipitations" class="section absolute inset-0 w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12 hidden">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Historique climatique</h2>
            <h1 class="text-5xl font-medium tracking-tight">Évolution des Précipitations</h1>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4">

            <!-- Zone Select -->
            <div class="relative group">
                <select id="evolution-precip-zone-filter" class="appearance-none bg-transparent border-b border-gray-300 py-2 pr-8 pl-2 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors cursor-pointer min-w-[140px]">
                    <!-- Populated by JS -->
                </select>
                <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
            </div>

            <!-- Year Select -->
            <div class="relative group">
                <select id="evolution-precip-year-select" class="appearance-none bg-transparent border-b border-gray-300 py-2 pr-8 pl-2 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors cursor-pointer min-w-[100px]">
                    <!-- Populated by JS -->
                </select>
                <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
            </div>

            <button id="evolution-precip-refresh-btn" class="ml-4 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
        </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col min-h-0 overflow-hidden">

        <!-- Chart Container -->
        <div class="flex-1 flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-6 min-h-0">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold" id="evolution-precip-chart-title">Cumul mensuel (mm)</h3>
                <i data-lucide="cloud-rain" class="w-5 h-5 text-blue-500"></i>
            </div>
            <div class="flex-1 w-full relative min-h-0">
                <canvas id="evolution-precip-chart"></canvas>
            </div>
        </div>
    </div>
</section>
