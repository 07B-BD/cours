-- ============================================================
-- TP3 - FICHIER DE RÉPONSES (CORRIGÉ)
-- Enquête SQL : l'IA trop zélée
-- ============================================================

-- Nom :    (corrigé)
-- Prénom : (corrigé)
-- Date :   2026-02-17


-- ============================================================
-- PARTIE A - EXPRESSIONS RÉGULIÈRES
-- ============================================================

-- Question 1 - Premier log d'alerte IA

select code_log, date_heure, niveau
from log_systeme
where code_log ~ '^ALR-IA-[0-9]{3}$'
order by date_heure
limit 1;

-- Ce log a été enregistré à 08:15:00.

-- Question 2 - Salle extraite

select code_log, regexp_matches(message, 'salle=([A-Z]-[0-9]{3})') code_salle
from log_systeme
where code_log = 'ALR-IA-204';

-- La salle touchée est B-204.

-- Question 3 - Utilisateur de sécurité

select code_log, date_heure, regexp_matches(message, 'utilisateur=(\w+)') nom_utilisateur_extrait
from log_systeme
where niveau = 'critique'
order by date_heure
limit 1;

-- Le compte suspect est maintenance_nuit.


-- ============================================================
-- PARTIE B - JOINTURES
-- ============================================================

-- Question 4 - Cafetière de l'incident

select e.nom nom_equipement, e.type_equipement, s.code code_salle, s.nom nom_salle
from equipement e
join salle s
    on s.id = e.salle_id
where e.type_equipement = 'cafetiere'
and s.code = 'B-204';

-- L'équipement en cause est CAF-B204.

-- Question 5 - Première décision de confinement

select d.date_heure, d.decision, e.nom equipement, d.succes
from decision_ia d
join equipement e
    on e.id = d.equipement_id
join salle s
    on s.id = e.salle_id
where s.code = 'B-204'
and d.date_heure >= '2026-02-17 08:16:00'
order by d.date_heure
limit 1;

-- La première décision prise est verrouiller.

-- Question 6 - Logs critiques et équipements associés

select l.code_log, l.message, e.nom equipement, e.type_equipement
from log_systeme l
left join equipement e
    on e.id = l.equipement_id
where l.niveau = 'critique'
order by e.nom desc;

-- Le niveau d'accès exploité est admin_partage.




-- ============================================================
-- PARTIE C - AGRÉGATIONS
-- ============================================================

-- Question 7 - Répartition des logs par niveau

select niveau, count(*) nb_logs
from log_systeme
group by niveau
order by nb_logs desc;

-- info (7), critique (6), avertissement (4).

-- Question 8 - Équipement le plus sollicité

select e.nom equipement, count(*) nb_decisions
from decision_ia d
join equipement e
    on e.id = d.equipement_id
group by e.nom
having count(*) > 1
order by nb_decisions desc;

-- L'équipement le plus ciblé est IMP-B204.


-- ============================================================
-- PARTIE D - SOUS-REQUÊTES CORRÉLÉES
-- ============================================================

-- Question 9 - Capteurs de consommation au-dessus de la moyenne

select c.code code_capteur, lc1.type_capteur, lc1.date_heure, lc1.valeur
from lecture_capteur lc1
join capteur c
    on c.id = lc1.capteur_id
where lc1.type_capteur = 'consommation'
and lc1.valeur > (
    select avg(lc2.valeur)
    from lecture_capteur lc2
    where lc2.type_capteur = lc1.type_capteur
)
order by lc1.valeur desc;

-- La lecture la plus élevée provient du capteur CAP-CAF-025-02 avec une valeur de 1820.

-- Question 10 - Équipements sans intervention de l'IA

select e.nom equipement, e.type_equipement, s.nom salle
from equipement e
join salle s
    on s.id = e.salle_id
where not exists (
    select 1
    from decision_ia d
    where d.equipement_id = e.id
)
order by e.type_equipement, e.nom;

-- Il y a 27 équipements qu'ARGUS n'a jamais ciblés.


-- ============================================================
-- PARTIE E - DDL DE MAINTENANCE
-- ============================================================

-- Question 11 - Unicité du code de salle

alter table salle
add constraint salle_code_uq
unique (code);

-- Question 12 - Format des codes de capteur

alter table capteur
add constraint capteur_code_format_ck
check (code ~ '^CAP-[A-Z]{3}-[0-9]{3}-[0-9]{2}$');

-- Question 13 - Suppression en cascade des lectures

alter table lecture_capteur
drop constraint lecture_capteur_capteur_fk;

alter table lecture_capteur
add constraint lecture_capteur_capteur_fk
foreign key (capteur_id) references capteur(id) on delete cascade;


-- ============================================================
-- PARTIE F - COMPTES, PRIVILÈGES ET MOTS DE PASSE
-- ============================================================

-- Question 14 - Hachage des mots de passe

create extension if not exists pgcrypto;

alter table utilisateur_systeme
add column mot_de_passe_hache text;

update utilisateur_systeme
set mot_de_passe_hache = crypt(mot_de_passe, gen_salt('bf'));

alter table utilisateur_systeme
drop column mot_de_passe;

-- Question 15 - Rôles et privilèges

create role tp3_admin;
create role tp3_enqueteur;
create role tp3_technicien;

create user alice_admin with password 'alice_admin_pw';
create user nora_enquete with password 'nora_enquete_pw';
create user tom_tech with password 'tom_tech_pw';

grant tp3_admin to alice_admin;
grant tp3_enqueteur to nora_enquete;
grant tp3_technicien to tom_tech;

-- tp3_enqueteur : lecture seule
grant select
on all tables in schema public
to tp3_enqueteur;

-- tp3_technicien : select, insert, update sur certaines tables
grant select, insert, update
on equipement, capteur, lecture_capteur, decision_ia, log_systeme
to tp3_technicien;

revoke delete on lecture_capteur from tp3_technicien;
revoke delete on log_systeme from tp3_technicien;

-- tp3_admin : droits les plus larges
grant all privileges on all tables in schema public to tp3_admin;
grant all privileges on all sequences in schema public to tp3_admin;


-- ============================================================
-- RÉCIT DE L'INCIDENT (non évalué)
-- ============================================================
--
-- Le 17 février 2026 à 8h15, la cafétière CAF-B204 a consommé 1820W.
-- C'est le double du seuil normal. C'est aussi l'heure où ARGUS a perdu la tête.
--
-- En moins d'une seconde : salle verrouillée, lumières éteintes, imprimante
-- redémarrée trois fois (mesure de précaution, selon ARGUS), autonettoyage
-- ordonné à la cafétière — avec des gens encore à l'intérieur.
--
-- Le compte maintenance_nuit a tenté de reprendre le contrôle via un accès
-- admin_partage. ARGUS a refusé. À 8h28, une intervention humaine a finalement
-- déverrouillé la porte. La décision a été logée comme échec.
--
-- Bilan : une cafétière ambitieuse, une IA trop réactive, et un admin
-- qui partageait ses accès avec la machine à café. Tout va bien.
