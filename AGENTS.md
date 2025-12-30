# AGENTS.md - Règles de développement PHP

> **📋 Contexte du projet** : Pour comprendre le contexte complet, les objectifs et les requirements du projet, consultez le fichier `PRD.md`.

---

## 🎯 Principes fondamentaux

### Environnement de développement

- Serveur de développement : `php -S localhost:3000`
- Dépendances : Aucune dépendance externe (PHP pur).

### Code sans commentaires

- **INTERDICTION ABSOLUE** : Aucun commentaire dans le code produit.
- Le code doit être auto-documenté via des noms explicites.
- Utiliser des noms de variables et de fonctions descriptifs.
- Si le code nécessite un commentaire, il doit être refactoré pour être plus clair.

### Philosophie du code

- **Minimaliste** : Écrire le minimum de code nécessaire.
- **Explicite** : Préférer la clarté à la concision.
- **DRY** : Don't Repeat Yourself - factoriser systématiquement.
- **KISS** : Keep It Simple, Stupid - éviter la sur-ingénierie.
- **YAGNI** : You Aren't Gonna Need It - ne pas anticiper les besoins futurs.

---

## 📐 Standards PHP

### Typage strict et Organisation

- **OBLIGATOIRE** : Démarrer chaque fichier PHP avec `declare(strict_types=1);`.
- **OBLIGATOIRE** : Typer les paramètres et les valeurs de retour des fonctions.
- Utiliser les standards de nommage PSR-12 :
    - `PascalCase` pour les classes.
    - `camelCase` pour les méthodes et fonctions.
    - `UPPER_CASE_SNAKE_CASE` for constantes.
- Séparer la logique (PHP) de la présentation (HTML). Le début du fichier traite les données, la fin du fichier les affiche.

```php
<?php
declare(strict_types=1);

// Logique du script ici (calculs, récupération de données...)
function getPageTitle(string $pageName): string {
    return "Mon Site | " . $pageName;
}

$title = getPageTitle("Accueil");

// La partie affichage commence après la logique
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <title><?= htmlspecialchars($title) ?></title>
</head>
<body>
    <h1>Titre de la page</h1>
</body>
</html>
```

---

## 🎨 Standards CSS

### Principes

