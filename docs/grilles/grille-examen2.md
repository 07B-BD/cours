---
title: Grille d'évaluation — Examen 2
---

# Grille d'évaluation — Examen 2

## Échelle d'évaluation

| Niveau | Valeur |
|---|---|
| Excellent | 100 % |
| Suffisant | 70 % |
| Insuffisant | 40 % |
| Incorrect | 0 % |

## Pénalités

| Pénalité | Facteur | Maximum |
|---|---|---|
| Retard (par jour) | −10 % | −30 % |
| Notion non vue au cours | −5 % / occurrence | −30 % |

---

## Partie 1 — Révision des acquis (30 %)

### Q1 — Débogage de requête SQL (6 pts)

| Niveau | Description |
|---|---|
| Excellent | Erreur identifiée avec précision. Requête corrigée valide et complète. |
| Suffisant | Erreur identifiée correctement mais correction incomplète, ou correction juste mais explication vague. |
| Insuffisant | Erreur vaguement identifiée ou correction tentée mais toujours incorrecte. |
| Incorrect | Aucune identification de l'erreur et aucune correction fonctionnelle. |

---

### Q2 — Débogage de requête SQL (6 pts)

| Niveau | Description |
|---|---|
| Excellent | Erreur identifiée avec précision. Requête corrigée valide et complète. |
| Suffisant | Erreur identifiée correctement mais correction incomplète, ou correction juste mais explication vague. |
| Insuffisant | Erreur vaguement identifiée ou correction tentée mais toujours incorrecte. |
| Incorrect | Aucune identification de l'erreur et aucune correction fonctionnelle. |

---

### Q3 — INSERT (4 pts)

| Niveau | Description |
|---|---|
| Excellent | 2 insertions valides. Toutes les colonnes listées explicitement. Valeurs conformes à l'énoncé. |
| Suffisant | 1 insertion valide et complète, ou les 2 tentées avec colonnes explicites mais une valeur erronée. |
| Insuffisant | Les 2 insertions tentées mais colonnes omises ou plusieurs valeurs incorrectes. |
| Incorrect | Aucune insertion fonctionnelle. |

---

### Q4 — UPDATE (6 pts)

| Niveau | Description |
|---|---|
| Excellent | Les deux conditions de filtre présentes et correctes. Colonne mise à jour conforme. |
| Suffisant | Une seule des deux conditions présente, ou colonne mise à jour incorrecte mais logique générale juste. |
| Insuffisant | Structure `UPDATE … SET … WHERE` présente mais logique de filtre majoritairement incorrecte. |
| Incorrect | Non fonctionnel ou logique absente. |

---

### Q5 — DELETE avec sous-requête non corrélée (8 pts)

| Niveau | Description |
|---|---|
| Excellent | `DELETE` correct. Sous-requête non corrélée explicite. Lignes correctes supprimées. |
| Suffisant | Logique correcte et lignes correctes supprimées, mais sous-requête corrélée utilisée à la place. |
| Insuffisant | `DELETE` avec tentative de sous-requête présente mais ciblant les mauvaises lignes, car la clé de lisaison est incorrecte |
| Incorrect | Non fonctionnel ou aucune tentative cohérente. |

---

## Partie 2 — Jointures, agrégations et sous-requêtes (35 %)

### Q6 — Filtre avec expression régulière (5 pts)

| Niveau | Description |
|---|---|
| Excellent | Pattern regex exact. Colonnes demandées et tri conformes à l'énoncé. |
| Suffisant | Requête fonctionnelle mais pattern légèrement imprécis (ex. : ancres manquantes) ou tri absent. |
| Insuffisant | Regex utilisée mais pattern significativement erroné (la majorité des cas ne sont pas couverts). |
| Incorrect | Pas d'expression régulière ou requête non fonctionnelle. |

---

### Q7 — Jointure interne (6 pts)

| Niveau | Description |
|---|---|
| Excellent | Jointure correcte. Filtre appliqué correctement. Colonnes demandées et tri conformes à l'énoncé. |
| Suffisant | Jointure fonctionnelle mais filtre absent, colonne manquante ou tri incorrect. |
| Insuffisant | Jointure tentée mais mauvais type de jointure ou condition de jointure incorrecte. |
| Incorrect | Non fonctionnelle ou aucune jointure présente. |

---

### Q8 — Jointure externe (6 pts)

| Niveau | Description |
|---|---|
| Excellent | Jointure externe correcte. Tous les enregistrements de la table principale conservés. Colonnes et tri conformes à l'énoncé. |
| Suffisant | Jointure fonctionnelle mais mauvais sens de jointure ou jointure interne utilisée (lignes sans correspondance perdues), ou tri incorrect. |
| Insuffisant | Jointure tentée mais mauvais type de jointure ou condition de jointure incorrecte. |
| Incorrect | Non fonctionnelle ou aucune jointure présente. |

