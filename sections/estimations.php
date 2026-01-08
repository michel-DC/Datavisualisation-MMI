<?php

declare(strict_types=1); ?>
<section id="section-estimations" class="section absolute inset-0 w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Projections climatiques</h2>
            <h1 class="text-5xl font-medium tracking-tight">Estimations Climat 2050</h1>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4">

            <!-- Zone Select -->
            <div class="relative group">
                <select id="estimation-zone-filter" class="appearance-none bg-transparent border-b border-gray-300 py-2 pr-8 pl-2 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors cursor-pointer min-w-[140px]">
                    <option value="global">Moyenne Globale</option>
                    <option value="basse-terre">Basse-Terre</option>
                    <option value="grande-terre">Grande-Terre</option>
                    <option value="marie-galante">Marie-Galante</option>
                    <option value="les-saintes">Les Saintes</option>
                    <option value="la-desirade">La Désirade</option>
                </select>
                <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
            </div>

            <button id="estimation-refresh-btn" class="ml-4 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
        </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col gap-6 min-h-0 overflow-y-auto">

        <!-- Temperature Estimations -->
        <div class="flex-1 grid grid-cols-2 gap-6 min-h-0">
            <div class="flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold">Évolution des Températures</h3>
                    <i data-lucide="thermometer" class="w-5 h-5 text-orange-500"></i>
                </div>
                <canvas id="temperature-estimation-chart"></canvas>
            </div>

            <!-- Precipitation Estimations -->
            <div class="flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold">Évolution des Précipitations</h3>
                    <i data-lucide="cloud-rain" class="w-5 h-5 text-blue-500"></i>
                </div>
                <canvas id="precipitation-estimation-chart"></canvas>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="flex-none grid grid-cols-4 gap-4">
            <div class="bg-orange-50 rounded-xl border border-orange-100 p-4">
                <p class="text-xs text-gray-500 uppercase tracking-widest mb-2">Augmentation Temp.</p>
                <p class="text-2xl font-bold text-orange-600">+2.5°C</p>
                <p class="text-xs text-gray-400 mt-2">D'ici 2050</p>
            </div>

            <div class="bg-blue-50 rounded-xl border border-blue-100 p-4">
                <p class="text-xs text-gray-500 uppercase tracking-widest mb-2">Variation Pluie</p>
                <p class="text-2xl font-bold text-blue-600">-8%</p>
                <p class="text-xs text-gray-400 mt-2">Diminution prévue</p>
            </div>

            <div class="bg-red-50 rounded-xl border border-red-100 p-4">
                <p class="text-xs text-gray-500 uppercase tracking-widest mb-2">Événements Extrêmes</p>
                <p class="text-2xl font-bold text-red-600">+35%</p>
                <p class="text-xs text-gray-400 mt-2">Augmentation</p>
            </div>

            <div class="bg-purple-50 rounded-xl border border-purple-100 p-4">
                <p class="text-xs text-gray-500 uppercase tracking-widest mb-2">Niveau Marin</p>
                <p class="text-2xl font-bold text-purple-600">+0.52m</p>
                <p class="text-xs text-gray-400 mt-2">Projection côtière</p>
            </div>
        </div>
    </div>
</section>
