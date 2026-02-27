---
title: "01 — Expressions régulières"
---

# Expressions régulières
> Adapté des notes de Gilles Duquerroy et Nouha Bouteldja

Les expressions régulières (regex) sont des **séquences de métacaractères**. C’est un mécanisme des langages informatiques qui se retrouve dans de nombreux langages et qui est un moyen puissant :
- d’**évaluer la forme**, voire le contenu, d’une chaîne de caractère.
- **extraire des parties** d’une chaîne de caractère.

Les **métacaractères** sont des caractères décrivant la composition possible d’une chaîne de caractère.

Le langage des expressions régulières est **constant d’un langage informatique à un autre**.

## Métacaractères principaux

| Métacaractère | Signification | Exemples |
|---------------|--------------|----------|
| `[]` | Classe de caractères | `[abc]` : la chaîne contient **a**, **b** ou **c** |
| `[^]` | Négation de classe | `[^abc]` : la chaîne ne contient ni **a**, ni **b**, ni **c** |
| `[A-Z]`<br>`[0-9]` | Intervalle de caractères | `[A-Z]` : lettres majuscules<br>`[0-9]` : chiffres |
| `{n}`<br>`{n,m}` | Nombre d’occurrences de l’élément précédent | `a{9}` : **a** apparaît 9 fois<br>`a{2,3}` : **a** apparaît 2 ou 3 fois |
| `*` | 0, 1 ou plusieurs occurrences | `a*` : **a** apparaît 0, 1 ou plusieurs fois |
| `?` | 0 ou 1 occurrence | `a?` : **a** apparaît ou non |
| `.` | N’importe quel caractère (selon le moteur, inclut ou non le saut de ligne) | `.{2,3}` : deux à trois caractères |
| `^` | Début de chaîne | `^b` : commence par **b** |
| `$` | Fin de chaîne | `b$` : finit par **b** |
| `\|` | Ou (alternance) | `Banane\|Pomme` : contient Banane ou Pomme |
| `()` | Groupe de caractères | `(ab)+` : **ab** apparaît une ou plusieurs fois |
| `\w` (resp. `\W`) | Caractère alphanumérique ou `_` (resp. inverse) | `^a\w*$` : variable qui commence par **a** |
| `\d` (resp. `\D`) | Chiffre (resp. pas chiffre) | `^\d{3}$` : exactement 3 chiffres |

## Exemples typiques

| Expression | Signification |
|------------|--------------|
| `.*` | Tout ou rien |
| `[a-z]{3}` | Trois lettres minuscules |
| `[a-zA-Z]+` | Au moins une lettre |
| `^A.*a$` | Chaîne commençant par **A** et finissant par **a** |
| `^19[0-9]{2}$` | Année du 20e siècle |

## Caractère d’échappement

