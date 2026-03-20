---
title: "02 — Jointures"
---

# 02 — Jointures

## Objectif

Comprendre comment **combiner des données provenant de plusieurs tables** :
- `inner join` (lignes qui matchent des deux côtés)
- `left join` (garder toutes les lignes de gauche)
- `right join` (garder toutes les lignes de droite)
- `full join` (garder tout des deux côtés)

Dans les exemples, on utilise des **alias de tables** (ex. `piste p`, `album al`) pour :
- rendre les requêtes plus courtes et lisibles
- éviter l’ambiguïté quand plusieurs tables ont des colonnes du même nom

---

## Base de données de test à importer (Chinook)

<div class="my-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
<strong>Attention</strong><br>
Pour suivre les exemples de ce module, vous devez importer la base de données <strong>Chinook</strong>.<br>

<strong>Télécharger la base de données de test — Chinook :</strong>
<br>
<a href="./../../databases/chinook.sql" target="_blank" rel="noopener">Fichier .sql à télécharger</a>

</div>

### Importation

Téléchargez le fichier SQL, puis exécutez dans un invite de commandes :<br>
<strong>Changez le chemin d'accès du fichier selon où vous l'avez placé.</strong>

```bash
psql -U postgres -f "C:\Users\Admin\Desktop\chinook.sql"
```

### À propos de Chinook

Chinook est une base de données d’exemple qui représente une petite boutique de musique numérique.
Elle contient notamment :
- le catalogue musical (`artiste`, `album`, `piste`, `genre`, `type_media`)
- les ventes (`client`, `facture`, `ligne_facture`)
- des listes de lecture (`liste_lecture`, `liste_lecture_piste`)

---

## Pourquoi faire des jointures ?

Dans un modèle relationnel, l’information est **répartie en plusieurs tables**.
Une jointure permet de **rassembler** les données liées (par une clé primaire/étrangère) dans un même résultat.

Exemple (catalogue musical) :
- la piste est dans `piste`
- le nom de l’album est dans `album`
- le nom de l’artiste est dans `artiste`

---

## Syntaxe générale

Forme courante :

```sql
select ...
from table_a a
join table_b b
	on a.cle = b.cle;
```

À retenir :
- `join` seul = `inner join`
- préférez les **alias** (`a`, `b`) pour éviter l’ambiguïté
- mettez la condition de jointure dans `on` (pas dans `where`)
- dans le `on`, on compare généralement une colonne de la table de gauche avec une colonne de la table de droite (ex. `a.id = b.a_id`)
- les lignes pour lesquelles les deux valeurs correspondent seront associées dans le résultat
- le cas le plus courant : jointure entre une **clé primaire (PK)** et une **clé étrangère (FK)**

---

## Alias de tables et de colonnes
Les alias servent à **identifier facilement** les colonnes et les tables dans les requêtes qui référencent plus d'une table.

### Alias de tables

On met l’alias **après** le nom de la table :

```sql
select p.nom, al.titre
from piste p
join album al
	on al.album_id = p.album_id;
```

Ensuite, on préfixe les colonnes avec l’alias (ex. `p.nom`, `al.titre`).

### Alias de colonnes

```sql
select p.nom piste, al.titre album
from piste p
left join album al
	on al.album_id = p.album_id;
```

---

## Inner join

Un `inner join` retourne **uniquement** les lignes qui ont une correspondance des deux côtés.

### Exemple — artistes et albums

```sql
select ar.nom artiste, al.titre album
from artiste ar
join album al
	on al.artiste_id = ar.artiste_id
order by ar.nom, al.titre;
```

### Exemple — factures et lignes de facture

```sql
select f.facture_id, f.date_facture, lf.piste_id, lf.quantite, lf.prix_unitaire
from facture f
join ligne_facture lf
	on lf.facture_id = f.facture_id
order by f.facture_id;
```

> Remarque : on n’a pas besoin d’écrire `inner` ; `join` seul correspond à un `inner join`.

---

