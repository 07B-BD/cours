---
title: "05 — Sous-requêtes corrélées"
---

# 05 — Sous-requêtes corrélées

## Objectif

- Comprendre ce qu'est une sous-requête corrélée
- Bien la distinguer d'une sous-requête non corrélée
- Savoir quand utiliser `exists`, `not exists` ou une comparaison avec une agrégation
- Voir des exemples réalistes avec Chinook
- Comprendre l'impact sur les performances

---

## Principe

Une sous-requête corrélée est une sous-requête qui **dépend de la ligne courante** de la requête principale.

Autrement dit :
- la requête principale lit une ligne
- la sous-requête utilise une valeur de cette ligne
- la sous-requête est réévaluée pour cette ligne
- puis le processus recommence pour la ligne suivante

Exemple d'idée :
- comparer une piste à la moyenne des pistes de son genre
- vérifier si un client possède au moins une facture
- vérifier si un employé supervise quelqu'un

<div class="my-3 rounded-lg border border-red-300 bg-red-50 p-3 text-red-900">
<strong>Important</strong><br>
La différence centrale avec une sous-requête non corrélée est la suivante :
une sous-requête non corrélée s'exécute indépendamment, alors qu'une sous-requête corrélée dépend de la ligne courante de la requête externe.
</div>

---

## Corrélée ou non corrélée ?

### Sous-requête non corrélée

Elle peut être exécutée seule, sans référence à la requête principale.

```sql
select nom, prix_unitaire
from piste
where genre_id in (
	select genre_id
	from genre
	where nom = 'Rock'
);
```

Ici, la sous-requête :

```sql
select genre_id
from genre
where nom = 'Rock';
```

peut s'exécuter toute seule. Elle ne dépend d'aucune ligne de la requête principale.

### Sous-requête corrélée

Elle référence une colonne de la requête principale.

```sql
select p1.nom, p1.millisecondes
from piste p1
where p1.millisecondes > (
	select avg(p2.millisecondes)
	from piste p2
	where p1.genre_id = p2.genre_id
);
```

Ici, la sous-requête dépend de `p1.genre_id`.
Elle ne peut pas être évaluée sans connaître la ligne courante de `p1`.

Si on fait un parallèle avec C#, on peut voir cette logique comme un `foreach` :

```csharp
foreach (var pisteCourante in pistes)
{
    double dureeMoyenneDesPistes = // Code qui calcule la durée moyenne de toutes les pistes

    if (pisteCourante.Millisecondes > dureeMoyenneDesPistes) // À chaque piste, on compare la durée en millisecondes à la durée moyenne
    {
        Console.WriteLine(pisteCourante.Nom);
    }
}
```

L'idée n'est pas que SQL exécute littéralement ce code, mais cette image mentale aide à comprendre que:
- la requête externe parcourt les lignes
- pour chaque ligne, la sous-requête recalcule une valeur liée à cette ligne
- puis SQL décide si la ligne est gardée ou non

### À retenir

- non corrélée : indépendante, souvent exécutée une seule fois
- corrélée : dépendante, évaluée en fonction de chaque ligne externe

---

## Quand utiliser une sous-requête corrélée ?

Utilisez une sous-requête corrélée quand vous avez besoin de raisonner **ligne par ligne**.

Cas typiques :
- comparer une ligne à une moyenne, un minimum ou un maximum calculé pour son propre groupe
- vérifier l'existence d'une relation pour la ligne courante avec `exists`
- vérifier l'absence d'une relation avec `not exists`
- exprimer une règle métier qui dépend directement de l'enregistrement courant

Très bon réflexe :
- si la phrase contient "pour cette ligne", "pour ce client", "pour ce genre", "pour cet employé", une sous-requête corrélée est souvent naturelle

---

## Pourquoi les alias sont importants ?

Dans une sous-requête corrélée, on doit distinguer clairement :
- la table externe
- la table relue dans la sous-requête

Exemple :

```sql
select p1.nom, p1.millisecondes
from piste p1
where p1.millisecondes > (
	select avg(p2.millisecondes)
	from piste p2
	where p1.genre_id = p2.genre_id
);
```

Sans alias, il devient difficile de savoir quelle colonne appartient à la requête externe et laquelle appartient à la sous-requête.

---

## Exemples

### Exemple 1 — Pistes plus longues que la moyenne de leur genre

Quand l'utiliser :
- quand on veut comparer une ligne à une valeur agrégée calculée pour son propre groupe

```sql
select p1.nom, p1.millisecondes, p1.genre_id
from piste p1
where p1.millisecondes > (
	select avg(p2.millisecondes)
	from piste p2
	where p1.genre_id = p2.genre_id
)
order by p1.genre_id, p1.millisecondes desc;
```

Ce que fait la requête :
- la requête externe parcourt les pistes
- pour chaque piste, la sous-requête calcule la durée moyenne des pistes du même genre
- on conserve les pistes plus longues que cette moyenne

Pourquoi c'est corrélé :
- `p1.genre_id` vient de la ligne courante de la requête externe

---

### Exemple 2 — Clients qui ont au moins une facture

Quand l'utiliser :
- quand on veut tester l'existence d'au moins une ligne liée
- `exists` est très adapté à ce cas

```sql
select c.client_id, c.prenom, c.nom_famille
from client c
where exists (
	select 1
	from facture f
	where c.client_id = f.client_id
)
order by c.client_id;
```

Ce que fait la requête :
- pour chaque client, on vérifie s'il existe au moins une facture
- dès qu'une facture correspondante est trouvée, `exists` devient vrai

Quand préférer `exists` :
- quand la question est "est-ce qu'il existe au moins une ligne liée ?"

---

