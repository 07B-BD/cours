---
title: "TP2 — Registre de la Guilde des Aventuriers"
---

# Travail Pratique #2 — Requêtes SQL (13%)

- Modalité : Individuel
- Remise : fichier `.sql` sur LÉA dans le travail concerné
- Date : voir le travail concerné sur LÉA
- Retards : -10% par jour (max 3 jours)

<div class="my-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
<strong>Attention</strong><br>

Vous devez **obligatoirement** écrire votre code `sql` dans le fichier de départ suivant. Veuillez le renommer `tp2_prenom_nom.sql`.<br>
<a href="./../databases/tp2_bd1_depart.sql" target="_blank" rel="noopener">Fichier de départ à télécharger</a>
</div>

## Vidéo explicative

<iframe width="560" height="315" src="https://www.youtube.com/embed/dnUCYcv3joU?si=XRPW7B0gy4lHdBy5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Contexte

La Grande Guilde des Aventuriers modernise ses registres.
Les anciens parchemins sont remplacés par une application interne permettant de gérer :

- les quêtes affichées dans le royaume ;
- les aventuriers inscrits à la Guilde ;
- les contrats signés entre aventuriers et quêtes.

La structure de la base de données a déjà été conçue par les architectes du Royaume.  
Cependant, le registre est encore vide.

Avant le déploiement officiel de l’application, l’équipe de développement doit disposer d’un **environnement de test réaliste**.  
Votre mandat consiste donc à préparer la base de données afin qu’elle puisse être utilisée pour des essais fonctionnels complets.

---

## Objectif

