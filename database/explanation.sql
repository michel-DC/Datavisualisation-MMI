CREATE TABLE `emissions` (
  `type_emission` varchar(56) DEFAULT NULL,
  `annee` int DEFAULT NULL,
  `valeur` varchar(11) DEFAULT NULL
)

CREATE TABLE `precipitations` (
  `z` int DEFAULT NULL,
  `NOM_USUEL` varchar(30) DEFAULT NULL,
  `AAAAMM` int DEFAULT NULL,
  `RR` decimal(5,1) DEFAULT NULL, --Le cumul mensuel des hauteurs de précipitations ce mois en millimètres
  `RR_ME` decimal(5,1) DEFAULT NULL, -- Le cumul estimé des hauteurs de précipitations ce mois en millimètres
  `RRAB` decimal(4,1) DEFAULT NULL -- Le cumul maximal  des précipitations tombés en 24h ce mois ci
)

CREATE TABLE `rayonnements` (
  `NUM_POSTE` int DEFAULT NULL,
  `NOM_USUEL` varchar(30) DEFAULT NULL,
  `AAAAMM` int DEFAULT NULL,
  `GLOT` int DEFAULT NULL -- Le cumul du rayonnement global en J/cm²
) 

CREATE TABLE `temperatures` (
  `NUM_POSTE` int DEFAULT NULL,
  `NOM_USUEL` varchar(30) DEFAULT NULL,
  `AAAAMM` int DEFAULT NULL,
  `TX` decimal(3,1) DEFAULT NULL, -- La température maximale
  `TN` decimal(3,1) DEFAULT NULL, -- La température minimale 
  `TM` decimal(3,1) DEFAULT NULL -- La température moyenne
)