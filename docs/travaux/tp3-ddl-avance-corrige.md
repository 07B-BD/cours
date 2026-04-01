---
title: "TP3 - Corrige enseignant"
aside: true
---

# TP3 - Notes de correction et resolution

## Vue d'ensemble

Le TP repose sur un incident volontairement tres localise autour de la salle **B-204 - Salle Boreale** le **17 fevrier 2026 a 08:15**.

Le coeur de l'incident est :

- une consommation anormale de la cafetiere `CAF-B204`
- un log critique contenant le motif `vapeur_cafe`
- une porte ensuite verrouillee
- une imprimante redemarree en boucle
- un compte partage `maintenance_nuit` avec un acces de type `admin`
- des mots de passe stockes en clair dans `utilisateur_systeme`

Le script de depart contient :

- 8 salles
- 36 equipements
- 57 capteurs
- 456 lectures
- 16 decisions IA
- 16 logs
- 5 comptes applicatifs

## Indices attendus

| # | Notion principale | Resultat attendu | Indice a remettre |
|---|---|---|---|
| 1 | Regex sur `code_log` | Premier log `ALR-IA-204` a `2026-02-17 08:15:00` | `08:15` |
| 2 | `regexp_match` sur `message` | `B-204` | `B-204` |
| 3 | `regexp_match` sur `motif` | `vapeur_cafe` | `vapeur_cafe` |
| 4 | Regex + extraction utilisateur | `maintenance_nuit` apparait dans les logs de securite | `maintenance_nuit` |
| 5 | Jointure `equipement` + `salle` | `CAF-B204`, type `cafetiere`, salle `Salle Boreale` | `cafetiere` et `Salle Boreale` |
| 6 | Jointures multi-tables | Premiere action en B-204 : `verrouiller` sur `POR-B204` | `verrouille la porte` |
| 7 | Jointures + filtrage | Equipement relance : `IMP-B204` | `redemarre l'imprimante en boucle` |
| 8 | Sous-requete correlee avec `AVG` | `CAF-B204`, `CAP-CON-028-02`, `08:15`, `1820.00` | `CAF-B204` |
| 9 | Sous-requete correlee avec comparaison de comptes | `IMP-B204`, 3 decisions, salle `B-204` | `imprimante` |
| 10 | Sous-requete correlee avec `not exists` | `POR-B204`, salle `B-204` | `porte restee verrouillee` |
| 11 | DDL maintenance | contrainte `salle_code_uq` ajoutee | `codes de salle non controles` |
| 12 | DDL maintenance + regex | contrainte `capteur_code_format_ck` ajoutee | `codes capteurs non verifies` |
| 13 | DDL maintenance | `lecture_capteur_capteur_fk` recreee avec `on delete cascade` | `maintenance de la FK capteur -> lectures` |
| 14 | `pgcrypto` + hachage | plus de colonne mot de passe en clair | `mots de passe en clair` |
| 15 | Contraintes sur `utilisateur_systeme` | `not null`, `unique`, `check` en place | `compte partage mal encadre` |
| 16 | Roles et privileges | separation claire admin / enqueteur / technicien | `droits d'admin` |

## Resolution finale attendue

Version courte :

> La `vapeur_cafe` de la `cafetiere` en `Salle Boreale (B-204)` a declenche l'alerte a `08:15`. ARGUS a ensuite `verrouille la porte` puis `redemarre l'imprimante en boucle`. Le chaos a ete aggrave par le compte partage `maintenance_nuit`, ses `droits d'admin` et les `mots de passe en clair`.

Version de narration enseignant :

Le 17 fevrier 2026 a 08:15, la cafetiere connectee `CAF-B204` de la salle Boreale a produit une pointe de consommation anormale.
ARGUS l'a interpretee comme une anomalie critique de type `vapeur_cafe`, puis a declenche une chaine de reactions excessives :

- alerte critique
- verrouillage de la porte
- extinction des lumieres
- redemarrages repetes de l'imprimante
- tentative d'autonettoyage

La situation a ete rendue pire par deux faiblesses de securite clairement visibles dans la base :

- le compte partage `maintenance_nuit` disposait d'un acces de niveau `admin`
- les mots de passe de `utilisateur_systeme` etaient stockes en clair

## Notes pedagogiques

- La partie A reste noire et blanche : on filtre et on extrait des morceaux stables.
- La partie B oblige a relier correctement les tables sans interpretation excessive.
- La partie C force explicitement la sous-requete correlee, comme demande par le module.
- La partie D corrige des validations manquantes sans rendre les donnees de depart invalides.
- La partie E reconnecte tres directement le module de securite au scenario.

## Verification rapide du jeu de donnees

Quelques reperes utiles pendant la correction :

- `CAF-B204` a l'identifiant `28`
- `IMP-B204` a l'identifiant `29`
- `POR-B204` a l'identifiant `25`
- le capteur de consommation anormal est `CAP-CON-028-02`
- la salle de l'incident est au 2e etage
- `maintenance_nuit` est le seul compte partage clairement problematique
