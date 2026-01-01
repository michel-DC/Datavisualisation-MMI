<?php
declare(strict_types=1); ?>
<section id="section-meteo" data-custom-anim="true" class="section absolute inset-0 w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12">

    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Données en temps réel</h2>
            <h1 class="text-5xl font-medium tracking-tight">Météo Dashboard</h1>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4">
            
            <!-- Zone Select -->
            <div class="relative group">
                <select id="station-filter" class="appearance-none bg-transparent border-b border-gray-300 py-2 pr-8 pl-2 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors cursor-pointer min-w-[140px]">
                    <option value="global">Moyenne Globale</option>
                    <option value="basse-terre">Basse-Terre</option>
                    <option value="grande-terre">Grande-Terre</option>
                    <option value="marie-galante">Marie-Galante</option>
                    <option value="les-saintes">Les Saintes</option>
                    <option value="la-desirade">La Désirade</option>
                </select>
                <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
            </div>

            <!-- Year Select -->
            <div class="relative group">
                <select id="year-filter" class="appearance-none bg-transparent border-b border-gray-300 py-2 pr-8 pl-2 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors cursor-pointer min-w-[100px]">
                    <!-- JS populated -->
                </select>
                <i data-lucide="chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"></i>
            </div>

            <button id="refresh-btn" class="ml-4 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
        </div>
    </div>

    <!-- Content Area (Vertical Flex) -->
    <div class="flex-1 flex flex-col gap-6 min-h-0">

        <!-- Top Row: Temp & KPI (Flex Grow) -->
        <div class="flex-[1.6] grid grid-cols-12 gap-6 min-h-0">
            <!-- Main Temp Chart -->
            <div class="col-span-8 flex flex-col bg-[#fafafa] rounded-xl border border-gray-100 p-6 relative overflow-hidden">
                            <div class="flex items-center justify-between mb-4 flex-none">
                                <h3 class="text-lg font-medium">Températures</h3>
                                <div class="flex items-center gap-4">
                                    <div class="flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full bg-red-500"></span>
                                        <span class="text-xs text-gray-500 uppercase">Max</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                                        <span class="text-xs text-gray-500 uppercase">Min</span>
                                    </div>
                                </div>
                            </div>                <div class="flex-1 w-full relative min-h-0">
                    <canvas id="meteoTempChart"></canvas>
                </div>
            </div>

            <!-- KPI Column -->
            <div class="col-span-4 flex flex-col gap-6 min-h-0">
                <!-- KPI Box -->
                <div class="flex-1 bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center items-center text-center group hover:border-black transition-colors duration-500">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Température Moyenne</span>
                    <div class="flex items-start justify-center gap-1">
                        <span class="text-6xl font-light tracking-tighter" id="kpi-temp-avg">--</span>
                        <span class="text-xl text-gray-400 mt-2">°C</span>
                    </div>
                </div>

                <!-- Sun Chart -->
                <div class="flex-[0.8] bg-white rounded-xl border border-gray-100 p-6 flex flex-col relative group hover:border-black transition-colors duration-500 overflow-hidden">
                    <div class="flex items-center gap-2 mb-2 flex-none">
                        <i data-lucide="sun" class="w-4 h-4 text-amber-500"></i>
                        <h3 class="text-sm font-bold uppercase tracking-wider text-gray-500">Ensoleillement</h3>
                    </div>
                    <div class="flex-1 w-full relative min-h-0">
                        <canvas id="meteoSunChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Row: Rain Chart (Flex Shrink/Grow) -->
        <div class="flex-1 bg-white rounded-xl border border-gray-100 p-6 flex flex-col relative hover:border-black transition-colors duration-500 overflow-hidden">
            <div class="flex items-center justify-between mb-2 flex-none">
                <div class="flex items-center gap-2">
                    <i data-lucide="cloud-rain" class="w-4 h-4 text-blue-500"></i>
                    <h3 class="text-lg font-medium">Précipitations</h3>
                </div>
                <div class="flex items-end gap-1">
                    <span class="text-2xl font-light" id="kpi-precip-total">--</span>
                    <span class="text-xs font-bold text-gray-400 uppercase mb-1">mm total</span>
                </div>
            </div>
            <div class="flex-1 w-full relative min-h-0">
                <canvas id="meteoRainChart"></canvas>
            </div>
        </div>

    </div>
</section>