---

### Q9 — Agrégation et GROUP BY (8 pts)


| Niveau | Description |
|---|---|
| Excellent | `GROUP BY` correct. Fonctions d'agrégation correctes. Tri décroissant par nombre. |
| Suffisant | Fonctionnelle mais alias manquants ou tri incorrect. |
| Insuffisant | `GROUP BY` présent mais mauvaise colonne de regroupement ou mauvaise fonction d'agrégation ou une fonction manquante. |
| Incorrect | Non fonctionnelle ou regroupement absent. |

---

### Q10 — GROUP BY et HAVING (5 pts)

| Niveau | Description |
|---|---|
| Excellent | `GROUP BY` correct. Filtre `HAVING` appliqué sur le bon seuil. Colonnes conformes. |
| Suffisant | Fonctionnelle mais seuil incorrect dans `HAVING` |
| Insuffisant | `GROUP BY` présent mais `HAVING` absent ou filtre `WHERE` absent. |
| Incorrect | Non fonctionnelle ou logique de regroupement absente. |

---

### Q11 — Sous-requête corrélée (5 pts)

| Niveau | Description |
|---|---|
| Excellent | Sous-requête corrélée explicite. Référence à la table externe correcte. Résultats corrects. |
| Suffisant | Logique correcte mais sous-requête non corrélée (moyenne globale au lieu de la moyenne par groupe). |
| Insuffisant | Sous-requête tentée mais ne compare pas la cotisation à la moyenne du bon groupe. |
| Incorrect | Non fonctionnelle ou aucune sous-requête présente. |

---

## Partie 3 — DDL avancé, sécurité et mots de passe (35 %)

### Q12 — ALTER TABLE — Ajout de contraintes (6 pts)

| Niveau | Description |
|---|---|
| Excellent | Les deux contraintes ajoutées avec les noms exacts fournis dans l'énoncé. Pattern regex correct et fonctionnel. |
| Suffisant | Une contrainte correcte et complète ; l'autre absente ou utilisation d'un nom inexact. |
| Insuffisant | Les deux contraintes tentées mais noms incorrects et/ou pattern regex significativement erroné. |
| Incorrect | Non fonctionnel ou aucune contrainte ajoutée. |

---

### Q13 — ALTER TABLE — Suppression en cascade (7 pts)

| Niveau | Description |
|---|---|
| Excellent | Ancienne contrainte supprimée. Nouvelle contrainte ajoutée avec `ON DELETE CASCADE` et le nom exact fourni dans l'énoncé. La clé étrangère référence la bonne table. |
| Suffisant | `ON DELETE CASCADE` correct mais nom de la nouvelle contrainte inexact, ou les deux étapes présentes mais dans le mauvais ordre ou la clé étrangère référence la mauvaise table. |
| Insuffisant | Une seule des deux étapes réalisée (suppression sans recréation, ou recréation sans suppression préalable). |
| Incorrect | Non fonctionnel ou contrainte incorrecte. |

---

### Q14 — Hachage des mots de passe (pgcrypto) (10 pts)

| Niveau | Description |
|---|---|
| Excellent | Les 4 étapes réalisées dans l'ordre. Extension activée. Colonne hachée ajoutée. `UPDATE` avec `crypt(…, gen_salt('bf'))`. Colonne en clair supprimée. |
| Suffisant | 3 étapes correctes ; une étape manquante (ex. : colonne en clair non supprimée, ou extension absente mais hachage fonctionnel). |
| Insuffisant | Seulement 1 ou 2 étapes réalisées correctement ; hachage tenté mais paramètres incorrects. |
| Incorrect | Hachage absent ou migration non fonctionnelle. |

---

### Q15 — Rôles, utilisateurs et privilèges (12 pts)

| Niveau | Description |
|---|---|
| Excellent | Rôles et utilisateurs créés. Associations utilisateur–rôle correctes. `SELECT` accordé sur toutes les tables au rôle lecture. `ALL PRIVILEGES` accordé sur toutes les tables **et séquences** au rôle admin. `REVOKE SELECT` appliqué sur la table sensible. |
| Suffisant | Fonctionnel mais un élément manquant ou mal ciblé : séquences oubliées, `REVOKE` absent, ou une association utilisateur–rôle incorrecte. |
| Insuffisant | Rôles ou utilisateurs créés partiellement ; privilèges incomplets ou la moitié des éléments manquants. |
| Incorrect | Non fonctionnel ou privilèges majoritairement incorrects. |
