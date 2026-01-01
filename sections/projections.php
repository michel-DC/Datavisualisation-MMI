<?php
declare(strict_types=1);
?>
<section id="section-projections" data-custom-anim="true" class="section absolute inset-0 hidden w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Futur & Anticipation</h2>
            <h1 class="text-5xl font-medium tracking-tight">Projections 2080</h1>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span class="text-xs font-bold text-gray-500 uppercase">Scénario RCP 8.5 (Pessimiste)</span>
        </div>
    </div>

    <!-- Content -->
    <div class="flex-1 grid grid-cols-2 gap-8 min-h-0">
        
        <!-- Temp Projections -->
        <div class="proj-chart-container flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-8 hover:border-black transition-colors duration-500 group">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h3 class="text-2xl font-light mb-1">Températures</h3>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Hausse prévue (°C)</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span class="text-xs text-gray-600 uppercase">Jour</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <span class="text-xs text-gray-600 uppercase">Nuit</span>
                    </div>
                </div>
            </div>
            
            <div class="flex-1 w-full relative min-h-0 flex items-center justify-center">
                <canvas id="tempProjChart"></canvas>
            </div>
        </div>

        <!-- Precipitation Projections -->
        <div class="proj-chart-container flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-8 hover:border-black transition-colors duration-500 group">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h3 class="text-2xl font-light mb-1">Climatologie</h3>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Pluies & Canicules</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <div class="flex items-center gap-2">
                         <span class="w-2 h-2 rounded-full bg-sky-500"></span>
                         <span class="text-xs text-gray-600 uppercase">Pluie</span>
                    </div>
                     <div class="flex items-center gap-2">
                         <span class="w-2 h-2 rounded-full bg-red-500"></span>
                         <span class="text-xs text-gray-600 uppercase">Canicule</span>
                    </div>
                </div>
            </div>

            <div class="flex-1 w-full relative min-h-0 flex items-center justify-center">
                <canvas id="precipProjChart"></canvas>
            </div>
        </div>

    </div>
    
    <!-- Footer Link -->
    <div class="flex-none pt-6 text-center">
         <a href="https://www.observatoire-eau-guadeloupe.fr/content/uploads/2025/02/2024_Seminaire-MA_7_Meteo-France.pdf" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-black transition-colors">
            <i data-lucide="file-text" class="w-3 h-3"></i>
            <span>Accéder au rapport complet Météo France</span>
        </a>
    </div>

</section>