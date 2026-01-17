---
layout: home
title: 420-07B-FX — Introduction aux Bases de Données
hero:
  name: 420-07B-FX — Introduction aux Bases de Données
  text: Hiver 2026
  tagline: Nouveautés publiées ici chaque semaine
  image:
    src: /logos/logo.png
    alt: Logo du cours
  actions:
    - theme: brand
      text: Plan de cours
      link: /plan-cours/plan-de-cours.md
    - theme: alt
      text: Rejoindre le prof
      link: https://teams.microsoft.com/l/chat/48:notes/conversations?context=%7B%22contextType%22%3A%22chat%22%7D
    - theme: alt
      text: Bureau et disponibilités
      link: https://techinfo.cegepgarneau.ca/Professeurs/Horaire?id=20

---

<div
  class="rounded-xl border px-4 py-2 text-sm font-medium"
  style="
    border-color: var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
  "
>
  Semaine 1 — du 19 janvier au 23 janvier
</div>

<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
  <WeeklyTodo
    title="À faire cette semaine — En classe"
    subtitle="Activités réalisées pendant la séance."
    :steps="[
      {
        title: 'Introduction du cours et plan de cours',
        description: 'Présentation, activité brise glace, plan de cours',
        time: '20 min',
        links: [
          { text: 'Introduction', href: '/modules/01-introduction/00-presentation', variant: 'secondary' },
          { text: 'Plan de cours', href: '/plan-cours/plan-de-cours', variant: 'secondary' }
        ]
      },
      {
        title: 'Module 01 — Format de données',
        time: '15 min',
        links: [
          { text: 'Aller au module', href: '/modules/01-introduction/01-formats-donnees', variant: 'secondary' }
        ]
      },
      {
        title: 'Installations — démonstration',
        description: 'Vue d’ensemble des installations à faire. À compléter à la maison au besoin.',
        time: '30 min',
        links: [
          { text: 'Voir la procédure', href: '/labs/lab01-installations', variant: 'secondary' }
        ]
      },
      {
        title: 'Module 01 — Structure relationnelle',
        time: '30 min',
        links: [
          { text: 'Aller au module', href: '/modules/01-introduction/02-structure-relationnelle', variant: 'secondary' }
        ]
      },
      {
        title: 'Module 01 — Modèle de données',
        time: '30 min',
        links: [
          { text: 'Aller au module', href: '/modules/01-introduction/03-modelisation', variant: 'secondary' }
        ]
      },
      {
        title: 'Laboratoire 02 — Modélisation : Système d’événements',
        description: 'Présentation de la démarche et des attentes. À compléter avant le prochain cours.',
        time: '20 min',
        links: [
          { text: 'Aller au labo', href: '/labs/lab02-modelisation', variant: 'secondary' }
        ]
      }
    ]"
  />

  <WeeklyTodo
    title="À préparer / compléter"
    subtitle="À compléter de votre côté."
    :steps="[
      {
        title: 'Terminer installations et configurations obligatoires',
        badge: 'Obligatoire',
        time: '30 min',
        links: [
          { text: 'Voir la procédure', href: '/labs/lab01-installations', variant: 'secondary' }
        ]
      },
      {
        title: 'Terminer le laboratoire 02 — Modélisation : Système d’événements',
        description: 'On y reviendra au début du prochain cours.',
        time: '30 min',
        links: [
          { text: 'Aller au labo', href: '/labs/lab02-modelisation', variant: 'secondary' }
        ]
      },
      {
        title: 'Lire le module 2 au complet',
        description: 'Faire une première lecture préparatoire.',
        badge: 'Optionnel',
        time: '30 min',
        links: [
          { text: 'Aller au module 2', href: '/modules/02-ddl-base', variant: 'secondary' }
        ]
      }
    ]"
  />
</div>