---
title: Examen 2 — SQL avancé et DDL
---

# Examen 2 — SQL avancé et DDL

## Modalités

- **Durée** : 2h30 — aucune sortie tolérée
- **Permis** : site du cours uniquement
- **Interdit** : autres sites Web, collègues, IA, etc.
- Rédigez des réponses complètes dans votre fichier `.sql`.
- Remettez votre fichier `.sql` sur Léa dans le travail nommé **Examen 2**.

## Contexte

> **Note pour l'enseignant :** remplacez le contexte ci-dessous par celui du groupe (voir domaines disponibles). Les noms de tables et colonnes doivent être adaptés en conséquence dans le code de départ.

---

[CONTEXTE À REMPLACER]

Un [domaine] gère [entité principale], [entité secondaire] et [entité associative]. Chaque [X] peut être lié à plusieurs [Y]. Lorsque [situation], un [Z] est enregistré afin de [but].

---

## Contenu de l'examen

| Partie | Thème | Points |
|---|---|---|
| Partie 1 | Révision des acquis (modules 1–3) | 30 pts |
| Partie 2 | Jointures, agrégations et sous-requêtes | 35 pts |
| Partie 3 | DDL avancé, sécurité et mots de passe | 35 pts |
| **Total** | | **100 pts** |

---

## PARTIE 1 — Révision des acquis (30 points)

> Cette partie couvre les notions vues avant l'examen 1 : modèle relationnel, DDL de base, INSERT/UPDATE/DELETE, SELECT avec filtres et sous-requêtes simples.

---

### Q1 — Lecture de requête SQL (6 pts)

Soit la requête suivante :

```sql
select [colonne_a], [colonne_b]
from [table_principale]
where [condition_textuelle]
  and ([une_condition] or [autre_condition])
order by [colonne_a];
```

