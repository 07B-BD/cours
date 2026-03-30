---
title: "05 — Sous-requêtes corrélées"
---

# 05 — Sous-requêtes corrélées

## Objectif

- Comprendre ce qu'est une sous-requête corrélée
- Bien la distinguer d'une sous-requête non corrélée
- Savoir quand utiliser `exists`, `not exists` ou une comparaison avec une agrégation
- Comprendre l'impact sur les performances

## Comprendre les sous-requêtes corrélées

Une sous-requête corrélée est une sous-requête qui **dépend de la ligne courante** de la requête principale.

Autrement dit :
- la requête principale lit une ligne
- la sous-requête utilise une valeur de cette ligne
- la sous-requête est réévaluée pour cette ligne
- puis le processus recommence pour la ligne suivante

### Corrélée ou non corrélée ?

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

>Ici, la sous-requête dépend de `p1.genre_id`.
>Elle ne peut pas être évaluée sans connaître la ligne courante de `p1`.

Si on fait un parallèle avec **C#**, on peut voir cette logique comme un `foreach` :

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

>L'idée n'est pas que SQL exécute littéralement ce code, mais cette image mentale aide à comprendre que:
>- la requête externe parcourt les lignes
>- **pour chaque ligne externe**, la sous-requête recalcule une valeur liée à cette ligne
>- puis SQL décide si la ligne est gardée ou non

### À retenir

- non corrélée : indépendante, souvent exécutée une seule fois
- corrélée : dépendante, évaluée en fonction de chaque ligne externe

---

### Quand utiliser une sous-requête corrélée ?

Utilisez une sous-requête corrélée quand vous avez besoin de raisonner **ligne par ligne**.

Cas typiques :
- comparer une ligne à une moyenne, un minimum ou un maximum calculé pour son propre groupe
- vérifier l'existence d'une relation pour la ligne courante avec `exists`
- vérifier l'absence d'une relation avec `not exists`
- exprimer une règle métier qui dépend directement de l'enregistrement courant

>Si la phrase contient "pour cette ligne", "pour ce client", "pour ce genre", "pour cet employé", une sous-requête corrélée est souvent naturelle

---

### Pourquoi les alias sont importants ?

Dans une sous-requête corrélée, on doit distinguer clairement :
- la table externe
- la table relue dans la sous-requête (souvent la même table)

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

>Sans alias, il devient difficile de savoir quelle colonne appartient à la requête externe et laquelle appartient à la sous-requête.

## Exemples

### Exemple 1 — Afficher les pistes plus longues que la moyenne de leur genre

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

### Exemple 2 — Afficher les clients qui ont au moins une facture

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

Pourquoi `select 1` ?
- avec `exists`, SQL ne vérifie pas la valeur retournée, seulement la présence d'au moins une ligne
- `select 1` est donc une convention simple pour montrer qu'on teste l'existence, pas le contenu

---

### Exemple 3 — Afficher les clients sans aucune facture

L'usage de `not exists` est ici plus clair que d'utiliser `left join` + `is null`

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

---

### Exemple 4 — Afficher les employés qui supervisent au moins un autre employé

```sql
select sup.employe_id, sup.prenom, sup.nom_famille
from employe sup
where exists (
	select 1
	from employe emp
	where sup.employe_id = emp.superviseur_id
)
order by sup.employe_id;
```

Ici :
- la requête externe lit un employé
- la sous-requête vérifie s'il existe au moins un autre employé dont `superviseur_id` pointe vers cet employé

## Bien choisir l'approche

### Sous-requête corrélée, jointure ou `group by` ?

Une sous-requête corrélée est utile quand la logique est naturellement formulée **ligne par ligne**.

Préférez plutôt une jointure ou un `group by` quand :
- une jointure simple exprime déjà clairement la relation entre les tables
- un `group by` permet de calculer directement le résultat attendu
- vous voulez une requête plus facile à optimiser sur de gros volumes

En pratique :
- sous-requête corrélée : bonne option pour raisonner "pour cette ligne"
- jointure : bonne option pour relier des tables de façon directe
- `group by` : bonne option pour résumer, compter ou additionner par groupe

---

### Performance

### Exemple où une jointure est souvent plus performante

Reprenons l'exemple des pistes plus longues que la moyenne de leur genre.

Version avec sous-requête corrélée :

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

Version avec jointure et agrégation :

```sql
select p.nom, p.millisecondes, p.genre_id
from piste p
join (
	select genre_id, avg(millisecondes) moyenne_genre
	from piste
	group by genre_id
) stats
	on p.genre_id = stats.genre_id
where p.millisecondes > stats.moyenne_genre
order by p.genre_id, p.millisecondes desc;
```

Pourquoi la seconde version est souvent meilleure :
- la moyenne par genre est calculée une fois par groupe
- la jointure réutilise ensuite ce résultat pour toutes les pistes du genre
- sur un grand volume de données, cette forme est souvent plus facile à optimiser qu'un calcul répété pour chaque piste

Quelques repères pour construire cette version :
- commencez par écrire la requête qui calcule la moyenne par `genre_id`
- donnez un alias à ce résultat, par exemple `stats`
- joignez ensuite `piste` avec ce résultat sur `genre_id`
- comparez finalement `p.millisecondes` avec `stats.moyenne_genre` dans le `where`

La sous-requête corrélée reste très utile pour comprendre la logique "pour cette ligne", mais une jointure avec agrégation peut être plus efficace quand le même calcul revient souvent.

## À retenir

- une sous-requête corrélée dépend de la ligne courante de la requête externe
- elle est souvent exécutée en fonction de chaque ligne de la requête principale
- elle est très utile pour les comparaisons par groupe et les tests `exists` / `not exists`
- utilisez-la surtout quand la logique métier est naturellement "pour cette ligne"
- comparez toujours avec une solution par jointure ou agrégation si la performance devient importante

---

### Sources

- [GeeksforGeeks — SQL Correlated Subqueries](https://www.geeksforgeeks.org/sql/sql-correlated-subqueries/)
- [w3resource — SQL Correlated Subqueries](https://www.w3resource.com/sql/subqueries/correlated-subqueries-using-aliases.php)
- [SQLTutorial — SQL Correlated Subquery](https://www.sqltutorial.org/sql-correlated-subquery/)

---

<div class="my-6 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-900">
	<strong class="block">ℹ️ À faire maintenant</strong>
	<p class="m-0">
		Pour mettre ces notions en pratique, passez à la
		<a href="./../../labs/lab07-agregations#partie-2" class="font-semibold underline hover:text-blue-700">
			partie 2 du laboratoire 7 — Sous-requêtes corrélées et synthèse
		</a>.
	</p>
</div>
