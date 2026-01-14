---
title: "02 — Créer une table"
aside: false
---

# 02 — Créer une table

## Objectif
Comprendre comment définir la **structure d’une table** à l’aide du DDL, en choisissant des **colonnes**, des **types de données** appropriés et une **organisation cohérente**, avant toute insertion de données.

---

## Qu’est-ce qu’une table ?

Une table représente un **ensemble structuré d’informations** liées à un même concept (entité).

- une table correspond généralement à un **élément du domaine** (ex. événement, client, produit)
- chaque table contient :
  - des **colonnes** (attributs)
  - des **lignes** (enregistrements, sera vu plus tard)

---

## Nommer une table

### Bonnes pratiques
- minuscules
- sans accents
- nom au singulier
- mots séparés par des underscores (`_`)
- nom représentatif du concept

### Exemples acceptables
- `evenement`
- `participant`
- `inscription_evenement`

### Exemples à éviter
- `Événements`
- `Table1`
- `gestionEvenement`
- `evenement-2025`

---

## Définir les colonnes d’une table

Une colonne est définie par :
- un **nom**
- un **type de données**
- éventuellement des **contraintes** (abordées plus tard)

### Exemple de colonnes
| Colonne | Description |
|------|------------|
| `id` | Identifiant de l’élément |
| `nom` | Nom de l’élément |
| `date_creation` | Date de création |
| `actif` | État logique |

---

## Types de données courants (PostgreSQL)

### Types numériques
- `INTEGER`
- `SERIAL` *(aperçu, utilisé plus tard pour les clés primaires)*

### Types textuels
- `VARCHAR(n)`
- `TEXT`

### Dates et temps
- `DATE`
- `TIMESTAMP`

### Autres types utiles
- `BOOLEAN`
- `NUMERIC(p, s)`

**Choisir un type approprié est essentiel** pour la cohérence et la qualité des données.

---

## Instruction `CREATE TABLE`

### Syntaxe générale
```sql
CREATE TABLE nom_table (
    colonne1 type_donnees,
    colonne2 type_donnees,
    colonne3 type_donnees
);
```

### Option GUI

- Pour créer une table avec le GUI, vous devez sélectionner le schéma dans lequel vous voulez la créer. Dans ce cours, sélectionnez toujours le schéma `public` de votre base de données.

<img src="./images/create-table-gui.png" alt="Création table" class="img-bordered w-s" />

- Vous pouvez ensuite ajouter des colonnes en allant dans les `propriétés`, clic-droit dans l'espace blanc et `Créer Colonne`

<img src="./images/créer-colonne.png" alt="Création colonne" class="img-bordered w-s" />
