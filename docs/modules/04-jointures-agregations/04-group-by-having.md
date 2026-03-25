The SQL GROUP BY Statement
The GROUP BY statement is used to group rows that have the same values into summary rows, like "Find the number of customers in each country".

The GROUP BY statement is almost always used in conjunction with aggregate functions, like COUNT(), MAX(), MIN(), SUM(), AVG(), to perform calculations on each group.
Mettre énormément l'accent sur le fait que group by doit se faire sur une requête qui utilise l'aggregation.

GROUP BY Syntax
SELECT column1, aggregate_function(column2), column3, ...
FROM table_name
WHERE condition
GROUP BY column1, column3
ORDER BY column_name;

2 X [EXEMPLE AVEC CHINOOK demande textuelle + requête] 

1 X [EXEMPLE AVEC CHINOOK demande textuelle + requête qui utilise une jointure] 


The SQL HAVING Clause
The HAVING clause is used to filter the results of a GROUP BY query based on aggregate functions. Unlike the WHERE clause, which filters individual rows before grouping, HAVING filters groups after the aggregation has been performed.
Mettre énormément l'accent sur le having qui remplace le where quand on utilise group by

HAVING Syntax
SELECT column1, aggregate_function(column2), column3, ...
FROM table_name
WHERE condition
GROUP BY column1, column3
HAVING condition -- The condition on grouped data
ORDER BY column_name;