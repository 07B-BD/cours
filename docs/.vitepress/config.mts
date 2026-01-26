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
			{ 
				text: "Calendrier",
				items: [
					{ text: "Groupe 1", link: "/plan-cours/calendrier-gr1" },
					{ text: "Groupe 2", link: "/plan-cours/calendrier-gr2" },
					{ text: "Groupe 3", link: "/plan-cours/calendrier-gr3" },
				], 
			},
			{ text: "Modules", link: "/modules/01-introduction/" },
			{ text: "Travaux", link: "/travaux/tp1-creation-bd" },
			{ text: 'Documentation PostgreSQL', link: 'https://docs.postgresql.fr/18/'},
		],
		sidebar: [
			{
				text: "Documents généraux",
				items: [
					{ text: "Plan de cours", link: "/plan-cours/plan-de-cours" },
					{
						text: "Calendriers",
						items: [
							{ text: "Groupe 1", link: "/plan-cours/calendrier-gr1" },
							{ text: "Groupe 2", link: "/plan-cours/calendrier-gr2" },
							{ text: "Groupe 3", link: "/plan-cours/calendrier-gr3" },
						],
					},
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
								text: "Présentation",
								link: "/modules/01-introduction/00-presentation",
							},
							{
								text: "Formats de données",
								link: "/modules/01-introduction/01-formats-donnees",
							},
							{
								text: "Structure relationnelle",
								link: "/modules/01-introduction/02-structure-relationnelle",
							},
							{
								text: "Modèle de données",
								link: "/modules/01-introduction/03-modelisation",
							},
						],
					},
					{
						text: "Module 2 — DDL de base",
						collapsed: false,
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
								text: "Contraintes et Enums",
								link: "/modules/02-ddl-base/03-contraintes-simples",
							},
							{
								text: "Clés primaires et étrangères",
								link: "/modules/02-ddl-base/04-cles-primaires-etrangeres",
							},
							{
								text: "Démonstration de création de BD",
								link: "/modules/02-ddl-base/05-demo-ddl",
							},
							{
								text: "DROP simple",
								link: "/modules/02-ddl-base/06-drop-simple",
							},
							{
								text: "Import & export",
								link: "/modules/02-ddl-base/07-import-export",
							},
						],
					},
					/*
					{
						text: "Module 3 — SQL",
						collapsed: false,
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
					}
					*/
				],
			},
			{
				text: "Laboratoires",
				collapsed: true,
				items: [
					{ text: "Lab 01 — Installations", link: "/labs/lab01-installations" },
					{ text: "Lab 02 — Modélisation", link: "/labs/lab02-modelisation" },
					{ text: "Lab 03 — DDL", link: "/labs/lab03-ddl" }
				],
			},
			{
				text: "Travaux pratiques",
				collapsed: true,
				items: [
					{ text: "TP1 — Création BD", link: "/travaux/tp1-creation-bd" },
					//{ text: "TP2 — Requêtes SQL", link: "/travaux/tp2-sql" },
					//{ text: "TP3 — DDL avancé", link: "/travaux/tp3-ddl-avance" },
				],
			},
			{
				text: "Grilles d’évaluation",
				collapsed: true,
				items: [
					{ text: "Grille — TP1", link: "/grilles/grille-tp1" },
					//{ text: "Grille — TP2", link: "/grilles/grille-tp2" },
					//{ text: "Grille — TP3", link: "/grilles/grille-tp3" },
					//{ text: "Grille — Examen 1", link: "/grilles/grille-examen1" },
					//{ text: "Grille — Examen 2", link: "/grilles/grille-examen2" },
				],
			},
		],

		search: {
			provider: "local",
		},
	},
});
