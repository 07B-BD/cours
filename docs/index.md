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

<section id="semaine-2">
<div class="relative flex py-5 items-center mt-10">
   <div class="flex-grow border-t border-gray-400"></div>
   <span class="flex-shrink mx-4 text-gray-400">Semaine 2 — du 26 janvier au 30 janvier</span>
  <div class="flex-grow border-t border-gray-400"></div>
</div>
<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
  <WeeklyTodo
    title="À faire cette semaine — En classe"
    subtitle="Activités réalisées pendant la séance."
    :steps="[
      {
        title: 'Retour sur le laboratoire de modélisation',
        description: 'Exemple en groupe au tableau',
        time: '20 min',
        links: [
          { text: 'Laboratoire 02', href: '/labs/lab02-modelisation', variant: 'secondary' }
        ]
      },
      {
        title: 'Module 02 — Théorie',
        time: '70 min',
        links: [
          { text: 'Créer une BD', href: '/modules/02-ddl-base/01-create-database', variant: 'secondary' },
          { text: 'Ajouter des tables', href: '/modules/02-ddl-base/02-create-table', variant: 'secondary' },
          { text: 'Contraintes', href: '/modules/02-ddl-base/03-contraintes-simples', variant: 'secondary' },
          { text: 'Clées primaires / étrangères', href: '/modules/02-ddl-base/04-cles-primaires-etrangeres', variant: 'secondary' }
        ]
      },
      {
        title: 'Module 02 — Démonstration',
        description: 'Création de la BD et ajout des tables',
        time: '20 min',
        links: [
          { text: 'Aller à la démo', href: '/modules/02-ddl-base/05-demo-ddl', variant: 'secondary' }
        ]
      },
      {
        title: 'Laboratoire 03 — Création de la base de données',
        time: '60 min',
        description: 'À compléter pour le prochain cours',
        links: [
          { text: 'Aller au laboratoire', href: '/labs/lab03-ddl', variant: 'secondary' }
        ]
      },
      {
        title: 'Travail pratique 1',
        links: [
          { text: 'Énoncé', href: '/travaux/tp1-creation-bd', variant: 'secondary' }
        ]
      }
    ]"
  />

  <WeeklyTodo
    title="À préparer / compléter"
    subtitle="À compléter de votre côté."
    :steps="[
      {
        title: 'Laboratoire 03 — Création de la base de données',
        time: '60 min',
        description: 'À compléter pour le prochain cours',
        links: [
          { text: 'Aller au laboratoire', href: '/labs/lab03-ddl', variant: 'secondary' }
        ]
      },
      {
        title: 'Commencer le travail pratique 1',
        links: [
          { text: 'Énoncé', href: '/travaux/tp1-creation-bd', variant: 'secondary' }
        ]
      }
    ]"
  />
</div>
</section>

<section id="semaine-1">
<div class="relative flex py-5 items-center mt-10">
   <div class="flex-grow border-t border-gray-400"></div>
   <span class="flex-shrink mx-4 text-gray-400">Semaine 1 — du 19 janvier au 23 janvier</span>
  <div class="flex-grow border-t border-gray-400"></div>
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
</section>