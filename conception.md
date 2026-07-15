# Conception — Portfolio Dynamique

## 1. Analyse de l'existant

Le portfolio est actuellement statique : toutes les données (contenus, textes, liens, témoignages, expériences, projets, compétences) sont **hardcodées en dur** dans les fichiers JSX. Aucune API, aucune base de données, aucun fichier de configuration externe.

### Contenus hardcodés par section

| Section | Fichier | Données |
|---|---|---|
| Hero (Accueil) | `src/components/homeComponents/Hero.jsx` | Titre, description, CTA |
| À propos | `src/components/homeComponents/About.jsx` | Titre, description, diplômes, tech icons |
| Compétences | `src/components/homeComponents/Skills.jsx` | 4 compétences (icône, titre, description) |
| Témoignages | `src/components/homeComponents/Testimonials.jsx` | 3 témoignages (citation, nom, rôle) |
| Organisations | `src/components/homeComponents/Trustedmarquee.jsx` | 5 logos d'organisations |
| Expériences | `src/components/experComponents/ExperienceSection.jsx` | 2 expériences (catégorie, année, description, responsabilités, résultats, tags) |
| Projets | `src/components/projectComponents/ListProject.jsx` | 4 projets (catégorie, organisation, description, tags) |
| Hero (Projets) | `src/components/projectComponents/Hero.jsx` | Titre, description |
| Hero (Expériences) | `src/components/experComponents/Hero.jsx` | Titre, description |
| Contact | `src/pages/Contact.jsx` | Labels formulaire, description, map embed |
| Footer | `src/components/layout/Footer.jsx` | Marque, titre, description, liens sociaux, copyright |
| Header | `src/components/layout/Header.jsx` | Logo text, routes, label CV |
| 404 | `src/errors/404.jsx` | Titre, description, boutons |
| Routes | `src/routes/routes.js` | Chemins, labels |

### Stack actuelle
- **Frontend :** React 19 + Vite 7 + Tailwind CSS 4 + react-router-dom 7
- **Langage :** JavaScript (JSX), PropTypes
- **État :** useState local uniquement
- **i18n :** Aucun (100% français)
- **API :** Aucune

---

