---
title: "Lab 09 — Sécurité, comptes et privilèges"
aside: true
---

# Lab 09 — Sécurité, comptes et privilèges

## Objectif du laboratoire
Mettre en pratique la création de comptes, de rôles et l'attribution de privilèges directement sur la base **Chinook**.

<div class="bg-red-50 border border-red-300 text-red-900 rounded-lg p-4 mb-5">
<strong>Important — apprentissage</strong><br>
Conservez une copie de toutes vos instructions SQL.  
Travaillez sur une copie de test de Chinook et évitez d'utiliser votre compte administrateur pour les essais ordinaires.
</div>

---

## Mise en situation

La base **Chinook** est utilisée par plusieurs profils différents.

On veut créer des accès séparés pour :

- **alice** : administratrice
- **bob** : développeur
- **charlie** : testeur
- **app_web** : compte utilisé par l'application web

Les besoins ne sont pas les mêmes :

- l'administratrice gère les accès
- le développeur peut travailler avec les données de plusieurs tables
- le testeur doit surtout consulter les données
- l'application web doit pouvoir lire le catalogue musical, mais ne doit pas avoir des droits trop larges

Dans Chinook, on peut voir deux grands types de données :

- le **catalogue musical** : `artiste`, `album`, `piste`, `genre`, `type_media`
- les **données commerciales** : `client`, `facture`, `ligne_facture`

---

## Organisation visée

Pour garder la structure claire :

- chaque personne ou application a son propre compte
- les permissions sont portées par des rôles
- les utilisateurs héritent ensuite de ces rôles

Autrement dit :

- `alice`, `bob`, `charlie`, `app_web` sont des comptes avec `login`
- `admin`, `developpeur`, `testeur`, `application_catalogue` sont des rôles

---

## Travail à réaliser

### 1. Créer les comptes et les rôles

Créez :

- les utilisateurs `alice`, `bob`, `charlie` et `app_web`
- les rôles `admin`, `developpeur`, `testeur`, `application_catalogue`

Puis associez :

- `alice` au rôle `admin`
- `bob` au rôle `developpeur`
- `charlie` au rôle `testeur`
- `app_web` au rôle `application_catalogue`

### 2. Donner les droits de base sur Chinook

Accordez selon le cas :

- `connect` sur la base `chinook`
- `usage` sur le schéma `public`

### 3. Donner des droits réalistes au développeur

Le rôle `developpeur` doit pouvoir :

- lire les données de Chinook
- insérer, modifier et supprimer des données dans Chinook

Pour garder le laboratoire simple, donnez ces droits globalement sur toutes les tables du schéma `public`.

Si vous donnez des droits d'insertion sur des tables utilisant des séquences, pensez aussi aux séquences nécessaires.

### 4. Donner des droits réalistes au testeur

Le rôle `testeur` doit pouvoir :

- consulter les données
- sans pouvoir les modifier

Donnez-lui donc un accès en lecture seule sur toutes les tables du schéma `public`.

### 5. Donner des droits limités au compte applicatif

Le rôle `application_catalogue` doit pouvoir :

- lire les données de Chinook

Mais il ne doit pas pouvoir :

- modifier la structure
- modifier les données

Donnez-lui donc un accès en lecture seule sur toutes les tables du schéma `public`.

### 6. Révoquer un droit

Retirez ensuite un privilège déjà accordé.

Exemple concret :

- retirer `delete` au rôle `developpeur` sur `facture`

Question :
- pourquoi retirer `delete` peut-il être une bonne idée sur certaines tables commerciales ?

### 7. Valider le tout dans PostgreSQL

Vérifiez votre configuration :

- voir les rôles existants
- voir qui est connecté
- voir les privilèges sur les tables
- tester ce qu'un rôle peut faire avec `set role`

Tests suggérés :

- avec `testeur`, faire un `select` sur `client`
- avec `testeur`, essayer un `update` sur `client`
- avec `application_catalogue`, faire un `select` sur `piste`
- avec `application_catalogue`, essayer un `delete` sur `facture`

---

## Questions de réflexion

- Pourquoi est-il préférable de donner les droits au rôle `application_catalogue` plutôt qu'au compte `app_web` directement ?
- Pourquoi un compte applicatif ne devrait-il pas recevoir `all privileges` sur Chinook ?
- Pourquoi `connect` sur la base ne suffit-il pas, à lui seul, pour lire ou modifier les tables ?

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
create role alice login password 'mot_de_passe_admin';
create role bob login password 'mot_de_passe_dev';
create role charlie login password 'mot_de_passe_test';
create role app_web login password 'mot_de_passe_app';

create role admin;
create role developpeur;
create role testeur;
create role application_catalogue;

grant admin to alice;
grant developpeur to bob;
grant testeur to charlie;
grant application_catalogue to app_web;

grant connect on database chinook to developpeur;
grant connect on database chinook to testeur;
grant connect on database chinook to application_catalogue;

grant usage on schema public to developpeur;
grant usage on schema public to testeur;
grant usage on schema public to application_catalogue;

grant select, insert, update, delete
on all tables in schema public
to developpeur;

grant usage, select
on all sequences in schema public
to developpeur;

grant select
on all tables in schema public
to testeur;

grant select
on all tables in schema public
to application_catalogue;

revoke delete on facture from developpeur;

select rolname, rolcanlogin
from pg_roles
where rolname in ('alice', 'bob', 'charlie', 'app_web', 'admin', 'developpeur', 'testeur', 'application_catalogue')
order by rolname;

select current_user, session_user;

set role testeur;
select current_user, session_user;
select * from client;
reset role;
```

</details>