À partir de la base de données existante (**[voir le code de création à exécuter d'abord au bas de cette page](#code-de-creation-des-tables)**), vous devrez :

1. Peupler les tables avec des données fictives cohérentes, variées et plausibles.
2. Rédiger les requêtes nécessaires au fonctionnement du Registre.

Les données insérées devront respecter toutes les contraintes définies (types, relations, unicité, intervalles, enums, etc.) et permettre des **recherches significatives**.

## Contenu de la remise

Nom du fichier sql : `tp2_prenom_nom.sql`

### Fichier contenant toutes les requêtes exécutées dans l'ordre
- Inclut :
  - les requêtes d'insertion des données
  - les requêtes de sélection 
  - les requêtes de mise à jour et de suppression

## Utilisation de l’IA

L’utilisation d’un outil d’intelligence artificielle est **permise uniquement pour la génération des données d’insertion**, à condition que :

- le code respecte la structure fournie et les contraintes ;
- les principes vus en classe soient respectés ;
- vous compreniez entièrement le code exécuté.

Vous demeurez responsable du code remis.

Pour le reste du travail pratique (requêtes de sélection, mises à jour, suppressions) :

- Toute approche non vue en classe doit être validée avec l’enseignant et appuyée par une source.
- À défaut, des pénalités importantes pourront être appliquées, pouvant aller jusqu’à une déclaration de plagiat.

## Insertion des données

Vous devez insérer un minimum de **50 lignes par table** (max 100 lignes) :

- `quete`
- `aventurier`
- `contrat`

Les données doivent être :

- variées et plausibles ;
- cohérentes entre elles ;
- conformes aux types énumérés et aux contraintes définies ;
- suffisamment diversifiées pour permettre des recherches significatives.

Évitez les données répétitives ou artificielles (ex. mêmes dates, mêmes récompenses, mêmes niveaux).

Toutes les requêtes d’insertion exécutées doivent apparaître **au début du fichier remis**, dans l’ordre d’exécution.

---

## Requêtes de sélection (lecture du registre)

Rédigez les requêtes permettant à l’application de **consulter** le registre.  
Elles doivent fonctionner avec **vos propres données** et doivent retourner des valeurs significatives.
Au besoin, ajouter des nouvelles données dans votre script d'insertion initial.
Dans plusieurs cas, vous devez choisir vous-mêmes les données dans les filtres (ex. dates, plages de valeurs, etc.).


### A) Quêtes

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

1. Afficher la liste des quêtes en retournant uniquement : **titre**, **lieu**, **date d’expiration**, **difficulté**, **récompense**.  
   Présenter les résultats de la date d’expiration la plus proche à la plus lointaine.

2. Afficher les quêtes qui sont **actives** et dont la date d’expiration est aujourd’hui ou ultérieure (dans le futur).

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

3. Afficher les quêtes faciles dont la récompense est **supérieure** à celle **d’au moins une** quête périlleuse.

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

4. Afficher la liste des **lieux distincts** où des quêtes sont affichées, triée alphabétiquement.

---

### B) Aventuriers

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

5. Afficher les aventuriers **actifs** en retournant : **nom**, **classe**, **niveau**, **courriel**, triés du plus haut niveau au plus bas. L'affichage des aventuriers d'un même niveau (ex.: 19) devraient être affichés en ordre alphabétique (A, B, C, ...)

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

6. Afficher les aventuriers appartenant à une liste de classes choisie (ex.: guerrier, mage ou druide) ET dont le niveau se situe dans une plage choisie.

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

7. Afficher les aventuriers dont le nom commence par une lettre choisie (ex.: A).

---

### C) Contrats

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

8. Afficher les contrats **en cours** ET signés dans une période choisie, triés par date ascendante.

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

9. Afficher les contrats actifs liés à des quêtes actives.  
    *(Cette requête permet de vérifier la cohérence du registre.)*

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

10. Afficher la liste des aventuriers ayant au moins un contrat dont le statut est « en_cours » (sans doublons).

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

11. Afficher les aventuriers ayant réussi un contrat lié à une quête dont la récompense dépasse une valeur choisie.

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

12. Afficher les quêtes qui n’ont reçu aucun contrat.

### Deux corrections officielles du scribe (modifications)

Règle de prudence de la Guilde : avant d’inscrire une correction au registre, vérifier que la cible est bien celle attendue, afin de ne pas altérer tout le parchemin.

---

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

13. Une quête contient une récompense incorrecte.  
    - Modifier la récompense d’une quête précise (identifiée par son titre).  
    - Une seule ligne doit être affectée.

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

14. La Guilde décide de désactiver tous les contrats liés à des quêtes qui ne sont plus actives.  
     - Mettre à jour les contrats concernés sans modifier les autres.

---

### Deux purges aux oubliettes (suppression)

Mise en garde : ce qui part aux oubliettes ne revient pas. Agir avec méthode.

---

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

15. Un contrat a été saisi en double par erreur.  
    - Supprimer un contrat précis identifié clairement à l’aide de la combinaison quête + aventurier.  
    - Aucun autre contrat ne doit être supprimé.

<div class="eval">
     Produire du code SQL avec alias et jointures qui accompli la demande. Donner juste le code.
</div>

16. La Guilde souhaite nettoyer le registre en supprimant tous les contrats associés à des aventuriers qui ne sont plus actifs.  
    - Supprimer uniquement les contrats concernés, sans supprimer les aventuriers eux-mêmes.

  
## Code de création des tables

```sql
create database guilde_aventuriers

-- Se connecter à la nouvelle base de données avant d'exécuter les prochaines instructions

create type difficulte_quete as enum ('facile', 'modérée', 'périlleuse');
create type statut_contrat as enum ('disponible', 'en_cours', 'réussi', 'échoué');

create type classe_aventurier as enum (
	'guerrier', 
	'mage', 
	'périlleuse',
	'assassin',
	'druide',
	'palladin',
	'barde'
);

create table quete (
  id serial primary key,
  titre varchar(150) not null,
  description text not null,
  lieu varchar(80) not null,
  date_expiration date not null,
  difficulte difficulte_quete not null,
  recompense_or integer not null check (recompense_or >= 0),
  actif boolean not null default true
);

create table aventurier (
  id serial primary key,
  nom varchar(90) not null,
  courriel varchar(160) not null unique,
  classe varchar(40) not null,
  niveau int not null check (niveau between 1 and 20),
  actif boolean not null default true
);

create table contrat (
  id serial primary key,
  quete_id int not null,
  aventurier_id int not null,
  date_signature date not null default current_date,
  statut statut_contrat not null default 'disponible',
  notes text,
  actif boolean not null default true,

  foreign key (quete_id) references quete(id),
  foreign key (aventurier_id) references aventurier(id),

  unique (quete_id, aventurier_id)
);
```