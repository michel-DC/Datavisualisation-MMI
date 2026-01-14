<?php
declare(strict_types=1);

require_once '../utils/climate-data.php';

header('Content-Type: application/json');

try {
    // Récupération des données agrégées par zone pour les températures moyennes (TM)
    $data = getClimateDataByZone('temperatures', 'TM');
    
    echo json_encode([
        'data' => $data
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}