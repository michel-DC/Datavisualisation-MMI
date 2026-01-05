<?php
declare(strict_types=1);

require_once '../utils/climate-data.php';

header('Content-Type: application/json');

try {
    // On récupère TX (Max) et TN (Min)
    $data = getClimateDataByZone('temperatures', ['TX', 'TN']);
    echo json_encode($data);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}