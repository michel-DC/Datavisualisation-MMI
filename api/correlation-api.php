<?php
declare(strict_types=1);

require_once '../utils/climate-data.php';

header('Content-Type: application/json');

try {
    // 1. Récupérer les températures (TM)
    $temps = getClimateDataByZone('temperatures', 'TM');

    // 2. Récupérer les précipitations (RR)
    $precips = getClimateDataByZone('precipitations', 'RR');

    // 3. Fusionner les données pour le client
    // On veut une structure qui permet facilement de croiser les données en JS
    // Structure de retour : { cities: [...], data: { "Zone": { "YYYYMM": { tm: 25.5, rr: 120.4 } } } }

    $mergedData = [];
    $allZones = array_unique(array_merge(array_keys($temps), array_keys($precips)));

    foreach ($allZones as $zone) {
        if (!isset($mergedData[$zone])) {
            $mergedData[$zone] = [];
        }

        // Parcourir les années disponibles dans les températures
        if (isset($temps[$zone])) {
            foreach ($temps[$zone] as $year => $months) {
                foreach ($months as $month => $tmVal) {
                    $key = sprintf("%04d%02d", $year, $month);
                    $mergedData[$zone][$key]['tm'] = $tmVal;
                }
            }
        }

        // Parcourir les années disponibles dans les précipitations
        if (isset($precips[$zone])) {
            foreach ($precips[$zone] as $year => $months) {
                foreach ($months as $month => $rrVal) {
                    $key = sprintf("%04d%02d", $year, $month);
                    $mergedData[$zone][$key]['rr'] = $rrVal;
                }
            }
        }
    }

    // Nettoyage : On ne garde que les points complets (TM ET RR)
    $cleanData = [];
    foreach ($mergedData as $zone => $dates) {
        foreach ($dates as $date => $values) {
            if (isset($values['tm']) && isset($values['rr']) && $values['tm'] !== null && $values['rr'] !== null) {
                // On transforme la date YYYYMM en objet plus lisible si besoin, ou on garde tel quel
                $cleanData[$zone][] = [
                    'date' => $date,
                    'year' => (int)substr((string)$date, 0, 4),
                    'month' => (int)substr((string)$date, 4, 2),
                    'tm' => $values['tm'],
                    'rr' => $values['rr']
                ];
            }
        }
    }

    echo json_encode([
        'zones' => array_keys($cleanData),
        'data' => $cleanData
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
