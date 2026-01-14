---
title: "03 — Contraintes simples"
aside: false
---

# 03 — Contraintes simples

## Objectif pédagogique
Comprendre comment utiliser des **contraintes simples** pour assurer l’**intégrité minimale des données** dès la définition de la structure d’une table.

<div class="my-6 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-900">Les contraintes permettent d’empêcher certaines erreurs <span class="font-bold">avant même l’insertion de données</span>.</div>

---

## Pourquoi utiliser des contraintes ?

Sans contraintes, une base de données peut accepter :
- des valeurs manquantes  
- des doublons  
- des valeurs incohérentes  

Les contraintes permettent :
- de **forcer des règles**
- de protéger la qualité des données
- de réduire les erreurs à long terme  

>Une bonne structure limite les problèmes futurs.

---

## Types de contraintes simples abordées

Dans cette section, nous verrons :
- NOT NULL  
- UNIQUE  
- DEFAULT  
- CHECK  

<div class="my-6 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-900">Les clés primaires et étrangères seront vues dans la section suivante..</div>

---

## Contrainte NOT NULL

### Rôle
Empêche une colonne de contenir une valeur nulle (NULL).

### Exemple

```sql
    CREATE TABLE evenement (
        id INTEGER,
        nom VARCHAR(100) NOT NULL,
        date_evenement DATE NOT NULL
    );
```

>Ici, un événement doit obligatoirement avoir un nom et une date.

---

## Contrainte UNIQUE

### Rôle
Empêche la présence de **doublons** dans une colonne.

### Exemple

```sql
    CREATE TABLE participant (
        id INTEGER,
        courriel VARCHAR(150) UNIQUE,
        nom VARCHAR(100)
    );
```

>Deux participants ne peuvent pas avoir le même courriel.

---

## Contrainte DEFAULT

### Rôle
Attribue une **valeur par défaut** lorsqu’aucune valeur n’est fournie.

### Exemple

```sql
    CREATE TABLE evenement (
        id INTEGER,
        nom VARCHAR(100) NOT NULL,
        actif BOOLEAN DEFAULT TRUE
    );
```

>Si aucune valeur n’est fournie pour la colonne `actif`, la valeur TRUE sera utilisée.

---

## Contrainte CHECK

### Rôle
Impose une **condition logique** sur les valeurs possibles d’une colonne.

### Exemple

```sql
    CREATE TABLE inscription (
        id INTEGER,
        nombre_places INTEGER CHECK (nombre_places > 0)
    );
```

>Le nombre de places doit être supérieur à 0.

---

## Combiner plusieurs contraintes

Une même colonne peut avoir **plusieurs contraintes**.

### Exemple

```sql
    CREATE TABLE evenement (
        id INTEGER,
        nom VARCHAR(100) NOT NULL,
        capacite INTEGER NOT NULL CHECK (capacite >= 0),
        actif BOOLEAN DEFAULT TRUE
    );

```

>Les contraintes se complètent pour renforcer la qualité des données.

---

## Contraintes au niveau de la table (aperçu)

Les contraintes peuvent être définies :
- directement sur une colonne
- ou au niveau de la table complète

>Dans ce cours, nous utilisons uniquement des **contraintes simples au niveau des colonnes**.

---

## Erreurs à éviter

- Oublier NOT NULL sur une colonne obligatoire
- Mettre UNIQUE sur une colonne qui peut légitimement se répéter  
- Utiliser des CHECK trop complexes  
- Croire que les contraintes remplacent toute validation applicative  

---

## Voir les contraintes dans DBeaver

Une fois la table créée, il est possible de **visualiser les contraintes directement dans DBeaver**, sans écrire de SQL.

### Étapes

1. Dans l’arborescence de gauche :
   - ouvrir la base de données  
   - ouvrir le schéma (public)
   - ouvrir la table concernée  
2. Cliquer droit sur la table → **Voir Table (F4)** 
3. Explorer les onglets suivants :
   - **Colonnes**
     - vérifier la présence de `NOT NULL`
     - vérifier la valeur par défaut (`DEFAULT`)
   - **Contraintes**
     - vérifier les contraintes `UNIQUE`
     - vérifier les contraintes `CHECK`

<img src="./images/voir-contraintes.png" alt="Voir contraintes" class="img-bordered w-s" />

>Ces informations permettent de **valider rapidement** que la structure de la table correspond bien aux règles définies lors de sa création.

---

## Type ENUM (aperçu)

### Rôle
Limiter les **valeurs possibles** d’une colonne à un **ensemble prédéfini et fermé**.

Une colonne de type `ENUM` n’accepte **que les valeurs explicitement définies** lors de la création du type.

>Un `ENUM` est un **type de données et non une contrainte de table**. Il permet toutefois d'agir d'une façon similaire à un `CHECK`.

---

### Exemple

1) On doit en premier lieu créer un nouveau `TYPE AS ENUM`.
2) On peut ensuite utiliser le nouveau type à la création de table.

```sql
CREATE TYPE statut_evenement AS ENUM ('planifie', 'annule', 'termine');

CREATE TABLE evenement (
    id INTEGER,
    nom VARCHAR(100) NOT NULL,
    statut statut_evenement NOT NULL
);

```

>Ici, la colonne `statut` ne peut contenir que l’une des valeurs définies dans l’ENUM.

---

### Quand utiliser ENUM ?

Utiliser un `ENUM` lorsque :
- les valeurs possibles sont **peu nombreuses**
- les valeurs sont **connues à l’avance**
- les valeurs sont **stables dans le temps**

Exemples :
- type (`conference`, `atelier`, `spectacle`)
- rôle (`admin`, `utilisateur`, `invite`)

---

### Visualisation dans DBeaver

Les types `ENUM` sont visibles dans :
- le schéma de la base de données
- la liste des **Types** ou **Domains**
- la définition de la colonne utilisant ce type

<img src="./images/enum1.png" alt="Voir enums" class="img-bordered w-s mb-5" />

<img src="./images/enum2.png" alt="Enum" class="img-bordered w-s" />