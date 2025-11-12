# Next.js Post App - Opgave Guide

## Indledning

I denne opgave skal I arbejde videre med en Next.js Post App, der demonstrerer best practices for moderne Next.js 16 udvikling. I vil lære om Server Components, Server Actions, CSS strategier, TypeScript og datastruktur design.

Opgaven er opdelt i moduler, der gradvist introducerer nye koncepter og teknologier.

---

## Læringsmål

Efter denne opgave kan du:

- Arbejde med Next.js 16 App Router, Server Components og Server Actions
- Forstå forskellen mellem global CSS og CSS Modules
- Implementere CRUD operationer med best practices
- Gradvist migrere fra CSS Modules til Tailwind CSS
- Implementere TypeScript i et eksisterende Next.js projekt
- Designe og implementere relationer mellem data entiteter
- Bygge genanvendelige komponenter

---

## Modul 1: Setup og Forståelse af Eksisterende Løsning

### Opgave 1.1: Opsætning

1. **Brug projektet som GitHub template:**

   - Gå til GitHub repository: `https://github.com/cederdorff/next-post-app-2025`
   - Klik på "Use this template" → "Create a new repository"
   - Navngiv dit repository (f.eks. `nextjs-post-app-[dit-navn]`)
   - Clone dit nye repository lokalt

2. **Kør projektet:**

   ```bash
   npm install
   npm run dev
   ```

   - Åbn `http://localhost:3000` i browseren
   - Test alle funktioner: Opret post, Se posts, Opdater post, Slet post

3. **Konfigurer Firebase database:**
   - Opret `.env.local` fil i roden af projektet
   - Kopier indholdet fra `.env.example`
   - Tilføj Firebase database URL (får du fra underviseren)
   ```
   NEXT_PUBLIC_FB_DB_URL=https://[DATABASE_URL].firebaseio.com
   ```
   - Genstart dev server (`Ctrl+C` og `npm run dev`)
   - Test at data hentes korrekt

### Opgave 1.2: Udforsk Kodebasen

**Undersøg følgende:**

1. **Projektstruktur:**

   - Hvad er forskellen mellem `app/` og `components/` mapperne?
     - `app/` mappen: Indeholder routes og pages (Next.js App Router). Hver mappe i `app/` bliver til en URL-route
     - `components/` mappen: Indeholder genanvendelige UI-komponenter som ikke er direkte tilknyttet en specifik route
   - Hvorfor har nogle filer `page.js` som navn?
     - `page.js` er en special fil i Next.js App Router som definerer UI for en route. F.eks. `app/posts/page.js` bliver til `/posts`
   - Hvad gør `layout.js`?
     - `layout.js` er en wrapper der omgiver alle child pages. Bruges til fælles UI som navigation, header, footer

2. **Server vs Client Components:**

   - **Server Components** (default i Next.js 16):

     - Kører kun på serveren
     - Kan ikke bruge hooks som `useState`, `useEffect`
     - Kan ikke have event handlers (`onClick`, `onChange`)
     - Kan direkte fetche data og være `async`
     - Bedre performance - sender mindre JavaScript til browseren

   - **Client Components** (markeret med `"use client"`):
     - Kører i browseren
     - Kan bruge React hooks (`useState`, `useEffect`, etc.)
     - Kan have event handlers og interaktivitet
     - Nødvendige for dynamisk, interaktiv UI

   **Find og analyser:**

   - Find alle Client Components (hint: søg efter `"use client"`)
   - Hvorfor er `Nav.js` en Client Component? (hint: tjek hvilke hooks den bruger)
   - Hvorfor er `FormPost.js` en Client Component? (hint: kræver den bruger interaktion?)
   - Hvorfor er `PostCard.js` og `UserAvatar.js` Server Components? (hint: skal de bruge hooks eller event handlers?)

3. **Server Actions:**

   - **Server Actions** er funktioner der kører på serveren og bruges til at mutere data (create, update, delete)
   - Markeret med `"use server"` directive
   - Kaldes direkte fra komponenter uden API routes
   - Kan bruge `redirect()` til at navigere efter success
   - Arbejder med `FormData` API fra HTML forms

   **Find og analyser:**

   - Find alle Server Actions (hint: søg efter `"use server"`)
   - Hvordan kaldes Server Actions fra komponenter? (hint: tjek `FormPost` og post detail side)
   - Hvad sker der efter en Server Action er færdig? (hint: søg efter `redirect()`)
   - Hvorfor bruger Server Actions `formData.get()` i stedet for state?

**Spørgsmål til refleksion:**

