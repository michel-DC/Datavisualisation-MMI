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

<body class="bg-gray-50 overflow-hidden h-screen w-screen selection:bg-blue-100 selection:text-blue-900">

    <?php require_once 'animations/animation-debut.php'; ?>

    <div class="flex h-screen w-screen">
        <?php require_once 'utils/sidebar.php'; ?>

        <main class="flex-1 h-full relative ml-[220px] bg-sky-50">
            <?php require_once 'sections/meteo.php'; ?>
            <?php require_once 'sections/emissions.php'; ?>
            <?php require_once 'sections/projections.php'; ?>
        </main>
    </div>

    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- Scripts -->
    <script src="/script/sidebar.js"></script>
    <script src="/script/meteo.js"></script>
    <script src="/script/emissions.js"></script>
    <script src="/script/projections.js"></script>
</body>

</html>