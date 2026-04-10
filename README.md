# Assignment App — Front-end (Angular 20)

Application Angular du mini-projet **Assignments** : gestion des devoirs avec authentification, tableau paginé, détails, formulaires et intégration à l’API REST.

Ce dépôt correspond au **front-end**. L’API Node.js + MongoDB se trouve dans le dépôt / dossier **back-end** associé (voir son README).

---

## Binôme et contributions

| Étudiant(e) | Rôle sur ce dépôt |
|-------------|-------------------|
| **Yao Gnamien Emmanuella** | **Front-end Angular** : structure de l’application, écrans (liste, détail, ajout, édition), Angular Material (tableau, cartes, stepper, dialogues, SnackBar), formulaires réactifs, choix des matières et liaison automatique prof / images, guards de route (`authGuard`, `adminGuard`), `HttpClient` + interceptor JWT, identité visuelle **StudyBoard** (thème Material violet/rose, typographie DM Sans, fond dégradé, cartes et barre d’outils soignées). |
| **Hien Yao Axel Vianney** | **Back-end** (autre dépôt) : API Express, MongoDB, authentification JWT, schémas et routes, contrôle d’accès admin pour modification / suppression. |

Les deux membres ont pu se coordonner sur les **contrats d’API** (URLs, champs JSON, codes d’erreur) et les tests d’intégration bout en bout.

---

## Liens utiles (à compléter pour le rendu)

- Dépôt GitHub **front** : git@github.com:pr1nceaxel/angular-frontend.git
- Dépôt GitHub **back** : git@github.com:pr1nceaxel/angular-backend.git
- Application déployée : https://angular-frontend-7fkd.onrender.com/login
- Vidéo de démo YouTube : 

---

## Prérequis

- **Node.js** 18 ou plus récent  
- **npm**  
- L’**API** du back-end accessible en local (`http://localhost:8010` par défaut) ou en production (HTTPS)

---

## Installation

```bash
git clone <URL-du-depot-front>
cd assignment-app
npm install
```

## Fonctionnalités (front)

- Connexion JWT (stockage `assignment_token` / `assignment_user` dans `localStorage`).
- Routes protégées : `authGuard` ; route d’édition réservée à l’admin : `adminGuard`.
- Liste paginée des assignments, détail avec toutes les propriétés affichées.
- Ajout avec **stepper** Material ; édition réservée au rôle admin.
- Suppression avec **dialogue de confirmation** (admin).
- Notifications **SnackBar** pour les succès et erreurs.

---

## Guide rapide pour faire tourner le projet sur une autre machine

1. Cloner ce dépôt **et** le dépôt **back-end** (ou le même mono-repo contenant les deux dossiers).
2. **Back-end** : `cd back-end` → copier `.env.example` vers `.env` → renseigner `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGINS` → `npm install` → `npm run seed:users` → optionnel `npm run seed:assignments` (échantillon si collection vide) ou **`npm run seed:bulk`** (remplit jusqu’à **1000** devoirs avec URLs HTTPS comme le formulaire) → `npm start`.
3. **Front** : `cd assignment-app` → `npm install` → vérifier `environment.ts` → `npm start`.
4. Navigateur : **http://localhost:4200** → connexion avec `user` ou `admin`.

Pour le rendu cours : au moins **1000 assignments** dans MongoDB — soit **`npm run seed:bulk`** côté API, soit Mockaroo + import Atlas (voir README du back-end).

---

