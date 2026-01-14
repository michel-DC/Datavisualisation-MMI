<?php

declare(strict_types=1); ?>
<?php require_once 'utils/utils.php'; ?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le changement climatique en Guadeloupe</title>
    <link rel="shortcut icon" href="assets/favicon/drapeau.svg" type="image/x-icon">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/styles/index.css">

</head>

<body class="bg-[#f2f2f2] overflow-hidden h-screen w-screen selection:bg-black selection:text-white font-sans antialiased">

    <?php require_once 'animations/animation-debut.php'; ?>

    <div class="flex h-screen w-screen">
        <?php require_once 'utils/sidebar.php'; ?>

        <main class="flex-1 h-full relative ml-[120px] p-6">
            <div class="w-full h-full bg-white rounded-3xl border border-[#e5e5e5] relative overflow-hidden shadow-sm">
                <?php require_once 'sections/evolution-temperatures.php'; ?>

                <?php require_once 'sections/evolution-precipitations.php'; ?>

                <?php require_once 'sections/rayonnement.php'; ?>


                <?php require_once 'sections/correlation.php'; ?>

                <?php require_once 'sections/regression-lineaire.php'; ?>
            </div>
        </main>
    </div>

    <div id="temp-info-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-4 p-8 transform scale-95 transition-transform duration-300 max-h-[85vh] overflow-y-auto" id="temp-modal-content">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h2 class="text-3xl font-black text-slate-900 mb-2">Évolution Des Températures</h2>
                    <div class="h-1 w-20 bg-rose-700 rounded-full"></div>
                </div>
                <button id="close-temp-modal" class="text-slate-400 hover:text-slate-900 transition-colors p-2">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <div class="space-y-5 mb-6">
                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Un archipel face au réchauffement</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        Depuis 1950, l'archipel guadeloupéen connaît une <strong class="font-semibold text-slate-900">transformation climatique progressive mais inexorable</strong>. Les relevés météorologiques témoignent d'une hausse constante des températures moyennes, redéfinissant peu à peu les normales saisonnières qui caractérisaient autrefois le climat tropical de l'île.
                    </p>
                </div>

                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Des impacts multiples et concrets</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        Cette évolution ne se limite pas à de simples chiffres. Elle se traduit par une <strong class="font-semibold text-slate-900">multiplication des nuits tropicales</strong> (températures minimales supérieures à 25°C) et une fréquence accrue des épisodes caniculaires. Ces changements affectent directement l'agriculture locale, fragilisent la biodiversité endémique et posent de nouveaux défis en matière de santé publique.
                    </p>
                </div>

                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Une accélération préoccupante</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        L'analyse des données sur sept décennies révèle une <strong class="font-semibold text-slate-900">accélération notable du phénomène depuis les années 1990</strong>. Cette tendance s'inscrit dans le contexte plus large du réchauffement climatique global, dont les petites îles tropicales sont parmi les premières victimes.
                    </p>
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button id="close-temp-modal-btn" class="px-6 py-2.5 bg-rose-700 text-white rounded-xl font-semibold hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
                    Découvrir
                </button>
            </div>
        </div>
    </div>

    <div id="precip-info-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-4 p-8 transform scale-95 transition-transform duration-300 max-h-[85vh] overflow-y-auto" id="precip-modal-content">
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

    <!-- Correlation Modal -->
    <div id="corr-info-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-4 p-8 transform scale-95 transition-transform duration-300 max-h-[85vh] overflow-y-auto" id="corr-modal-content">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h2 class="text-3xl font-black text-slate-900 mb-2">Corrélation Température / Pluie</h2>
                    <div class="h-1 w-20 bg-purple-600 rounded-full"></div>
                </div>
                <button id="close-corr-modal" class="text-slate-400 hover:text-slate-900 transition-colors p-2">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <div class="space-y-5 mb-6">
                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Une relation complexe</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        L'analyse de corrélation vise à déterminer s'il existe un lien statistique entre l'augmentation des températures et les variations pluviométriques.
                    </p>
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button id="close-corr-modal-btn" class="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition-colors shadow-lg hover:shadow-xl">
                    Comprendre
                </button>
            </div>
        </div>
    </div>

    <!-- Regression Modal -->
    <div id="reg-info-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-4 p-8 transform scale-95 transition-transform duration-300 max-h-[85vh] overflow-y-auto" id="reg-modal-content">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h2 class="text-3xl font-black text-slate-900 mb-2">Modèle de Prédiction</h2>
                    <div class="h-1 w-20 bg-slate-800 rounded-full"></div>
                </div>
                <button id="close-reg-modal" class="text-slate-400 hover:text-slate-900 transition-colors p-2">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <div class="space-y-5 mb-6">
                <div>
                    <h3 class="text-base font-bold text-slate-900 mb-2">Anticiper l'avenir</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        La régression linéaire permet de tracer une tendance générale et de formuler des hypothèses sur l'évolution future du climat en fonction des données historiques actuelles.
                    </p>
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button id="close-reg-modal-btn" class="px-6 py-2.5 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl">
                    Explorer
                </button>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- GSAP Core & Plugins -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <!-- Scripts -->
    <script src="script/sidebar.js"></script>
    <script src="script/evolution-temperatures.js"></script>
    <script src="script/evolution-precipitations.js"></script>
    <script src="script/rayonnement.js"></script>
    <script src="script/correlation.js"></script>
    <script src="script/regression-lineaire.js"></script>

</body>

</html>