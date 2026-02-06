---
title: "Lab 05 — Modification, opérateurs et sous-requêtes"
aside: false
---

# 🧪 Laboratoire 05 — Modification, opérateurs et sous-requêtes

## Travail à réaliser

### 1. Préparation de l'environnement

1) Assurez-vous d'avoir la base de données `gestion_evenement_data` importée (du Lab 04).

2) Ouvrez DBeaver et connectez-vous à cette base de données.

3) Créez un nouveau script SQL pour ce laboratoire.

### 2. Exercices de modification de données

#### a) Corrections simples
- Corrigez le lieu de l'événement "Sommet Cybersécurité" pour qu'il soit à "Montréal" au lieu de "Paris"
- Augmentez la capacité de l'événement "Meetup Python" de 50 places

#### b) Désactivation logique
- Désactivez le participant dont le courriel est "bruno.lefevre@example.com"
- Désactivez toutes les inscriptions des participants inactifs (sous-requête)

#### c) Suppression de données
- Supprimez l'inscription créée par erreur (participant_id = 1, evenement_id = 1)
- Supprimez toutes les inscriptions d'un événement annulé (choisissez un événement inactif)

::: warning ⚠️ Attention
Avant chaque `update` ou `delete`, testez d'abord avec un `select` pour vérifier quelles lignes seront affectées !
:::

### 3. Exercices avec les opérateurs

#### a) Combinaisons AND/OR/NOT
- Événements à Paris OU Lyon, mais seulement ceux actifs
- Participants dont le nom commence par "A" ET qui sont actifs
- Événements qui ne sont PAS à Paris

#### b) Recherche textuelle LIKE
- Événements dont le nom contient "Tech"
- Participants dont le courriel se termine par "@gmail.com"
- Événements dont le nom commence par "Conférence"

#### c) Intervals BETWEEN et listes IN
- Événements prévus entre juin et août 2026
- Participants dans les villes "Paris", "Lyon", "Marseille"
- Événements avec capacité entre 100 et 500

#### d) Élimination des doublons DISTINCT
- Liste des villes distinctes où ont lieu des événements
- Liste des types d'événements distincts

### 4. Exercices avec les sous-requêtes non corrélées

#### a) Sous-requêtes avec IN
- Participants inscrits à des événements gratuits (prix = 0)
- Événements qui ont des inscriptions récentes (après le 1er janvier 2026)
- Participants inscrits à des événements à Paris

#### b) Sous-requêtes avec ANY/ALL
- Événements plus chers que TOUS les événements à Lyon
- Événements moins chers qu'AU MOINS UN événement à Paris
- Participants plus âgés que TOUS les participants de moins de 25 ans

#### c) Requêtes complexes multi-niveaux
- Participants inscrits à des événements gratuits ET actifs
- Événements qui ont plus d'inscriptions que la moyenne
- Participants qui se sont inscrits à tous les événements d'un certain type

### 5. Défi final — Requête complète

Écrivez une requête qui trouve **les noms des participants actifs** qui se sont inscrits à **au moins un événement payant** (prix > 0) **à Paris** ou **Lyon**, et dont **le nom contient "Tech"**.

::: tip 💡 Indices pour le défi
- Commencez par identifier les événements qui correspondent aux critères
- Utilisez des sous-requêtes imbriquées lorsque nécessaire (revoir les étapes)
- Testez étape par étape avant de combiner
:::