## 2. Architecture cible

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  Pages → Composants → Appels API (fetch/axios)           │
│           ↓                                              │
│           Cache Redis (lecture prioritaire)               │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP REST
┌──────────────────────▼──────────────────────────────────┐
│              Backend API (Node.js / Express)             │
│  /api/skills, /api/experiences, /api/projects, ...       │
│           ↓                                              │
│           Cache Redis (TTL configurable)                  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│           Base NoSQL (MongoDB / Firestore)               │
│  Collections : skills, experiences, projects,            │
│  testimonials, about, contact, config, logos             │
└─────────────────────────────────────────────────────────┘
```

### Flux des données

1. **Frontend** appelle l'API REST
2. **API** vérifie le cache **Redis** (clé par ressource)
3. Si cache hit → retourne directement
4. Si cache miss → requête **NoSQL** → stocke dans Redis avec TTL → retourne
5. En cas d'erreur API → fallback vers données statiques embarquées (offline)

---

## 3. Modèle de données (NoSQL)

### Collections MongoDB

#### `about`
```json
{
  "_id": "about_main",
  "name": "Jacquinot Randrianomenjanahary",
  "title": "Ingénieur DevOps orienté résultats",
  "description": "plus de 3 ans d'expérience...",
  "diplomas": [
    { "level": "Master", "field": "Modélisation et Ingénierie Informatique" },
    { "level": "Licence", "field": "Développement d'Application Internet – Intranet" }
  ],
  "techIcons": ["Docker", "Kubernetes", "Terraform"],
  "images": ["about4.jpeg", "about2.jpg", "about3.png"],
  "cta": "Voir mes réalisations"
}
```

#### `skills`
```json
[
  {
    "_id": "skill_1",
    "order": 1,
    "icon": "VscCode",
    "title": "CI/CD & Automatisation",
    "description": "Pipelines CI/CD sécurisés...",
    "cta": "Voir plus"
  }
]
```

#### `testimonials`
```json
[
  {
    "_id": "temoignage_1",
    "order": 1,
    "citation": "Les témoignages sont essentiels...",
    "gras": "ajoutez absolument ceci à votre stack.",
    "suite": " Cela rendra le lancement...",
    "nom": "Rakotomalala Hery",
    "role": "Président, NosoCo",
    "initiales": "RH"
  }
]
```

#### `experiences`
```json
[
  {
    "_id": "exp_1",
    "order": 1,
    "categorie": "DevSecOps",
    "annee": "2025",
    "organisation": "PNUD | MADAGASCAR – 2025",
    "sousTitre": "Ingénieur DevSecOps",
    "description": "Conception, sécurisation et exploitation...",
    "responsabilites": [
      "Conception de pipelines CI/CD sécurisés (Jenkins, SonarQube)",
      "Déploiement de solutions d'observabilité (Prometheus, Grafana)"
    ],
    "resultats": [
      "Réduction des incidents de 30 %",
      "Amélioration de la fiabilité des déploiements"
    ],
    "tags": ["Jenkins", "SonarQube", "Docker", "Kubernetes"],
    "image": "pnud-logo-blue.svg",
    "enabled": true
  }
]
```

#### `projects`
```json
[
  {
    "_id": "proj_1",
    "order": 1,
    "categorie": "CI/CD",
    "organisation": "PNUD – 2026",
    "sousTitre": "Pipelines CI/CD sécurisés",
    "description": "...",
    "tags": ["Jenkins", "SonarQube", "Docker", "Kubernetes"],
    "image": null,
    "enabled": true
  }
]
```

#### `organizations` (logos marquee)
```json
[
  {
    "_id": "org_1",
    "order": 1,
    "alt": "EMIT",
    "label": "Ecole de Management et d'Innovation Technologique",
    "imageUrl": "/logos/logo-emit.png",
    "enabled": true
  }
]
```

#### `hero` (toutes les pages)
```json
{
  "_id": "hero_home",
  "page": "home",
  "title": [
    { "text": "DevOps Engineer spécialisé en ", "style": "muted" },
    { "text": "infrastructures cloud-native", "style": "bold" },
    { "text": " et ", "style": "muted" },
    { "text": "automatisation CI/CD", "style": "bold" }
  ],
  "description": "J'aide les équipes à déployer plus vite...",
  "cta": "Voir mes projets →"
}
```

#### `contact`
```json
{
  "_id": "contact_config",
  "title": "Contact & collaboration",
  "description": "Vous avez un projet DevOps...",
  "formFields": [
    { "name": "fullName", "label": "Noms complets", "placeholder": "Votre nom...", "type": "text", "required": true },
    { "name": "email", "label": "Mail", "placeholder": "Votre email...", "type": "email", "required": true },
    { "name": "message", "label": "Messages", "placeholder": "Décrivez brièvement...", "type": "textarea", "required": true }
  ],
  "confidentiality": "Vos informations resteront confidentielles...",
  "cta": "Discutons de votre projet",
  "mapEmbed": "https://www.openstreetmap.org/export/embed.html?bbox=47.07,-21.46,47.10,-21.44&layer=mapnik&marker=-21.4536,47.0852"
}
```

#### `site_config` (Header, Footer, 404, routes)
```json
{
  "_id": "site_config",
  "brand": "Jacquinot R.",
  "brandSuffix": "JR.",
  "nav": [
    { "path": "/", "label": "Accueil" },
    { "path": "/projects", "label": "Projets" },
    { "path": "/experience", "label": "Experience" },
    { "path": "/contact", "label": "Contact" }
  ],
  "footer": {
    "subtitle": "DevOps Engineer — Cloud & CI/CD",
    "location": "Madagascar · Disponible en remote / international",
    "social": {
      "email": "randrianomenjanaharyjacquinot@gmail.com",
      "facebook": "https://www.facebook.com/jacquinotrandrianomenjanahary",
      "linkedin": "https://www.linkedin.com/in/jacquinot-randrianomenjanahary"
    },
    "copyright": "Tous droit réserver."
  },
  "cta": {
    "cvLabel": "Télécharger mon CV",
    "cvUrl": "/cv.pdf"
  },
  "notFound": {
    "badge": "Erreur 404",
    "title": "Page introuvable",
    "description": "La page que vous cherchez n'existe pas ou a été déplacée.",
    "ctaBack": "Retour à l'accueil",
    "ctaContact": "Contactez-moi"
  }
}
```

---

## 4. Stratégie Redis

### Préfixes de clés

| Clé | TTL | Données |
|---|---|---|
| `portfolio:about` | 3600s (1h) | Données "À propos" |
| `portfolio:skills` | 3600s | Liste des compétences |
| `portfolio:testimonials` | 3600s | Témoignages |
| `portfolio:experiences` | 3600s | Expériences |
| `portfolio:experiences:year:{annee}` | 3600s | Filtre par année |
| `portfolio:projects` | 3600s | Projets |
| `portfolio:projects:category:{cat}` | 3600s | Filtre par catégorie |
| `portfolio:organizations` | 7200s (2h) | Organisations (logos) |
| `portfolio:hero:{page}` | 3600s | Hero par page |
| `portfolio:contact` | 3600s | Configuration contact |
| `portfolio:site_config` | 7200s | Configuration globale |
| `portfolio:page:{path}` | 3600s | Agrégation complète d'une page |

### Cache multi-niveaux

```
Frontend (React Query) ── TTL 5min ──┐
                                      ├── Cache Redis ── TTL 1h ──┐
                                      │                            ├── MongoDB
