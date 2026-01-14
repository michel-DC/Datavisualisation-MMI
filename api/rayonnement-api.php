<?php
declare(strict_types=1);

require_once '../utils/climate-data.php';

header('Content-Type: application/json');

try {
    // Récupération de l'historique complet
    $fullData = getClimateDataByZone('rayonnements', 'GLOT');
    
    $latestData = [];

    // Pour chaque zone, on calcule le cumul sur la dernière année disponible
    foreach ($fullData as $zone => $years) {
        if (empty($years)) {
            $latestData[$zone] = null;
            continue;
        }

        // Récupérer la dernière année
        $lastYearKey = array_key_last($years);
        $months = $years[$lastYearKey];

        if (empty($months)) {
            $latestData[$zone] = null;
            continue;
        }

        $sum = 0;
        $count = 0;

        foreach ($months as $val) {
            if ($val !== null) {
                $sum += $val;
                $count++;
            }
        }

        if ($count > 0) {
            // On affiche le cumul total
            $label = ($count < 12) ? "Cumul partiel ($count mois)" : "Cumul Annuel";
            
            $latestData[$zone] = [
                'value' => $sum, // Pas d'arrondi nécessaire si c'est des entiers, mais au cas où : round($sum, 1)
                'year' => (string)$lastYearKey,
                'month' => $label
            ];
        } else {
            $latestData[$zone] = null;
        }
    }
    
    echo json_encode([
        'data' => $latestData
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