- Hvad er fordelen ved at bruge Server Components som standard?
  - Mindre JavaScript sendt til browseren = hurtigere side
  - Kan direkte tilgå database/API'er uden at eksponere credentials
  - Bedre SEO fordi indhold renderes på serveren
- Hvorfor bruger man `redirect()` i Server Actions i stedet for `router.push()`?
  - `router.push()` er en client-side hook og virker ikke i Server Actions
  - `redirect()` kører på serveren og sikrer korrekt navigation efter mutation

---

## Modul 2: CSS Strategi - Global CSS vs CSS Modules

### Opgave 2.1: Forstå CSS Strukturen

**Læs dokumentationen:**

- [Global CSS](https://nextjs.org/docs/app/getting-started/css#global-css)
- [CSS Modules](https://nextjs.org/docs/app/getting-started/css#css-modules)

**Analyser projektet:**

1. **Global CSS (`app/globals.css`):**

   - Hvilke CSS regler er defineret globalt?
   - Hvad er CSS variabler (`--background`, `--foreground`, etc.) og hvordan bruges de?
   - Hvordan fungerer dark mode?

2. **CSS Modules:**

   - **Hvad er CSS Modules?**

     - CSS filer der ender på `.module.css`
     - Automatisk scope til komponenten der importerer dem
     - Klasserne får unikke navne når siden bygges (f.eks. `.container` bliver til `.page_container__abc123`)
     - Forhindrer CSS konflikter mellem komponenter

   - **Hvordan bruges CSS Modules?**

     ```javascript
     // Import CSS Module
     import styles from "./Nav.module.css";

     // Brug som objekt
     <nav className={styles.nav}>
       <Link className={styles.navLink}>Home</Link>
     </nav>;
     ```

   - **Find og analyser:**
     - Find alle `.module.css` filer i projektet
     - Åbn en komponent (f.eks. `Nav.js`) og dens tilhørende `.module.css` fil
     - Se hvordan `styles` objektet bruges i JSX
     - Inspicér en rendered side i browser DevTools - se hvordan class navne er transformeret

3. **Fil struktur for CSS Modules:**

   Projektet bruger en flat struktur hvor hver komponent har sin egen CSS Module:

   ```
   components/
     Nav.js           ← Komponent
     Nav.module.css   ← CSS Module til Nav
     PostCard.js
     PostCard.module.css
   ```

   **Hvorfor denne struktur?**

   - Let at finde styling for en specifik komponent
   - Alt relateret til komponenten er samlet
   - Simpelt at vedligeholde - slet komponenten, slet CSS filen
   - Ingen risiko for at påvirke andre komponenter

4. **Global vs Scoped Styling:**

   **Brug Global CSS til:**

   - CSS variabler (design tokens)
   - Reset/normalize styles
   - Typography som gælder hele sitet
   - Dark mode themes

   **Brug CSS Modules til:**

   - Komponent-specifik styling
   - Layout der kun bruges ét sted
   - Alt der ikke skal påvirke andre komponenter

### Opgave 2.2: Refleksion

**Besvar følgende spørgsmål skriftligt (i en `REFLECTIONS.md` fil):**

1. Hvad er fordelene ved global CSS?
2. Hvad er fordelene ved CSS Modules?
3. Hvornår ville du bruge det ene frem for det andet?
4. Hvordan undgår projektet CSS konflikter?
5. Hvad er fordelen ved at bruge CSS variabler?

---

## Modul 3: Implementer CRUD på Users

### Opgave 3.1: Forstå Data Strukturen

**Undersøg Firebase data:**

- Åbn følgende URLs i din browser for at se data strukturen:
  - Posts: `https://next-post-app-race-default-rtdb.firebaseio.com/posts.json`
  - Users: `https://next-post-app-race-default-rtdb.firebaseio.com/users.json`
- Studer strukturen af `posts` og `users`
- Tegn et diagram der viser relationen mellem posts og users
  - Hvordan er de to collections forbundet?
  - Hvilken property/felt forbinder en post med en user?

**Eksempel på en post:**

```json
{
  "id": "-M1Abcdefg123",
  "caption": "Beautiful sunset at the beach",
  "image": "https://...",
  "uid": "ZfPTVEMQKf9vhNiUh0bj",    ← Dette er nøglen!
  "createdAt": 1687215634430
}
```

**Eksempel på en user:**

```json
{
  "id": "ZfPTVEMQKf9vhNiUh0bj",    ← Samme som uid i post
  "name": "Rasmus Cederdorff",
  "title": "Senior Lecturer",
  "image": "https://..."
}
```

**Spørgsmål:**

- Hvordan er posts og users forbundet?
  - Se på `uid` feltet i en post - hvad matcher det i users collection?
- Hvad er `uid` i en post?
  - Er det et tilfældigt ID eller refererer det til noget specifikt?
  - Hvordan kan man bruge `uid` til at finde den bruger der oprettede en post?
- Hvorfor er dette en god/dårlig måde at strukturere data på?
  - **Fordele:** Simpel relation, nemt at finde user for en post
  - **Ulemper:** Hvad hvis user slettes? Hvad hvis vi vil hente alle posts for en user?

### Opgave 3.2: Implementer User CRUD

**Krav:**

Nu skal du implementere den samme CRUD funktionalitet for users som allerede er implementeret for posts. Brug posts implementeringen som reference og følg samme patterns og best practices.

**Se på følgende eksempler fra posts:**

- **Liste side:** `app/posts/page.js` - Vis hvordan alle posts hentes og vises
- **Detail side:** `app/posts/[id]/page.js` - Vis én post med update/delete knapper
- **Create side:** `app/posts/create/page.js` - Form til at oprette ny post med Server Action
- **Update side:** `app/posts/[id]/update/page.js` - Form præ-udfyldt med eksisterende data
- **Komponenter:** `PostCard.js`, `FormPost.js` - Genanvendelige UI komponenter

**Implementer nu tilsvarende for users:**

1. **Liste side (`/users`):**

   - Vis alle users i cards (lignende `PostCard`)
   - Opret en `UserCard` komponent
   - Link til hver user's detail side

2. **Detail side (`/users/[id]`):**

   - Vis user information
   - Vis alle posts fra denne user (genbrugt `PostCard`)
     - **Hjælp til at finde user's posts:**
       - Firebase Realtime Database kan filtrere data med query parameters
       - Brug `orderBy` og `equalTo` i URL'en for at finde posts hvor `uid` matcher user's id
       - Eksempel URL: `https://[DATABASE_URL]/posts.json?orderBy="uid"&equalTo="[USER_ID]"`
       - Dette virker fordi der er sat index på `uid` property i Firebase
       - Læs mere: [Firebase REST Query Parameters](https://firebase.google.com/docs/database/rest/retrieve-data#section-rest-filtering)
   - "Update" og "Delete" knapper

3. **Create side (`/users/create`):**

   - Form til at oprette ny user
   - Felter: name, title, image
   - Genbrugt `FormPost` pattern (opret evt. `FormUser`)

4. **Update side (`/users/[id]/update`):**
   - Form præ-udfyldt med user data
   - Samme felter som create

**Best Practices at følge (se posts implementeringen):**

- ✅ Brug Server Components hvor muligt
- ✅ Brug Server Actions til mutations
- ✅ Brug CSS Modules for styling
- ✅ Tilføj delete confirmation modal (se nærmere nedenfor)
- ✅ Brug `redirect()` efter mutations

**Hjælp til Delete Funktionalitet:**

Delete funktionaliteten i posts bruger en modal dialog for at bekræfte sletning. Du skal implementere samme pattern for users:

**Step 1: Analyser `DeletePostButton` komponenten** (`components/DeletePostButton.js`):

- Er en Client Component (`"use client"`) fordi den bruger `useState`
- Modtager en Server Action som prop (`deleteAction`)
- Viser en modal når brugeren klikker "Delete"
- Kalder Server Action kun hvis brugeren bekræfter i modalen

**Step 2: Forstå hvordan den bruges:**

```javascript
// I app/posts/[id]/page.js (Server Component)

// 1. Definer Server Action i komponenten
async function deletePost() {
  "use server";
  // ... delete logic
  redirect("/posts");
}

// 2. Send Server Action til Client Component
<DeletePostButton deleteAction={deletePost} />;
```

**Step 3: Implementer `DeleteUserButton` for users:**

1. Opret `components/DeleteUserButton.js`
2. Kopier strukturen fra `DeletePostButton.js`
3. Tilpas tekster og styling efter behov
4. Opret tilhørende CSS Module fil
5. Brug komponenten i `app/users/[id]/page.js`

**Nøglepunkter:**

- Modal forhindrer utilsigtet sletning
- Server Action kører kun på serveren (sikkerhed)
- Client Component bruges kun til UI interaktion (modal state)
- Efter sletning: `redirect("/users")` i Server Action

### Opgave 3.3: Refaktorer til Generisk Delete Komponent

**Nu hvor du har implementeret både `DeletePostButton` og `DeleteUserButton`, kan du se at de er næsten identiske!**

**Opgave:**

1. Opret en generisk `DeleteButton` komponent (`components/DeleteButton.js`)
2. Erstat både `DeletePostButton` og `DeleteUserButton` med den nye `DeleteButton`
3. Overvej hvilke props der skal gøres konfigurerbare (f.eks. bekræftelsestekst)

**Reflektion:**

- Hvilken fordel giver det at have én generisk komponent i stedet for to næsten identiske?
- Hvilke props blev nødvendige for at gøre komponenten generisk?
- Hvad er ulemperne ved for tidlig abstraktion? (Hvad hvis du havde lavet den generiske først?)

### Opgave 3.4: Andre Genbrugelige Komponenter

**Reflektion:**

- Hvilke andre komponenter kunne du genbruge fra posts implementeringen?
- Hvor blev du nødt til at lave nye komponenter?
- Hvordan kunne du forbedre genbrugeligheden yderligere?

**Reflektion:**

- Hvilke komponenter kunne du genbruge fra posts implementeringen?
- Hvor blev du nødt til at lave nye komponenter?
- Hvordan kunne du forbedre genbrugeligheden?

---

## Modul 4: Migrer til Tailwind CSS

### Opgave 4.1: Installer Tailwind

Følg Next.js Tailwind guide:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Konfigurer `tailwind.config.js` og `globals.css` ifølge dokumentationen.

### Opgave 4.2: Gradvis Migration - Fase 1 (Erstat)

**Start med én komponent ad gangen:**

1. **Vælg en simpel komponent (f.eks. `Nav`):**

   - Erstat CSS Module classes med Tailwind utility classes
   - Behold samme visuelle design
   - Test at alt fungerer

2. **Fortsæt med andre komponenter:**
   - `UserAvatar`
   - `PostCard` / `UserCard`
   - `FormPost` / `FormUser`
   - Sider

**Tips:**

- Sammenlign før/efter med screenshots
- Slet CSS Module filer efterhånden
- Behold CSS variabler i globals.css indtil videre

### Opgave 4.3: Gradvis Migration - Fase 2 (Forbedr)

**Nu hvor du har Tailwind, forbedr designet:**

1. **Forbedringer:**

   - Tilføj hover effects
   - Forbedre spacing og typography
   - Tilføj transitions og animations
   - Forbedre responsive design

2. **Design system:**
   - Konverter CSS variabler til Tailwind theme
   - Opret custom colors i `tailwind.config.js`
   - Brug Tailwind's dark mode i stedet for media queries

### Opgave 4.4: Gradvis Migration - Fase 3 (Professionelt Design)

**Vælg et design eksempel** (f.eks. fra Dribbble, Behance) og implementer:

- Moderne card designs
- Bedre typography
- Professionel color palette
- Micro-interactions

**Refleksion:**

- Hvad er fordele/ulemper ved Tailwind vs CSS Modules?
- Hvornår ville du bruge Tailwind? Hvornår CSS Modules?

---

## Modul 5: Implementer TypeScript

### Opgave 5.1: Installer TypeScript

```bash
npm install -D typescript @types/react @types/node
```

Omdøb en `.js` fil til `.tsx` - Next.js opretter automatisk `tsconfig.json`.

### Opgave 5.2: Gradvis Migration - Start med Types

**Opret type definitions:**

1. **Opret `types/` mappe med `types.ts`:**

```typescript
export interface Post {
  id: string;
  caption: string;
  image: string;
  uid: string;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  title: string;
  image: string;
}
```

2. **Migrer komponenter én ad gangen:**
   - Start med små komponenter (`UserAvatar.tsx`)
   - Tilføj type annotations til props
   - Tilføj return types til funktioner

### Opgave 5.3: Eksempler på TypeScript Fordele

**Find og dokumentér eksempler hvor TypeScript hjælper:**

1. **Prop validation:**

   - Hvad sker der hvis du sender forkert prop type?
   - Skab bevidst en fejl og se TypeScript fejlen

2. **API responses:**

   - Type Firebase responses
   - Hvad hvis Firebase returnerer noget uventet?

3. **Server Actions:**
   - Type FormData ekstraktion
   - Hvad kunne gå galt uden types?

**Opret `TYPESCRIPT_EXAMPLES.md` med:**

- 3 eksempler hvor TypeScript fangede en fejl
- 3 eksempler hvor TypeScript gjorde koden mere læsbar
- Screenshots af TypeScript intellisense i VS Code

### Opgave 5.4: Forbedr med Strenge Types

**Gør types mere præcise:**

1. **Brug literal types:**

```typescript
type PostStatus = "draft" | "published" | "archived";
```

2. **Brug Generics:**

```typescript
async function fetchData<T>(url: string): Promise<T> { ... }
```

3. **Brug Utility Types:**

```typescript
type PartialPost = Partial<Post>;
type PostWithoutId = Omit<Post, "id">;
```

---

## Modul 6: Nye Features

### Opgave 6.1: Likes System

**Implementer et like system:**

1. **Datastruktur:**

   - Hvordan gemmer du likes i Firebase?
   - Skal du ændre Post type?
   - Tegn ny datastruktur

2. **Implementation:**

   - Like knap på hver post
   - Vis antal likes
   - Server Action til at toggle like
   - Optimistic UI updates?

3. **TypeScript:**
   - Opdater Post interface
   - Type Server Action

### Opgave 6.2: Kommentar System

**Implementer kommentarer på posts:**

1. **Datastruktur:**

   - Separat `comments` collection eller nested i posts?
   - Hvilken relation mellem comments, posts og users?
   - Tegn datastruktur

2. **Implementation:**

   - Vis kommentarer under post
   - Form til at tilføje kommentar
   - Slet egen kommentar
   - Komponent genbrug?

3. **TypeScript:**
   - Opret Comment interface
   - Type alle komponent props

### Opgave 6.3: Favoritter

**Implementer favorit posts:**

1. **Datastruktur:**

   - Hvor gemmes brugerens favoritter?
   - User → Favorites → Posts relation?

2. **Implementation:**

   - Favorit knap på posts
   - `/favorites` side med kun favorit posts
   - Toggle favorit status

3. **TypeScript:**
   - Hvordan påvirker dette User interface?

---

## Modul 7: Refleksion og Forbedringer

### Opgave 7.1: Datastruktur Evaluering

**Analyser den nuværende datastruktur:**

1. **Problemer:**

   - Hvilke problemer opstår med likes, comments og favorites?
   - Hvordan påvirker det performance?
   - Hvad med data consistency?

2. **Forslag til forbedringer:**
   - Tegn en forbedret datastruktur
   - Forklar fordele og ulemper
   - Hvordan ville du migrere eksisterende data?

### Opgave 7.2: TypeScript Best Practices

**Dokumentér TypeScript læringspunkter:**

1. **Hvad lærte du:**

   - Største fordele ved TypeScript?
   - Største udfordringer?
   - Hvornår var TypeScript irriterende vs. hjælpsomt?

2. **Best practices du fandt:**
   - Type naming conventions
   - Hvornår bruge interfaces vs types
   - Hvornår bruge `any` (hvis nogensinde)

### Opgave 7.3: Yderligere Forbedringer

**Foreslå og implementér 3 forbedringer:**

Eksempler:

- Image upload (ikke bare URL)
- Search funktionalitet
- Filter posts by user
- Pagination
- Loading states
- Error handling
- Form validation
- Authentication
- Rich text editor til posts
- Image optimization

---

## Aflevering

**Lever følgende:**

1. **GitHub Repository** med:

   - Al kode
   - README.md med setup instruktioner
   - Screenshots af applikationen

2. **Dokumentation:**

   - `REFLECTIONS.md` - Dine refleksioner fra Modul 2
   - `TYPESCRIPT_EXAMPLES.md` - TypeScript eksempler fra Modul 5
   - `DATASTRUCTURE.md` - Datastruktur analyse fra Modul 7

3. **Video demo** (5-10 min):
   - Vis din app i brug
   - Forklar de vigtigste features
   - Demonstrér noget du er særlig stolt af

---

## Evaluering

Du evalueres på:

- ✅ **Funktionalitet** (40%): Virker alle CRUD operationer?
- ✅ **Code Quality** (30%): Best practices, kommentarer, struktur
- ✅ **TypeScript** (15%): Korrekt brug af types, interfaces
- ✅ **Design** (10%): UI/UX med Tailwind
- ✅ **Refleksion** (5%): Kvalitet af dokumentation

---

## Tips og Tricks

- **Start simpelt:** Få basis funktionalitet til at virke før du forbedrer
- **Test ofte:** Kør `npm run build` regelmæssigt for at fange fejl
- **Commit ofte:** Små, beskrivende commits gør det nemt at rulle tilbage
- **Læs fejlmeddelelser:** Next.js og TypeScript giver gode fejlbeskeder
- **Brug dokumentationen:** Next.js docs er fremragende
- **Spørg om hjælp:** Fastlåst i over 30 min? Spørg en klassekammerat eller lærer

---

## Nyttige Ressourcer

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Firebase Documentation](https://firebase.google.com/docs)

---

**Held og lykke!**
