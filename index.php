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

<body class="bg-[#f2f2f2] overflow-hidden h-screen w-screen selection:bg-black selection:text-white font-sans antialiased">

    <?php require_once 'animations/animation-debut.php'; ?>

    <div class="flex h-screen w-screen">
        <?php require_once 'utils/sidebar.php'; ?>

        <main class="flex-1 h-full relative ml-[120px] p-6">
            <div class="w-full h-full bg-white rounded-3xl border border-[#e5e5e5] relative overflow-hidden shadow-sm">
                <?php require_once 'sections/evolution-temperatures.php'; ?>

                <?php require_once 'sections/evolution-precipitations.php'; ?>


                <?php require_once 'sections/correlation.php'; ?>

                <?php require_once 'sections/regression-lineaire.php'; ?>
            </div>
        </main>
    </div>

    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- GSAP Core & Plugins -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <!-- Scripts -->
    <script src="script/sidebar.js"></script>
    <script src="script/evolution-temperatures.js"></script>
    <script src="script/evolution-precipitations.js"></script>
    <script src="script/correlation.js"></script>
    <script src="script/regression-lineaire.js"></script>

</body>

</html>