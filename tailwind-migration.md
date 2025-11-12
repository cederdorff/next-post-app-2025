# Modul 4: Migrer til Tailwind CSS

## Oversigt

I dette modul vil du migrere hele applikationen fra CSS Modules til Tailwind CSS. Du vil lære at arbejde med utility-first CSS og se hvordan det kan forbedre din udviklingshastighed.

---

## Opgave 4.1: Installer Tailwind og VS Code Extension

**VIGTIGT: Installer VS Code Extension først!**

1. **Åbn VS Code Extensions (Cmd+Shift+X / Ctrl+Shift+X)**
2. **Søg efter: "Tailwind CSS IntelliSense"**
3. **Installer extensionen fra Tailwind Labs**
   - Denne extension giver dig autocomplete og preview af Tailwind classes
   - Du vil se farver, spacing og andre værdier når du skriver classes
   - Helt essentiel for at arbejde effektivt med Tailwind!

**Følg Next.js officielle dokumentation
(Gengivet nedenunder):**

https://nextjs.org/docs/app/getting-started/css#tailwind-css

**Installation (den nye måde i Next.js 16):**

```bash
npm install -D tailwindcss @tailwindcss/postcss
```

**Konfigurer PostCSS:**

Opret `postcss.config.mjs` i roden af projektet:

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};
```

**Opdater `app/globals.css`:**

Erstat alt indholdet med:

```css
@import "tailwindcss";
```

**Verificer installation:**

Test at Tailwind virker ved at tilføje utility classes i en komponent - f.eks. i `app/page.js`:

```javascript
<h1 className="text-4xl font-bold">Test</h1>
```

Start development server: `npm run dev` og tjek at styling virker.

**Test VS Code Extension:**

Når du skriver `className="bg-` skulle du nu se autocomplete suggestions med farve preview! 🎨

---

## Opgave 4.2: Forstå Tailwind Utility Classes

**Hvad er Tailwind CSS?**

Tailwind er et "utility-first" CSS framework. I stedet for at skrive custom CSS, bruger du små, genbrugelige CSS klasser direkte i din JSX.

**Quick Reference - De 10 mest brugte classes:**

1. `flex` - Layout med flexbox
2. `p-4` - Padding 16px
3. `m-4` - Margin 16px
4. `bg-white` - Hvid baggrund
5. `text-gray-900` - Mørk tekst
6. `rounded-lg` - Afrundede hjørner
7. `shadow-md` - Mellemhård skygge
8. `hover:bg-blue-600` - Ændring ved hover
9. `w-full` - Fuld bredde
10. `gap-4` - Mellemrum mellem elementer

**Med disse 10 classes kan du style 80% af din app! 🎨**

---

**Eksempel - Fra CSS Modules til Tailwind:**

```javascript
// TIDLIGERE med CSS Modules:
import styles from "./Nav.module.css";
<nav className={styles.nav}>
  <h1 className={styles.title}>Posts</h1>
</nav>

// CSS fil:
.nav {
  display: flex;
  padding: 1rem;
  background-color: #333;
}
.title {
  color: white;
  font-size: 1.5rem;
}
```

```javascript
// NU med Tailwind:
<nav className="flex p-4 bg-gray-800">
  <h1 className="text-white text-2xl">Posts</h1>
</nav>

// Ingen CSS fil nødvendig!
```

**De mest brugte Tailwind classes:**

**Layout:**

- `flex` = display: flex
- `grid` = display: grid
- `block` = display: block
- `hidden` = display: none

**Spacing (padding og margin):**

- `p-4` = padding: 1rem (16px)
- `px-4` = padding left og right: 1rem
- `py-4` = padding top og bottom: 1rem
- `pt-4` = padding-top: 1rem
- `pb-4` = padding-bottom: 1rem
- `m-4` = margin: 1rem
- `mx-auto` = margin left og right: auto (bruges til at centrere)
- `gap-4` = gap: 1rem (mellemrum mellem flex/grid børn)
- `space-y-4` = margin-top: 1rem mellem alle børn (vertical spacing)

**Skala (de mest brugte):**

- `0` = 0px
- `1` = 0.25rem (4px) - meget lille
- `2` = 0.5rem (8px) - lille
- `4` = 1rem (16px) - ⭐ standard, meget brugt
- `6` = 1.5rem (24px) - mellem
- `8` = 2rem (32px) - stor
- `12` = 3rem (48px) - meget stor

