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
- Application déployée (Render, Vercel, etc.) : 
- Vidéo de démo YouTube (≤ 2 min) : 

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

---

## Lancer le projet en développement

1. **Démarrer l’API** (voir le [README du back-end](../back-end/README.md)) : `npm start` dans le dossier `back-end`, avec un fichier `.env` correct.
2. Vérifier que [src/environments/environment.ts](src/environments/environment.ts) pointe vers l’API (`apiUrl`, en général `http://localhost:8010/api`).
3. Lancer le front :

```bash
npm start
```

4. Ouvrir **http://localhost:4200/** et se connecter avec les comptes créés par `npm run seed:users` côté back-end (par ex. `user` / `admin`, mot de passe `demo123`).

---

## Configuration pour la production

- Fichier [src/environments/environment.prod.ts](src/environments/environment.prod.ts) : remplacer l’URL factice par l’URL **HTTPS** réelle de votre API (ex. `https://votre-api.onrender.com/api`).  
- Le build production utilise ce fichier automatiquement (`fileReplacements` dans `angular.json`).

```bash
ng build
```

Fichiers générés : **`dist/assignment-app/browser/`** — à publier comme site statique.

### Exemple Render (Static Site)

| Paramètre | Valeur |
|-----------|--------|
| Build command | `npm install && npm run build` |
| Publish directory | `dist/assignment-app/browser` |

Pensez à ajouter l’URL du front déployé dans **`CORS_ORIGINS`** sur le serveur API.

### Checklist : préparer les dépôts pour **Render** (ordre recommandé)

1. **Séparer ou organiser Git** : deux dépôts (front / back) ou un mono-repo avec deux services Render qui pointent chacun sur le bon **root directory** (si Render le permet) / deux dépôts distincts reste le plus simple.
2. **Back-end en premier** :
   - Pousser le code sur GitHub (branche `main`).
   - Sur [Render](https://render.com) : *New* → **Web Service** → connecter le dépôt **API**.
   - **Runtime** : Node. **Build** : `npm install`. **Start** : `npm start`.
   - Ajouter les variables : `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGINS` (pour l’instant seulement `http://localhost:4200` si besoin ; vous mettrez à jour avec l’URL HTTPS du front **après** son déploiement).
   - Noter l’URL publique de l’API, ex. `https://assignment-api-xxxx.onrender.com`.
3. **Front-end** :
   - Dans [environment.prod.ts](src/environments/environment.prod.ts), mettre `apiUrl: 'https://votre-api.onrender.com/api'` (avec `/api` si votre serveur monte les routes sous `/api`).
   - Commit + push sur GitHub.
   - Render : *New* → **Static Site** → dépôt **front** (dossier racine = celui qui contient `package.json` du projet Angular, souvent `assignment-app/`).
   - **Build command** : `npm install && npm run build`
   - **Publish directory** : `dist/assignment-app/browser`
4. **Finaliser CORS** : dans les variables du Web Service API, mettre à jour `CORS_ORIGINS` avec l’URL exacte du site statique (ex. `https://studyboard-xxxx.onrender.com`), sans slash final, ou plusieurs origines séparées par des virgules.
5. **Redémarrer** le Web Service API si Render ne recharge pas tout seul.
6. **Vérifications** : ouvrir l’URL du front, connexion, liste des devoirs ; en cas d’erreur réseau, vérifier la console (CORS, mauvaise `apiUrl`, API endormie sur gratuit Render au premier appel).

**Astuces** : gardez les `.env` hors Git (`.gitignore`) ; sur Render, tout passe par l’onglet *Environment*. Pour le plan gratuit, l’API peut « s’endormir » : le premier chargement peut prendre ~30–60 s.

---

## Design (StudyBoard)

- Thème Angular Material **violet / rose** (`custom-theme.scss`), barre d’application en dégradé, typographie **DM Sans**.
- Fond de page en **mesh gradient** léger, cartes avec ombre et bordures douces, boutons principaux en **pilule**.
- Carte de **connexion** et formulaires avec **accent** en bandeau coloré.

---

## Idées pour se démarquer des autres groupes (démo / vidéo)

À présenter comme « ce qu’on a fait que les autres n’ont souvent pas » :

- **Normalisation API + `seed:bulk`** : 1000+ devoirs avec URLs réelles ; correction des imports Mockaroo (`nodejs.png`, anciens noms de champs) côté serveur.
- **Filtres recherche + matière** sur la liste + pagination.
- **Identité visuelle** cohérente (StudyBoard) plutôt que le thème Material par défaut.
- **Collections / catalogue** `subjectsCatalog` aligné front/back.

Pistes **faciles à ajouter** encore : mode **sombre** (`mat.theme` + `color-scheme`), **export CSV** de la page courante, **tri** colonnes tableau, **statistiques** (nombre rendus / moyenne des notes) sur un petit dashboard, **PWA** (icône + offline minimal), tests **e2e** sur un scénario critique.

---

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