### Exemple 3 — Clients sans aucune facture

Quand l'utiliser :
- quand on veut trouver les lignes sans correspondance
- `not exists` est souvent plus clair que d'utiliser `left join` + `is null`

```sql
select c.client_id, c.prenom, c.nom_famille
from client c
where not exists (
	select 1
	from facture f
	where c.client_id = f.client_id
)
order by c.client_id;
```

Ce cas est très fréquent :
- clients sans facture
- artistes sans album
- listes de lecture sans piste

---

### Exemple 4 — Employés qui supervisent au moins un autre employé

Quand l'utiliser :
- quand la corrélation se fait dans la même table
- excellent cas pour montrer qu'une sous-requête corrélée ne sert pas seulement entre deux tables différentes

```sql
select e1.employe_id, e1.prenom, e1.nom_famille
from employe e1
where exists (
	select 1
	from employe e2
	where e1.employe_id = e2.superviseur_id
)
order by e1.employe_id;
```

Ici :
- la requête externe lit un employé
- la sous-requête vérifie s'il existe au moins un autre employé dont `superviseur_id` pointe vers cet employé

---

### Exemple 5 — Albums qui contiennent au moins une piste plus longue que la moyenne de l'album

Quand l'utiliser :
- quand la condition d'existence dépend elle-même d'un calcul corrélé

```sql
select al.album_id, al.titre
from album al
where exists (
	select 1
	from piste p1
	where al.album_id = p1.album_id
		and p1.millisecondes > (
			select avg(p2.millisecondes)
			from piste p2
			where p1.album_id = p2.album_id
		)
)
order by al.titre;
```

Cette requête montre qu'on peut imbriquer une logique corrélée plus poussée :
- la requête externe parcourt les albums
- la sous-requête cherche des pistes de cet album
- une seconde sous-requête corrélée compare chaque piste à la moyenne des pistes du même album

Ce n'est pas toujours la solution la plus performante, mais c'est une bonne démonstration du mécanisme.

---

## `exists` vs `in`

Dans plusieurs cas, `exists` est plus naturel pour les sous-requêtes corrélées.

Utilisez `exists` quand :
- vous voulez simplement savoir si au moins une ligne liée existe
- la sous-requête dépend de la ligne courante
- vous n'avez pas besoin de récupérer une liste de valeurs

Utilisez `in` plutôt quand :
- la sous-requête n'est pas corrélée
- vous comparez une valeur à un ensemble déjà calculé

Exemple `exists` :

```sql
select c.client_id, c.prenom
from client c
where exists (
	select 1
	from facture f
	where c.client_id = f.client_id
);
```

Exemple `in` non corrélé :

```sql
select client_id, prenom
from client
where client_id in (
	select client_id
	from facture
);
```

Les deux peuvent parfois produire le même résultat, mais ils ne racontent pas exactement la même logique.

---

## Quand ne pas les utiliser ?

Évitez les sous-requêtes corrélées si :
- une jointure simple est plus directe
- un `group by` répond déjà bien au besoin
- une fonction fenêtre serait plus claire pour comparer une ligne à une moyenne de groupe
- le volume est important et la requête devient coûteuse

Exemple : pour afficher le nombre de factures par client, un `group by` est généralement plus naturel qu'une sous-requête corrélée.

Moins naturel :

```sql
select c.client_id, c.prenom,
	(
		select count(*)
		from facture f
		where c.client_id = f.client_id
	) nombre_factures
from client c;
```

Plus naturel :

```sql
select c.client_id, c.prenom, count(f.facture_id) nombre_factures
from client c
left join facture f
	on c.client_id = f.client_id
group by c.client_id, c.prenom
order by c.client_id;
```

La sous-requête corrélée fonctionne, mais le `left join` avec `group by` exprime souvent mieux l'intention.

---

## Performance

### Comparaison générale

- sous-requête non corrélée : souvent calculée une fois
- sous-requête corrélée : souvent réévaluée pour chaque ligne de la requête externe
- jointure avec `group by` : souvent plus facile à optimiser sur de gros volumes

### Conséquence pratique

Une sous-requête corrélée peut devenir plus lente quand :
- la table externe contient beaucoup de lignes
- la sous-requête lit elle aussi beaucoup de lignes
- les colonnes de corrélation ne sont pas indexées

### Bonnes pratiques

- utilisez-la quand elle exprime clairement une logique "ligne par ligne"
- préférez `exists` / `not exists` pour les tests d'existence
- vérifiez toujours si une jointure ou un `group by` donnerait le même résultat plus simplement
- sur de gros jeux de données, comparez les plans d'exécution

### Idée clé

Une sous-requête corrélée n'est pas "mauvaise".
Elle est utile quand elle correspond exactement à la question posée.
Elle devient problématique quand on l'utilise là où une requête agrégée ou une jointure ferait le travail plus efficacement.

---

## À retenir

- une sous-requête corrélée dépend de la ligne courante de la requête externe
- elle est souvent exécutée en fonction de chaque ligne de la requête principale
- elle est très utile pour les comparaisons par groupe et les tests `exists` / `not exists`
- utilisez-la surtout quand la logique métier est naturellement "pour cette ligne"
- comparez toujours avec une solution par jointure ou agrégation si la performance devient importante

---

## Sources

- [GeeksforGeeks — SQL Correlated Subqueries](https://www.geeksforgeeks.org/sql/sql-correlated-subqueries/)
- [w3resource — SQL Correlated Subqueries](https://www.w3resource.com/sql/subqueries/correlated-subqueries-using-aliases.php)
- [SQLTutorial — SQL Correlated Subquery](https://www.sqltutorial.org/sql-correlated-subquery/)
