# UDI Business Platform

Plateforme complète développée avec React, TypeScript, TailwindCSS, Express et Vite. Elle propose une interface utilisateur moderne, animée et responsive pour présenter des services, projets et témoignages avec un backend léger mais extensible.

---

## 🧰 Technologies utilisées

### 🔹 Frontend

- **React & React DOM** : Construction de l’interface utilisateur
- **TypeScript** : Typage statique pour un code robuste
- **Wouter** : Routage léger pour React
- **React Query (@tanstack/react-query)** : Gestion de l’état des requêtes
- **React Hook Form** : Gestion simplifiée des formulaires
- **Zod** : Validation des schémas de données
- **TailwindCSS** : Framework CSS utilitaire
- **GSAP** : Animations avancées
- **Framer Motion** : Animations fluides avec React
- **Three.js** : Effets 3D interactifs
- **FontAwesome** : Icônes vectorielles (brands, solid)
- **Radix UI** : Composants accessibles non stylisés
- **Shadcn UI** : Composants UI stylés avec Tailwind
- **class-variance-authority** : Gestion des variantes de classes CSS
- **date-fns** : Manipulation des dates
- **Recharts** : Visualisation de données (graphiques)

### 🔹 Backend

- **Express** : Framework web Node.js
- **Express Session** : Gestion des sessions
- **Memorystore** : Stockage des sessions en mémoire
- **Passport / Passport-local** : Authentification locale
- **bcryptjs** : Hachage sécurisé des mots de passe
- **Drizzle ORM** : ORM léger pour manipulation de BDD
- **drizzle-zod** : Validation Zod + Drizzle
- **Nodemailer** : Envoi d’emails (via Ethereal Mail en dev)

### 🔹 Développement

- **Vite** : Bundler ultra-rapide
- **@vitejs/plugin-react** : Intégration React dans Vite
- **PostCSS & Autoprefixer** : Traitement CSS moderne
- **ESBuild** : Compilation rapide
- **TSX** : Exécution de fichiers TypeScript/JSX
- **Replit plugins** : Intégration Replit

---

## 🚀 Guide de démarrage

### ✅ Prérequis

- Node.js (v14+)
- npm (v6+)

### 📦 Installation

```bash
git clone https://github.com/unity-of-digital-innovation/UDI-BUSINESS.git
cd udi-business
npm install
```

### ▶️ Lancer l’application

```bash
npm run dev
```

Cela démarre :

- Le **serveur Express** (API) sur `http://localhost:5000`
- Le **frontend React** via Vite, également sur le port 5000

---

## 🌐 Accès à l'application

- Frontend et backend sont servis sur `http://localhost:5000`

---

## 🎯 Fonctionnalités principales

- Interface React moderne avec TailwindCSS
- Animations avancées (GSAP, Framer Motion, Three.js)
- Formulaire de contact avec envoi d’emails simulés (Ethereal Mail)
- Authentification pour la zone d’administration
- Interface admin pour gérer services, projets et témoignages
- Stockage temporaire en mémoire (remplaçable par BDD)

---

## 🗂️ Structure du projet

```
udi-business/
├── client/                  # Frontend React
│   └── src/
│       ├── components/      # Composants UI
│       ├── pages/           # Pages de l'application
│       ├── hooks/           # Hooks personnalisés
│       └── lib/             # Fonctions utilitaires
├── server/                  # Backend Express
│   ├── index.ts             # Point d’entrée serveur
│   ├── routes.ts            # Routes API
│   ├── email.ts             # Service d'envoi de mail
│   ├── storage.ts           # Gestion des données (temp)
│   └── auth.ts              # Authentification
├── shared/
│   └── schema.ts            # Schémas de données (Zod)
```

---

## 🔐 Authentification

- Utilisateur par défaut :
  - **Identifiant** : `admin`
  - **Mot de passe** : `password`
- Les identifiants peuvent être modifiés dans les fichiers du backend.

---

## ✉️ Email (dev)

- Utilisation d’**Ethereal Mail** pour simuler l’envoi d’emails
- Identifiants affichés dans la console au démarrage

---

## 💡 Notes

- Le bouton WhatsApp s’affiche uniquement si la bulle CTA est masquée
- Optimisé pour les **navigateurs modernes**
- Prévu pour un **déploiement progressif** avec remplacement facile du stockage et du système d’email

---

## 📦 Déploiement

Pour passer en production :

1. **Configurer un fournisseur d’emails** réel (SendGrid, Resend, etc.)
2. **Mettre en place une base de données** (ex : PostgreSQL)
3. **Définir les variables d’environnement** nécessaires :
   - `SESSION_SECRET`
   - `EMAIL_USER`, `EMAIL_PASS`
   - `ADMIN_USER`, `ADMIN_PASS`
   - etc.

---

## 📃 Licence

Projet développé dans un cadre privé par UDI (Unity of Digital Innovation). Tous droits réservés.

---

## 🤝 Contribuer

Les contributions sont bienvenues ! Créez une **issue** ou ouvrez une **pull request**.

---

## 📬 Contact

Pour toute question ou collaboration, contactez **UDI** à l’adresse : `contact@udi-africa.com` 
```
