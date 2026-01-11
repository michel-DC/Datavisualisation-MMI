<?php

declare(strict_types=1);
?>
<section id="section-regression-lineaire" class="section absolute inset-0 w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12 hidden">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Modèle Prédictif</h2>
            <h1 class="text-5xl font-medium tracking-tight">Régression Linéaire</h1>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4">
            <div class="relative group">
                <select id="regression-zone-filter" class="appearance-none bg-transparent border-b border-gray-300 py-2 pr-8 pl-2 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors cursor-pointer min-w-[140px]">
                    <!-- Populated by JS -->
                </select>
                <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
            </div>

            <button id="regression-refresh-btn" class="ml-4 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
        </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col gap-6 min-h-0 overflow-hidden">

        <!-- Chart Container -->
        <div class="flex-1 flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-6 min-h-0">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">Modèle & Dispersion</h3>
                <i data-lucide="trending-up" class="w-5 h-5 text-black"></i>
            </div>
            <div class="flex-1 w-full relative min-h-0">
                <canvas id="regression-chart"></canvas>
            </div>
        </div>

        <!-- Prediction Panel (Bottom) -->
        <div class="flex-none grid grid-cols-1 lg:grid-cols-3 gap-4">

            <!-- Equation Card -->
            <div class="bg-[#1e1e1e] rounded-xl p-6 text-white flex flex-col justify-center">
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Équation du modèle</p>
                <div class="text-2xl font-black tracking-tight" id="regression-equation">
                    y = ax + b
                </div>
            </div>

            <!-- Predictor Input -->
            <div class="bg-white rounded-xl border border-gray-100 p-6">
                <label for="predict-temp" class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Température à tester (°C)
                </label>
                <div class="relative">
                    <input type="number" id="predict-temp" step="0.1" placeholder="Ex: 28.5"
                        class="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 text-gray-900 focus:outline-none focus:border-black transition-all font-medium">
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">°C</span>
                </div>
            </div>

            <!-- Predictor Result -->
            <div class="bg-gray-50 rounded-xl border border-gray-100 p-6 flex flex-col justify-center">
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Précipitations Estimées</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-black text-black" id="prediction-result">--</span>
                    <span class="text-sm font-medium text-gray-400">mm</span>
                </div>
            </div>

        </div>
    </div>
</section>