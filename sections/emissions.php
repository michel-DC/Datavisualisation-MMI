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
        <div class="flex flex-col items-end gap-1">
            <span class="text-4xl font-light text-black">1.8 Mt</span>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total émis (2022)</span>
        </div>
    </div>

    <!-- Content Grid -->
    <div class="flex-1 grid grid-cols-12 gap-8 min-h-0">
        
        <!-- Main Chart Area -->
        <div class="col-span-8 flex flex-col h-full">
            <!-- Legend -->
            <div class="flex items-center gap-6 mb-6">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-black"></span>
                    <span class="text-xs font-medium text-gray-600">Industrie</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-gray-400"></span>
                    <span class="text-xs font-medium text-gray-600">Transports</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full border border-gray-300"></span>
                    <span class="text-xs font-medium text-gray-600">Agriculture</span>
                </div>
            </div>

            <!-- Chart Container -->
            <div class="relative flex-1 w-full bg-[#fafafa] rounded-xl border border-gray-100 p-6 flex items-center justify-center">
                 <canvas id="emissionsChart"></canvas>
            </div>
        </div>

        <!-- Key Metrics / Side Panel -->
        <div class="col-span-4 flex flex-col gap-4">
            
            <div class="p-6 rounded-xl border border-gray-100 bg-white hover:border-black transition-colors duration-500 cursor-default group">
                <div class="flex items-start justify-between mb-4">
                    <i data-lucide="car" class="w-5 h-5 text-gray-400 group-hover:text-black transition-colors"></i>
                    <span class="text-xs font-bold bg-gray-50 px-2 py-1 rounded text-gray-600">+2.4%</span>
                </div>
                <div class="text-3xl font-medium mb-1">Transports</div>
                <p class="text-sm text-gray-500 leading-relaxed">Le secteur des transports reste le premier poste d'émissions de l'archipel.</p>
            </div>

            <div class="p-6 rounded-xl border border-gray-100 bg-white hover:border-black transition-colors duration-500 cursor-default group">
                <div class="flex items-start justify-between mb-4">
                    <i data-lucide="zap" class="w-5 h-5 text-gray-400 group-hover:text-black transition-colors"></i>
                    <span class="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded">-5.1%</span>
                </div>
                <div class="text-3xl font-medium mb-1">Énergie</div>
                <p class="text-sm text-gray-500 leading-relaxed">Baisse significative grâce à la transition vers la biomasse et le solaire.</p>
            </div>

            <div class="mt-auto pt-6 border-t border-gray-100">
                <a href="https://www.citepa.org/donnees-air-climat/donnees-gaz-a-effet-de-serre/outre-mer/" target="_blank" class="flex items-center justify-between w-full group">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-black transition-colors">Voir le rapport complet</span>
                    <i data-lucide="arrow-up-right" class="w-4 h-4 text-gray-300 group-hover:text-black transition-colors"></i>
                </a>
            </div>

        </div>
    </div>
</section>