API (memory cache)   ── TTL 30s ────┘                            │
                                                                  │
Invalidation : webhook POST /api/cache/flush ou bouton admin      │
              → DEL portfolio:*                                   │
              → re-population à la prochaine requête             ┘
```

### Pattern Cache-Aside

```javascript
async function getData(collection, redisKey, query = {}) {
  // 1. Tentative Redis
  let data = await redis.get(redisKey);
  if (data) return JSON.parse(data);

  // 2. Fallback MongoDB
  data = await db.collection(collection).find(query).sort({ order: 1 }).toArray();
  
  // 3. Stockage Redis
  await redis.setEx(redisKey, TTL, JSON.stringify(data));
  
  return data;
}
```

---

## 5. API REST

### Endpoints

| Méthode | Endpoint | Cache Redis | Description |
|---|---|---|---|
| `GET` | `/api/about` | `portfolio:about` | Infos personnelles |
| `GET` | `/api/skills` | `portfolio:skills` | Compétences |
| `GET` | `/api/testimonials` | `portfolio:testimonials` | Témoignages |
| `GET` | `/api/experiences` | `portfolio:experiences` | Expériences |
| `GET` | `/api/experiences?year=2025` | `portfolio:experiences:year:2025` | Filtre par année |
| `GET` | `/api/projects` | `portfolio:projects` | Projets |
| `GET` | `/api/projects?category=CI/CD` | `portfolio:projects:category:CI/CD` | Filtre par catégorie |
| `GET` | `/api/organizations` | `portfolio:organizations` | Logos organisations |
| `GET` | `/api/hero/:page` | `portfolio:hero:{page}` | Hero par page |
| `GET` | `/api/contact` | `portfolio:contact` | Config contact |
| `GET` | `/api/site-config` | `portfolio:site_config` | Config globale |
| `GET` | `/api/page/:path` | `portfolio:page:{path}` | Données agrégées d'une page |
| `POST` | `/api/contact/submit` | — | Envoi formulaire contact |
| `POST` | `/api/cache/flush` | — | Invalidation cache (admin) |

### Stack Backend recommandée

```
Node.js + Express (léger, familier)
├── ioredis          → Client Redis
├── mongoose         → ODM MongoDB
├── cors             → Sécurité CORS
├── express-rate-limit → Rate limiting
├── helmet           → Headers sécurité
└── dotenv           → Variables d'environnement
```

---

## 6. Frontend : modifications nécessaires

### Nouveau service API

```javascript
src/
└── service/
    ├── api.js              // Instance axios/fetch + intercepteurs
    ├── cache.js            // Cache local (React Query ou localStorage)
    └── resources/
        ├── about.js
        ├── skills.js
        ├── testimonials.js
        ├── experiences.js
        ├── projects.js
        ├── organizations.js
        ├── hero.js
        ├── contact.js
        └── siteConfig.js