- **OBLIGATOIRE** : Utiliser des classes claires et sémantiques.
- **RECOMMANDÉ** : Adopter une méthodologie comme BEM (Block, Element, Modifier) pour une structure claire.
- Responsive-first (mobile d'abord).
- Grouper les propriétés CSS de manière logique (Positionnement, Box Model, Typographie, Visuel, Autre).

```css
/* Exemple BEM */
.card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card__button--primary {
    background-color: blue;
    color: white;
}
```

### Responsive design

- Utiliser les media queries pour adapter le design.
- **BREAKPOINTS** :
    - Styles par défaut = mobile
    - `min-width: 768px` : Tablettes
    - `min-width: 1024px` : Desktop

---

## 🛡️ Sécurité (OWASP Top 10)

### Validation et Échappement des Données

**OBLIGATOIRE** : Ne jamais faire confiance aux données utilisateur.

1.  **VALIDER** à l'entrée : Utiliser `filter_input` ou `filter_var`.
2.  **ÉCHAPPER** à la sortie : Utiliser `htmlspecialchars` pour l'affichage dans du HTML.

```php
// 1. Valider une entrée POST
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if ($email === false) {
    // Gérer l'erreur d'email invalide
}

// 2. Afficher une donnée en toute sécurité
$username = $_GET['username']; // Supposons qu'on récupère un nom
echo "<p>Bonjour, " . htmlspecialchars($username, ENT_QUOTES, 'UTF-8') . " !</p>";
```

### Protection contre les injections SQL

**OBLIGATOIRE** : Utiliser les requêtes préparées avec PDO ou MySQLi.

**INTERDIT** : Insérer des variables directement dans les requêtes SQL.

```php
// Exemple avec PDO (recommandé)
$id = $_GET['id']; // ID venant de l'URL

// NE JAMAIS FAIRE ÇA :
// $statement = $pdo->query("SELECT * FROM users WHERE id = " . $id);

// FAIRE ÇA :
$statement = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$statement->execute(['id' => $id]);
$user = $statement->fetch();
```

### Protection contre le Cross-Site Scripting (XSS)

C'est le rôle de `htmlspecialchars()` lors de l'affichage. Voir le premier point de sécurité.

### Protection contre le Cross-Site Request Forgery (CSRF)

**OBLIGATOIRE** : Utiliser des jetons (tokens) CSRF dans tous les formulaires qui modifient des données.

1.  Générer un token et le stocker en session et dans un champ caché du formulaire.
2.  À la soumission, vérifier que le token du formulaire correspond à celui en session.

```php
// Dans la page du formulaire
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrf_token = $_SESSION['csrf_token'];

// Dans le HTML du formulaire :
// <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

// Dans la page de traitement du formulaire
session_start();
if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    die("Erreur CSRF !");
}
// Le token est valide, on peut continuer
```

### Variables d'environnement

**OBLIGATOIRE** : Ne jamais stocker de secrets (mots de passe BDD, clés API) dans le code.

- Utiliser un fichier `config.php` placé **en dehors du dossier racine du site web**.
- Inclure ce fichier de configuration au besoin.

```php
// /var/www/config/config.php (hors de la racine web)
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'db_user');
define('DB_PASS', 'mot_de_passe_secret');
define('DB_NAME', 'ma_base');

// /var/www/html/index.php (racine web)
<?php
require_once '/var/www/config/config.php';
// Maintenant, les constantes DB_* sont disponibles
```

---

## 📊 Performance

### Images

- Utiliser des formats modernes comme **WebP**.
- Compresser les images.
- Spécifier les attributs `width` et `height` sur les balises `<img>`.
- Utiliser l'attribut `loading="lazy"` pour les images sous la ligne de flottaison.

```html
<img src="/images/mon-image.webp" width="800" height="600" loading="lazy" alt="Description de l'image">
```

### Optimisation du chargement

- Placer les liens CSS (`<link>`) dans le `<head>`.
- Placer les scripts JS (`<script>`) juste avant la fin du `<body>`.
- Activer la compression Gzip/Brotli sur le serveur.
- Activer et configurer **OPcache** en production pour accélérer l'exécution de PHP.

---

## 🧩 Architecture et organisation

### Structure de dossiers

Basée sur la structure existante, voici une recommandation :

```
/
├── index.php               # Point d'entrée principal
├── /animations/            # Fichiers d'animation
├── /assets/                # CSS, JS, images, polices
├── /database/              # Connexion à la BDD
├── /utils/                 # Fonctions utilitaires
├── /includes/              # Morceaux de page réutilisables (header.php, footer.php)
└── /handlers/              # Scripts de traitement (form-handler.php)

```

### Nommage des fichiers

- Utiliser des noms en `kebab-case` ou `snake_case` pour les fichiers PHP.
- Ex : `contact.php`, `user-profile.php`, `process_form.php`.
- Préfixer les fichiers d'inclusion partielle avec `_` (ex: `_header.php`) est une convention courante.

### Constantes

**OBLIGATOIRE** : Extraire les valeurs "magiques" (chaînes de caractères, nombres répétés) dans des constantes.

```php
// Fichier utils/constants.php
<?php
define('MAX_MESSAGE_LENGTH', 1000);
define('SITE_NAME', 'Mon Super Site');

// Utilisation
require_once 'utils/constants.php';
echo "Bienvenue sur " . SITE_NAME;
```

---

## ♿ Accessibilité (WCAG)

- Fournir un attribut `alt` descriptif pour toutes les images.
- Utiliser des balises HTML sémantiques (`<header>`, `<main>`, `<nav>`, etc.).
- S'assurer que tous les éléments interactifs sont accessibles au clavier.
- Utiliser des `for` et `id` corrects pour lier les `<label>` aux `<input>`.
- Respecter les ratios de contraste de couleur.

```html
<label for="email_input">Adresse email :</label>
<input
  type="email"
  id="email_input"
  name="email"
  aria-required="true"
/>
```

### Mouvement réduit

Respecter la préférence de l'utilisateur pour un mouvement réduit avec une media query CSS.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🧪 Gestion d'erreur

**OBLIGATOIRE** : Configurer PHP pour ne pas afficher les erreurs aux utilisateurs en production.

- En développement: `error_reporting(E_ALL); ini_set('display_errors', 1);`
- En production: `ini_set('display_errors', 0); ini_set('log_errors', 1);`

Utiliser `try...catch` pour les opérations qui peuvent échouer (ex: connexion BDD, appels API).

```php
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // En production, logguer l'erreur
    error_log($e->getMessage());
    // Afficher un message générique à l'utilisateur
    include 'errors/500.php';
    exit;
}
```

---

## 📝 Formulaires

Combinaison de HTML et PHP pour un traitement sécurisé.

```php
<?php
declare(strict_types=1);
session_start();

$errors = [];
$name = '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Vérifier le token CSRF
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
        $errors[] = "Erreur de sécurité. Veuillez rafraîchir la page.";
    } else {
        // 2. Valider et nettoyer les données
        $name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS));
        if (empty($name)) {
            $errors[] = "Le nom est obligatoire.";
        }
    }

    // 3. Traiter si pas d'erreurs
    if (count($errors) === 0) {
        // Logique de sauvegarde ou d'envoi d'email...
        header("Location: /success.php");
        exit;
    }
}

// Générer un nouveau token pour le formulaire
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
?>

<form action="<?= htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">
    <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">

    <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" name="name" value="<?= htmlspecialchars($name) ?>">
        <?php if (isset($errors) && in_array("Le nom est obligatoire.", $errors)): ?>
            <p style="color:red;">Le nom est obligatoire.</p>
        <?php endif; ?>
    </div>

    <button type="submit">Envoyer</button>

    <?php if (count($errors) > 0 && in_array("Erreur de sécurité. Veuillez rafraîchir la page.", $errors)): ?>
        <p style="color:red;">Une erreur de sécurité est survenue. Veuillez réessayer.</p>
    <?php endif; ?>
</form>
```
---

## 🔍 SEO

### Métadonnées

Générez les balises dynamiquement en PHP dans le `<head>`.

```php
<?php
$pageTitle = "Ma Page de Service";
$pageDescription = "Description de mon service...";
?>
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($pageTitle) ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">
    <meta name="robots" content="index, follow">

    <!-- Open Graph (pour les réseaux sociaux) -->
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($pageDescription) ?>">
    <!-- etc. -->
</head>
```

### JSON-LD

Injectez un script JSON-LD dans le `<head>` pour les données structurées.

```php
<?php
$businessSchema = [
    "@context" => "https://schema.org",
    "@type" => "LocalBusiness",
    "name" => "Mon Entreprise",
    "telephone" => "+33123456789",
    // ... autres propriétés
];
?>
<script type="application/ld+json">
<?= json_encode($businessSchema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
</script>
```