**Tip:** Start med at bruge `4` og `8`, tilpas derefter efter behov!

**Farver:**

- `bg-gray-800` = baggrund mørk grå
- `text-white` = hvid tekst
- `text-gray-600` = grå tekst
- Farver: `gray, red, blue, green, yellow, purple` osv.
- Nuancer: `50` (meget lys) → `500` (mellem) → `900` (meget mørk)

**Tommelfingerregel for nuancer:**

- `50-200` = Lyse farver (baggrunde, subtle highlights)
- `300-500` = Mellem farver (borders, sekundære elementer)
- `600-900` = Mørke farver (primær tekst, knapper, vigtige elementer)

**Eksempel:**

- `bg-blue-500` = Medium blå knap
- `hover:bg-blue-600` = Lidt mørkere ved hover
- `text-gray-900` = Næsten sort tekst (bedre end pure black!)
- `border-gray-300` = Lys grå border

**Typography:**

- `text-sm` = font-size: 0.875rem (14px)
- `text-base` = font-size: 1rem (16px)
- `text-lg` = font-size: 1.125rem (18px)
- `text-xl` = font-size: 1.25rem (20px)
- `text-2xl` = font-size: 1.5rem (24px)
- `font-bold` = font-weight: 700
- `font-semibold` = font-weight: 600

**Borders og Afrunding:**

- `border` = border: 1px solid
- `border-2` = border: 2px solid
- `rounded` = border-radius: 0.25rem
- `rounded-lg` = border-radius: 0.5rem
- `rounded-full` = border-radius: 9999px (cirkel)

**Hover og States:**

- `hover:bg-blue-600` = ændrer baggrund ved hover
- `hover:text-white` = ændrer tekst farve ved hover
- `transition` = tilføjer smooth transition

**Responsive Design:**

- `md:flex` = flex kun på medium screens og større
- `lg:text-2xl` = større tekst på large screens
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

**Praktisk øvelse - oversæt denne CSS:**

