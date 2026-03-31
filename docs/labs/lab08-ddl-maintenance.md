---
title: "Lab 08 — DDL de maintenance"
aside: true
---

# Lab 08 — DDL de maintenance

## Objectif du laboratoire
Mettre en pratique les opérations de maintenance de schéma sur des tables déjà existantes de **Chinook** à l'aide de `alter table`.

<div class="bg-red-50 border border-red-300 text-red-900 rounded-lg p-4 mb-5">
<strong>Important</strong><br>
Conservez une copie de toutes vos instructions.  
Au besoin, supprimez et restaurez la base de données car ce laboratoire modifie directement les vraies tables de Chinook.
</div>

---

## Mise en place

Dans ce laboratoire, vous travaillez directement sur les tables existantes :
- `employe`
- `piste`
- `client`
- `facture`
- `ligne_facture`

### Ordre de travail recommandé

Pour chaque modification :

1. observez d'abord la structure actuelle
2. appliquez une seule modification à la fois
3. vérifiez le résultat dans DBeaver
4. testez lorsque c'est pertinent

---

## Alter table

### 1. Ajouter une colonne `date_fin_emploi`

Ajoutez à la table `employe` :
- `date_fin_emploi` de type `date`

Vérifiez ensuite que :
- la colonne existe
- les lignes actuelles contiennent `null`

### 2. Ajouter une colonne `actif` avec valeur par défaut

Ajoutez à la table `employe` :
- `actif`
- type `boolean`
- `not null`
- valeur par défaut `true`

Vérifiez que les lignes déjà présentes reçoivent bien une valeur.

### 3. Changer `date_naissance` et `date_embauche` au type `date`

Modifiez dans la table `employe` :
- `date_naissance`
- `date_embauche`

pour qu'elles utilisent le type `date`.

### 4. Ajouter une contrainte `unique` sur `courriel`

Ajoutez sur la table `employe` une contrainte `unique` sur :
- `courriel`

Avant d'ajouter la contrainte, vérifiez d'abord si des doublons existent déjà à l'aide d'une requête `select`.

### 5. Renommer `telephone`

Renommez dans la table `employe` :
- `telephone` en `telephone_principal`

Vérifiez que :
- la colonne a bien changé de nom
- les données ont été conservées

### 6. Supprimer la colonne `fax`

Supprimez dans la table `employe` :
- `fax`

Rappel :
- ce type de suppression est moins fréquent
- avant de supprimer en contexte réel, il faut vérifier si d'autres systèmes utilisent déjà cette donnée

### 7. Rendre `album_id` et `genre_id` obligatoires dans `piste`

Modifiez la table `piste` pour rendre `not null` :
- `album_id`
- `genre_id`

Avant d'appliquer ce changement, vérifiez s'il existe déjà des lignes où :
- `album_id is null`
- `genre_id is null`

Si c'est le cas, il faut corriger ces données avant d'ajouter `not null`.

---

## Cascade

### 8. Remplacer la contrainte entre `client` et `facture`

Repérez d'abord la contrainte existante entre :
- `facture(client_id)`
- `client(client_id)`

Ensuite, avec `alter table` :

1. supprimez la contrainte actuelle
2. recréez-la avec `on delete cascade`

But :
- pratiquer le fait qu'on ne modifie pas simplement une cascade sur une FK existante
- observer qu'on remplace la contrainte par une nouvelle version

### 9. Remplacer la contrainte entre `facture` et `ligne_facture`

Repérez ensuite la contrainte existante entre :
- `ligne_facture(facture_id)`
- `facture(facture_id)`

Puis :

1. supprimez la contrainte actuelle
2. recréez-la avec `on delete cascade`

Question :
- pourquoi cette relation est-elle une meilleure candidate à `on delete cascade` ?

---

## Index

### 10. Ajouter des index simples

Ajoutez les index suivants :
- un index sur `employe(ville)`
- un index sur `piste(nom)`

Vérifiez ensuite dans DBeaver que ces index existent.

Question :
- pourquoi un index sur `ville` ou `nom` peut-il aider certaines recherches ?
- pourquoi ne pas avoir ajouté un index sur le courriel de l'employé ?

### 11. Supprimer un index

Supprimez ensuite l'index sur `ville`.

---

### Questions de réflexion :
- Pourquoi faut-il inspecter les données avant d'ajouter `unique` ou `not null` ?
- Pourquoi un renommage peut-il avoir de l'impact même si les données sont conservées ?
- Pourquoi une suppression de colonne demande-t-elle plus de prudence ?
- Pourquoi `on delete cascade` peut-il être utile, mais aussi risqué ?
- Pourquoi faut-il supprimer puis recréer une contrainte pour lui ajouter une cascade ?
- Pourquoi tous les index ne sont-ils pas automatiquement une bonne idée ?

---

<details class="mt-6">
<summary class="cursor-pointer font-semibold text-red-700">
⚠️ Corrigé partiel — à consulter après avoir tenté le laboratoire
</summary>

<div class="bg-red-50 border border-red-300 text-red-900 rounded-lg p-4 mt-4">
<strong>Important</strong><br>
Consultez cette section seulement après avoir essayé les étapes.
</div>

---

```sql
alter table employe
add column date_fin_emploi date;

alter table employe
add column actif boolean not null default true;

alter table employe
alter column date_naissance type date
using date_naissance::date;

alter table employe
alter column date_embauche type date
using date_embauche::date;

alter table employe
add constraint uq_employe_courriel
unique (courriel);

alter table employe
rename column telephone to telephone_principal;

alter table employe
drop column fax;

alter table piste
alter column album_id set not null;

alter table piste
alter column genre_id set not null;

alter table facture
drop constraint "FK_factureclient_id";

alter table facture
add constraint "FK_factureclient_id"
foreign key (client_id) references client(client_id)
on delete cascade;

alter table ligne_facture
drop constraint "FK_ligne_facturefacture_id";

alter table ligne_facture
add constraint "FK_ligne_facturefacture_id"
foreign key (facture_id) references facture(facture_id)
on delete cascade;

create index idx_employe_ville_lab08
on employe (ville);

create index idx_piste_nom_lab08
on piste (nom);

drop index idx_piste_nom_lab08;
```

</details>
