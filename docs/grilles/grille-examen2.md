---
title: Grille d'évaluation — Examen 2
---

# Grille d'évaluation — Examen 2

## Pénalités

| Pénalité | Facteur | Maximum |
|---|---|---|
| Retard (par jour) | −10 % | −30 % |
| Notion non vue au cours | −5 % / occurrence | −30 % |

---

## Partie 1 — Révision des acquis (30 %)

### Q1 — Lecture de requête SQL (6 pts)

| Niveau | Description |
|---|---|
| A | Explication exacte et complète. Lignes retournées identifiées correctement. |
| C | Explication partiellement correcte ou une ligne mal identifiée. |
| E | Explication absente, erronée ou aucune ligne identifiée. |

---

### Q2 — Lecture de requête SQL (6 pts)

| Niveau | Description |
|---|---|
| A | Explication exacte et complète. Lignes retournées identifiées correctement. |
| C | Explication partiellement correcte ou une ligne mal identifiée. |
| E | Explication absente, erronée ou aucune ligne identifiée. |

---

### Q3 — INSERT (4 pts)

| Niveau | Description |
|---|---|
| A | 2 insertions valides. Intégrité référentielle respectée. Valeurs plausibles. |
| C | 1 insertion valide ou intégrité référentielle partiellement respectée. |
| E | Pas d'insertion fonctionnelle. |

---

### Q4 — UPDATE (6 pts)

| Niveau | Description |
|---|---|
| A | Filtre exact sur la date et l'indicateur actif. Mise à jour correcte. |
| C | Logique correcte mais condition incomplète ou colonne cible incorrecte. |
| E | Non fonctionnel ou logique absente. |

---

### Q5 — DELETE avec sous-requête non corrélée (8 pts)

| Niveau | Description |
|---|---|
| A | Suppression correcte. Sous-requête non corrélée explicite. Intégrité respectée. |
| C | Logique correcte mais sous-requête absente ou jointure utilisée à la place. |
| E | Non fonctionnel ou lignes incorrectes supprimées. |

---

## Partie 2 — Jointures, agrégations et sous-requêtes (35 %)

### Q6 — Filtre avec expression régulière (5 pts)

| Niveau | Description |
|---|---|
| A | Pattern correct. Colonnes et tri conformes. |
| C | Fonctionnelle mais pattern imprécis ou détail mineur. |
| E | Non fonctionnelle ou pattern inopérant. |

---

### Q7 — Jointure interne (6 pts)

| Niveau | Description |
|---|---|
| A | Jointure correcte. Colonnes, alias et tri conformes. |
| C | Fonctionnelle mais colonne ou alias légèrement imprécis. |
| E | Non fonctionnelle ou jointure incorrecte. |

---

### Q8 — Jointure externe (6 pts)

| Niveau | Description |
|---|---|
| A | Tous les enregistrements de la table principale sont présents, avec ou sans correspondance. Colonnes et tri conformes. |
| C | Fonctionnelle mais certains enregistrements sans correspondance ne sont pas conservés, ou tri incorrect. |
| E | Non fonctionnelle ou jointure incorrecte. |

---

### Q9 — Agrégation et GROUP BY (8 pts)

| Niveau | Description |
|---|---|
| A | Groupement correct. Agrégations justes et arrondies. Tri conforme. |
| C | Fonctionnelle mais arrondi, alias ou tri manquant. |
| E | Non fonctionnelle ou regroupement incorrect. |

---

### Q10 — GROUP BY et HAVING (5 pts)

| Niveau | Description |
|---|---|
| A | Groupement correct. Filtre appliqué correctement. |
| C | Fonctionnelle mais filtre sur le groupement incorrect ou alias manquant. |
| E | Non fonctionnelle ou logique de regroupement incorrecte. |

---

### Q11 — Sous-requête corrélée (5 pts)

| Niveau | Description |
|---|---|
| A | Sous-requête corrélée explicite. Référence à la requête externe correcte. Résultats corrects. |
| C | Logique correcte mais corrélation implicite ou absente. |
| E | Non fonctionnelle ou résultats incorrects. |

---

## Partie 3 — DDL avancé, sécurité et mots de passe (35 %)

### Q12 — ALTER TABLE — Ajout de contraintes (6 pts)

| Niveau | Description |
|---|---|
| A | Les deux contraintes ajoutées. Noms exacts. Pattern regex correct. Fonctionnel. |
| C | Une contrainte correcte, l'autre absente ou nom inexact. |
| E | Non fonctionnel ou contraintes incorrectes. |

---

### Q13 — Cascade delete (7 pts)

| Niveau | Description |
|---|---|
| A | L'ancienne contrainte a bien été remplacée par une nouvelle contrainte avec les paramètres permettant de supprimer l'entité enfant. Nom de contrainte exact. |
| C | Paramètres corrects, mais nom de contrainte inexact ou étapes partiellement incorrectes. |
| E | Non fonctionnelle ou contrainte incorrecte. |

---

### Q14 — Hachage des mots de passe (pgcrypto) (10 pts)

| Niveau | Description |
|---|---|
| A | Extension activée. Colonne hachée ajoutée. Mise à jour avec `crypt`/`gen_salt('bf')`. Colonne en clair supprimée. Aucun mot de passe lisible. |
| C | Fonctionnelle mais un élément manquant (colonne en clair non supprimée ou paramètre de hachage incorrect). |
| E | Hachage absent ou migration non fonctionnelle. |

---

### Q15 — Rôles, utilisateurs et privilèges (12 pts)

| Niveau | Description |
|---|---|
| A | Rôles et utilisateurs créés. Associations correctes. Privilèges accordés conformément au moindre privilège. Retrait du privilège superflu appliqué. Accès complet pour le rôle admin sur tables et séquences. |
| C | Fonctionnel mais un élément manquant ou mal ciblé (retrait de privilège, séquences, association utilisateur/rôle). |
| E | Non fonctionnel ou privilèges majoritairement incorrects. |
