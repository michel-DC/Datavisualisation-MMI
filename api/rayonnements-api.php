<?php
declare(strict_types=1);

require_once __DIR__ . '/../utils/climate-data.php';

header('Content-Type: application/json');

try {
    $data = getClimateDataByZone('rayonnements', 'GLOT');
    echo json_encode($data);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}