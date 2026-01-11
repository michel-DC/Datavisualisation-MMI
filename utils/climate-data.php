<?php

declare(strict_types=1);

require_once __DIR__ . '/../database/database.php';
require_once __DIR__ . '/zones-config.php';

function findZoneForStation(string $numPoste, string $nomUsel): ?string
{
    foreach (ZONES as $zoneName => $stations) {
        if (in_array($numPoste, $stations, true) || in_array($nomUsel, $stations, true)) {
            return $zoneName;
        }
    }
    return null;
}

/**
 * Récupère les données climatiques agrégées par Zone, Année et Mois.
 * Fait la moyenne des stations d'une même zone pour chaque mois.
 * 
 * @param string $tableName Nom de la table (precipitations, temperatures, rayonnements)
 * @param string|array $valueColumns Nom de la colonne ou tableau de colonnes (ex: 'RR' ou ['TX', 'TN'])
 * @return array Structure [Zone][Annee][Mois] = Valeur(s)
 */
function getClimateDataByZone(string $tableName, $valueColumns): array
{
    $link = connexionDB();

    $allowedTables = ['precipitations', 'temperatures', 'rayonnements'];
    if (!in_array($tableName, $allowedTables, true)) {
        return [];
    }

    $cols = is_array($valueColumns) ? $valueColumns : [$valueColumns];
    foreach ($cols as $col) {
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $col)) return [];
    }

    $idColumn = ($tableName === 'precipitations') ? 'z' : 'NUM_POSTE';
    $nameColumn = 'NOM_USUEL';

    // Construction de la requête
    $colsSelect = [];
    foreach ($cols as $col) {
        $colsSelect[] = "`$col`";
    }
    $colsSql = implode(', ', $colsSelect);

    $query = "SELECT `$idColumn` as ID, `$nameColumn` as NOM, AAAAMM, $colsSql FROM `$tableName`";
    $result = mysqli_query($link, $query);

    if (!$result) {
        return [];
    }

    // 1. Regroupement des valeurs brutes par Zone/Année/Mois
    // Structure temporaire : $raw[Zone][Annee][Mois][Col] = [val1, val2, ...]
    $raw = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $idStation = (string)$row['ID'];
        $nomStation = (string)$row['NOM'];
        $date = (string)$row['AAAAMM']; // Ex: 202301

        $year = (int)substr($date, 0, 4);
        $month = (int)substr($date, 4, 2);

        $zone = findZoneForStation($idStation, $nomStation);

        if ($zone !== null) {
            foreach ($cols as $col) {
                $val = ($row[$col] !== null) ? (float)$row[$col] : null;
                if ($val !== null) {
                    $raw[$zone][$year][$month][$col][] = $val;
                }
            }
        }
    }

    // 2. Calcul des moyennes par zone pour chaque mois
    $finalData = [];
    $allZones = array_keys(ZONES);

    // Initialiser toutes les zones pour qu'elles existent dans le JSON final
    foreach ($allZones as $z) {
        $finalData[$z] = [];
    }

    foreach ($raw as $zone => $years) {
        foreach ($years as $year => $months) {
            foreach ($months as $month => $columns) {
                // Pour chaque colonne demandée (ex: TX, TN), on fait la moyenne des stations
                $aggregatedValues = [];
                foreach ($columns as $col => $values) {
                    if (count($values) > 0) {
                        $avg = array_sum($values) / count($values);
                        $aggregatedValues[$col] = round($avg, 1);
                    } else {
                        $aggregatedValues[$col] = null;
                    }
                }

                // Si on a demandé une seule colonne, on retourne la valeur directement
                // Sinon on retourne un objet {TX: 20, TN: 10}
                if (count($cols) === 1) {
                    $finalData[$zone][$year][$month] = array_values($aggregatedValues)[0];
                } else {
                    $finalData[$zone][$year][$month] = $aggregatedValues;
                }
            }
            // Trier les mois
            if (isset($finalData[$zone][$year])) {
                ksort($finalData[$zone][$year]);
            }
        }
        // Trier les années
        ksort($finalData[$zone]);
    }

    return $finalData;
}
