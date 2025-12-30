<?php
declare(strict_types=1);

require_once '../database/database.php';

header('Content-Type: application/json');

try {
    $pdo = connexionDB();

    $query = "SELECT type_emission, annee, valeur FROM emissions";
    $result = mysqli_query($pdo, $query);

    if (!$result) {
        throw new Exception(mysqli_error($pdo));
    }

    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $row['annee'] = (int)$row['annee'];
        $row['valeur'] = (float)$row['valeur'];
        $data[] = $row;
    }

    echo json_encode($data);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
