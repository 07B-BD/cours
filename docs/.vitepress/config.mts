import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/cours/',
  lang: 'fr-CA',
  cleanUrls: true,
  title: '420-07B-FX',
  description: 'Introduction aux bases de données — Énoncés, grilles, calendrier et ressources',
  themeConfig: {
    logo: './logos/logo.png',

    nav: [
      { text: 'Plan de cours', link: '/plan-cours/plan-de-cours' },
      { text: 'Calendrier', link: '/plan-cours/calendrier' },
      {
        text: 'Modules',
        items: [
          { text: '01 — Introduction', link: '/modules/01-introduction/' },
          { text: '02 — DDL de base', link: '/modules/02-ddl-base/' },
          { text: '03 — SQL de base', link: '/modules/03-sql-base/' },
          { text: '04 — Relations & jointures', link: '/modules/04-relations-jointures/' },
          { text: '05 — Agrégation', link: '/modules/05-aggregation/' },
          { text: '06 — DDL avancé', link: '/modules/06-ddl-avance/' },
          { text: '07 — Révision examens', link: '/modules/07-revision-examens/' }
        ]
      },
      {
        text: 'Travaux',
        items: [
          { text: 'TP1 — Création BD', link: '/travaux/tp1-creation-bd' },
          { text: 'TP2 — Requêtes SQL', link: '/travaux/tp2-sql' },
          { text: 'TP3 — DDL avancé', link: '/travaux/tp3-ddl-avance' }
        ]
      },
      {
        text: 'Grilles',
        items: [
          { text: 'Grille — TP1', link: '/grilles/grille-tp1' },
          { text: 'Grille — TP2', link: '/grilles/grille-tp2' },
          { text: 'Grille — TP3', link: '/grilles/grille-tp3' },
          { text: 'Grille — Examen 1', link: '/grilles/grille-examen1' },
          { text: 'Grille — Examen 2', link: '/grilles/grille-examen2' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Documents généraux',
        items: [
          { text: 'Plan de cours', link: '/plan-cours/plan-de-cours' },
          { text: 'Calendrier', link: '/plan-cours/calendrier' }
        ]
      },
      {
        text: 'Modules d’apprentissage',
        items: [
          { text: '01 — Introduction', link: '/modules/01-introduction/' },
          { text: '02 — DDL de base', link: '/modules/02-ddl-base/' },
          { text: '03 — SQL de base', link: '/modules/03-sql-base/' },
          { text: '04 — Relations & jointures', link: '/modules/04-relations-jointures/' },
          { text: '05 — Agrégation', link: '/modules/05-aggregation/' },
          { text: '06 — DDL avancé', link: '/modules/06-ddl-avance/' },
          { text: '07 — Révision examens', link: '/modules/07-revision-examens/' }
        ]
      },
      {
        text: 'Travaux pratiques',
        items: [
          { text: 'TP1 — Création BD', link: '/travaux/tp1-creation-bd' },
          { text: 'TP2 — Requêtes SQL', link: '/travaux/tp2-sql' },
          { text: 'TP3 — DDL avancé', link: '/travaux/tp3-ddl-avance' }
        ]
      },
      {
        text: 'Grilles d’évaluation',
        items: [
          { text: 'Grille — TP1', link: '/grilles/grille-tp1' },
          { text: 'Grille — TP2', link: '/grilles/grille-tp2' },
          { text: 'Grille — TP3', link: '/grilles/grille-tp3' },
          { text: 'Grille — Examen 1', link: '/grilles/grille-examen1' },
          { text: 'Grille — Examen 2', link: '/grilles/grille-examen2' }
        ]
      }
    ],

    search: {
      provider: 'local'
    }
  }
})
