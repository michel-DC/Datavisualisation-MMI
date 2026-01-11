<?php

declare(strict_types=1); ?>
<section id="section-correlation" class="section absolute inset-0 w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12 hidden">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Analyse statistique</h2>
            <h1 class="text-5xl font-medium tracking-tight">Corrélation Température / Pluie</h1>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4">
            <div class="relative group">
                <select id="correlation-zone-filter" class="appearance-none bg-transparent border-b border-gray-300 py-2 pr-8 pl-2 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors cursor-pointer min-w-[140px]">
                    <!-- Populated by JS -->
                </select>
                <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
            </div>

            <button id="correlation-refresh-btn" class="ml-4 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
        </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col gap-6 min-h-0 overflow-hidden">

        <!-- Chart Container -->
        <div class="flex-1 flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-6 min-h-0">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">Diagramme de dispersion</h3>
                <i data-lucide="scatter-chart" class="w-5 h-5 text-purple-500"></i>
            </div>
            <div class="flex-1 w-full relative min-h-0">
                <canvas id="correlation-chart"></canvas>
            </div>
        </div>

        <!-- Stats Panel (Bottom, Compact) -->
        <div class="flex-none grid grid-cols-3 gap-4">

            <!-- Pearson Card -->
            <div class="bg-gray-50 rounded-xl border border-purple-100 p-4">
                <p class="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">Coefficient de Pearson (r)</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-black text-purple-600 tracking-tighter" id="correlation-r-value">--</span>
                    <span class="text-[10px] font-medium text-purple-400">Score de corrélation</span>
                </div>
            </div>

            <!-- Legend Card -->
            <div class="bg-white rounded-xl border border-gray-100 p-4 flex items-center">
                <div class="grid grid-cols-1 gap-1 w-full">
                    <div class="flex items-center justify-between text-[10px] text-gray-500">
                        <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span> r > 0 : Positive</span>
                        <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span> r < 0 : Négative</span>
                                <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span> r ≈ 0 : Nulle</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>