```css
.card {
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

<details>
<summary><strong>👉 Klik her for at se svaret</strong></summary>

```javascript
<div className="p-6 mb-4 bg-white rounded-lg shadow">
```

**Forklaring:**

- `p-6` = padding: 1.5rem
- `mb-4` = margin-bottom: 1rem
- `bg-white` = background-color: white
- `rounded-lg` = border-radius: 0.5rem
- `shadow` = box-shadow (Tailwind's standard skygge)

</details>

**Almindelige begynder-fejl at undgå:**

- ❌ `className="p4"` → ✅ `className="p-4"` (husk bindestreg!)
- ❌ `className="padding-4"` → ✅ `className="p-4"` (brug forkortelsen)
- ❌ Multiple classNames: `className="p-4" className="bg-white"`
  → ✅ `className="p-4 bg-white"` (alle classes i én string)
- ❌ `class="p-4"` → ✅ `className="p-4"` (React bruger className!)

**Hjælperessourcer:**

- Tailwind Docs: https://tailwindcss.com/docs
- Tailwind Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet
- VS Code Extension: "Tailwind CSS IntelliSense" (giver autocomplete!)

---

## Opgave 4.3: Migrer Nav Komponenten

**VIGTIG INSTRUKTION: Prøv først selv! 🎯**

Før du scroller ned til guiden, prøv at migrere Nav komponenten selv:

1. Åbn `components/Nav.js` og `components/Nav.module.css`
2. Se på CSS reglerne - hvad gør de?
3. Brug Opgave 4.2 som reference og prøv at oversætte CSS til Tailwind
4. Brug VS Code Tailwind IntelliSense til at finde de rigtige classes
5. Test i browseren

**Kun hvis du sidder fast i 10+ minutter, scroll ned til guiden! 👇**

---

<details>
<summary><strong>📖 Klik her for step-by-step guide (brug kun hvis nødvendigt)</strong></summary>

**Step-by-step guide til at migrere `Nav` komponenten:**

**1. Åbn `components/Nav.js` og `components/Nav.module.css`**

Analyser den nuværende styling. Hvad gør hver CSS regel?

**2. Oversæt CSS til Tailwind classes:**

Eksempel på typisk Nav styling:

```css
/* Nav.module.css */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navList {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navLink {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.navLink:hover {
  color: #60a5fa;
}
```

**Bliver til Tailwind:**

```javascript
<nav className="flex justify-between items-center px-8 py-4 bg-gray-900 shadow-md">
  <ul className="flex gap-8 list-none m-0 p-0">
    <li>
      <Link href="/posts" className="text-white no-underline font-medium transition-colors hover:text-blue-400">
        Posts
      </Link>
    </li>
  </ul>
</nav>
```

**3. Test i browseren**

- Gem filen
- Tjek at det ser ud som før
- Tjek hover effekter virker
- Test på forskellig skærmstørrelser

**4. Slet CSS Module filen**

Når alt virker: slet `Nav.module.css` og importer i `Nav.js`

**Almindelige fejl at undgå:**

- ❌ Glemme at fjerne CSS Module import
- ❌ Bruge `class` i stedet for `className`
- ❌ Glemme at teste hover states
- ❌ Ikke tjekke responsive design

</details>

---

## Opgave 4.4: Migrer UserAvatar Komponenten

**Nu er det din tur - UDEN guide! 💪**

Migrer `UserAvatar` komponenten til Tailwind helt selv.

**Tilladt hjælp:**

- Opgave 4.2 (utility classes reference)
- Tailwind dokumentation: https://tailwindcss.com/docs
- VS Code IntelliSense

**IKKE tilladt:**

- At scrolle ned til "Hjælp" sektionen før du har prøvet i minimum 15 minutter

**Checklist når du er færdig:**

- [ ] Billedet er cirkulært
- [ ] Billedet har en border
- [ ] Billedet fylder den rigtige størrelse
- [ ] CSS Module import er fjernet
- [ ] Det ser ud som før i browseren

---

<details>
<summary><strong>🆘 Hjælp (kun hvis du virkelig sidder fast efter 15+ minutter)</strong></summary>

```javascript
// Cirkulært billede med border:
<img className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover" src={image} alt={name} />
```

**Forklaring af classes:**

- `w-12 h-12` = width og height: 3rem (48px)
- `rounded-full` = perfekt cirkel
- `border-2` = 2px border
- `border-gray-300` = lys grå border farve
- `object-cover` = beskærer billede korrekt (sikrer det ikke strækkes)

**Størrelser til avatar:**

- Small: `w-8 h-8` (32px)
- Medium: `w-12 h-12` (48px)
- Large: `w-16 h-16` (64px)
- Extra large: `w-24 h-24` (96px)

</details>

---

## Opgave 4.5: Migrer PostCard Komponenten

**Udfordring: Del komponenten op i små dele! 🧩**

PostCard er den mest komplekse komponent indtil videre. I stedet for at give dig en komplet guide, skal du tænke systematisk:

**Din strategi:**

1. **Opdel komponenten mentalt:**

   - Container (article)
   - Header med bruger info (avatar + navn + titel)
   - Post billede
   - Caption tekst
   - Action buttons (View, Update, Delete)

2. **Migrer ét element ad gangen:**

   - Start med container
   - Test i browseren
   - Fortsæt med næste element
   - Test igen

3. **Brug "Inspicér Element" i browseren:**
   - Højreklik på PostCard → Inspicér
   - Se de nuværende CSS regler
   - Oversæt til Tailwind utilities

**Tilladt hjælp:**

- Du må se på Nav komponenten som inspiration
- Du må bruge Tailwind docs
- Du må bruge VS Code IntelliSense

**Når du er færdig, sammenlign med guiden nedenfor - er din løsning bedre eller dårligere? Hvorfor?**

---

<details>
<summary><strong>📋 Guide til sammenligning (åbn EFTER du har prøvet selv)</strong></summary>

**PostCard er mere kompleks - tag det i små skridt:**

**Step 1: Container**

```javascript
<article className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
```

**Step 2: Header (bruger info)**

```javascript
<div className="flex items-center gap-3 mb-4">
  <img className="w-12 h-12 rounded-full" src={user.image} alt={user.name} />
  <div>
    <h3 className="font-semibold text-gray-900">{user.name}</h3>
    <p className="text-sm text-gray-500">{user.title}</p>
  </div>
</div>
```

**Step 3: Post billede**

```javascript
<img className="w-full h-64 object-cover rounded-lg mb-4" src={post.image} alt={post.caption} />
```

**Step 4: Caption og Actions**

```javascript
<p className="text-gray-700 mb-4">{post.caption}</p>
<div className="flex justify-end gap-2">
  <Link
    href={`/posts/${post.id}`}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  >
    View
  </Link>
</div>
```

**Tip:** Brug `flex flex-col` for at stable elementer vertikalt!

</details>

---

## Opgave 4.6: Migrer FormPost Komponenten

**Forms i Tailwind:**

**Input fields:**

```javascript
<input
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Enter caption..."
/>
```

**Labels:**

```javascript
<label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
```

**Buttons:**

```javascript
<button
  type="submit"
  className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
  Save Post
</button>
```

**Cancel button (secondary style):**

```javascript
<button
  type="button"
  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
  Cancel
</button>
```

**Form layout:**

```javascript
<form className="max-w-2xl mx-auto p-6 space-y-4">{/* space-y-4 giver 1rem mellemrum mellem alle børn */}</form>
```

---

## Opgave 4.7: Migrer Sider

**Page layouts i Tailwind:**

**Container wrapper:**

```javascript
<main className="max-w-4xl mx-auto px-4 py-8">
  {/* max-w-4xl = max width, mx-auto = center, px-4 = padding sides, py-8 = padding top/bottom */}
</main>
```

**Grid layout (til posts liste):**

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 kolonne mobil, 2 på tablets, 3 på desktop */}
</div>
```

**Page headings:**

```javascript
<h1 className="text-4xl font-bold text-gray-900 mb-8">All Posts</h1>
```

---

## Opgave 4.8: Migrer DeleteButton/DeletePostButton

**Modal styling i Tailwind:**

**Modal overlay (baggrund):**

```javascript
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
```

**Modal content box:**

```javascript
<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h2>
  <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>

  {/* Buttons container */}
  <div className="flex gap-3 justify-end">
    <button
      onClick={onCancel}
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
      Cancel
    </button>
    <button
      onClick={onConfirm}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
      Delete
    </button>
  </div>
</div>
```

**Delete trigger button:**

```javascript
<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Delete</button>
```

---

## Opgave 4.9: Migrer UserCard Komponenten

**Hvis du har lavet en UserCard komponent, følg samme pattern som PostCard:**

```javascript
<article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <div className="flex items-center gap-4 mb-4">
    <img className="w-16 h-16 rounded-full object-cover" src={user.image} alt={user.name} />
    <div className="flex-1">
      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
      <p className="text-gray-600">{user.title}</p>
    </div>
  </div>

  <div className="flex gap-2 justify-end">
    <Link
      href={`/users/${user.id}`}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      View Profile
    </Link>
  </div>
</article>
```

---

## Opgave 4.10: Migrer Alle Sider

**Gennemgå hver side og migrer til Tailwind:**

**`app/posts/page.js` (Posts liste):**

```javascript
export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">All Posts</h1>
        <Link
          href="/posts/create"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
```

**`app/posts/[id]/page.js` (Post detail):**

```javascript
export default async function PostDetailPage({ params }) {
  const post = await getPost(params.id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link href="/posts" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        ← Back to Posts
      </Link>

      {/* Post content */}
      <article className="bg-white rounded-lg shadow-lg p-8">
        {/* User info */}
        <div className="flex items-center gap-4 mb-6">
          <img className="w-16 h-16 rounded-full" src={post.user.image} alt={post.user.name} />
          <div>
            <h3 className="font-bold text-gray-900">{post.user.name}</h3>
            <p className="text-sm text-gray-500">{post.user.title}</p>
          </div>
        </div>

        {/* Post image */}
        <img className="w-full h-96 object-cover rounded-lg mb-6" src={post.image} alt={post.caption} />

        {/* Caption */}
        <p className="text-lg text-gray-700 mb-6">{post.caption}</p>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <Link
            href={`/posts/${post.id}/update`}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Update
          </Link>
          <DeletePostButton deleteAction={deletePost} />
        </div>
      </article>
    </main>
  );
}
```

**`app/posts/create/page.js` og `app/posts/[id]/update/page.js`:**

```javascript
export default function CreatePostPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
      <FormPost />
    </main>
  );
}
```

**Samme pattern for Users sider - bare udskift "posts" med "users"!**

---

## Opgave 4.11: Slet Alle CSS Module Filer

**Nu hvor alle komponenter og sider bruger Tailwind, er det tid til oprydning:**

**1. Tjek at alt fungerer:**

- Test hele applikationen
- Gennemgå alle sider
- Verificer at styling ser korrekt ud

**2. Slet CSS Module filer:**

```bash
# I terminal, slet alle .module.css filer:
rm components/*.module.css
rm app/**/*.module.css
```

Eller slet dem manuelt:

- `components/Nav.module.css`
- `components/PostCard.module.css`
- `components/UserAvatar.module.css`
- `components/FormPost.module.css`
- `components/DeletePostButton.module.css`
- Osv.

**3. Fjern CSS Module imports:**

Gennemgå alle komponenter og slet linjer som:

```javascript
import styles from "./Nav.module.css"; // ❌ SLET DENNE LINJE
```

**4. Verificer at projektet stadig bygger:**

```bash
npm run build
```

Hvis der er fejl, har du måske glemt at migrere en komponent!

**5. Commit dine ændringer:**

```bash
git add .
git commit -m "Migrated from CSS Modules to Tailwind CSS"
```

---

## Opgave 4.12: Tilføj Forbedringer

**Nu hvor du har Tailwind, tilføj forbedringer:**

1. **Hover effects på cards:**

   ```javascript
   className = "hover:scale-105 hover:shadow-xl transition-all duration-200";
   ```

2. **Loading states:**

   ```javascript
   className = "animate-pulse bg-gray-200 h-64 rounded-lg";
   ```

3. **Focus states på links:**

   ```javascript
   className = "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
   ```

4. **Responsive spacing:**

   ```javascript
   className = "p-4 md:p-6 lg:p-8";
   // Mere padding på større skærme
   ```

5. **Dark mode ready:**
   ```javascript
   className = "bg-white dark:bg-gray-800 text-gray-900 dark:text-white";
   ```

---

## Reflektion

- Hvilke forbedringer tilføjede du?
- Hvordan påvirker Tailwind din udviklingshastighed?
- Hvad er fordele og ulemper ved utility-first CSS?
- Hvordan var det at slippe af med alle CSS Module filerne?
- Hvad er fordele/ulemper ved Tailwind vs CSS Modules?
- Hvornår ville du bruge Tailwind? Hvornår CSS Modules?

---

## Opgave 4.13: Eksperimenter og Lær Ved at Prøve (ekstra)

**Nu har du migreret hele appen - tid til at eksperimentere! 🔬**

Tailwind lærer man bedst ved at prøve sig frem. Lav følgende eksperimenter:

**Eksperiment 1: Farve-variationer**

Tag en komponent (f.eks. en knap) og prøv forskellige farve-kombinationer:

- Prøv `bg-blue-500`, `bg-blue-600`, `bg-blue-700` - se forskellen
- Prøv `bg-red-500`, `bg-green-500`, `bg-purple-500`
- Kombiner med `hover:bg-[farve]-700`

**Hvad lærte du om farve-nuancer?**

**Eksperiment 2: Spacing**

Tag PostCard komponenten:

- Prøv at ændre `p-6` til `p-2`, `p-4`, `p-8`, `p-12`
- Prøv at ændre `gap-3` til `gap-1`, `gap-6`, `gap-10`
- Prøv at ændre `mb-4` til `mb-2`, `mb-8`

**Hvad er den rigtige mængde spacing? Hvorfor?**

**Eksperiment 3: Responsive design**

Tag posts liste siden:

- Prøv `grid-cols-1 md:grid-cols-2`
- Prøv `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Prøv `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

**Resize browservinduet - hvad sker der? Hvilken løsning er bedst?**

**Eksperiment 4: Hover effekter**

Tilføj kreative hover effekter til dine cards:

```javascript
// Prøv disse kombinationer:
className = "hover:scale-105 transition-transform";
className = "hover:shadow-2xl transition-shadow";
className = "hover:-translate-y-1 hover:shadow-xl transition-all";
className = "hover:rotate-1 transition-transform";
```

**Hvilke effekter virker bedst? Hvilke er for meget?**

**Eksperiment 5: Lav en custom komponent**

Design en ny komponent fra bunden med kun Tailwind:

- En "Featured Post" card med større billede
- En "User Stats" card med tal og ikoner
- En "Loading Skeleton" komponent

**Tvang dig selv til IKKE at se på eksisterende kode - brug kun:**

- Tailwind docs
- VS Code IntelliSense
- Din hukommelse fra tidligere opgaver

**Refleksion:**

- Hvilke classes husker du uden at slå op?
- Hvilke classes skal du stadig google?
- Hvad er nemmere med Tailwind vs CSS Modules?
- Hvad er sværere?

---

## Opgave 4.13: Eksperimenter og Lær Ved at Prøve (ekstra)

**Nu har du migreret hele appen - tid til at eksperimentere! 🔬**

Tailwind lærer man bedst ved at prøve sig frem. Lav følgende eksperimenter:

**Eksperiment 1: Farve-variationer**

Tag en komponent (f.eks. en knap) og prøv forskellige farve-kombinationer:

- Prøv `bg-blue-500`, `bg-blue-600`, `bg-blue-700` - se forskellen
- Prøv `bg-red-500`, `bg-green-500`, `bg-purple-500`
- Kombiner med `hover:bg-[farve]-700`

**Hvad lærte du om farve-nuancer?**

**Eksperiment 2: Spacing**

Tag PostCard komponenten:

- Prøv at ændre `p-6` til `p-2`, `p-4`, `p-8`, `p-12`
- Prøv at ændre `gap-3` til `gap-1`, `gap-6`, `gap-10`
- Prøv at ændre `mb-4` til `mb-2`, `mb-8`

**Hvad er den rigtige mængde spacing? Hvorfor?**

**Eksperiment 3: Responsive design**

Tag posts liste siden:

- Prøv `grid-cols-1 md:grid-cols-2`
- Prøv `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Prøv `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

**Resize browservinduet - hvad sker der? Hvilken løsning er bedst?**

**Eksperiment 4: Hover effekter**

Tilføj kreative hover effekter til dine cards:

```javascript
// Prøv disse kombinationer:
className = "hover:scale-105 transition-transform";
className = "hover:shadow-2xl transition-shadow";
className = "hover:-translate-y-1 hover:shadow-xl transition-all";
className = "hover:rotate-1 transition-transform";
```

**Hvilke effekter virker bedst? Hvilke er for meget?**

**Eksperiment 5: Lav en custom komponent**

Design en ny komponent fra bunden med kun Tailwind:

- En "Featured Post" card med større billede
- En "User Stats" card med tal og ikoner
- En "Loading Skeleton" komponent

**Tvang dig selv til IKKE at se på eksisterende kode - brug kun:**

- Tailwind docs
- VS Code IntelliSense
- Din hukommelse fra tidligere opgaver

**Refleksion:**

- Hvilke classes husker du uden at slå op?
- Hvilke classes skal du stadig google?
- Hvad er nemmere med Tailwind vs CSS Modules?
- Hvad er sværere?

---

## Opgave 4.14: Redesign Challenge (ekstra)

**Ultimate udfordring: Redesign hele appen! 🎨**

Nu hvor du kan Tailwind, redesign hele din post app til at se anderledes ud:

**Krav:**

1. **Vælg et farve-tema:**

   - Skift fra blå til en anden primær farve (grøn, lilla, rød, etc.)
   - Brug forskellige nuancer konsistent

2. **Eksperimenter med layout:**

   - Skal posts være i cards eller liste-visning?
   - Skal navbar være i toppen eller siden?
   - Skal der være mere/mindre spacing?

3. **Tilføj personlighed:**
   - Animationer (hover effects, transitions)
   - Afrundinger (skarpe hjørner vs afrundede)
   - Skygger (ingen, subtile eller dramatiske)

**Regler:**

- ✅ Du MÅ ændre alt design
- ✅ Du MÅ eksperimentere vildt
- ❌ Du må IKKE bruge custom CSS (kun Tailwind classes)
- ❌ Du må IKKE ødelægge funktionalitet

**Inspiration:**

- Se på https://dribbble.com for design inspiration
- Se på https://tailwindui.com for komponent ideer
- Tænk på apps du bruger dagligt - hvad kan du lære?

**Del dit redesign:**

Tag screenshots før/efter og del med klassen!

**Hvad lærte du om:**

- Tailwind's muligheder og begrænsninger?
- Design beslutninger og deres konsekvenser?
- At arbejde uden færdig guide?

---
