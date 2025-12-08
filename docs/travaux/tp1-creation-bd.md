---
title: TP1 — Conception d'une base de données
---

# 🛠️ Travail Pratique #1 — Conception d’une Base de Données Relationnelle

**Cours :** 420-07B-FX — Introduction aux bases de données  
**Session :** Hiver 2026  
**Pondération :** 12 %  
**Modalité :** Individuel  
**Outil :** PostgreSQL (DBeaver)

---

## 🎯 Objectif

À partir d’un modèle textuel, vous devez :

- Créer une base de données PostgreSQL
- Définir les tables et leurs types
- Établir les clés primaires et étrangères
- Appliquer les contraintes pertinentes
- Produire l’export SQL de votre base

*Aucune insertion ni requête SELECT n’est exigée dans ce TP.*

---

## 📅 Remise
- un dossier .zip contenant:
    - un fichier .sql contenant l'export de la base de données
    - un court rapport .pdf avec page de présentation, captures d'écran, et section usage de l'IA
- **Date limite :** Mercredi 14 février à 23h59  
- **Plateforme :** Léa — Travail Pratique #1  

---

## 🧭 Modèle de données à transposer

Chaque bloc représente une table.  
Chaque propriété représente un champ.

*(Les éléments entre parenthèses indiquent des valeurs possibles.)*

### 📍 Adresses
- numero_civique
- rue
- ville
- province
- code_postal
- pays

### 🏥 Cliniques vétérinaires
- nom
- telephone
- adresse
- date_ouverture
- nb_salles_consultation

### 🧑‍⚕️ Vétérinaires
- nom
- prenom
- specialite *(generaliste, chirurgie, dentisterie, dermatologie)*
- telephone
- date_embauche
- adresse
- superviseur *(nullable)*

### 👣 Affectations vétérinaires
*(permet qu’un vétérinaire travaille dans plusieurs cliniques)*
- clinique
- veterinaire
- date_debut
- date_fin *(nullable)*

### 👤 Propriétaires d’animaux
- nom
- prenom
- telephone
- courriel
- adresse

### 🐶 Animaux
- nom
- espece *(chien, chat, lapin, oiseau, autre)*
- race *(nullable)*
- date_naissance
- poids_kg
- date_inscription
- proprietaire
- clinique

### 📅 Rendez-vous
- animal
- veterinaire
- clinique
- date_rdv
- heure_rdv
- duree_minutes
- type_rdv *(consultation, vaccination, chirurgie, suivi)*
- statut *(prevu, termine, annule)*

---

## 📋 Directives techniques

Vous devez :

- Nommer tables et champs **sans accents ni espaces**
- Choisir des **types appropriés**
- Définir **PK et FK**
- Appliquer des **contraintes** (`NOT NULL`, `CHECK`, `UNIQUE`, …)
- Limiter le `NULL` aux cas justifiés
- Utiliser des **listes de valeurs** là où pertinent

---

## 📸 Captures demandées

Votre remise doit inclure **4 captures d’écran** :

1) Vue globale de la structure du schéma public (voir le diagramme)
2) Les trois onglets suivants de la table **d'animaux**
    - Colonnes
    - Contraintes
    - Clés étrangère
---

## 📦 Contenu de la remise

Votre archive doit s'appeler : **PrenomNom_TP1.zip**

Elle contient **exactement deux éléments :**

### 📄 1) Rapport (PDF)

Le rapport doit inclure :

- Page de présentation
- Captures d'écran
- Section de réflexion (voir ci-dessous)

---

### 📁 2) Export SQL

Fichier : **tp1_prenom_nom.sql**

---

## 🧠 Section de réflexion (5%)

Vous devez présenter **au moins 4 items**, selon **une seule** ou une **combinaison** des deux **formules** suivantes :

---

### 🔹 Option A — Utilisation encadrée de l’IA

L’IA peut être utilisée pour **mieux comprendre**, mais pas pour **produire** le travail à votre place.

Chaque utilisation doit suivre le format :

| Requête (résumé) | Réponse (résumé) | Décision personnelle |
|---|---|---|
| … | … | … |

**La colonne « Décision personnelle » est obligatoire.**

Un travail où l’IA produit le résultat final sans réflexion personnelle sera considéré comme du **plagiat**.

#### ✔️ Exemple acceptable #1
| Requête | Réponse | Décision personnelle |
|---|---|---|
| « C’est quoi une clé étrangère ? » | Liens entre tables | J’ai validé moi-même mes relations selon le modèle |

#### ✔️ Exemple acceptable #2
| Requête | Réponse | Décision personnelle |
|---|---|---|
| « Quel type pour `poids_kg` ? » | Décimal recommandé | J’ai choisi `DECIMAL(5,2)` pour précision et cohérence |

#### ❌ Exemple inacceptable
> « Génère tout le SQL du TP »

*(Interdit — l’IA fait le travail pour vous)*

---

### 🔹 Option B — Erreurs rencontrées et solutions

Si aucune IA n’a été utilisée, vous devez documenter des **erreurs réelles**. Elles doivent être liées au différents requis techniques du travail et présentées selon le format suivant :

| Erreur / Problème | Cause | Solution |
|---|---|---|
| … | … | … |

#### ✔️ Exemple acceptable

| Erreur / Problème | Cause | Solution |
|---|---|---|
| Impossible de créer une FK sur `animal.proprietaire` | Le type `VARCHAR` ne correspondait pas au type `INT` de la clé primaire | Conversion des champs en `INT` avec contrainte FK |

---

## 🧮 Correction (résumé)

Les critères évaluent :

- Pertinence du schéma relationnel
- Qualité des types et contraintes
- Exactitude des relations
- Cohérence des preuves (captures)
- Validité de l’export SQL
- Clarté du rapport

La grille détaillée est publiée dans la section **Grilles** du site.




