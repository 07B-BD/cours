---
title: TP1 — Conception d'une base de données
---

# Travail Pratique #1 — Conception d’une Base de Données Relationnelle (12%)

- **Modalité :** Individuel
- **Remise :** fichier .zip sur LÉA dans le travail concerné
- **Date :** voir le travail concerné sur LÉA
- **Retards :** -10% par jour (max 3 jours)

---

## Vidéo explicative

<iframe width="560" height="315" src="https://www.youtube.com/embed/UxUUIahvHxI?si=is0Yrzs-U2XzNH0q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Objectif du travail pratique

À partir d’un **modèle de données textuel**, appliquer les notions de **DDL vues en classe** afin de :

- créer une **base de données PostgreSQL**
- définir les **tables** et leurs **colonnes**
- définir des **clés primaires** et **clés étrangères**
- appliquer des **contraintes simples** (NOT NULL, UNIQUE, CHECK, DEFAULT)
- utiliser des **types ENUM PostgreSQL** lorsque pertinent
- produire une **structure de base de données cohérente et fonctionnelle**

<div class="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-lg p-4">
<strong>Important</strong><br>
Ce travail porte uniquement sur la <strong>structure</strong> de la base de données (DDL).  
Aucune insertion de données ni requête <code>SELECT</code> n’est exigée.
</div>

---

## Conventions de nommage attendues

Les noms exacts des tables et de certaines colonnes ne sont pas imposés.

Vous devez :
- choisir des noms **pertinents et explicites**
- respecter les **conventions vues en classe**
- nommer clairement :
  - les clés primaires
  - les clés étrangères
  - les types ENUM

---

## Modèle de données à transposer

Chaque bloc représente une **table**.  
Chaque propriété représente une **colonne**.

Les éléments entre parenthèses indiquent des **listes de valeurs possibles**.<br>
**Toutes les colonnes sont obligatoires sauf lorsqu'indiquées nullables.**

### Adresses
- numero_civique (doit être positif)
- rue
- ville
- province
- code_postal
- pays

### Cliniques vétérinaires
- nom
- telephone
- adresse
- date_ouverture
- nb_salles_consultation (doit être positif)

### Vétérinaires
- nom
- prenom
- specialite *(generaliste, chirurgie, dentisterie, dermatologie)*
- telephone
- date_embauche
- adresse
- superviseur *(nullable)*

### Affectations vétérinaires
*(permet qu’un vétérinaire travaille dans plusieurs cliniques)*
- clinique
- veterinaire
- date_debut
- date_fin *(nullable & date_fin >= date_debut)*

### Propriétaires d’animaux
- nom
- prenom
- telephone
- courriel (doit être unique)
- adresse

### Animaux
- nom
- espece *(chien, chat, lapin, oiseau, autre)*
- race *(nullable)*
- date_naissance
- poids_kg (doit être positif)
- date_inscription **(par DÉFAUT à la date d'aujourd'hui)**
- proprietaire
- clinique

### Rendez-vous
- animal
- veterinaire
- clinique
- date_rdv
- heure_rdv
- duree_minutes (doit être positif)
- type_rdv *(consultation, vaccination, chirurgie, suivi)*
- statut *(prevu, termine, annule)* **Doit être à prevu par DEFAUT**

### Résumé des relations

- Une **clinique** peut avoir plusieurs **vétérinaires** et plusieurs **animaux**.
- Un **vétérinaire** peut travailler dans plusieurs **cliniques** et peut avoir **0 ou 1 superviseur (vétérinaire)** .
- Un **propriétaire** peut posséder plusieurs **animaux**, mais chaque animal a un seul propriétaire.
- Un **animal** est suivi par une seule **clinique**.
- Un **rendez-vous** associe un **animal**, un **vétérinaire** et une **clinique** à une date donnée.

---

## Travail à réaliser

À partir du modèle fourni, écrire les instructions SQL nécessaires pour :

1. Créer les **types ENUM PostgreSQL** requis.
2. Créer toutes les **tables** du modèle.
3. Définir les **clés primaires**.
4. Définir les **clés étrangères** et respecter les cardinalités.
5. Appliquer les **contraintes simples pertinentes**.

Le code doit pouvoir être exécuté sur une **base de données vide**.

---

## Directives techniques

Vous devez :

- utiliser uniquement les **instructions vues en classe**
- respecter l’**ordre de création** des types et des tables
- limiter l’utilisation de `NULL` aux cas justifiés
- utiliser :
  - `NOT NULL`
  - `UNIQUE`
  - `CHECK`
  - `DEFAULT`
- utiliser des **ENUM** pour les listes de valeurs fournies

<div class="bg-red-50 border border-red-300 text-red-900 rounded-lg p-4">
<strong>Important — utilisation des ressources</strong><br>
Seules les instructions, méthodes et exemples vus dans le cours (modules 1 et 2) sont autorisés.<br>
L’utilisation de solutions générées ou de notions non couvertes au cours entraînera une <strong>pénalité sévère</strong> allant jusqu'à une déclaration de plagiat.
</div>

---

## Contenu de la remise

Nom de l’archive : **PrenomNom_TP1.zip**

Elle doit contenir **exactement deux fichiers SQL** :

### 1) Fichier de création de la structure
- Contient le code SQL que vous avez écrit tel que vu dans les démos et labos
- Inclut :
  - création des types ENUM
  - création des tables
  - contraintes

**Exemple de nom :**  
<code>tp1_structure_prenom_nom.sql</code>

---

### 2) Export complet de la base de données
- Fichier <code>.sql</code> généré avec DBeaver
- Export de la structure complète
- Inclut (cases à cocher)
    - la suppression de la base de données (DROP DATABASE)
    - la création de la base de données (CREATE DATABASE)

**Exemple de nom :**  
<code>tp1_export_prenom_nom.sql</code>

---

## Correction

L’évaluation porte sur :

- la qualité du schéma relationnel
- la pertinence des types et contraintes
- l’exactitude des relations (PK / FK)
- le respect des conventions vues en classe
- la cohérence entre le code écrit et l’export final
- la validité technique des fichiers remis

La grille détaillée est disponible dans la section **Grilles** du site.


