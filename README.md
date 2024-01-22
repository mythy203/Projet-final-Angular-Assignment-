# Angular: Projet Final

## Groupe
- TRINH Thi Thanh Thuy
- Dao Tuan Linh

## Objectif
Améliorer le TP sur les assignments.

## Tâches
### Facile avec Options Avancées
- [x] Au moins 1000 assignments dans la base de données.
- [x] Ajouter une gestion de login/password.
  - [x] Ajouter dans la toolbar un formulaire login/password + bouton connexion. Une fois loggué, le formulaire disparait et seul un bouton de déconnexion apparait.
  - [x] Si on est loggué en tant qu'utilisateur autorisé, on a le droit de modifier/ajouter un assignment. Si on est loggué en tant qu'admin, on peut en plus supprimer des assignments. Si on n'est pas loggué on ne peut que consulter.
  - [x] Coder en dur dans le service d'authentification une liste de login/passwords valides.

#### Avancé
- [x] Meilleur cas (mais plus de travail sur le backend) : créer une collection Utilisateurs dans MongoDB et valider que le user/password est correct.
- [ ] Avancé++ : Regarder comment utiliser l'authentification avec des Json Web Tokens (JWT), en suivant un tutoriel.

- [x] Ajouter de nouvelles propriétés au modèle des Assignments.
  - [x] Ajouter auteur (nom de l'élève), matière (Base de données, Technologies Web, Grails, etc.), et associer une image à chaque matière et une photo du professeur.
  - [x] Note sur 20, un assignment ne peut pas être marqué "rendu" s'il n'a pas été noté.
  - [x] Commentaires sur l'assignment.

#### Approches
- [x] Approche Facile : Ajouter des propriétés au modèle des Assignments (dans le frontend et dans le backend). C'est recommandé pour la plupart.
- [x] Approche Avancée : Ajouter une collection "matières" et/ou "élèves", impactant plus le backend, c'est une solution optionnelle pour les meilleurs parmi vous. on a fait la collection matieres

- [x] Améliorer l'affichage des Assignments.
  - [x] Afficher les assignments dans une table Angular Material, avec tri, lignes d'en-têtes fixes, et pagination.
  - [x] Optionnel : Pour la pagination, envisager d'utiliser le composant Paginator d'Angular Material.
  - [x] La vue de détails montrera en plus les commentaires, la note si rendu, la photo du professeur, etc.
  - [x] Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le professeur et l'image illustrant la matière).

#### Fonctionnalités Optionnelles
- [ ] Ajouter un filtre rendu/non rendu : selon que cette case est cochée ou non, le tableau affichera uniquement les assignments rendus ou non rendus.
- [ ] Ajouter un champ de recherche sur le nom de l'assignment qui enverra une requête et affichera les résultats correspondants à la recherche.
- [ ] Optionnel (mais simple à faire) : utiliser un formulaire de type Stepper pour l'ajout d'Assignments (éventuellement pour la modification).

## Style et Navigation
- [x] Rendre tout plus joli, essayer de ne pas tous faire la même chose. Une toolbar en haut, une sidebar sur le côté est recommandée.

## Hébergement
- [ ] Hébergement sur Heroku.com ou render.com.

## Fonctionnalités Ouvertes
- [ ] (Facile) Ajout de messages de notification (SnackBar Material).
- [ ] Etc.


