<?php declare(strict_types=1); ?>
<section id="section-meteo" data-custom-anim="true" class="section absolute inset-0 w-full h-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans flex flex-col">
    
    <!-- Minimalist Header & Controls (Fixed Height) -->
    <!-- Minimalist Header & Controls (Fixed Height) -->
    <div class="flex-none bg-[#f8fafc]/90 backdrop-blur-md px-8 pt-8 pb-4 flex flex-col gap-4 z-10">
        
        <!-- Titles -->
        <div>
            <h1 class="text-7xl font-normal tracking-tighter text-slate-900 mb-1">
                Eco dashboard
            </h1>
            <div class="flex items-center gap-2 text-slate-400">
                <i data-lucide="map-pin" class="w-4 h-4"></i>
                <span class="text-sm font-bold uppercase tracking-widest">
                    Guadeloupe
                </span>
            </div>
        </div>

        <!-- Controls (Left Aligned) -->
        <div class="flex items-center gap-3">
             <!-- Station Select -->
            <div class="flex flex-col gap-1.5">
                <label for="station-filter" class="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Zone</label>
                <div class="relative group">
                    <i data-lucide="map-pin" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors pointer-events-none z-10"></i>
                    <select id="station-filter" class="pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-300 shadow-sm hover:border-slate-300 transition-all cursor-pointer appearance-none min-w-[140px]">
                        <option value="global">Moyenne Globale</option>
                        <option value="basse-terre">Basse-Terre</option>
                        <option value="grande-terre">Grande-Terre</option>
                        <option value="marie-galante">Marie-Galante</option>
                        <option value="les-saintes">Les Saintes</option>
                        <option value="la-desirade">La Désirade</option>
                    </select>
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <i data-lucide="chevron-down" class="h-3 w-3 text-slate-400"></i>
                    </div>
                </div>
            </div>

            <!-- Year Select -->
            <div class="flex flex-col gap-1.5">
                <label for="year-filter" class="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Année</label>
                <div class="relative group">
                    <i data-lucide="calendar" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors pointer-events-none z-10"></i>
                    <select id="year-filter" class="pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-300 shadow-sm hover:border-slate-300 transition-all cursor-pointer appearance-none min-w-[100px]">
                        <!-- JS populated -->
                    </select>
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <i data-lucide="chevron-down" class="h-3 w-3 text-slate-400"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Dashboard Content (Fluid) -->
    <div class="flex-1 p-6 overflow-hidden flex flex-col gap-4 max-h-screen">
        
        <!-- Top Row (Flex ~30% Forced) -->
        <div class="flex-none flex gap-4" style="height: 50%;">
            
            <!-- Temperature Chart (Main) -->
            <div class="flex-1 bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100/50 flex flex-col">
                <div class="flex-none flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-base font-bold text-slate-800">Températures</h3>
                        <p class="text-xs text-slate-400 font-medium">Variations mensuelles (°C)</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                             <div class="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                             <span class="text-[10px] font-semibold text-slate-500 uppercase">Max</span>
                        </div>
                        <div class="flex items-center gap-2">
                             <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                             <span class="text-[10px] font-semibold text-slate-500 uppercase">Min</span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 relative min-h-0 w-full">
                    <canvas id="meteoTempChart"></canvas>
                </div>
            </div>

            <!-- Side Column (KPI + Sun) -->
            <div class="w-[30%] flex flex-col gap-4">
                <!-- KPI -->
                <div class="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[20px] p-6 text-white relative overflow-hidden shadow-lg flex flex-col justify-between">
                    <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div>
                        <div class="flex items-center gap-2 text-white/60 mb-1">
                            <i data-lucide="thermometer" class="w-4 h-4"></i>
                            <span class="text-[10px] font-bold uppercase tracking-wider">Moyenne</span>
                        </div>
                        <div class="flex items-end gap-1">
                            <span class="text-5xl lg:text-6xl font-black tracking-tighter leading-none" id="kpi-temp-avg">--</span>
                            <span class="text-xl font-medium text-white/50 mb-1">°C</span>
                        </div>
                    </div>
                     <div class="pt-4 border-t border-white/10">
                         <div class="flex items-center justify-between">
                              <span class="text-xs font-medium text-white/60">Écart vs Ref</span>
                              <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">+1.8°C</span>
                         </div>
                    </div>
                </div>

                <!-- Sun -->
                <div class="h-[45%] bg-white rounded-[20px] p-5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100/50 flex flex-col">
                     <div class="flex-none flex items-center justify-between mb-2">
                        <h3 class="text-sm font-bold text-slate-800">Ensoleillement</h3>
                        <i data-lucide="sun" class="w-4 h-4 text-amber-500"></i>
                    </div>
                    <div class="flex-1 relative min-h-0 w-full">
                        <canvas id="meteoSunChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Row (Flex Remaining) -->
        <div class="flex-1 flex flex-col bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100/50">
             <div class="flex-none flex items-center justify-between mb-2">
                <div>
                    <h3 class="text-base font-bold text-slate-800">Précipitations</h3>
                    <p class="text-xs text-slate-400 font-medium">Cumul mensuel (mm)</p>
                </div>
                <div>
                     <span class="text-2xl font-black text-slate-800 tracking-tight leading-none" id="kpi-precip-total">--</span>
                     <span class="text-xs font-bold text-slate-400 ml-1 uppercase">mm total</span>
                </div>
            </div>
            <div class="flex-1 relative min-h-0 w-full">
                <canvas id="meteoRainChart"></canvas>
            </div>
        </div>

    </div>
</section>
