# Kom igång — Steg-för-steg-guide

Denna guide tar dig genom alla steg for att fa AI-Mognadsmataren online.
Du behover skapa fyra konton (alla har gratisnivåer) och koppla ihop dem.

Spara varje värde du kopierar i ett textdokument — du behover dem i sista steget.

---

## Oversikt

Du kommer skapa konton på dessa tjänster:

| Tjänst | Vad den gör | Kostnad |
|--------|-------------|---------|
| **GitHub** | Lagrar koden | Gratis |
| **Neon** | Databasen (lagrar enkätsvar) | Gratis |
| **Supabase** | Inloggningssystemet | Gratis |
| **OpenRouter** | AI-insikter (valfritt) | ~$5/mån |
| **Vercel** | Webbhosting (kör appen) | Gratis |

**Total tid:** ca 30-45 minuter

---

## STEG 1: Neon (databasen)

Neon är databasen där alla enkätsvar och projekt sparas.

### 1.1 Skapa konto
1. Gå till https://neon.tech
2. Klicka **"Sign Up"** (uppe till höger)
3. Välj **"Continue with GitHub"** (enklast) eller skapa med e-post

### 1.2 Skapa ett projekt
1. När du loggat in, klicka **"New Project"**
2. Fyll i:
   - **Name:** `ai-mognadsmataren`
   - **Region:** Välj **"Europe (Frankfurt)"** (närmast Sverige)
   - **Postgres version:** Lämna som det är (standardvalet)
3. Klicka **"Create Project"**

### 1.3 Kopiera DATABASE_URL
1. Efter att projektet skapats visas en **Connection string**
2. Den ser ut ungefär så här:
   ```
   postgresql://neondb_owner:abc123xyz@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
3. **Kopiera hela strängen** och spara den i ditt textdokument under rubriken:
   ```
   DATABASE_URL = (klistra in här)
   ```

> Om du missar den: Gå till **Dashboard** > ditt projekt > **Connection Details** >
> välj **"Pooled connection"** i rullmenyn och kopiera strängen.

---

## STEG 2: Supabase (inloggningssystemet)

Supabase hanterar login för konsulter (@curago.se och @criteroconsulting.se).

### 2.1 Skapa konto
1. Gå till https://supabase.com
2. Klicka **"Start your project"**
3. Logga in med **GitHub** (enklast) eller skapa konto med e-post

### 2.2 Skapa ett projekt
1. Klicka **"New Project"**
2. Välj en **Organization** (eller skapa en ny, t.ex. "Criterio")
3. Fyll i:
   - **Name:** `ai-mognadsmataren`
   - **Database Password:** Välj ett starkt lösenord (spara det, men du behöver det inte igen)
   - **Region:** Välj **"Central EU (Frankfurt)"**
   - **Pricing Plan:** Free (gratisnivån)
4. Klicka **"Create new project"**
5. Vänta 1-2 minuter medan projektet skapas

### 2.3 Kopiera URL och Anon Key
1. Gå till **Settings** (kugghjulet i sidomenyn)
2. Klicka **"API"** (under Configuration)
3. Du ser nu:

   **Project URL** — ser ut så här:
   ```
   https://abcdefghijkl.supabase.co
   ```
   Kopiera och spara som:
   ```
   NEXT_PUBLIC_SUPABASE_URL = (klistra in här)
   ```

   **anon public key** (under "Project API keys") — en lång sträng:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
   ```
   Kopiera och spara som:
   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (klistra in här)
   ```

### 2.4 Aktivera e-post/lösenord-inloggning
1. I Supabase, gå till **Authentication** (i sidomenyn)
2. Klicka **"Providers"** (eller "Sign In / Up")
3. Kontrollera att **Email** står som **Enabled**
4. Under Email-inställningar:
   - **Confirm email:** Stäng AV denna (toggle off)
     (Annars måste varje ny konsult bekräfta via e-post — onödigt krångel)

---

## STEG 3: OpenRouter (AI-insikter) — VALFRITT

OpenRouter ger AI-drivna insikter efter avslutad mätning.
**Appen fungerar utan detta** — den har inbyggda fallback-texter.
Men med OpenRouter får varje mätning unika, anpassade AI-rekommendationer.

### 3.1 Skapa konto
1. Gå till https://openrouter.ai
2. Klicka **"Sign In"** (uppe till höger)
3. Logga in med **Google** eller **GitHub**

### 3.2 Lägg till kredit
1. Gå till https://openrouter.ai/credits
2. Lägg till **$5** (räcker för hundratals analyser)
3. Betala med kort

### 3.3 Skapa API-nyckel
1. Gå till https://openrouter.ai/keys
2. Klicka **"Create Key"**
3. Ge den ett namn: `ai-mognadsmataren`
4. Kopiera nyckeln (visas bara en gång!) och spara som:
   ```
   OPENROUTER_API_KEY = (klistra in här)
   ```

> **Hoppar du over detta?** Inget problem. Appen visar fortfarande relevanta
> insikter baserat på inbyggda texter. Det enda du missar är att varje
> analys blir unikt formulerad av AI.

---

## STEG 4: Vercel (webbhosting — sätter ihop allt)

Vercel kör din app på internet. Det är här du kopplar ihop allt.

### 4.1 Skapa konto
1. Gå till https://vercel.com
2. Klicka **"Sign Up"**
3. Välj **"Continue with GitHub"** (du MÅSTE använda samma GitHub-konto
   som har tillgång till repot `Criterio-inc/ai-mognadsmataren`)

### 4.2 Importera projektet
1. Klicka **"Add New..."** > **"Project"**
2. Du ser en lista med dina GitHub-repon
3. Hitta **"Criterio-inc/ai-mognadsmataren"** och klicka **"Import"**

### 4.3 Sätt miljövariabler (VIKTIGT)
Innan du klickar Deploy — scrolla ner till **"Environment Variables"**.

Lägg till dessa en i taget (klicka "Add" efter varje):

| Name (skriv exakt så här) | Value (klistra in från ditt textdokument) |
|---|---|
| `DATABASE_URL` | Din Neon-sträng från Steg 1.3 |
| `NEXT_PUBLIC_SUPABASE_URL` | Din Supabase-URL från Steg 2.3 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Din Supabase anon-nyckel från Steg 2.3 |
| `OPENROUTER_API_KEY` | Din OpenRouter-nyckel från Steg 3.3 (hoppa over om du skippar AI) |

**Dubbelkolla** att inga mellanslag hamnade i början eller slutet av värdena.

### 4.4 Deploya
1. Klicka **"Deploy"**
2. Vänta 2-3 minuter — du ser en logg med byggprocessen
3. När det står **"Congratulations!"** är appen live
4. Du får en URL som: `https://ai-mognadsmataren.vercel.app`

