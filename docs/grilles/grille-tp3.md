---
title: Grille d'évaluation — TP3
---

# Grille d'évaluation — Travail Pratique #3

Chaque critère est évalué selon des niveaux de performance.  
Les pondérations indiquent le poids de chaque critère dans la note finale.

---

## Partie A — Expressions régulières (15 %)

### Q1 — Filtre regex sur code_log (ALR-IA- + 3 chiffres)

| Niveau | Description | Note |
|---|---|---|
| **A** | Pattern regex correct. Colonnes, tri et limite conformes. | 100 % |
| **C** | Fonctionnelle mais pattern imprécis ou détail mineur (tri, colonnes, limite). | 60 % |
| **E** | Non fonctionnelle ou pattern inopérant. | 0 % |

### Q2 — Extraction du code de salle

| Niveau | Description | Note |
|---|---|---|
| **A** | Extraction correcte du code de salle. Alias de colonne présent. | 100 % |
| **C** | Fonctionnelle mais extraction imprécise ou alias manquant. | 60 % |
| **E** | Non fonctionnelle ou extraction incorrecte. | 0 % |

### Q3 — Extraction du nom d'utilisateur dans les logs critiques

| Niveau | Description | Note |
|---|---|---|
| **A** | Filtre sur niveau et mot-clé correct. Extraction juste. Tri et limite conformes. | 100 % |
| **C** | Fonctionnelle mais extraction ou filtre partiellement imprécis. | 60 % |
| **E** | Non fonctionnelle ou extraction incorrecte. | 0 % |

---

## Partie B — Jointures (20 %)

### Q4 — Équipements cafetière dans la salle identifiée

| Niveau | Description | Note |
|---|---|---|
| **A** | Jointure correcte. Filtre sur type et salle juste. Colonnes et alias conformes. | 100 % |
| **C** | Fonctionnelle mais filtre ou colonne légèrement imprécis. | 60 % |
| **E** | Non fonctionnelle ou jointure incorrecte. | 0 % |

### Q5 — Première décision IA dans la salle

| Niveau | Description | Note |
|---|---|---|
| **A** | Jointures correctes sur les trois tables. Filtre de date et tri conformes. Limite appliquée. | 100 % |
| **C** | Fonctionnelle mais condition de jointure ou filtre légèrement imprécis. | 60 % |
| **E** | Non fonctionnelle ou jointures incorrectes. | 0 % |

### Q6 — Logs critiques avec équipement associé ou null

| Niveau | Description | Note |
|---|---|---|
| **A** | Tous les logs critiques sont présents, avec ou sans équipement associé. Colonnes et tri conformes. | 100 % |
| **C** | Fonctionnelle mais certains logs sans équipement ne sont pas conservés, ou tri incorrect. | 60 % |
| **E** | Non fonctionnelle ou jointure incorrecte. | 0 % |

---

## Partie C — Agrégations et groupements (15 %)

### Q7 — Nombre de logs par niveau

| Niveau | Description | Note |
|---|---|---|
| **A** | Groupement correct. Agrégation et tri conformes. | 100 % |
| **C** | Fonctionnelle mais tri ou alias manquant. | 60 % |
| **E** | Non fonctionnelle ou regroupement incorrect. | 0 % |

### Q8 — Décisions par équipement avec plus d'une décision

| Niveau | Description | Note |
|---|---|---|
| **A** | Groupement correct. Filtre appliqué correctement. Tri conforme. | 100 % |
| **C** | Fonctionnelle mais filtre sur le groupement incorrect, ou tri/alias manquant. | 60 % |
| **E** | Non fonctionnelle ou logique de regroupement incorrecte. | 0 % |

---

## Partie D — Sous-requêtes corrélées (15 %)

### Q9 — Lectures consommation > moyenne du même type (sous-requête corrélée)

| Niveau | Description | Note |
|---|---|---|
| **A** | Sous-requête corrélée explicite. Référence à la requête externe correcte. Tri conforme. | 100 % |
| **C** | Logique correcte mais corrélation implicite ou absente (ex. : jointure à la place). | 60 % |
| **E** | Non fonctionnelle ou sous-requête non corrélée. | 0 % |

### Q10 — Équipements sans décision IA (sous-requête corrélée)

| Niveau | Description | Note |
|---|---|---|
| **A** | Sous-requête corrélée explicite. Résultats corrects. Tri conforme. | 100 % |
| **C** | Logique correcte mais corrélation implicite ou absente. | 60 % |
| **E** | Non fonctionnelle ou résultats incorrects. | 0 % |

---

## Partie E — DDL de maintenance (20 %)

### Q11 — Contrainte unique sur salle.code

| Niveau | Description | Note |
|---|---|---|
| **A** | Alter table fonctionnel. Nom de contrainte exactement `salle_code_uq`. | 100 % |
| **C** | Contrainte ajoutée mais nom inexact ou syntaxe légèrement imprécise. | 60 % |
| **E** | Non fonctionnelle ou contrainte incorrecte. | 0 % |

### Q12 — Contrainte check sur capteur.code (format CAP-XXX-000-00)

| Niveau | Description | Note |
|---|---|---|
| **A** | Pattern regex exact. Nom de contrainte exactement `capteur_code_format_ck`. Fonctionnel. | 100 % |
| **C** | Fonctionnelle mais pattern légèrement imprécis ou nom de contrainte inexact. | 60 % |
| **E** | Non fonctionnelle ou contrainte incorrecte. | 0 % |

### Q13 — Suppression automatique de lecture_capteur

| Niveau | Description | Note |
|---|---|---|
| **A** | L'ancienne contrainte a bien été remplacée par une nouvelle contrainte avec les paramètres permettant de supprimer l'entité enfant. Nom exactement `lecture_capteur_capteur_fk`. | 100 % |
| **C** | Paramètres corrects, mais nom de contrainte inexact ou étapes partiellement incorrectes. | 60 % |
| **E** | Non fonctionnelle ou contrainte incorrecte. | 0 % |

---

## Partie F — Comptes, privilèges et mots de passe (15 %)

### Q14 — Hachage des mots de passe (pgcrypto)

| Niveau | Description | Note |
|---|---|---|
| **A** | Extension activée. Colonne hachée ajoutée. Update avec `crypt`/`gen_salt('bf')`. Colonne en clair supprimée. Aucun mot de passe lisible. | 100 % |
| **C** | Fonctionnelle mais un élément manquant (ex. : colonne en clair non supprimée ou gen_salt incorrect). | 60 % |
| **E** | Hachage absent ou migration non fonctionnelle. | 0 % |

### Q15 — Rôles, utilisateurs et privilèges

| Niveau | Description | Note |
|---|---|---|
| **A** | Rôles et utilisateurs créés. Associations correctes. Privilèges accordés conformément au moindre privilège. Retrait du `delete` appliqué sur `lecture_capteur` et `log_systeme`. All privileges sur tables et séquences pour `tp3_admin`. | 100 % |
| **C** | Fonctionnel mais un élément manquant ou mal ciblé (revoke, séquences, association utilisateur/rôle). | 60 % |
| **E** | Non fonctionnel ou privilèges majoritairement incorrects. | 0 % |

---

## Pénalités — Respect des consignes

| Cas | Impact |
|---|---|
| Retard dans la remise | −10 % par jour (maximum −30 %) |
| Notion non vue au cours utilisée | −5 % par occurrence (maximum −30 %) |
| Utilisation non autorisée d'une source externe ou plagiat | 0 % au travail |
