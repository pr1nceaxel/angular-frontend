# Assignment App (Angular 20)

Front du mini-projet : liste / détail / ajout (stepper) / édition (admin), authentification JWT, Angular Material.

## Prérequis

- Node.js 18+
- L’API Node du dossier `../back-end` en cours d’exécution (ou l’URL de l’API déployée).

## Installation

```bash
npm install
```

## Développement

1. Démarrez l’API (port **8010** par défaut), avec un `.env` valide côté back-end.
2. Lancez le front :

```bash
npm start
```

Ouvrez `http://localhost:4200/`. Connectez-vous avec les comptes créés par `npm run seed:users` dans le back-end (`user` / `admin`, mot de passe `demo123`).

## Configuration de l’URL de l’API

- **Développement** : [src/environments/environment.ts](src/environments/environment.ts) — `apiUrl: 'http://localhost:8010/api'`.
- **Production** : [src/environments/environment.prod.ts](src/environments/environment.prod.ts) — remplacez `https://VOTRE-API.onrender.com/api` par l’URL réelle de votre API déployée. Le build production remplace automatiquement l’environnement via `angular.json` (`fileReplacements`).

## Build production

```bash
ng build
```

Sortie : `dist/assignment-app/browser/` — c’est ce dossier à publier en **site statique** (Render Static Site, Vercel, Netlify, etc.).

### Render (Static Site)

- **Build command** : `npm install && npm run build` (ou `ng build` si CLI global).
- **Publish directory** : `dist/assignment-app/browser`
- Définissez si besoin une variable d’environnement **avant** le build si vous utilisez un script qui injecte l’URL API ; sinon modifiez `environment.prod.ts` avant de pousser sur Git.

## Fonctionnalités principales

- Connexion JWT stockée dans `localStorage` (clés `assignment_token` / `assignment_user`).
- Routes protégées par `authGuard` ; édition par `adminGuard` (rôle admin uniquement).
- Liste paginée, détail avec images, ajout en **stepper**, confirmation avant suppression (admin).

## Ce que le correcteur doit faire sur sa machine

1. Cloner le dépôt, `npm install`.
2. Cloner / lancer le back-end (voir `../back-end/README.md`), créer `.env`, lancer `npm run seed:users`, importer les données Mockaroo si besoin.
3. Vérifier que `environment.ts` pointe vers l’API locale.
4. `npm start` et se connecter avec `user` ou `admin`.

---

*Complétez avec : noms du binôme, contributions respectives, lien vidéo YouTube, URLs GitHub / démo Render.*