1. Expliquez **exactement** ce que fait cette requête.
2. Indiquez la ou les lignes qu'elle retournera à l'aide des identifiants fournis dans votre code de départ (ex. : elle retournera la ligne avec l'identifiant 3).

---

### Q2 — Lecture de requête SQL (6 pts)

Soit la requête suivante :

```sql
select [colonne_a], [colonne_b]
from [table_principale]
where [colonne_numérique] between [valeur_min] and [valeur_max]
  and not [condition_booléenne];
order by [colonne_a] desc;
```

1. Expliquez **exactement** ce que fait cette requête.
2. Indiquez la ou les lignes qu'elle retournera à l'aide des identifiants.

---

### Q3 — INSERT (4 pts)

Ajoutez **2 nouvelles lignes** dans la table `[table_principale]` avec des valeurs plausibles.

Contraintes :
- Respectez l'intégrité référentielle.
- N'utilisez pas de valeurs déjà présentes dans le code de départ pour les clés primaires.
- Important: **Explicitez** toutes les colonnes, même celles ayant une valeur par défaut.

---

### Q4 — UPDATE (6 pts)

Désactivez toutes les [entités] dont `[colonne_date]` est antérieure à aujourd'hui et dont `[indicateur_actif]` est vrai.

---

### Q5 — DELETE avec sous-requête non corrélée (8 pts)

Supprimez tous les [entités_secondaires] qui :

- ne sont **pas** référencé(e)s dans la table `[table_associative]`
- [+ filtre appliqué dans la sous-requête].

La solution doit utiliser une **sous-requête non corrélée**.

---

## PARTIE 2 — Jointures, agrégations et sous-requêtes (35 points)

> Cette partie couvre les modules 4 : jointures, agrégations, Group by/Having, sous-requêtes corrélées et expressions régulières.

---

### Q6 — Filtre avec expression régulière (5 pts)

Affichez les [entités] dont le `[champ_texte]` respecte le format : **[FORMAT]** (ex. : commence par 2 lettres majuscules suivies d'un tiret et de 3 chiffres).

Colonnes à afficher : `[colonne_a]`, `[champ_texte]`.
Triez par `[champ_texte]`.

---

### Q7 — Jointure interne (6 pts)

Affichez les [entités_A] avec les informations de leur [entité_B] associée 
[+ filtre sur [entité_A]].

Colonnes à afficher :
- `[id_entité_A]`
- `[nom_entité_A]`
- `[nom_entité_B]`
- `[colonne_commune]`

Triez par `[nom_entité_A]`.

---

### Q8 — Jointure externe (6 pts)

Affichez **tous** les [entités_A], même ceux qui n'ont **aucun** [entité_B] associé.

Colonnes à afficher :
- `[nom_entité_A]`
- `[nom_entité_B]` (null si absent)

Triez par `[nom_entité_B]` desc.

---

### Q9 — Agrégation et group by (8 pts)

Pour chaque [catégorie], affichez :
- la catégorie
- le nombre de [entités]
- la [valeur_agrégée] moyenne

Triez par nombre décroissant.

---

### Q10 — Group by et having (5 pts)

Affichez uniquement les [catégories] qui contiennent **plus de [N]** [entités], avec le nombre correspondant 
[+ un filtre utilisant where].

---

### Q11 — Sous-requête corrélée (5 pts)

Affichez les [entités] dont la `[valeur_numérique]` est **supérieure à la moyenne** de la même `[catégorie]`.

La solution doit utiliser une **sous-requête corrélée**.

---

## PARTIE 3 — DDL avancé, sécurité et mots de passe (35 points)

> Cette partie couvre le module 5 : ALTER TABLE, cascade, index, gestion de comptes et hachage.

---

### Q12 — ALTER TABLE — Ajout de contrainte (6 pts)

La table `[table_cible]` ne possède pas encore de contrainte sur `[colonne_cible]`.

1. Ajoutez une contrainte **UNIQUE** sur `[colonne_cible]` avec le nom `[table]_[colonne]_uq`.
2. Ajoutez une contrainte **CHECK** sur `[autre_colonne]` pour valider le format `[FORMAT]` (utilisez une expression régulière). Nommez-la `[table]_[colonne]_format_ck`.

---

### Q13 — ALTER TABLE — Modification de comportement de suppression (7 pts)

La contrainte de clé étrangère entre `[table_enfant]` et `[table_parent]` ne comporte actuellement **aucune règle de cascade**.

1. Supprimez la contrainte existante.
2. Recréez-la avec `ON DELETE CASCADE` afin que la suppression d'un [parent] entraîne automatiquement la suppression de ses [enfants].
3. Nommez la nouvelle contrainte `[table_enfant]_[table_parent]_fk`.

---

### Q14 — Hachage des mots de passe (pgcrypto) (10 pts)

La table `[table_utilisateurs]` contient une colonne `[col_mdp_clair]` de type `varchar` stockant les mots de passe en clair.

Effectuez la migration sécurisée complète :

1. Activez l'extension `pgcrypto`.
2. Ajoutez une colonne `[col_mdp_hache]` de type `text`.
3. Mettez à jour toutes les lignes pour y stocker le hachage `bcrypt` (avec `gen_salt('bf')`).
4. Supprimez la colonne en clair.

> Assurez-vous qu'aucun mot de passe lisible ne reste dans la table après la migration.

---

### Q15 — Gestion de comptes et privilèges (12 pts)

Mettez en place la gestion des accès suivante :

#### Rôles

| Rôle | Description |
|---|---|
| `[nom_role_lecture]` | Accès en lecture seule |
| `[nom_role_admin]` | Accès complet |

#### Utilisateurs

| Utilisateur | Rôle attribué | Mot de passe |
|---|---|---|
| `[nom_user_1]` | `[nom_role_lecture]` | `[mdp_1]` |
| `[nom_user_2]` | `[nom_role_admin]` | `[mdp_2]` |

#### Privilèges

- `[nom_role_lecture]` : `SELECT` sur toutes les tables ; **aucune écriture**.
- `[nom_role_admin]` : `ALL PRIVILEGES` sur toutes les tables et séquences.
- Retirez le droit `SELECT` à `[nom_role_lecture]` sur `[table_sensible]`.

---

## Annexe — Code de départ à compléter

> **Note pour l'enseignant :** remplacez les données ci-dessous par celles du groupe. Les valeurs de départ doivent permettre de répondre à toutes les questions de l'examen.

```sql
-- ============================================================
-- EXAMEN 2 — Réponses
-- Nom :
-- Groupe :
-- ============================================================

-- ============================================================
-- Tables (fournies — ne pas modifier les noms ni les types)
-- ============================================================

create table [table_principale] (
  [pk]         serial primary key,
  [nom]        varchar(80)     not null,
  [categorie]  varchar(40)     not null,
  [valeur]     numeric(10,2)   not null check ([valeur] >= 0),
  [est_actif]  boolean         not null default true,
  [col_mdp_clair] varchar(120) not null
);

create table [table_secondaire] (
  [pk]         serial primary key,
  [nom]        varchar(80)     not null,
  [date_col]   date            not null default current_date,
  [est_actif]  boolean         not null default true
);

create table [table_associative] (
  [pk]              serial primary key,
  [fk_principale]   integer not null references [table_principale]([pk]),
  [fk_secondaire]   integer not null references [table_secondaire]([pk]),
  [colonne_extra]   varchar(80),
  [date_col]        timestamp not null default current_timestamp
);

-- ============================================================
-- Données de départ
-- ============================================================

insert into [table_principale] ([pk], [nom], [categorie], [valeur], [est_actif], [col_mdp_clair]) values
(1, '[valeur_1]', '[cat_A]', [n1], true,  '[mdp_1]'),
(2, '[valeur_2]', '[cat_A]', [n2], true,  '[mdp_2]'),
(3, '[valeur_3]', '[cat_B]', [n3], true,  '[mdp_3]'),
(4, '[valeur_4]', '[cat_B]', [n4], false, '[mdp_4]'),
(5, '[valeur_5]', '[cat_C]', [n5], true,  '[mdp_5]');

insert into [table_secondaire] ([pk], [nom], [date_col], [est_actif]) values
(1, '[val_1]', '[date_passée]', true),
(2, '[val_2]', '[date_passée]', true),
(3, '[val_3]', '[date_future]', true),
(4, '[val_4]', '[date_future]', true),
(5, '[val_5]', '[date_passée]', false);

insert into [table_associative] ([pk], [fk_principale], [fk_secondaire], [colonne_extra]) values
(1, 1, 1, '[info_1]'),
(2, 2, 2, '[info_2]'),
(3, 3, 3, '[info_3]');
-- note : [table_principale] id 4 et 5 ne sont pas référencés (utile pour Q5 et Q8)

-- ============================================================
-- Zone de réponses
-- ============================================================

-- Q1 — Explication en commentaire + requête si demandée
-- Réponse :

-- Q2 — Explication en commentaire + requête si demandée
-- Réponse :

-- Q3 — INSERT
-- Réponse :

-- Q4 — UPDATE
-- Réponse :

-- Q5 — DELETE avec sous-requête non corrélée
-- Réponse :

-- Q6 — Filtre regex
-- Réponse :

-- Q7 — Jointure interne
-- Réponse :

-- Q8 — Jointure externe
-- Réponse :

-- Q9 — GROUP BY + agrégation
-- Réponse :

-- Q10 — GROUP BY + HAVING
-- Réponse :

-- Q11 — Sous-requête corrélée
-- Réponse :

-- Q12 — ALTER TABLE contraintes
-- Réponse :

-- Q13 — Cascade delete
-- Réponse :

-- Q14 — Hachage pgcrypto
-- Réponse :

-- Q15 — Rôles, utilisateurs et privilèges
-- Réponse :
```
