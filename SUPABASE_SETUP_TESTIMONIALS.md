# Setup Supabase (Témoignages) — Guide A à Z

Ce guide te permet de connecter complètement le site à Supabase pour les témoignages :

- Formulaire `/temoignages` -> insertion en base (`pending`)
- Panel admin `/admin/temoignages` -> approbation/refus
- Affichage public (`/` + `/temoignages`) -> uniquement `approved`

---

## 0) Prérequis

- Tu as un projet Supabase créé.
- Ton `.env.local` contient :
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ADMIN_PANEL_PASSWORD`
  - `ADMIN_PANEL_SECRET`

Puis redémarre le serveur local :

```bash
npm run dev
```

---

## 1) Créer la table `testimonials`

Dans Supabase :

1. Va dans **SQL Editor**
2. Clique **New query**
3. Colle ce SQL
4. Clique **Run**

```sql
create extension if not exists pgcrypto;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text not null,
  rating integer not null check (rating between 1 and 5),
  content text not null check (char_length(content) between 20 and 1000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  ip_address text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists testimonials_status_created_idx
  on public.testimonials (status, created_at desc);
```

---

## 2) Activer RLS + Policies

Toujours dans **SQL Editor**, crée une nouvelle query, colle, puis **Run** :

```sql
alter table public.testimonials enable row level security;

drop policy if exists "public can read approved testimonials" on public.testimonials;
drop policy if exists "no direct insert for anon" on public.testimonials;
drop policy if exists "no direct update for anon" on public.testimonials;
drop policy if exists "no direct delete for anon" on public.testimonials;

create policy "public can read approved testimonials"
on public.testimonials
for select
to anon, authenticated
using (status = 'approved');

create policy "no direct insert for anon"
on public.testimonials
for insert
to anon, authenticated
with check (false);

create policy "no direct update for anon"
on public.testimonials
for update
to anon, authenticated
using (false)
with check (false);

create policy "no direct delete for anon"
on public.testimonials
for delete
to anon, authenticated
using (false);
```

Ce que ça fait :

- Public : lecture autorisée seulement pour `approved`.
- Écriture directe publique : interdite.
- Les insertions passent par l'API serveur du site.

---

## 3) Test complet (obligatoire)

### Test A — Envoi depuis le site

1. Ouvre `http://localhost:3000/temoignages`
2. Envoie un témoignage test
3. Tu dois voir un message de confirmation

Dans Supabase (Table Editor > `testimonials`) :

- Une ligne doit apparaître avec `status = pending`.

### Test B — Modération admin

1. Ouvre `http://localhost:3000/admin/login`
2. Connecte-toi avec `ADMIN_PANEL_PASSWORD`
3. Ouvre `/admin/temoignages`
4. Clique **Approuver** sur le témoignage test

Dans Supabase :

- `status` passe à `approved`
- `reviewed_at` est renseigné

### Test C — Affichage public

1. Ouvre `http://localhost:3000/temoignages` : l'avis apparaît
2. Ouvre `http://localhost:3000/` : l'avis apparaît dans la section témoignages
   - soit dans les 3 premiers
   - soit via **Lire plus**

---

## 4) Erreurs fréquentes et correction

### A) Rien n'arrive en base après envoi

- Vérifie `SUPABASE_SERVICE_ROLE_KEY` (dans `.env.local`)
- Vérifie que la table existe bien
- Vérifie que le serveur a été redémarré après modif `.env.local`

### B) Le panel admin affiche erreur config

- Vérifie :
  - `ADMIN_PANEL_PASSWORD`
  - `ADMIN_PANEL_SECRET`
  - `SUPABASE_SERVICE_ROLE_KEY`

### C) L'avis est approuvé mais invisible publiquement

- Vérifie que `status = approved`
- Vérifie policy de lecture `status = 'approved'`
- Recharge la page (et essaye aussi hard refresh)

---

## 5) Utilisation quotidienne (pour Rose)

1. Recevoir un nouvel avis (formulaire site)
2. Aller sur `/admin/login`
3. Ouvrir `/admin/temoignages`
4. Lire et cliquer :
   - **Approuver** (publie)
   - **Refuser** (ne publie pas)

---

## 6) Sécurité minimale recommandée

- Ne jamais partager `SUPABASE_SERVICE_ROLE_KEY`
- Utiliser un `ADMIN_PANEL_PASSWORD` fort
- Garder `ADMIN_PANEL_SECRET` long et aléatoire
- Régénérer les clés Supabase si elles ont été exposées

