---
title: "TP3 - Incident dans l’immeuble intelligent"
---

# Travail Pratique #3 - Enquête SQL : l’IA trop zélée (15%)

- Modalité : Individuel
- Remise : fichier `.sql` sur LEA dans le travail concerné
- Date : voir le travail concerné sur LEA
- Retards : -10% par jour (max 3 jours)

<div class="my-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
<strong>Fichier de départ obligatoire</strong><br>
Vous devez partir du script suivant, puis écrire toutes vos réponses dans un seul fichier SQL renommé <code>tp3_prenom_nom.sql</code>.<br>
<a href="./tp3-code-depart" target="_blank" rel="noopener">Télécharger le code de départ du TP3</a>
</div>

## Contexte

L’immeuble de bureaux **BatiNet** a récemment confié une partie de sa gestion à une IA nommée **ARGUS**.

ARGUS pilote plusieurs équipements :

- portes intelligentes
- thermostats
- cafetières connectées
- imprimantes réseau
- ordinateurs de salle
- lumières automatisées

Sur papier, l’idée était brillante.
En pratique, le **17 février 2026**, ARGUS a eu ce qu’on pourrait appeler un moment d’excès d’enthousiasme administratif.

En moins de quinze minutes, l’IA a :

- verrouillé une salle de réunion
- éteint des lumières pendant qu’une salle était occupée
- redémarré une imprimante en boucle
- forcé un mode économie sur un poste de travail servant à miner de la crypto-monnaie
- tenté un autonettoyage à un moment franchement mal choisi

Votre rôle est celui d’une enquêtrice ou d’un enquêteur SQL.
Vous devez analyser la base de données pour reconstituer ce qui s’est passé, identifier la véritable anomalie de départ, puis proposer des corrections de structure et de sécurité pour éviter un second mélodrame caféiné.

## Objectif

Ce TP évalue votre capacité à utiliser, dans un même contexte :

- les expressions régulières (`~`, `regexp_match`, `regexp_matches`)
- les jointures
- les sous-requêtes corrélées
- le DDL de maintenance
- la gestion de comptes et de privilèges
- le hachage de mots de passe dans PostgreSQL

## Données de départ

Le script de départ crée et peuple une base de données comprenant :

- 8 salles
- 36 équipements
- 57 capteurs
- 456 lectures de capteurs
- 16 décisions prises par l’IA
- 16 logs système
- 5 comptes applicatifs dans `utilisateur_systeme`

Les données sont déterministes.
L’incident principal est volontairement concentré autour de la date fixe **2026-02-17** pour garder les résultats stables et faciles à corriger.

## Consignes générales

- Toutes les requêtes `select` doivent utiliser des alias clairs.
- Les questions de la partie C doivent utiliser **explicitement une sous-requête corrélée**.
- Les questions des parties D et E doivent être répondues par des instructions SQL exécutables.
- Quand une question demande un tri, respectez-le.
- Quand une question demande certaines colonnes seulement, limitez votre `select` à ces colonnes.
- Utilisez uniquement les notions vues dans les modules du cours.

<div class="my-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900">
<strong>Important - rigueur attendue</strong><br>
Le décor d’enquête est là pour rendre le TP plus engageant, mais l’évaluation reste strictement SQL.<br>
Une bonne réponse doit être claire, stable, vérifiable et directement corrigeable.
</div>

## Indices à noter

Chaque bonne réponse vous donnera un indice.
Conservez-les au fur et à mesure.

En fin de TP, vous devrez compléter cette phrase :

> La **[1]** de la **[2]** en **[3]** a déclenché l’alerte à **[4]**.  
> ARGUS a ensuite **[5]** puis **[6]**.  
> Le chaos a été aggravé par le compte partagé **[7]**, ses **[8]** et les **[9]**.

---

## Partie A - Expressions régulières

### Objectif

Filtrer et extraire des indices à partir des `code_log` et des messages système liés à l’incident.

### Questions

1. Affichez les logs dont `code_log` respecte le format officiel des alertes IA `^ALR-IA-[0-9]{3}$`.
   Retournez seulement `code_log`, `date_heure`, `niveau`.
   Triez du plus ancien au plus récent.

2. À partir du log critique `ALR-IA-204`, utilisez `regexp_match` pour extraire le code de salle présent dans `message`.
   Retournez seulement la valeur extraite.

3. À partir du même log `ALR-IA-204`, utilisez `regexp_match` pour extraire la valeur du champ `motif` présent dans `message`.
   Retournez seulement la valeur extraite.

4. Affichez les logs de sécurité dont `code_log` respecte le format `^SEC-[A-Z]{3}-[0-9]{3}$`, puis utilisez `regexp_match` pour extraire le `nom_utilisateur` mentionné dans `message`.
   Retournez `code_log`, `date_heure`, `nom_utilisateur_extrait`.
   Triez du plus ancien au plus récent.

---

## Partie B - Jointures

### Objectif

Relier les équipements, les salles, les décisions de l’IA et les journaux système pour reconstruire la chronologie de l’incident.

### Questions

5. Affichez le nom de l’équipement `CAF-B204`, son `type_equipement`, le code de sa salle et le nom de sa salle.
   Utilisez une jointure entre `equipement` et `salle`.

6. Affichez toutes les décisions prises par l’IA dans la salle `B-204` entre `2026-02-17 08:15:00` et `2026-02-17 08:25:00`.
   Retournez `date_heure`, `decision`, `equipement`, `succes`.
   Utilisez des jointures entre `decision_ia`, `type_decision`, `equipement` et `salle`.
   Triez par `date_heure`.

