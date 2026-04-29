# Rose Mediara — Site vitrine

Site web pour **Rose Mediara** (médium, voyante, thérapeute énergétique) : consultations téléphoniques (Cal.com), soins à distance (formulaire + pièces jointes), témoignages (Supabase + modération), pages légales et code de déontologie.

## Stack

- **Next.js** 16 (App Router) · **React** 19 · **TypeScript**
- **Tailwind CSS** v4
- **Supabase** — lecture des témoignages approuvés, insertion des avis en `pending` (API avec clé service)
- **Resend** — emails (contact, demande de soin, confirmation client, alerte nouveau témoignage)
- **Cal.com** — `@calcom/embed-react` (script officiel + iframe gérée par Cal ; chargé côté client uniquement)
- **Lucide React** — icônes (les logos réseaux sociaux sont en SVG custom, les pictogrammes de marque ne sont plus fournis par Lucide)

## Installation

```bash
npm install
```

Copiez la configuration d’environnement :

```bash
copy .env.local.example .env.local
```

Renseignez les variables (voir ci-dessous).

**Portrait (accueil & à propos)** : `public/images/rose-portrait.jpg` (placeholder automatique si absent).

**Hero (fond d’accueil)** : placez **`hero-bg`** dans `public/images/` avec l’une des extensions **`.webp`**, **`.jpg`**, **`.jpeg`** ou **`.png`** (le site teste dans cet ordre et prend le premier fichier trouvé).

## Commandes

```bash
npm run dev    # développement — http://localhost:3000
npm run build  # build production
npm run start  # serveur production
npm run lint   # ESLint
```

## Structure du projet

Le code vit sous **`src/`** (convention Next.js avec répertoire `src`) :

- `src/app/` — pages App Router, `layout.tsx`, `globals.css`, `sitemap.ts`, `robots.ts`
- `src/app/api/` — routes `soins`, `testimonials`, `contact`
- `src/components/` — UI, layout, blocs d’accueil, formulaires
- `src/lib/` — clients Supabase / Resend, requêtes témoignages, rate limiting
- `src/types/` — types TypeScript partagés

Sans clés API, le site s’affiche correctement ; les témoignages d’accueil utilisent des **données de démonstration** jusqu’à connexion Supabase.

## Configuration Supabase

1. Créez un projet Supabase et exécutez le SQL suivant pour la table `testimonials` :

```sql
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);
```
2. Activez les **Row Level Security** adaptées en production, par exemple :
   - lecture publique `SELECT` uniquement pour `status = 'approved'` avec la clé anon ;
   - pas d’`INSERT` public : seules les API serveur avec `SUPABASE_SERVICE_ROLE_KEY` insèrent les lignes `pending`.

Les variables :

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — fetch des avis approuvés côté serveur.
- `SUPABASE_SERVICE_ROLE_KEY` — **uniquement serveur**, utilisée par `POST /api/testimonials`.

## Configuration Resend

1. Créez une clé API sur [resend.com](https://resend.com).
2. Pour la production, configurez un domaine / expéditeur vérifié et renseignez `RESEND_FROM_EMAIL`.
3. En développement, l’expéditeur par défaut `onboarding@resend.dev` ne permet d’envoyer qu’à l’email de votre compte Resend.

`CONTACT_EMAIL` reçoit les notifications (demandes de soin, contact, alerte témoignage).

## Configuration Cal.com

1. Créez votre page de réservation sur Cal.com.
2. Option recommandée : renseignez les 4 liens (un par durée) :
   - `NEXT_PUBLIC_CALCOM_LINK_15`
   - `NEXT_PUBLIC_CALCOM_LINK_30`
   - `NEXT_PUBLIC_CALCOM_LINK_45`
   - `NEXT_PUBLIC_CALCOM_LINK_60`
3. Vous pouvez coller soit le segment public (`votre-username/consultation`), soit l’URL complète `https://cal.com/...`.
4. Option de secours : `NEXT_PUBLIC_CALCOM_LINK` (calendrier unique).

Le calendrier est rendu sur la page Consultations via `ConsultationsCalSection` → `CalBooking` (composant client) avec le composant officiel `Cal` (`calLink` = segment `utilisateur` ou `utilisateur/événement`, sans domaine).

## Variables d’environnement

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon (lecture témoignages côté serveur) |
| `SUPABASE_SERVICE_ROLE_KEY` | Insertion témoignages via API |
| `RESEND_API_KEY` | Envoi des emails |
| `RESEND_FROM_EMAIL` | Expéditeur (optionnel en dev) |
| `CONTACT_EMAIL` | Destinataire principal |
| `NEXT_PUBLIC_CALCOM_LINK_15` | Lien Cal.com pour la consultation 15 min |
| `NEXT_PUBLIC_CALCOM_LINK_30` | Lien Cal.com pour la consultation 30 min |
| `NEXT_PUBLIC_CALCOM_LINK_45` | Lien Cal.com pour la consultation 45 min |
| `NEXT_PUBLIC_CALCOM_LINK_60` | Lien Cal.com pour la consultation 1 h |
| `NEXT_PUBLIC_CALCOM_LINK` | Lien Cal.com unique (fallback legacy) |
| `NEXT_PUBLIC_SITE_URL` | URL du site (sitemap, métadonnées, robots) |

## Déploiement (Vercel)

- Ajoutez les variables d’environnement dans le tableau de bord Vercel.
- Sur l’offre Hobby, la taille maximale du corps des requêtes serverless peut limiter les envois avec **plusieurs grosses photos** ; testez les pièces jointes après déploiement.

## SEO

- Métadonnées par page (`title`, `description`, Open Graph de base).
- `sitemap.xml` et `robots.txt` générés via `src/app/sitemap.ts` et `src/app/robots.ts`.

## Licence

Projet client — tous droits réservés.
