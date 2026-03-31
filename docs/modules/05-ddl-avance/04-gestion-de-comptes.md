---
title: "04 — Gestion de comptes et privilèges"
aside: true
---

# 04 — Gestion de comptes et privilèges

## Objectif
Comprendre la différence entre **utilisateur**, **rôle** et **privilège** dans PostgreSQL, savoir attribuer des droits adaptés au contexte, puis vérifier que ces droits sont bien en place.

---

## L'essentiel à connaître

Dans PostgreSQL, on ne donne pas tous les droits à tout le monde.

Le bon réflexe est :
- donner seulement les droits nécessaires
- séparer les responsabilités
- éviter d'utiliser un compte trop puissant pour une application

Cette idée est importante autant pour :
- les humains
- les équipes
- les applications

En cas d'erreur ou d'injection SQL, un compte trop privilégié augmente fortement les dégâts possibles.

---

## Le modèle à retenir

Pour ne pas mêler les concepts, retenez ce modèle simple :

1. un **utilisateur** est une identité de connexion
2. un **rôle** sert souvent à regrouper des permissions
3. un **privilège** est un droit précis sur un objet précis

En pratique PostgreSQL unifie tout cela sous le mot **rôle**.
Donc :
- un utilisateur = un rôle qui peut se connecter
- un rôle de groupe = un rôle sans connexion, utilisé pour porter des droits

Le bon réflexe est donc :
- créer des utilisateurs pour les personnes et les applications
- créer des rôles pour représenter des fonctions comme `admin`, `developpeur`, `lecture_seule`
- attribuer les privilèges aux rôles
- ajouter ensuite les utilisateurs aux rôles

---

## Utilisateur, rôle, privilège

### Utilisateur

Un utilisateur est un compte qui peut se connecter à PostgreSQL.

En pratique, dans PostgreSQL :
- un utilisateur est un **rôle avec l'attribut `LOGIN`**
- `create user` est essentiellement une forme pratique de `create role ... login`

Exemple :

```sql
create role alice login password 'mot_de_passe_admin';
create user bob with password 'mot_de_passe_dev';
```

### Rôle

Un rôle peut servir :
- de compte de connexion
- de groupe de droits

Très souvent, on crée :
- des rôles de groupe pour porter les permissions
- des utilisateurs individuels qu'on ajoute à ces rôles

Exemple :

```sql
create role admin;
create role developpeur;
create role lecteur_app;

grant admin to alice;
grant developpeur to bob;
```

### Privilège

Un privilège est un droit d'effectuer une action sur un objet PostgreSQL.

Exemples :
- `connect` sur une base de données
- `usage` sur un schéma
- `select`, `insert`, `update`, `delete` sur une table
- `execute` sur une fonction

---

## Qui devrait avoir quels droits

Il n'existe pas une seule réponse parfaite, mais certains profils reviennent souvent.

### Administrateur

Un administrateur peut typiquement :
- créer des rôles et des comptes
- accorder ou révoquer des privilèges
- gérer la structure
- intervenir sur la sécurité et la maintenance

On évite cependant d'utiliser ce compte pour les tâches normales de l'application.

### Développeur

Selon le contexte, un développeur peut :
- lire les données
- insérer, modifier ou supprimer certaines données
- parfois créer ou modifier des objets dans un environnement de développement

Mais il ne devrait pas automatiquement avoir tous les droits partout, surtout en production.

### Lecteur ou testeur

Un testeur ou un lecteur a souvent seulement besoin de :
- `connect`
- `usage` sur le schéma
- `select` sur certaines tables

### Compte applicatif

Le compte utilisé par une application mérite une attention particulière.

Bonne pratique :
- lui donner uniquement les droits requis par l'application
- éviter `all privileges`
- éviter de lui permettre de modifier la structure
- éviter d'utiliser un compte administrateur dans la chaîne applicative

