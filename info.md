<div id="precip-info-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-4 p-8 transform scale-95 transition-transform duration-300 z-50 max-h-[85vh] overflow-y-auto" id="precip-modal-content">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h2 class="text-3xl font-black text-slate-900 mb-2">Évolution des Précipitations</h2>
                    <div class="h-1 w-20 bg-blue-600 rounded-full"></div>
                </div>
                <button id="close-precip-modal" class="text-slate-400 hover:text-slate-900 transition-colors p-2">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <div class="space-y-5 mb-6">
                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Un régime pluviométrique en mutation</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        Les précipitations en Guadeloupe, essentielles pour nos réserves en eau douce et l'agriculture, montrent des <strong class="font-semibold text-slate-900">signes inquiétants de variabilité accrue</strong>. Si le cumul annuel global reste fluctuant, la répartition des pluies change.
                    </p>
                </div>

                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Alternance sécheresses et déluges</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        On observe une tendance à l'alternance d'épisodes de <strong class="font-semibold text-slate-900">sécheresses plus longues</strong> et d'épisodes pluvieux <strong class="font-semibold text-slate-900">plus intenses et concentrés</strong>. Cette dysharmonie pose des problèmes pour la recharge des nappes phréatiques et augmente les risques d'inondations éclairs.
                    </p>
                </div>

                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Un enjeu vital</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        Comprendre ces cycles est crucial pour l'aménagement du territoire et la gestion de la ressource en eau. La maîtrise de ces aléas devient une priorité absolue pour la résilience de l'archipel.
                    </p>
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button id="close-precip-modal-btn" class="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors shadow-lg hover:shadow-xl">
                    Découvrir
                </button>
            </div>
        </div>
    </div>
