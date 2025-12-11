import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/cours/",
	lang: "fr-CA",
	cleanUrls: true,
	title: "420-07B-FX",
	description:
		"Introduction aux bases de données — Énoncés, grilles, calendrier et ressources",
	themeConfig: {
		logo: "./logos/logo.png",

		nav: [
			{ text: "Plan de cours", link: "/plan-cours/plan-de-cours" },
			{ text: "Calendrier", link: "/plan-cours/calendrier" },
			{
				text: "Modules",
				items: [
					{ text: "01 — Introduction", link: "/modules/01-introduction/" },
					{ text: "02 — DDL de base", link: "/modules/02-ddl-base/" },
					{ text: "03 — SQL de base", link: "/modules/03-sql-base/" },
					{
						text: "04 — Relations & jointures",
						link: "/modules/04-relations-jointures/",
					},
					{ text: "05 — Agrégation", link: "/modules/05-aggregation/" },
					{
						text: "06 — DDL avancé et sécurité",
						link: "/modules/06-ddl-avance/",
					},
					{
						text: "07 — Révision examens",
						link: "/modules/07-revision-examens/",
					},
				],
			},
			{
				text: "Travaux",
				items: [
					{ text: "TP1 — Création BD", link: "/travaux/tp1-creation-bd" },
					{ text: "TP2 — Requêtes SQL", link: "/travaux/tp2-sql" },
					{ text: "TP3 — DDL avancé", link: "/travaux/tp3-ddl-avance" },
				],
			},
			{
				text: "Grilles",
				items: [
					{ text: "Grille — TP1", link: "/grilles/grille-tp1" },
					{ text: "Grille — TP2", link: "/grilles/grille-tp2" },
					{ text: "Grille — TP3", link: "/grilles/grille-tp3" },
					{ text: "Grille — Examen 1", link: "/grilles/grille-examen1" },
					{ text: "Grille — Examen 2", link: "/grilles/grille-examen2" },
				],
			},
		],

		sidebar: [
			{
				text: "Documents généraux",
				items: [
					{ text: "Plan de cours", link: "/plan-cours/plan-de-cours" },
					{ text: "Calendrier", link: "/plan-cours/calendrier" },
				],
			},
			{
				text: "Modules du cours",
				collapsed: false,
				items: [
					{
						text: "Module 1 — Introduction",
						collapsed: false,
						items: [
							{
								text: "Formats de données",
								link: "/modules/01-introduction/01-formats-donnees",
							},
							{
								text: "Types SGBD",
								link: "/modules/01-introduction/02-sgbd-types",
							},
							{
								text: "Structure relationnelle",
								link: "/modules/01-introduction/03-structure-relationnelle",
							},
							{
								text: "Modèle de données",
								link: "/modules/01-introduction/04-modele-donnees",
							},
						],
					},
					{
						text: "Module 2 — DDL de base",
						collapsed: true,
						items: [
							{
								text: "Create database",
								link: "/modules/02-ddl-base/01-create-database",
							},
							{
								text: "Create table",
								link: "/modules/02-ddl-base/02-create-table",
							},
							{
								text: "Contraintes simples",
								link: "/modules/02-ddl-base/03-contraintes-simples",
							},
							{
								text: "Clés primaires et étrangères",
								link: "/modules/02-ddl-base/04-cles-primaires-etrangeres",
							},
							{
								text: "DROP simple",
								link: "/modules/02-ddl-base/05-drop-simple",
							},
							{
								text: "Import & export",
								link: "/modules/02-ddl-base/06-import-export",
							},
							{
								text: "Comptes et droits",
								link: "/modules/02-ddl-base/07-comptes-et-droits",
							},
						],
					},
					{
						text: "Module 3 — SQL",
						collapsed: true,
						items: [
							{
								text: "SELECT + WHERE",
								link: "/modules/03-sql-base/01-select-where",
							},
							{
								text: "INSERT / UPDATE / DELETE",
								link: "/modules/03-sql-base/02-insert-update-delete",
							},
							{
								text: "Opérateurs logiques",
								link: "/modules/03-sql-base/03-operateurs",
							},
							{
								text: "Sous-requêtes non corrélées",
								link: "/modules/03-sql-base/04-sous-requetes-non-correlees",
							},
							{ text: "Exercices", link: "/modules/03-sql-base/05-exercices" },
						],
					},
					{
						text: "Module 4 — Relations et jointures",
						collapsed: true,
						items: [
							{
								text: "Clés étrangères",
								link: "/modules/04-relations-jointures/01-cles-etrangeres",
							},
							{
								text: "Contraintes référentielles",
								link: "/modules/04-relations-jointures/02-contraintes-referentielles",
							},
							{
								text: "Index",
								link: "/modules/04-relations-jointures/03-index",
							},
							{
								text: "Inner/Left join",
								link: "/modules/04-relations-jointures/04-inner-left-join",
							},
							{
								text: "Sous-requêtes corrélées",
								link: "/modules/04-relations-jointures/05-sous-requetes-correlees",
							},
							{
								text: "Expressions régulières",
								link: "/modules/04-relations-jointures/06-expressions-regulieres",
							},
						],
					},
					{
						text: "Module 5 — Agrégation",
						collapsed: true,
						items: [
							{
								text: "Fonctions d’agrégation",
								link: "/modules/05-aggregation/01-fonctions-agregation",
							},
							{
								text: "GROUP BY + HAVING",
								link: "/modules/05-aggregation/02-group-by-having",
							},
							{
								text: "Exercices",
								link: "/modules/05-aggregation/03-exercices",
							},
						],
					},
					{
						text: "Module 6 — DDL avancé et sécurité",
						collapsed: true,
						items: [
							{
								text: "ALTER TABLE",
								link: "/modules/06-ddl-avance/01-alter-table",
							},
							{
								text: "Contraintes avancées",
								link: "/modules/06-ddl-avance/02-gestion-contraintes-avancees",
							},
							{
								text: "Cascade delete / update",
								link: "/modules/06-ddl-avance/03-cascade-delete-update",
							},
							{
								text: "Hachage mots de passe",
								link: "/modules/06-ddl-avance/04-hachage-mots-de-passe",
							},
							{
								text: "Exercices",
								link: "/modules/06-ddl-avance/05-exercices",
							},
						],
					},
					{
						text: "Révision et examens",
						collapsed: true,
						items: [
							{
								text: "Révision générale",
								link: "/modules/07-revision-examens/revision",
							},
							{
								text: "Examen #1 (contenu)",
								link: "/modules/07-revision-examens/examen1",
							},
							{
								text: "Examen #2 (contenu)",
								link: "/modules/07-revision-examens/examen2",
							},
						],
					},
				],
			},
			{
				text: "Laboratoires",
				collapsed: true,
				items: [
					{ text: "Lab 01 — Création BD", link: "/labs/lab01-create-db" },
					{ text: "Lab 02 — Création tables", link: "/labs/lab02-create-tables" },
					{ text: "Lab 03 — Contraintes simples", link: "/labs/lab03-contraintes-simples" },
					{ text: "Lab 04 — Clés primaires", link: "/labs/lab04-cles-primaires" },
					{ text: "Lab 05 — Clés étrangères", link: "/labs/lab05-cles-etrangeres" },
					{ text: "Lab 06 — SQL", link: "/labs/lab06-sql" },
					{ text: "Lab 07 — Clauses", link: "/labs/lab07-clauses" },
					{ text: "Lab 08 — Sous-requêtes non corrélées", link: "/labs/lab08-sous-requetes-non-correlees" },
					{ text: "Lab 09 — Jointures", link: "/labs/lab09-jointures" },
					{ text: "Lab 10 — GROUP BY / HAVING", link: "/labs/lab10-groupby-having" },
					{ text: "Lab 11 — ALTER TABLE", link: "/labs/lab11-alter-table" },
					{ text: "Lab 12 — Cascade", link: "/labs/lab12-cascade" },
					{ text: "Lab 13 — Hachage / Sécurité", link: "/labs/lab13-securite" },
					{ text: "Lab 14 — Révision", link: "/labs/lab14-revision" },
				],
			},
			{
				text: "Travaux pratiques",
				collapsed: true,
				items: [
					{ text: "TP1 — Création BD", link: "/travaux/tp1-creation-bd" },
					{ text: "TP2 — Requêtes SQL", link: "/travaux/tp2-sql" },
					{ text: "TP3 — DDL avancé", link: "/travaux/tp3-ddl-avance" },
				],
			},
			{
				text: "Grilles d’évaluation",
				collapsed: true,
				items: [
					{ text: "Grille — TP1", link: "/grilles/grille-tp1" },
					{ text: "Grille — TP2", link: "/grilles/grille-tp2" },
					{ text: "Grille — TP3", link: "/grilles/grille-tp3" },
					{ text: "Grille — Examen 1", link: "/grilles/grille-examen1" },
					{ text: "Grille — Examen 2", link: "/grilles/grille-examen2" },
				],
			},
		],

		search: {
			provider: "local",
		},
	},
});
