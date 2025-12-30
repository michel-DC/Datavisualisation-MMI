<?php
declare(strict_types=1);
?>
<section id="section-emissions" data-custom-anim="true" class="section absolute inset-0 hidden w-full h-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans flex flex-col">

    <!-- Minimalist Header & Controls (Fixed Height) -->
    <div class="flex-none bg-[#f8fafc]/90 backdrop-blur-md px-8 pt-8 pb-4 flex flex-col gap-4 z-10">
        
        <div class="flex items-start justify-between">
            <!-- Titles -->
            <div>
                <h1 class="text-7xl font-normal tracking-tighter text-slate-900 mb-1">
                    Émissions
                </h1>
                <div class="flex items-center gap-2 text-slate-400">
                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                    <span class="text-sm font-bold uppercase tracking-widest">
                        Guadeloupe
                    </span>
                    <span class="text-slate-300 mx-2">|</span>
                    <span class="text-sm font-medium text-slate-500">1990 - 2022</span>
                </div>
            </div>

            <!-- Actions -->
            <button id="open-emissions-info" class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                <i data-lucide="info" class="w-4 h-4"></i>
                <span class="text-sm font-bold">Détails des secteurs</span>
            </button>
        </div>
    </div>

    <!-- Dashboard Content (Fluid) -->
    <div class="flex-1 p-6 pb-12 overflow-hidden flex flex-col gap-6 h-full">
        
        <!-- Main Chart Card -->
        <div class="emissions-chart-container flex-1 bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100/50 flex flex-col min-h-0 opacity-0 transform scale-95 relative">
            
            <div class="flex-none flex items-center justify-between mb-2">
                <div>
                    <h3 class="text-xl font-bold text-slate-800">Évolution du CO₂</h3>
                    <p class="text-sm text-slate-400 font-medium">Par secteur d'activité (kt CO₂e)</p>
                </div>
                
                <!-- Legend (Inline) -->
                <div class="emissions-legend flex flex-wrap items-center gap-4 opacity-0">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        <span class="text-[10px] font-bold text-slate-500 uppercase">Industrie</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span class="text-[10px] font-bold text-slate-500 uppercase">Transports</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span class="text-[10px] font-bold text-slate-500 uppercase">Agri</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span class="text-[10px] font-bold text-slate-500 uppercase">Tertiaire</span>
                    </div>
                     <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span class="text-[10px] font-bold text-slate-500 uppercase">Déchets</span>
                    </div>
                </div>
            </div>

            <div class="flex-1 relative w-full min-h-0">
                <canvas id="emissionsChart"></canvas>
            </div>
        </div>

        <!-- Footer / Source -->
        <div class="flex-none flex items-center justify-center pb-2">
            <a href="https://www.citepa.org/donnees-air-climat/donnees-gaz-a-effet-de-serre/outre-mer/" target="_blank" class="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-slate-500 transition-colors">
                <i data-lucide="link" class="w-3 h-3"></i>
                <span>Source : CITEPA (Inventaire SECTEN)</span>
            </a>
        </div>
    </div>

</section>