---
title: "04 — Opérateurs et filtres"
aside: false
---

# 04 — Opérateurs et filtres SQL

## Objectif
- Combiner des conditions avec `AND`, `OR`, `NOT`
- Filtrer des données avec `LIKE`, `BETWEEN`, `IN`
- Éliminer les doublons avec `DISTINCT`
- Lire et écrire des requêtes plus proches de la réalité applicative

---

## Rappel — WHERE

Les opérateurs vus dans ce module sont utilisés **principalement dans la clause `WHERE`** afin de filtrer les lignes retournées ou modifiées.

---

## AND — Toutes les conditions doivent être vraies

### Principe
`AND` permet de combiner plusieurs conditions qui doivent **toutes** être respectées.

### Exemple — Événements à Paris avec grande capacité

SELECT *  
FROM evenement  
WHERE lieu = 'Paris'  
AND capacite >= 300;

---

## OR — Au moins une condition vraie

### Principe
`OR` permet de sélectionner les lignes qui respectent **au moins une** des conditions.

### Exemple — Événements à Paris ou à Lyon

SELECT *  
FROM evenement  
WHERE lieu = 'Paris'  
OR lieu = 'Lyon';

---

## ⚠️ AND + OR — Attention aux priorités

### Exemple — Événements à Paris ou Lyon, mais seulement en 2026

SELECT *  
FROM evenement  
WHERE (lieu = 'Paris' OR lieu = 'Lyon')  
AND date_evenement BETWEEN '2026-01-01' AND '2026-12-31';

➡️ Sans les parenthèses, le résultat serait différent.

---

## NOT — Exclure des résultats

### Principe
`NOT` inverse une condition.

### Exemple — Participants qui ne sont pas actifs

SELECT *  
FROM participant  
WHERE NOT actif;

---

### Exemple — Événements qui ne sont pas à Paris

SELECT *  
FROM evenement  
WHERE NOT lieu = 'Paris';

---

## LIKE — Recherche par motif (texte)

### Principe
`LIKE` permet de rechercher des chaînes de caractères similaires.

- `%` : n’importe quelle suite de caractères
- `_` : un seul caractère

### Exemple — Événements contenant le mot "Conférence"

SELECT *  
FROM evenement  
WHERE nom LIKE '%Conférence%';

---

### Exemple — Courriels se terminant par `example.com`

SELECT *  
FROM participant  
WHERE courriel LIKE '%@example.com';

---

## BETWEEN — Intervalle de valeurs

### Principe
`BETWEEN` permet de sélectionner une plage de valeurs **inclusive**.

### Exemple — Événements prévus à l’été 2026

SELECT *  
FROM evenement  
WHERE date_evenement BETWEEN '2026-06-01' AND '2026-08-31';

---

### Exemple — Événements avec capacité moyenne

SELECT *  
FROM evenement  
WHERE capacite BETWEEN 100 AND 300;

---

## IN — Appartenance à une liste

### Principe
`IN` permet de tester si une valeur appartient à une liste donnée.

### Exemple — Événements dans certaines villes

SELECT *  
FROM evenement  
WHERE lieu IN ('Paris', 'Lyon', 'Marseille');

---

### Exemple — Participants spécifiques (par id)

SELECT *  
FROM participant  
WHERE id IN (1, 5, 10);

---

## DISTINCT — Éliminer les doublons

### Principe
`DISTINCT` permet de ne retourner que des valeurs **uniques**.

### Exemple — Liste des villes où ont lieu des événements

SELECT DISTINCT lieu  
FROM evenement;

---

### Exemple — Liste des participants ayant au moins une inscription

SELECT DISTINCT participant_id  
FROM inscription;

---

## Combinaisons réalistes

### Exemple — Événements à Paris ou Lyon, hors ateliers, en 2026

SELECT *  
FROM evenement  
WHERE (lieu IN ('Paris', 'Lyon'))  
AND NOT nom LIKE '%Atelier%'  
AND date_evenement BETWEEN '2026-01-01' AND '2026-12-31';

---

## À retenir

- `AND` : toutes les conditions
- `OR` : au moins une condition
- `NOT` : exclusion
- `LIKE` : recherche textuelle
- `BETWEEN` : intervalle inclusif
- `IN` : liste de valeurs
- `DISTINCT` : suppression des doublons
- Les parenthèses sont **essentielles** avec `AND` / `OR`