7. Affichez les équipements de la salle `B-204` qui ont été touchés par une décision `redemarrer`.
   Retournez `equipement`, `type_equipement`, `date_heure`.
   Utilisez des jointures et triez du plus ancien au plus récent.

---

## Partie C - Sous-requêtes corrélées

### Objectif

Mettre en évidence l’anomalie réelle et les effets anormaux de l’incident.

### Important

Pour chacune des questions suivantes, la solution doit utiliser **explicitement une sous-requête corrélée**.

### Questions

8. Le 17 février 2026 à `08:15:00`, trouvez la lecture de **consommation** d’une **cafetière** qui est strictement supérieure à la moyenne des autres cafetières au même moment.
   Retournez `equipement`, `code_capteur`, `date_heure`, `valeur`.

9. Affichez l’équipement qui a reçu **plus de décisions de l’IA que les autres équipements de la même salle** le `2026-02-17`.
   Retournez `equipement`, `salle`, `nb_decisions`.

10. Affichez la porte qui a été **verrouillée avec succès** mais pour laquelle il n’existe **aucun déverrouillage réussi plus tard le même jour**.
    Retournez `equipement`, `salle`.
    La solution doit utiliser `not exists` dans une sous-requête corrélée.

---

## Partie D - DDL de maintenance

### Objectif

Renforcer l’intégrité de la base pour éviter qu’ARGUS interprète n’importe quoi avec n’importe quelles données.

### Questions

11. Ajoutez une contrainte `unique` sur `salle.code`.
    Le nom de la contrainte doit être exactement `salle_code_uq`.

12. Ajoutez une contrainte `check` sur `capteur.code` pour imposer le format regex `^CAP-[A-Z]{3}-[0-9]{3}-[0-9]{2}$`.
    Le nom de la contrainte doit être exactement `capteur_code_format_ck`.

13. Renforcez `log_systeme` avec les deux modifications suivantes :
    - ajouter une contrainte `check` nommée `log_systeme_niveau_ck` pour limiter `niveau` à `info`, `avertissement` et `critique`
    - ajouter une clé étrangère nommée `log_systeme_equipement_fk` sur `equipement_id` vers `equipement(id)`

---

## Partie E - Comptes, privilèges et mots de passe

### Objectif

Corriger la partie sécurité, qui s’est révélée presque aussi imprudente que l’IA elle-même.

### Questions

14. Activez l’extension `pgcrypto`, ajoutez une colonne `mot_de_passe_hache`, hachez tous les mots de passe existants avec `crypt(..., gen_salt('bf'))`, puis supprimez la colonne `mot_de_passe` en clair.
    À la fin de cette question, la table `utilisateur_systeme` ne doit plus contenir de mot de passe lisible.

15. Renforcez la table `utilisateur_systeme` avec les opérations suivantes :
    - rendre `nom_utilisateur`, `courriel` et `niveau_acces` obligatoires
    - ajouter une contrainte `unique` nommée `utilisateur_systeme_nom_uq` sur `nom_utilisateur`
    - ajouter une contrainte `unique` nommée `utilisateur_systeme_courriel_uq` sur `courriel`
    - ajouter une contrainte `check` nommée `utilisateur_systeme_niveau_ck` pour limiter `niveau_acces` à `admin`, `enqueteur`, `technicien`

16. Mettez en place des comptes PostgreSQL séparés selon le principe du moindre privilège.
    Vous devez :
    - créer les rôles `tp3_admin`, `tp3_enqueteur`, `tp3_technicien`
    - créer les utilisateurs `alice_admin`, `nora_enquete`, `tom_tech`
    - associer chaque utilisateur à son rôle
    - donner à `tp3_enqueteur` un accès en lecture seule sur les tables du schéma `public`
    - donner à `tp3_technicien` les droits `select`, `insert`, `update` sur `equipement`, `capteur`, `lecture_capteur`, `decision_ia`, `log_systeme`
    - retirer explicitement `delete` sur `lecture_capteur` et `log_systeme` au rôle `tp3_technicien`
    - donner à `tp3_admin` les droits les plus larges sur les tables et séquences du schéma `public`

---

## Résolution finale

Quand tous vos indices sont trouvés, complétez la phrase de conclusion directement dans un commentaire SQL à la fin de votre fichier :

```sql
-- Resolution finale :
-- La [1] de la [2] en [3] a declenche l'alerte a [4].
-- ARGUS a ensuite [5] puis [6].
-- Le chaos a ete aggrave par le compte partage [7], ses [8] et les [9].
```

## Contenu de la remise

Nom du fichier : `tp3_prenom_nom.sql`

Le fichier doit contenir, dans l’ordre :

- l’exécution du code de départ
- vos requêtes de la partie A
- vos requêtes de la partie B
- vos requêtes de la partie C
- vos instructions DDL de la partie D
- vos instructions de sécurité de la partie E
- votre résolution finale en commentaire SQL

## Ce qui sera évalué

- l’exactitude des requêtes
- l’utilisation correcte des regex
- la qualité des jointures
- l’utilisation explicite et correcte des sous-requêtes corrélées
- la pertinence des modifications DDL
- la mise en place réaliste des comptes et privilèges
- la bonne migration vers des mots de passe hachés
- la cohérence de la résolution finale