## Left join

Un `left join` retourne :
- **toutes** les lignes de la table de gauche
- et les lignes correspondantes de la table de droite (sinon, des `NULL`)

### Exemple — montrer tous les clients ainsi que leur représentant respectif

Dans Chinook, un client pourrait ne pas avoir de représentant, car la colonne representant_id est nullable.

```sql
select c.prenom client, r.prenom représentant
from client c
left join employe r
	on c.representant_id = r.employe_id
order by r.prenom desc;
```

> Ici, 4 clients n'ont pas de représentant.

### Exemple — garder tous les clients, même sans facture

```sql
select c.client_id, c.prenom, c.nom_famille, f.facture_id
from client c
left join facture f
	on f.client_id = c.client_id
order by c.client_id, f.facture_id;
```
> Ici, le client avec id_client = 1 n'est jamais référencé dans facture.


Dans les deux exemples, on veut quand-même afficher les informations de la table de gauche, le client, même pour les enregistrements où la référence avec la table de droite est inexistante.

---

## Right join

Un `right join` est l’équivalent d’un `left join`, mais en gardant **toutes** les lignes de la table de droite.
En pratique, on l’utilise moins : on préfère souvent **inverser l’ordre** des tables et faire un `left join`.

### Exemple — garder tous les représentants (version inversée du `left join` client → représentant)

Ici, on garde **tous** les employés (représentants), même ceux qui n’ont aucun client.

```sql
select r.prenom représentant, c.prenom client
from client c
right join employe r
	on c.representant_id = r.employe_id
order by r.prenom, c.prenom;
```

<div class="my-3 rounded-lg border border-red-300 bg-red-50 p-3 text-red-900">
<strong>Important</strong><br>
En pratique, évitez <code>right join</code> : réécrivez la requête avec un <code>left join</code> en inversant l’ordre des tables. C’est généralement plus lisible.
</div>

---

## Full join

Un `full join` retourne :
- toutes les lignes de gauche
- toutes les lignes de droite
- avec des `NULL` quand il n’y a pas de correspondance

### Exemple — clients avec ou sans représentant, et représentants avec ou sans clients

Ce `full join` permet de voir :
- les clients qui n’ont pas de représentant (`employe` = `NULL`)
- les employés qui ne sont le représentant d’aucun client (`client` = `NULL`)

```sql
select c.prenom client, r.prenom représentant
from client c
full join employe r
	on c.representant_id = r.employe_id
order by r.prenom, c.prenom;
```

---

## Exemples de jointures multi-tables

### Exemple A — catalogue : artiste → album → piste (+ type_media, genre)

```sql
select
	ar.nom artiste,
	al.titre album,
	p.nom piste,
	tm.nom type_media,
	g.nom genre,
	p.prix_unitaire
from artiste ar
join album al
	on al.artiste_id = ar.artiste_id
join piste p
	on p.album_id = al.album_id
join type_media tm
	on tm.type_media_id = p.type_media_id
left join genre g
	on g.genre_id = p.genre_id
order by ar.nom, al.titre, p.nom;
```

### Exemple B — ventes : client → facture → ligne_facture → piste

```sql
select
	c.prenom,
	c.nom_famille,
	f.facture_id,
	f.date_facture,
	p.nom piste,
	lf.quantite,
	lf.prix_unitaire,
	(lf.quantite * lf.prix_unitaire) total_ligne
from client c
join facture f
	on f.client_id = c.client_id
join ligne_facture lf
	on lf.facture_id = f.facture_id
join piste p
	on p.piste_id = lf.piste_id
order by f.date_facture desc, f.facture_id;
```

---

<div class="my-6 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-900">
	<strong class="block">ℹ️ À faire maintenant</strong>
	<p class="m-0">
		Pour mettre ces notions en pratique, passez au
		<a href="./../../labs/lab06-jointures" class="font-semibold underline hover:text-blue-700">
			Laboratoire 6 — Jointures
		</a>.
	</p>
</div>