Exemple :
- une application de consultation peut n'avoir besoin que de `select`
- une application transactionnelle peut avoir besoin de `select`, `insert`, `update`, parfois `delete`

En cas d'injection SQL, ce compte ne pourra alors faire que ce qui lui est permis.

---

## Une manière simple d'organiser les accès

Une structure simple et claire ressemble souvent à ceci :

- `alice` : utilisateur réel
- `bob` : utilisateur réel
- `app_web` : utilisateur applicatif
- `admin` : rôle de gestion
- `developpeur` : rôle de travail sur les données
- `lecture_seule` : rôle de consultation

Puis :
- on donne les privilèges aux rôles
- on rattache les utilisateurs aux rôles

Exemple :

```sql
create role admin;
create role developpeur;
create role lecture_seule;

create role bob login password 'mot_de_passe_dev';
create role app_web login password 'mot_de_passe_app';

grant developpeur to bob;
grant lecture_seule to app_web;
```

Cette approche est plus facile à maintenir que de gérer chaque utilisateur séparément.

---

## Avant d'exécuter les commandes

Avant de créer des comptes ou de modifier des privilèges, utilisez un compte qui a déjà les droits nécessaires, par exemple :
- `postgres`
- ou un compte administrateur de votre environnement

### Option la plus simple : DBeaver

Dans ce cours, vous pouvez généralement :

1. ouvrir une connexion vers PostgreSQL
2. sélectionner la base visée, par exemple `chinook`
3. ouvrir un nouvel éditeur SQL
4. exécuter les commandes une à la fois

Même si les rôles existent à l'échelle du cluster PostgreSQL, il est plus simple pédagogiquement de se connecter à la base sur laquelle vous travaillez.

### Si vous voyez des erreurs

Exemples fréquents :
- vous n'avez pas le droit de créer un rôle
- vous n'avez pas le droit d'accorder certains privilèges
- vous êtes connecté avec un compte trop limité

Dans ce cas :
- reconnectez-vous avec un compte plus puissant
- ou demandez à l'enseignant quel compte utiliser

### Vérifier avec du SQL

Si vous utilisez surtout DBeaver, vous pouvez valider beaucoup d'éléments directement avec des requêtes SQL.

Retenez surtout l'idée :
- vérifier les rôles
- vérifier les privilèges
- tester concrètement ce qu'un rôle peut faire

Vous pouvez aussi compléter cette vérification dans DBeaver en explorant les propriétés des rôles, schémas et tables.

---

## Donner des droits avec `GRANT`

### Donner un rôle à un utilisateur

```sql
grant developpeur to bob;
grant lecteur_app to application_web;
```

### Donner l'accès à la base

```sql
grant connect on database nom_de_la_bd to developpeur;
grant connect on database nom_de_la_bd to lecteur_app;
```

### Donner l'accès au schéma

```sql
grant usage on schema public to developpeur;
grant usage on schema public to lecteur_app;
```

### Donner des droits sur les tables

```sql
grant select, insert, update, delete
on all tables in schema public
to developpeur;

grant select
on all tables in schema public
to lecteur_app;
```

### Donner des droits sur les séquences

Quand des colonnes auto-générées utilisent des séquences, il faut parfois aussi donner des droits sur ces séquences.

```sql
grant usage, select
on all sequences in schema public
to developpeur;
```

### À propos du schéma `public`

Dans PostgreSQL, beaucoup d'exemples utilisent le schéma `public`.

Pour accéder aux objets qu'il contient, on donne souvent :

```sql
grant usage on schema public to developpeur;
```

Sans ce droit, un rôle peut avoir des privilèges sur une table, mais rester bloqué dans certains contextes parce qu'il n'a pas accès au schéma qui la contient.

---

## Retirer des droits avec `REVOKE`

`revoke` sert à retirer un privilège ou un rôle.

Exemples :

```sql
revoke update on table employe from developpeur;

revoke developpeur from bob;

revoke all on table employe from lecteur_app;
```

