---
title: "02 — Fonctions d'agrégations"
---

# 03 — Fonctions d'agrégations

SOURCE : https://www.w3schools.com/sql/sql_aggregate_functions.asp
Fonctions agrégées SQL
Une fonction agrégée est une fonction qui effectue un calcul sur un ensemble de valeurs et renvoie une seule valeur.

Les fonctions agrégées sont souvent utilisées avec le GROUP BY clause de la SELECT déclaration. Le GROUP BY la clause divise l'ensemble de résultats en groupes de valeurs et la fonction d'agrégation peut être utilisée pour renvoyer une valeur unique pour chaque groupe.


Les fonctions d'agrégation SQL les plus courantes :

---

**MIN()** — Renvoie la plus petite valeur d'une colonne.
*Exemple (Chinook)* : Quel est le prix le plus bas d'une piste ?
```sql
select min(unitprice) as prix_minimum from track;
```

---

**MAX()** — Renvoie la plus grande valeur d'une colonne.
*Exemple (Chinook)* : Quel est le prix le plus élevé d'une piste ?
```sql
select max(unitprice) as prix_maximum from track;
```

---

**COUNT()** — Renvoie le nombre de lignes dans un ensemble.
*Exemple (Chinook)* : Combien y a-t-il de clients ?
```sql
select count(*) as nombre_clients from customer;
```

---

**SUM()** — Renvoie la somme d'une colonne numérique.
*Exemple (Chinook)* : Quel est le montant total de toutes les factures ?
```sql
select sum(total) as montant_total from invoice;
```

---

**AVG()** — Renvoie la valeur moyenne d'une colonne numérique.
*Exemple (Chinook)* : Quel est le montant moyen d'une facture ?
```sql
select avg(total) as montant_moyen from invoice;
```

---

Les fonctions agrégées ignorent les valeurs nulles (sauf pour COUNT(*)).