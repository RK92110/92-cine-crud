# 92Ciné — Gestion des séances cinéma

Plateforme de gestion des séances cinéma pour le réseau des cinémas du département 92 (Hauts-de-Seine).
BTS SIO SLAM — AP SIO2 | Lycée Auguste Blanqui | 2025–2026

## Architecture

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Frontend web | Next.js 15 + TypeScript | Site complet avec toutes les fonctionnalités |
| API REST | Spring Boot 3 + Java | Backend partagé web & Android |
| App Android | Kotlin + Jetpack Compose | Interface mobile |
| Base de données | SQLite (Local) / PostgreSQL 16 | SQLite par défaut pour le développement local |

## Fonctionnalités Implémentées

- [x] **Authentification Réelle :** Login et Signup avec hachage password (`bcryptjs`).
- [x] **Réservation de Places :** Système de réservation complet via Server Actions.
- [x] **Gestion des Rôles :** Accès protégé par middleware selon les rôles (Admin, Adhérent, etc.).
- [x] **Base de Données Locale :** Configuration Prisma pour SQLite (`dev.db`).


## Accès de test (connexion)

Voici les comptes de test utilisables pour la connexion à l'application :

| Rôle           | Email de connexion         | Mot de passe |
|----------------|---------------------------|--------------|
| **ADMIN**      | `admin@92cine.fr`         | `admin123`   |
| **INSTRUCTEUR**| `instructeur@92cine.fr`   | `instru123`  |
| **ANIMATEUR**  | `animateur@92cine.fr`     | `anim123`    |
| **ADHERENT**   | `adherent@mail.com`       | `user123`    |

## Installation

### Prérequis
- Node.js 20+

### Web (Next.js)
```bash
# Installation des dépendances
npm install

# Configuration des variables d'environnement ( Solution )
cp .env.example .env.local

# Synchronisation de la base SQLite locale
npx prisma db push

# Peuplement de la base avec les comptes de test et données
npx prisma db seed

# Lancement du serveur de développement
npm run dev
```git commit --amend
git push --force origin branch-name

### Erreur possible :
`destination` does not start with `/`, `http://`, or `https://` for route {"source":"/api/backend/:path*","destination":"undefined/:path*"} 

**Solution** : cp .env.example .env.local



### Base de données (Optionnelle pour local)
Un fichier `docker-compose.yml` est disponible pour utiliser PostgreSQL :
```bash
docker-compose up -d
```

### API (Spring Boot)
```bash
cd api
cp src/main/resources/application.example.properties src/main/resources/application.properties
mvn spring-boot:run
```

### Android
Ouvrir `/android` dans Android Studio → Run.

## API Endpoints principaux

### Public
- `GET /sessions` — Liste des séances
- `GET /sessions/{id}` — Détail d'une séance
- `GET /films` — Catalogue films
- `POST /auth/signup` — Inscription
- `POST /auth/login` — Connexion

### Adhérent (JWT requis)
- `POST /inscriptions` — S'inscrire à une séance
- `DELETE /inscriptions/{id}` — Annuler
- `POST /enfants` — Créer un profil enfant
- `POST /users/me/quotient` — Demande quotient familial

### Instructeur / Animateur
- `POST /sessions` — Créer une séance
- `PUT /sessions/{id}` — Modifier
- `DELETE /sessions/{id}` — Annuler
- `GET /sessions/{id}/participants` — Liste des inscrits
- `POST /salles/reservations` — Réserver une salle

### Admin
- `GET /admin/stats` — Dashboard
- `CRUD /admin/films` — Gestion catalogue
- `CRUD /admin/users` — Gestion utilisateurs
- `CRUD /admin/salles` — Gestion salles
- `PUT /admin/quotients/{id}` — Validation quotient

## Sécurité OWASP Top 10 — 2025

| # | Menace | Mesure |
|---|--------|--------|
| A01 | Contrôle d'accès | @PreAuthorize par rôle, middleware Next.js, JWT |
| A02 | Cryptographie | bcrypt (coût 12), JWT HS256 512 bits, HTTPS forcé |
| A03 | Injection | Prisma ORM, JPA requêtes paramétrées, Zod validation |
| A04 | Design non sécurisé | Architecture multi-couches, capacité max vérifiée serveur |
| A05 | Mauvaise config | Headers CSP, CORS liste blanche, .env exclu du git |
| A06 | Composants vulnérables | npm audit, OWASP Dependency-Check, Dependabot |
| A07 | Authentification | Rate limiting Redis (5 req/15min), tokens rotatifs |
| A08 | Intégrité | Lock files committés, SRI pour ressources statiques |
| A09 | Journalisation | Logs JSON structurés, traçabilité CRUD, alertes |
| A10 | SSRF | Aucune URL utilisateur sans validation, liste blanche |
| A11 | test