Le principe reste le même :
- `grant` accorde
- `revoke` retire

---

## Quelques privilèges à connaître

Le tableau suivant résume les privilèges les plus utiles à retenir dans ce cours.
L'idée n'est pas de tout mémoriser, mais de reconnaître les plus fréquents.

| Privilège | S'applique surtout à | Permet essentiellement de |
|---|---|---|
| `CONNECT` | base de données | se connecter à une base |
| `TEMPORARY` | base de données | créer des tables temporaires |
| `USAGE` | schéma, séquence, type | accéder à un schéma ou utiliser certains objets |
| `CREATE` | base, schéma, tablespace | créer de nouveaux objets |
| `SELECT` | table, vue, séquence | lire des données |
| `INSERT` | table | ajouter des lignes |
| `UPDATE` | table | modifier des lignes |
| `DELETE` | table | supprimer des lignes |
| `TRUNCATE` | table | vider rapidement une table |
| `REFERENCES` | table, colonne | créer une clé étrangère qui référence la table |
| `TRIGGER` | table | créer un déclencheur |
| `EXECUTE` | fonction, procédure | exécuter une fonction ou procédure |
| `MAINTAIN` | table | exécuter certaines opérations de maintenance comme `vacuum`, `analyze`, `reindex` |

Source :
- [PostgreSQL Documentation — Privileges](https://www.postgresql.org/docs/current/ddl-priv.html)

---

## Valider les droits dans PostgreSQL

Voici quelques requêtes SQL simples que vous pouvez exécuter directement dans DBeaver.

### Voir les rôles

```sql
select rolname, rolcanlogin, rolsuper, rolcreatedb, rolcreaterole
from pg_roles
order by rolname;
```

### Voir quel utilisateur est actif

```sql
select current_user, session_user;
```

Repère :
- `session_user` correspond au compte de départ
- `current_user` correspond au rôle actif au moment présent

Si vous utilisez `set role`, `current_user` peut changer alors que `session_user` reste identique.

### Voir les bases de données

```sql
select datname
from pg_database
order by datname;
```

### Voir les schémas

```sql
select schema_name
from information_schema.schemata
order by schema_name;
```

### Voir les privilèges sur les tables

```sql
select grantee, table_schema, table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
order by grantee, table_name, privilege_type;
```

### Voir les privilèges sur une table précise

```sql
select grantee, table_schema, table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'client'
order by grantee, privilege_type;
```

### Voir les privilèges sur les séquences

```sql
select grantee, object_schema, object_name, privilege_type
from information_schema.usage_privileges
where object_schema = 'public'
order by grantee, object_name, privilege_type;
```

### Tester avec un rôle précis

On peut aussi valider le comportement en se connectant avec un autre utilisateur, ou en testant avec :

```sql
select current_user, session_user;

set role developpeur;
select current_user, session_user;
select * from employe;
reset role;
```

Cette approche permet de vérifier concrètement ce qu'un rôle peut ou ne peut pas faire.

---

## À retenir

- dans PostgreSQL, tout tourne autour de la notion de rôle
- un utilisateur est essentiellement un rôle avec droit de connexion
- le plus simple est de donner les privilèges à des rôles de groupe, puis d'y rattacher les utilisateurs
- il faut attribuer les droits selon le principe du moindre privilège
- les comptes applicatifs ne devraient pas avoir plus de droits que nécessaire
- `grant` accorde, `revoke` retire, et on peut vérifier le résultat avec SQL ou avec l'interface de DBeaver

---

### Sources

- [PostgreSQL Documentation — Privileges](https://www.postgresql.org/docs/current/ddl-priv.html)
- [PostgreSQL Documentation — GRANT](https://www.postgresql.org/docs/current/sql-grant.html)
- [PostgreSQL Documentation — REVOKE](https://www.postgresql.org/docs/current/sql-revoke.html)
