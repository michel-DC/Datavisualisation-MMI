<?php
declare(strict_types=1);

require_once '../utils/climate-data.php';

header('Content-Type: application/json');

try {
    // Récupération des données agrégées par zone pour les précipitations (RR)
    $data = getClimateDataByZone('precipitations', 'RR');
    
    echo json_encode([
        'data' => $data
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

