import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/cours/",
  lang: 'fr-CA',
  cleanUrls: true,
  title: "420-08C-FX",
  description: "Énoncés, grilles, calendrier et ressources du cours",
  themeConfig: {
    logo: './logos/logo.png',
    nav: [
      { text: 'Calendrier', link: '/calendrier' },
      { text: 'Horaires', link: '/horaires' },
      { 
        text: 'Énoncés',
        items: [
          { text: 'Planification du projet', link: '/enonces/planif-projet' },
          { text: 'Planification de sprint', link: '/enonces/planif-sprint' },
          { text: 'Rapport de fin de sprint', link: '/enonces/fin-sprint' },
          { text: 'Finalisation du projet', link: '/enonces/finalisation' },
          { text: 'Présentation finale', link: '/enonces/presentation-finale' }
        ]
       },
      { 
        text: 'Grilles', 
        items: [
          { text: 'Planification du projet', link: '/grilles/grille-planif-projet' },
          { text: 'Sprint (complet)', link: '/grilles/grille-sprint' },
          { text: 'Finalisation du projet', link: '/grilles/grille-finalisation' }
        ]
       },
      {
        text: 'Ressources',
        items: [
          { text: 'Agile & Scrum', link: '/ressources/agile-scrum' },
          { text: 'Récits utilisateur', link: '/ressources/userstory' },
          { text: 'GitHub Project', link: '/ressources/github-project' },
          { text: 'GitHub Project - Guide', link: '/ressources/github-project-guide' },
          { text: 'Normes de commentaires', link: '/ressources/normes_commentaires' },
          { text: 'Normes de nomenclature', link: '/ressources/normes_nomenclature_code' },
          { text: 'Diagrammes de classes', link: '/ressources/diagrammes-de-classes' },
          { text: 'Liens utiles', link: '/ressources/liens-utiles' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Documents généraux',
        items: [
          { text: 'Plan de cours', link: '/plan-de-cours' },
          { text: 'Calendrier', link: '/calendrier' },
          { text: 'Horaires', link: '/horaires' }
        ]
      },
      {
        text: 'Énoncés',
        items: [
          { text: 'Planification du projet', link: '/enonces/planif-projet' },
          { text: 'Planification de sprint', link: '/enonces/planif-sprint' },
          { text: 'Rapport de fin de sprint', link: '/enonces/fin-sprint' },
          { text: 'Finalisation du projet', link: '/enonces/finalisation' },
          { text: 'Présentation finale', link: '/enonces/presentation-finale' }
        ]
      },
      {
        text: 'Grilles d’évaluation',
        items: [
          { text: 'Planification du projet', link: '/grilles/grille-planif-projet' },
          { text: 'Sprint (complet)', link: '/grilles/grille-sprint' },
          { text: 'Finalisation du projet', link: '/grilles/grille-finalisation' }
        ]
      },
      {
        text: 'Modèles de départ',
        items: [
          { text: 'Planification du projet', link: '/templates/planif-projet-modele' },
          { text: 'Planification de sprint', link: '/templates/planif-sprint-modele' },
          { text: 'Rapport fin de sprint', link: '/templates/fin-sprint-modele' }
        ]
      },
      {
        text: 'Ressources',
        items: [
          { text: 'Agile & Scrum', link: '/ressources/agile-scrum' },
          { text: 'Récits utilisateur', link: '/ressources/userstory' },
          { text: 'GitHub Project', link: '/ressources/github-project' },
          { text: 'GitHub Project - Guide', link: '/ressources/github-project-guide' },
          { text: 'Normes de commentaires', link: '/ressources/normes_commentaires' },
          { text: 'Normes de nomenclature', link: '/ressources/normes_nomenclature_code' },
          { text: 'Diagrammes de classes', link: '/ressources/diagrammes-de-classes' },
          { text: 'Liens utiles', link: '/ressources/liens-utiles' }
        ]
      }
    ],
    search: {
      provider: 'local'
    }
  }
})