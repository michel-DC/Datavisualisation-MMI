<?php

declare(strict_types=1); ?>
<section id="section-rayonnement" class="section absolute inset-0 w-full h-full bg-white text-[#1a1a1a] overflow-hidden flex flex-col p-12 hidden">
    <!-- Header -->
    <div class="flex-none flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
        <div>
            <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Climat et Énergie</h2>
            <h1 class="text-5xl font-medium tracking-tight">Rayonnement Solaire en Guadeloupe</h1>
        </div>

        <!-- Legend / Info (Static for now) -->
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span class="text-xs font-medium text-gray-500">Intensité solaire</span>
            </div>
        </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col min-h-0 overflow-hidden relative">

        <!-- Map Container -->
        <div class="flex-1 flex items-center justify-center bg-[#fafafa] rounded-xl border border-gray-100 p-8 min-h-0 relative overflow-hidden">

            <!-- Instruction text -->
            <div class="absolute top-6 left-6 z-10 pointer-events-none">
                <h3 class="text-lg font-semibold mb-1">Carte Interactive</h3>
                <p class="text-sm text-gray-500 max-w-xs">Cliquez sur une zone géographique pour consulter le dernier relevé de rayonnement global (J/cm²).</p>
            </div>

            <div class="relative w-full h-full flex items-center justify-center">
                <svg id="guadeloupe-map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1417.32 1417.32" class="w-auto h-[85%] max-h-[600px] drop-shadow-xl">
                    <defs>
                        <style>
                            .zone-path {
                                fill: #f1f5f9;
                                stroke: #fff;
                                stroke-width: 4px;
                                transition: all 0.3s ease-out;
                                cursor: pointer;
                                vector-effect: non-scaling-stroke;
                            }

                            .zone-path:hover {
                                fill: #fcd34d;
                                /* yellow-300 */
                                stroke: #fbbf24;
                                /* yellow-400 */
                            }

                            .zone-path.active {
                                fill: #fbbf24;
                                /* yellow-400 */
                                stroke: #d97706;
                                /* yellow-600 */
                            }
                        </style>
                    </defs>
                    <polygon class="zone-path" data-zone="Basse-Terre" points="484.45 541.37 473.74 530.51 452.4 533.97 435.95 547.42 427.73 566.57 409.91 548.28 404.51 541.37 397.26 547.29 397.06 549.07 394.49 547.13 380.4 541.37 404.51 530.51 375.5 494.87 317.26 463.91 254.66 442.03 212.18 433.75 195.18 425.76 184.04 410.34 168.3 400.27 136.8 408.49 112.34 429.44 83.86 479.9 67.29 494.23 73.22 517.48 66.45 572.62 67.29 602.83 76.54 621.84 89.95 640.83 97.68 662.21 89.47 688.54 114.68 751.93 116.07 891.29 136.8 953.92 151.44 963.63 158.49 980.24 164.57 1000.52 176.93 1021.43 196.83 1039.32 214.24 1050.75 229.16 1063.99 241.19 1087.7 228.54 1099.77 238.49 1125.57 241.19 1135.91 328.65 1098.48 406.66 1051.9 460.13 986.92 474.16 893.6 462.55 797.09 440.93 735.24 437.27 653.21 448.8 635.07 479.48 628.1 490.74 624.71 478.09 589.67 488.68 550.16 484.45 541.37" />
                    <polygon class="zone-path" data-zone="La Désirade" points="1391.27 354.58 1329.74 335.56 1271.54 359.36 1177.01 440.06 1145.56 457.04 1200.84 464.98 1269.69 435.79 1391.27 354.58" />
                    <polygon class="zone-path" data-zone="Marie-Galante" points="1181.67 983.03 1175.87 959.84 1162.95 945.61 1150.09 935.08 1130.18 883.98 1096.03 854.63 1054.11 845.17 1016.52 866.19 985.5 901.57 973.4 920.76 968.45 946.48 951.95 970.17 944.69 983.25 950.35 989.13 956.58 994.15 962.43 1006.21 966.71 1020.51 968.45 1032.28 990.94 1078.7 1042.78 1087.13 1101.47 1072.74 1144.36 1051.1 1164.07 1035.34 1175.24 1021.38 1180.49 1005.32 1181.67 983.03" />
                    <polygon class="zone-path" data-zone="Grande-Terre" points="630.19 152.38 625.63 157.89 575.38 185.21 559.77 196.66 553.16 207.76 527.63 238.44 513.55 260.5 514.28 277.19 521.88 292.36 530.94 352.87 543.9 355.76 557.39 361.21 568.71 368.31 575.38 375.9 577.03 387.26 576.57 403.05 574.05 417.25 569.82 423.23 539.81 430.47 524.33 449.29 497.62 537.81 497.62 537.94 497.48 538.09 491.33 562.34 490.74 584.38 497.62 605.32 514.28 626.11 536.1 643.74 563.74 660.14 595.75 672.67 630.78 678.66 659.55 674.04 714.37 649.66 1000.8 583.97 1026.13 590.86 1038.5 596.78 1084.11 607.93 1097.73 608.21 1115.99 592.91 1106.86 583.28 1075.66 574.59 987.58 512.75 970.65 504.19 961.06 497.73 925.81 467.55 910.22 457.97 891.57 454.86 875.04 455.49 859.3 454.24 842.63 445.36 831.4 457.97 807.93 445.14 787.5 430.68 769.77 412.49 753.76 388.58 741.28 362.05 738.83 345.29 742.79 300.83 735.65 256.15 716.48 221.2 688.19 192.86 635.42 154.59 630.19 152.38" />
                </svg>
            </div>
        </div>
    </div>

    <!-- Popup / Modal -->
    <div id="rayonnement-popup" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-80 opacity-0 pointer-events-none transition-all duration-300 z-50 border border-gray-100">
        <div class="flex justify-between items-start mb-4">
            <h3 id="popup-zone-title" class="text-lg font-bold text-black uppercase tracking-wide">Zone</h3>
            <button id="close-popup" class="text-gray-400 hover:text-black transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <div class="space-y-4">
            <div id="popup-data-container" class="bg-[#fafafa] rounded-lg p-4 border border-gray-100">
                <p class="text-xs text-gray-400 font-bold uppercase mb-1">Rayonnement Global</p>
                <div class="flex items-baseline gap-1">
                    <span id="popup-value" class="text-4xl font-medium text-black tracking-tight">--</span>
                    <span class="text-sm font-medium text-gray-500">J/cm²</span>
                </div>
            </div>

            <p id="popup-date" class="text-xs text-gray-400 font-medium text-center uppercase tracking-wider">
                --
            </p>
        </div>
    </div>
</section>