# PRD — SAE 303 Datavisualisation

## 1. Contexte du projet

Ce projet s’inscrit dans le cadre de la SAE 303 (Datavisualisation) du BUT MMI.  
L’objectif est de concevoir un site web en **single page non scrollable**, présentant une **analyse de données climatiques** sous forme de graphiques interactifs.

Le sujet traité est le **changement climatique en Guadeloupe**, à partir de jeux de données publics fournis par l’État français (format CSV).

Le projet accorde une importance majeure à :

- la clarté du message transmis par les données,
- la qualité de la mise en forme visuelle,
- la fluidité des interactions et des animations.

La partie technique est importante, mais elle doit toujours servir la compréhension des données et l’expérience utilisateur.

---

## 2. Objectifs du site

### Objectif principal

Présenter une analyse claire, structurée et visuelle du changement climatique en Guadeloupe à travers **5 graphiques distincts**, chacun correspondant à un axe d’analyse précis.

### Objectifs secondaires

- Rendre les données compréhensibles pour un public non expert
- Mettre en valeur les tendances climatiques locales
- Proposer une expérience immersive et fluide sans scroll
- Concevoir une interface de type **dashboard** minimaliste et élégante

---

## 3. Stack technique

Le projet utilise exclusivement les technologies suivantes :

- **PHP** (structure du site, composants, includes)
- **Tailwind CSS** (mise en page, typographie, spacing)
- **Chart.js** (datavisualisation)
- **GSAP** (animations avancées et interactions)
- **Lucide Icons** (icônes de l’interface)

Toutes les règles de développement et conventions de code sont définies dans le fichier `AGENTS.md` et doivent être strictement respectées.

---

## 4. Contraintes globales

### 4.1 Single page non scrollable

- Aucune barre de scroll verticale ou horizontale
- Tout le contenu doit tenir dans le viewport
- Les changements de contenu se font par **affichage / masquage de sections**
- Les transitions entre sections doivent être animées (GSAP)

### 4.2 Architecture générale

- `index.php`  
  Page principale, point d’entrée du site

- `/sections/`  
  Contient toutes les sections du site  
  Une section = un graphique + son contenu éditorial

- `/utils/sidebar.php`  
  Contient la sidebar de navigation

- `/script/`  
  Contient un fichier JavaScript par graphique  
  Un script = un graphique Chart.js

---

## 5. Structure de navigation (Sidebar)

### 5.1 Concept

Le site est structuré comme un **dashboard** avec une sidebar positionnée à droite de l’écran.

- Par défaut :

  - La sidebar est compacte
  - Seules les icônes (Lucide Icons) sont visibles

- Au hover :
  - La sidebar se déploie horizontalement
  - Les labels textuels des icônes apparaissent
  - L’animation doit être fluide et maîtrisée (GSAP)

### 5.2 Comportement

- Chaque icône correspond à une section
- Au clic sur une icône :
  - La section actuellement visible est masquée
  - La section ciblée est affichée
  - Une animation de transition est jouée
- Une seule section est visible à la fois

---

## 6. Sections et contenu

Le site comporte **5 sections**, correspondant aux axes d’analyse suivants :

1. Évolution des températures
2. Précipitations et événements climatiques
3. Projections climatiques futures
4. Émissions de gaz à effet de serre
5. Vulnérabilité climatique de la Guadeloupe

Chaque section doit contenir :

- Un titre clair et explicite
- Un court texte d’interprétation
- Un graphique Chart.js
- Des animations liées à l’apparition et à l’interaction

Les sections doivent être conçues comme des modules indépendants.

---

## 7. Graphiques et scripts

- Chaque graphique possède son **script dédié**
- Les scripts sont placés dans le dossier `/script`
- Un script ne gère qu’un seul graphique
- Les données sont issues de fichiers CSV
- Les graphiques doivent être lisibles, épurés et cohérents entre eux

---

## 8. Direction artistique et UX/UI

### 8.1 Style visuel

Le style du site doit être :

- Minimaliste
- Très lisible
- Élégant et rigoureux

Contraintes strictes :

- Aucun gradient autorisé
- Palette de couleurs sobre et cohérente
- Gros titres et typographie marquée
- Espaces maîtrisés et alignements précis

L’harmonie visuelle est une priorité absolue.

### 8.2 Animations et interactions

- Les animations GSAP doivent être :
  - Fluides
  - Naturelles
  - Justifiées par l’expérience utilisateur
- Animations complexes autorisées, mais jamais décoratives
- Chaque interaction doit améliorer la compréhension ou la navigation

---

## 9. Principes directeurs

- La donnée est au centre du projet
- Le design sert le sens, jamais l’inverse
- Chaque graphique doit transmettre un message clair
- L’interface doit être intuitive sans nécessiter d’explication
- La cohérence globale prime sur l’effet visuel isolé

---

## 10. Hors périmètre

- Aucun scroll
- Aucun effet visuel gratuit
- Aucun composant non justifié
- Aucun écart aux règles définies dans `AGENTS.md`

---

## 11. Résumé

Ce projet vise à produire un **dashboard de datavisualisation climatique**, sobre, immersif et rigoureux, mettant en valeur des données publiques à travers une expérience utilisateur fluide et maîtrisée, sans scroll, avec une navigation latérale animée et une direction artistique minimaliste.
