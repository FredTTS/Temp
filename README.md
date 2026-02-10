# Håll koll på Tempen

En körbar webbapp för att logga temperaturer i 8 rum. Byggd med React, Vite, TypeScript, Supabase och shadcn/ui.

## Kör appen

1. **Installera beroenden**
   ```sh
   npm i
   ```

2. **Miljövariabler**  
   Filen `.env` ska finnas i projektroten med:
   - `VITE_SUPABASE_URL` – din Supabase-projekt-URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` – din Supabase anon-nyckel  

   (Du kan kopiera från `env.txt` till `.env` om du redan har värden där.)

3. **Supabase-tabell**  
   I Supabase (SQL Editor) kan du köra migreringen i `supabase/migrations/20250210000000_create_temperature_logs.sql` så att tabellen `temperature_logs` och RLS skapas.

4. **Starta utvecklingsservern**
   ```sh
   npm run dev
   ```
   Öppna sedan http://localhost:8080 i webbläsaren.

5. **Logga in / skapa konto** på `/auth`, sedan **Dashboard** på `/dashboard` för att logga temperaturer och se statistik.

## Publicera på GitHub Pages (t.ex. https://fredtts.github.io/Temp/)

1. **Bygg för GitHub Pages** (sätter bas-sökväg och skapar 404 för SPA):
   ```sh
   npm run build:gh-pages
   ```

2. **Publicera**  
   Publicera innehållet i mappen `dist` till repots `gh-pages`-branch eller till mappen som GitHub Pages använder (t.ex. en mapp `Temp` om sidan ska ligga under `/Temp/`).

3. **Supabase**  
   Lägg till webbadressen där appen ligger (t.ex. `https://fredtts.github.io/Temp/`) under **Authentication → URL Configuration → Redirect URLs** i Supabase så att inloggning fungerar.

## Project info (Lovable)

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