---

## STEG 5: Skapa databastabellerna

Tabellerna i databasen måste skapas en gång. Du gör detta via Neon.

### 5.1 Öppna SQL Editor i Neon
1. Gå till https://console.neon.tech
2. Klicka på ditt projekt (`ai-mognadsmataren`)
3. Klicka **"SQL Editor"** i sidomenyn

### 5.2 Kör SQL
Kopiera HELA blocket nedan och klistra in i SQL-editorn. Klicka sedan **"Run"**.

```sql
-- Skapa enum-typer
CREATE TYPE locale AS ENUM ('sv', 'en');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'closed');

-- Projekt (en per kundmätning)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_domain TEXT NOT NULL,
  share_code TEXT NOT NULL UNIQUE,
  created_by_id TEXT NOT NULL,
  status project_status DEFAULT 'draft' NOT NULL,
  deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Enkätsessioner (en per respondent)
CREATE TABLE assessment_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  respondent_email TEXT NOT NULL,
  respondent_name TEXT,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Individuella svar (ett per fråga per respondent)
CREATE TABLE responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Beräknade resultat (ett per respondent)
CREATE TABLE assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL UNIQUE REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  dimension_scores JSONB NOT NULL,
  overall_score INTEGER NOT NULL,
  maturity_level INTEGER NOT NULL,
  ai_insights JSONB,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);
```

Om du ser **"Query executed successfully"** är allt klart.

---

## STEG 6: Testa att allt fungerar

### 6.1 Öppna appen
1. Gå till din Vercel-URL (t.ex. `https://ai-mognadsmataren.vercel.app`)
2. Du bör se landningssidan for AI-Mognadsmätaren

### 6.2 Skapa ditt konsultkonto
1. Klicka **"Logga in"** (eller gå till `/login`)
2. Välj **"Skapa konto"**
3. Ange din e-post (@curago.se eller @criteroconsulting.se) och ett lösenord
4. Logga in med samma uppgifter

### 6.3 Skapa ett testprojekt
1. I dashboarden, klicka **"Skapa demo-projekt"** (om knappen finns)
   — ELLER —
   Klicka **"Nytt projekt"** och fyll i:
   - Namn: `Testmätning`
   - Kundnamn: `Testföretag`
   - E-postdomän: `testforetag.se`
2. Kopiera den delade länken (t.ex. `/p/ABC123`)

### 6.4 Testa enkäten
1. Öppna delningslänken i ett annat webbläsarfönster (eller privat fönster)
2. Fyll i en e-postadress med rätt domän (t.ex. `test@testforetag.se`)
3. Svara på frågorna
4. Kontrollera att resultaten visas

---

## Sammanfattning av dina miljövariabler

Så här ska ditt textdokument se ut när du är klar:

```
DATABASE_URL = postgresql://neondb_owner:xxxxx@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SUPABASE_URL = https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6...
OPENROUTER_API_KEY = sk-or-v1-xxxxxxxxxxxx
```

**Förvara detta säkert** — dessa nycklar ger åtkomst till dina tjänster.
Dela dem aldrig via e-post eller chatt.

---

## Felsökning

| Problem | Lösning |
|---------|---------|
| Vercel-bygget misslyckas | Kontrollera att alla 3 (eller 4) miljövariabler är korrekt ifyllda |
| "Invalid login credentials" | Kontrollera att du skapade kontot först (Skapa konto, sedan Logga in) |
| Inga resultat sparas | Kontrollera att SQL:en i Steg 5 kördes utan fel |
| AI-insikter saknas | Antingen saknas OPENROUTER_API_KEY eller så har krediten tagit slut — appen visar fallback-texter istället |
| Sidan laddar inte | Testa igen om 1-2 min — Neon kan behöva "vakna" vid första anropet |
| "relation does not exist" | SQL-tabellerna från Steg 5 har inte skapats — kör SQL:en igen |

---

## Anpassad domän (valfritt, senare)

Om du vill använda t.ex. `ai-mognad.criterio.se` istället for Vercel-adressen:
1. I Vercel: **Settings** > **Domains** > lägg till din domän
2. Hos din domänleverantör: lägg till en CNAME-post som pekar mot `cname.vercel-dns.com`
3. Vänta upp till 24 timmar for DNS-spridning
