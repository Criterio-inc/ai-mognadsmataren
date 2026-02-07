# AI-Mognadsmätaren — Infrastrukturplan

## 1. Sammanfattning av granskning

### Jämförelse med referensappen (mognadsmataren)

AI-Mognadsmätaren är en **direkt anpassning** av den digitala mognadsmätaren, med identisk
arkitektur och samma teknikstack. Skillnaderna är enbart i domäninnehåll:

| | Referens (mognadsmataren) | AI-Mognadsmätaren |
|---|---|---|
| **Fokus** | Digital mognad | AI-mognad |
| **Frågor** | 22 st | 32 st |
| **Dimensioner** | 4 st | 8 st |
| **Mognadsnivåer** | 5 (Ingen aning → Igång) | 5 (Utforskande → Transformerande) |
| **Tech stack** | Identisk | Identisk |
| **DB-schema** | Identisk struktur | Identisk struktur (andra dimensionsnamn) |
| **Auth** | Supabase, @curago.se | Supabase, @curago.se |
| **AI** | OpenRouter / Claude 3.5 | OpenRouter / Claude 3.5 |
| **Deploy** | Vercel + Neon | Vercel + Neon |

**Slutsats:** Kodbasen är redo för produktion. Samma mönster som redan körs i referensappen
kan återanvändas rakt av. Inga nya beroenden behövs.

---

## 2. Nödvändig ändring: Tillåtna domäner

### Krav
Både `@curago.se` och `@criteroconsulting.se` ska kunna logga in i konsultportalen.

### Fil att ändra
`src/lib/supabase.ts` — byt ut single-domain-check mot en lista:

```typescript
const ALLOWED_DOMAINS = ['curago.se', 'criteroconsulting.se'];

export function isEmailAllowed(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return ALLOWED_DOMAINS.includes(domain);
}
```

Felmeddelande uppdateras till:
> "Endast e-postadresser med @curago.se eller @criteroconsulting.se kan registrera sig/logga in."

---

## 3. Infrastruktur — Vad som behövs för full drift

### Arkitektur (redan på plats)

```
Vercel (hosting)
├── Next.js 16 (frontend + API routes)
├── Edge Middleware (auth-check)
└── Serverless Functions (/api/*)
        │
        ├── Neon PostgreSQL (databas)
        │   ├── projects
        │   ├── assessment_sessions
        │   ├── responses
        │   └── assessment_results
        │
        ├── Supabase Auth (inloggning)
        │   └── @curago.se + @criteroconsulting.se
        │
        └── OpenRouter API (AI-insikter)
            └── Claude 3.5 Sonnet (med fallback)
```

### Miljövariabler som behövs

```env
DATABASE_URL=postgresql://...          # Neon PostgreSQL
NEXT_PUBLIC_SUPABASE_URL=https://...   # Supabase projekt-URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=...      # Supabase anon-nyckel
OPENROUTER_API_KEY=...                 # Valfri, app fungerar utan (fallback)
```

### Steg för att driftsätta

1. **Skapa Neon-databas** — https://neon.tech (gratis tier räcker)
2. **Skapa Supabase-projekt** — https://supabase.com (gratis tier räcker)
3. **Koppla till Vercel** — importera GitHub-repot, sätt miljövariabler
4. **Kör databasmigration** — `npx drizzle-kit push`
5. **Klar** — appen är live

### Kostnad

| Tjänst | Gratisnivå | Räcker för? |
|--------|-----------|-------------|
| **Vercel** | Hobby: $0 | Ja, upp till ~100 projekt |
| **Neon** | Free: 0.5 GB | Ja, hundratals mätningar |
| **Supabase** | Free: 50k MAU | Ja, med marginal |
| **OpenRouter** | Pay-per-use ~$0.003/anrop | Ja, ~$5-15/mån |
| **Total** | **$0-15/mån** | |

---

## 4. Dataisolering (ingen korskundjämförelse)

Appen är **redan byggd** med full kundisolering:

- Varje mätning är ett **projekt** med unikt `shareCode`
- Respondenter kopplas till **ett projekt**, inte till varandra
- Konsulten ser **bara sina egna projekt** (filtrerat på `createdById`)
- Det finns **ingen benchmarking** eller korskundsaggregering
- All aggregering sker **inom ett projekt** (teamsnitt av respondenter)

**Ingen ändring behövs** — detta fungerar redan som kravställt.

---

## 5. Funktionellt flöde (komplett)

### Konsulten

```
1. Loggar in (/@curago.se eller @criteroconsulting.se)
2. Skapar projekt (kundnamn, e-postdomän, deadline)
3. Delar länk: /p/ABC123
4. Ser svar komma in i realtid
5. Tar del av aggregerade resultat + AI-insikter
6. Skriver ut rapport (browser print → PDF)
```

### Respondenten

```
1. Öppnar länk /p/ABC123
2. Anger e-post (valideras mot kundens domän)
3. Svarar på 32 frågor (1-5 skala)
4. Får se sina individuella resultat
5. Sessionen är klar
```

---

## 6. Vad som INTE behöver byggas

Baserat på era krav är följande **onödigt**:

| Funktion | Varför inte |
|----------|-------------|
| Benchmarking | Mätningar ska inte jämföras mellan kunder |
| Multi-tenant | Bara Curago/Criterio använder portalen |
| E-postutskick | Konsulterna skickar länken själva |
| PDF-generering server-side | Browser print fungerar (redan i referensappen) |
| GDPR-verktyg | Data per projekt, konsulten kan radera hela projektet |
| Rollbaserad access | Alla konsulter är likvärdiga |
| Survey-mallar | En frågeuppsättning (32 AI-frågor) |

---

## 7. Valfria förbättringar (ej kritiska)

Om ni vill vidareutveckla senare:

| Prioritet | Funktion | Insats |
|-----------|----------|--------|
| Låg | Deadline-påminnelse i UI | 2h — visa röd text när deadline närmar sig |
| Låg | CSV-export av resultat | 4h — ladda ner svar som tabell |
| Låg | Projektarkivering | 2h — dölj avslutade projekt i listan |
| Låg | Bättre PDF-layout | 4h — print-specifik CSS för snyggare utskrift |

---

## 8. Slutsats

**Appen är redo.** Infrastrukturen är identisk med referensappen som redan fungerar.
De enda ändringarna som behövs är:

1. Lägg till `@criteroconsulting.se` som tillåten domän (kodändring)
2. Sätt upp Neon + Supabase + Vercel (konfiguration)
3. Kör `npx drizzle-kit push` (databasmigration)

Sedan är ni live.
