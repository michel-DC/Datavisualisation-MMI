<?php
declare(strict_types=1);
?>
<section id="section-projections" data-custom-anim="true" class="section absolute inset-0 hidden w-full h-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans flex flex-col">

    <!-- Minimalist Header & Controls (Fixed Height) -->
    <div class="flex-none bg-[#f8fafc]/90 backdrop-blur-md px-8 pt-8 pb-4 flex flex-col gap-4 z-10">
        
        <div class="flex items-start justify-between">
            <!-- Titles -->
            <div>
                <h1 class="text-7xl font-normal tracking-tighter text-slate-900 mb-1">
                    Projections climatiques
                </h1>
                <div class="flex items-center gap-2 text-slate-400">
                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                    <span class="text-sm font-bold uppercase tracking-widest">
                        Guadeloupe
                    </span>
                    <span class="text-slate-300 mx-2">|</span>
                    <span class="text-sm font-medium text-slate-500">Horizon 2080</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Dashboard Content (Fluid) -->
    <div class="flex-1 p-6 pb-12 overflow-hidden flex flex-col gap-6 h-full">
        
        <div class="flex-1 w-full flex flex-col gap-6 min-h-0">
            <!-- Temperature Radar Chart -->
            <div class="proj-chart-container flex-1 min-h-0 opacity-0 transform scale-95 flex flex-col bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100/50">
                <div class="flex-none flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">Hausse des Températures</h3>
                        <p class="text-sm text-slate-400 font-medium">Comparaison Jour / Nuit (°C)</p>
                    </div>
                    <div class="flex items-center gap-3">
                         <div class="flex items-center gap-2">
                             <div class="w-2 h-2 rounded-full bg-red-500"></div>
                             <span class="text-xs font-bold text-slate-500 uppercase">Jour</span>
                         </div>
                         <div class="flex items-center gap-2">
                             <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                             <span class="text-xs font-bold text-slate-500 uppercase">Nuit</span>
                         </div>
                    </div>
                </div>
                <div class="flex-1 relative w-full min-h-0">
                    <canvas id="tempProjChart"></canvas>
                </div>
            </div>

            <!-- Precipitation & Heatwave Chart -->
            <div class="proj-chart-container flex-1 min-h-0 opacity-0 transform scale-95 flex flex-col bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100/50">
                <div class="flex-none flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">Climat & Phénomènes</h3>
                        <p class="text-sm text-slate-400 font-medium">Baisse des pluies vs Intensifiés</p>
                    </div>
                     <div class="flex items-center gap-3">
                         <div class="flex items-center gap-2">
                             <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                             <span class="text-xs font-bold text-slate-500 uppercase">Pluie</span>
                         </div>
                         <div class="flex items-center gap-2">
                             <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                             <span class="text-xs font-bold text-slate-500 uppercase">Canicule</span>
                         </div>
                    </div>
                </div>
                <div class="flex-1 relative w-full min-h-0">
                    <canvas id="precipProjChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Footer / Source -->
        <div class="flex-none flex items-center justify-center pb-2">
            <a href="https://www.observatoire-eau-guadeloupe.fr/content/uploads/2025/02/2024_Seminaire-MA_7_Meteo-France.pdf" target="_blank" class="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-slate-500 transition-colors">
                <i data-lucide="database" class="w-3 h-3"></i>
                <span>Source : C3AF / Météo France (Scénario RCP 8.5)</span>
            </a>
        </div>
    </div>
</section>