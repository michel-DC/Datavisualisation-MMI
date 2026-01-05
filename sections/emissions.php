<?php

declare(strict_types=1);
?>
<section id="section-emissions" data-custom-anim="true" class="section absolute inset-0 hidden w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Analyse Environnementale</h2>
            <h1 class="text-5xl font-medium tracking-tight">Émissions de CO₂</h1>
        </div>
        
        <div class="flex-none">
            <a href="https://www.citepa.org/donnees-air-climat/donnees-gaz-a-effet-de-serre/outre-mer/" target="_blank" class="flex items-center gap-2 group">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-black transition-colors">Voir le rapport complet</span>
                <i data-lucide="arrow-up-right" class="w-4 h-4 text-gray-300 group-hover:text-black transition-colors"></i>
            </a>
        </div>
    </div>

    <!-- Content Grid -->
    <div class="flex-1 flex flex-col min-h-0">

        <!-- Chart Container -->
        <div class="relative flex-1 w-full bg-[#fafafa] rounded-xl border border-gray-100 p-6 flex items-center justify-center min-h-0">
            <canvas id="emissionsChart"></canvas>
        </div>

        <!-- Legend -->
        <div class="flex items-center justify-center gap-6 mt-6 flex-none">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-slate-500"></span>
                <span class="text-xs font-medium text-gray-600">Industrie</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                <span class="text-xs font-medium text-gray-600">Transports</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <span class="text-xs font-medium text-gray-600">Agriculture</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                <span class="text-xs font-medium text-gray-600">Tertiaire</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span class="text-xs font-medium text-gray-600">Déchets</span>
            </div>
        </div>

    </div>
</section>