:::warning Important
Le caractère d’échappement est `\`.  
Il permet d’indiquer que le caractère suivant est **littéral** et non interprété comme métacaractère.
:::

Exemple :

- `\{` correspond à une accolade littérale
- `\.` correspond à un point littéral
- `\\` correspond à un antislash

---

## Exemples avec échappement

| Expression | Signification |
|------------|--------------|
| `^\{.+\}$` | Texte entouré d’accolades |
| `^\(\d{3}\) \d{3}-\d{4}$` | Numéro de téléphone ex. `(418) 456-7890` |
| `[a\-z]` | Contient **a**, `-` ou **z** |

---

## Exemple guidé --- valider un courriel

Objectif : accepter des courriels simples comme :

-   `alice@example.com`
-   `bob@domain.org`

Refuser :

-   `invalid-email`
-   `@example.com`
-   `alice@`
-   `alice@example`

------------------------------------------------------------------------

### Étape 1 --- Structure minimale d'un courriel

Un courriel simple ressemble à :

    quelquechose@quelquechose.quelquechose

Donc on a :

1.  Du texte
2.  Un `@`
3.  Du texte
4.  Un `.`
5.  Du texte

------------------------------------------------------------------------

### Étape 2 --- Construire progressivement

#### 1. Autoriser « du texte » avant le @

On veut \*\*au moins un caractère qui n'est pas un espace ni un @*\* :

    [^@\s]+

### Métacaractères utilisés ici

  Élément           Signification
  ----------------- ----------------------------
  `[]`              Classe de caractères
  `^` (dans `[]`)   Négation
  `\s`              Espace
  `+`               1 ou plusieurs occurrences

Donc :

    [^@\s]+

= 1 ou plusieurs caractères qui ne sont ni `@` ni espace.

------------------------------------------------------------------------

#### 2. Ajouter le symbole @

On ajoute simplement :

    [^@\s]+@

Le `@` n'est pas un métacaractère → pas besoin d'échappement.

------------------------------------------------------------------------

#### 3. Ajouter le domaine

Même logique que la partie locale :

    [^@\s]+@[^@\s]+

------------------------------------------------------------------------

#### 4. Ajouter le point du domaine

Le point est un métacaractère (`.` = n'importe quel caractère).

Pour un point littéral, on doit écrire :

    \.

On obtient :

    [^@\s]+@[^@\s]+\.[^@\s]+

------------------------------------------------------------------------

#### 5. Ancrer la regex

Pour valider toute la chaîne, on ajoute :

-   `^` → début
-   `$` → fin

Version finale :

    ^[^@\s]+@[^@\s]+\.[^@\s]+$

------------------------------------------------------------------------

## Résumé des métacaractères utilisés dans cet exemple

  Métacaractère   Rôle dans la regex
  --------------- ----------------------------
  `^`             Début de chaîne
  `$`             Fin de chaîne
  `[]`            Classe de caractères
  `[^...]`        Négation
  `\s`            Espace
  `+`             1 ou plusieurs occurrences
  `\.`            Point littéral

------------------------------------------------------------------------

## Important

Cette regex est volontairement simple.

Elle ne couvre pas toutes les règles officielles des courriels (RFC).

## Utilisation dans PostgreSQL

Dans PostgreSQL, on peut entre autres : 
- utiliser les expressions régulières pour appliquer des filtres plus complexes dans des requêtes de sélection (regexp_matches)
- utiliser les expressions régulières pour nettoyer une chaîne de caractères pour répondre à un format attendu (regexp_replace)
> [Voir la documentation pour toutes les autres utilisations](https://www.postgresql.org/docs/current/functions-matching.html)

### Exemples pratiques

-- Table d'exemple
```sql
CREATE TEMP TABLE users (
	id serial PRIMARY KEY,
	name text,
	email text,
	phone text,
	notes text
);

INSERT INTO users (name,email,phone,notes) VALUES
('Alice','alice@example.com','(418) 456-7890','#tag1 data'),
('Bob','bob.surname@domain.org','418.123.4567','other'),
('Charlie','invalid-email','+1 418 999 0000','#tag2 more');
```

- Valider une adresse email simple :

```sql
SELECT id,email
FROM users
WHERE email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$';
```

- Extraire le domaine d'une adresse email :

```sql
SELECT email, regexp_replace(email, '.*@', '') AS domain
FROM users;
```

- Supprimer tous les caractères non numériques d'un numéro de téléphone (normalisation) :

```sql
SELECT phone, regexp_replace(phone, '\D', '', 'g') AS digits
FROM users;
```

- Masquer une partie d'une chaîne (ex. SSN simulé) :

```sql
SELECT regexp_replace('123456789', '^(\d{3})\d{2}(\d{4})$', '\1**\2') AS masked;
```

- Récupérer toutes les occurrences d'un motif (groupes) — `regexp_matches` avec le drapeau `g` :

```sql
SELECT id, regexp_matches(notes, '#(\w+)', 'g') AS tags
FROM users;
-- retourne un set de tableaux; utiliser UNNEST pour lister
```

- Diviser une chaîne en mots (split) :

```sql
SELECT regexp_split_to_table('un deux trois', '\s+') AS mot;
```

### Cas problèmes à résoudre (patterns courants)
- Valider une adresse courriel
- Extraire le domaine d'une adresse courriel
- Normaliser un numéro de téléphone (garder seulement les chiffres)
- Remplacer les séparateurs non désirés (virgules, points) dans une chaîne
- Extraire la première suite de chiffres d'une chaîne

Pour chacun, on combine `WHERE ... ~ pattern` pour filtrer, `regexp_matches` pour valider, et `regexp_replace` pour transformer.

## Ressource pour tester vos regex

:::tip
Vous pouvez construire et tester vos expressions régulières ici :  
https://regexr.com/
:::

## Exercices

---