```

### Migration des composants

Chaque composant actuellement hardcodé devra :

1. **Importer** le hook ou la fonction de chargement depuis `@service/`
2. **Remplacer** la constante statique par un état `useState` + `useEffect` (ou `useQuery` de React Query)
3. **Gérer** les états : loading, error, empty, success
4. **Fallback** : données statiques embarquées en dernier recours

### Exemple de pattern

```javascript
// Avant (statique)
const skills = [ ... ];

// Après (dynamique)
import { useGetSkills } from "@service/resources/skills";
const Skills = () => {
  const { data: skills, loading, error } = useGetSkills();
  if (loading) return <Skeleton />;
  if (error) return <ErrorFallback />;
  // ... render avec skills
};
```

### Modules à installer côté frontend

```json
{
  "@tanstack/react-query": "^5.x",   // Gestion cache + fetch
  "axios": "^1.x"                     // Client HTTP
}
```

---

## 7. Gestion des médias (images/logos)

Les images statiques (`public/assets/logos/`) doivent être déplacées vers un **storage distant** (ou servies via le backend) :

| Solution | Description |
|---|---|
| MinIO / S3 | Stockage objet compatible S3 |
| Backend static | Express sert `/public/uploads/` |
| Base64 | Dans MongoDB (déconseillé pour grandes images) |

Recommandation : conserver les images dans le repo `public/` et servir via le backend ou un CDN, avec les URLs stockées en base.

---

## 8. Administration (back-office)

Optionnel mais recommandé : une interface d'admin légère pour gérer le contenu sans toucher à la base directement.

- **Route protégée** : `/admin/*` (authentification JWT)
- **CRUD** pour chaque collection : skills, projects, experiences, testimonials
- **Bouton** "Vider le cache Redis" sur chaque mise à jour

---

## 9. Plan d'implémentation

### Phase 1 : Backend
1. Initialiser projet Node.js + Express + MongoDB + Redis
2. Créer les modèles Mongoose pour chaque collection
3. Implémenter les endpoints REST avec cache Redis
4. Seeder la base avec les données actuelles
5. Tester les endpoints

### Phase 2 : Frontend
1. Créer le service API + React Query provider
2. Migrer **Hero pages** (3 composants) → premiers tests simples
3. Migrer **Skills** + **Testimonials** → data simple, sans filtre
4. Migrer **About** + **Organizations** → textes + images
5. Migrer **Experiences** + **Projects** → avec filtres et recherche
6. Migrer **Contact** (formulaire avec POST API)
7. Migrer **Header** + **Footer** + **404** (site_config)

### Phase 3 : Finalisation
1. Gestion des erreurs (fallback offline)
2. Loading states (squelettes)
3. Admin panel (CRUD)
4. Déploiement Docker Compose (frontend + backend + redis + mongodb)

---

## 10. Déploiement (Docker Compose)

```yaml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    env_file: .env

  backend:
    build: ./backend
    ports: ["4000:4000"]
    depends_on: [mongodb, redis]
    env_file: .env

  mongodb:
    image: mongo:7
    volumes: ["mongo_data:/data/db"]

  redis:
    image: redis:7-alpine
    volumes: ["redis_data:/data"]

volumes:
  mongo_data:
  redis_data:
```

---

## 11. Synthèse des avantages

| Avant (statique) | Après (dynamique) |
|---|---|
| Modifier le contenu = modifier le code | Modifier = API ou base de données |
| Pas de séparation front/back | Architecture découplée |
| Aucune persistance | Données persistées en MongoDB |
| Aucune mise en cache | Cache Redis multi-niveaux |
| Pas de back-office possible | Admin panel envisageable |
| Multilingue impossible sans restructuration majeure | i18n ajoutable via collection `translations` |
| Rebuild nécessaire à chaque changement | Hot-reload du contenu sans déploiement |
