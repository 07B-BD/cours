---
title: "03 — Update, delete"
aside: false
---

# 03 — Modification et suppression de données

## Objectif
- Comprendre **pourquoi** on modifie ou supprime des données (contexte applicatif)
- Modifier des données avec `UPDATE ... SET ... WHERE`
- Supprimer des données avec `DELETE ... WHERE`
- Comprendre les **risques** liés aux opérations destructives
>Utiliser la même base de données qui a été importée précédemment.

---

## Pourquoi modifier et supprimer ?

Dans une application réelle, on **modifie** des données pour :
- corriger une erreur (ex. : une ville mal saisie)
- mettre à jour un état (ex. : actif / inactif)
- ajuster une règle d’affaires (ex. : capacité d’un événement)

On **supprime** des données pour :
- retirer une donnée créée par erreur
- nettoyer des données de test
- respecter une loi (loi 25)

>En pratique, on supprime rarement.  
>On privilégie souvent un champ `actif` (suppression logique).

---

## UPDATE — Modifier des données

### Syntaxe générale

UPDATE table  
SET colonne = valeur  
WHERE condition;

> ⚠️ Sans `WHERE`, **toutes les lignes** seront modifiées.

---

### Exemple 1 — Corriger une erreur de lieu

Contexte :  
Le lieu de l’événement avec l’id 4 est incorrect.

UPDATE evenement  
SET lieu = 'Montréal'  
WHERE id = 4;

---

### Exemple 2 — Augmenter la capacité d’un événement populaire

Contexte :  
Le Salon Open Source (id 16) attire plus de participants que prévu.

UPDATE evenement  
SET capacite = capacite + 100  
WHERE id = 16;

---

### Exemple 3 — Désactiver un participant (soft delete)

Contexte :  
Un participant ne souhaite plus utiliser la plateforme.

UPDATE participant  
SET actif = false  
WHERE courriel = 'julie.petit2@example.com';

---

### Exemple 4 — Modifier plusieurs colonnes à la fois

Contexte :  
On met à jour le nom et la capacité d’un événement.

UPDATE evenement  
SET nom = 'Conférence Tech 2026 (édition spéciale)',  
    capacite = 350  
WHERE id = 1;

---

### Exemple 5 — Mise à jour conditionnelle (plusieurs lignes)

Contexte :  
Les événements ayant une capacité trop faible sont annulés.

UPDATE evenement  
SET actif = false  
WHERE capacite < 50;

---

## UPDATE avec sous-requête

### Exemple 6 — Désactiver les inscriptions des participants inactifs

Contexte :  
Lorsqu’un participant devient inactif, ses inscriptions doivent aussi être désactivées.

UPDATE inscription  
SET actif = false  
WHERE participant_id IN (  
  SELECT id  
  FROM participant  
  WHERE actif = false  
);

---

## DELETE — Supprimer des données

### Syntaxe générale

DELETE FROM table  
WHERE condition;

> ⚠️ Sans `WHERE`, **toutes les lignes** seront supprimées.

---

### Exemple 7 — Supprimer une inscription créée par erreur

Contexte :  
Une inscription incorrecte doit être retirée.

DELETE FROM inscription  
WHERE id = 21;

---

### Exemple 8 — Supprimer les inscriptions d’un événement annulé

Contexte :  
Un événement a été annulé et toutes ses inscriptions doivent être supprimées.

DELETE FROM inscription  
WHERE evenement_id = 5;

---

## ⚠️ Mise en garde importante

Avant d’exécuter un `UPDATE` ou un `DELETE` :

1. Tester la condition avec un `SELECT`
2. Vérifier le nombre de lignes affectées
3. S’assurer que la condition est précise

Exemple de bonne pratique :

SELECT *  
FROM evenement  
WHERE capacite < 50;

➡️ Si le résultat est conforme, **alors seulement** appliquer le `UPDATE` ou le `DELETE`.

---

## À retenir

- `UPDATE` modifie des données existantes
- `DELETE` supprime définitivement des lignes
- `WHERE` est **essentiel**
- En contexte applicatif, on préfère souvent la **suppression logique** (`actif = false`)
