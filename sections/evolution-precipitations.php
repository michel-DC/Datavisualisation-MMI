<?php

declare(strict_types=1); ?>
<section id="section-evolution-precipitations" class="section absolute inset-0 w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12 hidden">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Historique climatique</h2>
            <h1 class="text-5xl font-medium tracking-tight">Évolution des Précipitations en Guadeloupe</h1>
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

            <button id="evolution-precip-refresh-btn" class="ml-4 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>

            <!-- Mode Switch -->
            <label class="relative inline-flex items-center cursor-pointer ml-4">
                <input type="checkbox" id="precip-mode-switch" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                <span class="ml-3 text-sm font-medium text-gray-500">Mode Graphique</span>
            </label>
        </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col min-h-0 overflow-hidden">

        <!-- Chart Container -->
        <div class="flex-1 flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-6 min-h-0 relative overflow-hidden">
            <div class="flex items-center justify-between mb-4 relative z-20">
                <h3 class="text-lg font-semibold" id="evolution-precip-chart-title">Cumul mensuel (mm)</h3>
                <i data-lucide="cloud-rain" class="w-5 h-5 text-blue-500"></i>
            </div>
            <div class="flex-1 w-full relative min-h-0">
                <canvas id="evolution-precip-chart"></canvas>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-4 mt-4 flex-none">
            <div class="bg-[#fafafa] rounded-xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Moyenne décennale</h3>
                <p id="evolution-precip-avg" class="text-2xl font-medium tracking-tight">-- mm</p>
            </div>
            <div class="bg-[#fafafa] rounded-xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Variance</h3>
                <p id="evolution-precip-var" class="text-2xl font-medium tracking-tight">--</p>
            </div>
            <div class="bg-[#fafafa] rounded-xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Écart-type</h3>
                <p id="evolution-precip-std" class="text-2xl font-medium tracking-tight">-- mm</p>
            </div>
            <div class="bg-[#fafafa] rounded-xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Étendue</h3>
                <p id="evolution-precip-range" class="text-2xl font-medium tracking-tight">-- mm</p>
            </div>
        </div>
    </div>
</section>