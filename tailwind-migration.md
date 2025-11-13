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

**Note:** Dette er den mindste konfiguration. Senere vil vi tilføje CSS variables og custom animations når vi migrerer komponenter.

**Verificer installation:**

Test at Tailwind virker ved at tilføje utility classes i en komponent - f.eks. i `app/page.js`:

```javascript
<h1 className="text-4xl font-bold">Test</h1>
```

Start development server: `npm run dev` og tjek at styling virker.

**Test VS Code Extension:**

Når du skriver `className="bg-` skulle du nu se autocomplete suggestions med farve preview! 🎨

Erstat nu `app/layout.js` med:

```javascript
import "./globals.css";
import Nav from "@/components/Nav";

// Metadata for SEO
export const metadata = {
  title: "Next.js Post App",
  description: "A modern post application built with Next.js 16"
};

// Root Layout - wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a1a1a]">
        <Nav />
        {children}
      </body>
    </html>
  );
}
```

- Test i browseren.
- Hvad er forskellen?
- Har vi tilføjet noget Tailwind relateret? Hvor?

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

**Design strategi:**

Vi holder det simpelt og bruger én konsistent "dark" stil gennem hele appen:

- Mørk baggrund: `bg-[#1a1a1a]`
- Hvis der er brug for hvis baggrund kan det være: `bg-white`
- Mørk tekst: `text-[#ededed]` på mørke baggrunde, `text-black` på lyse
- Gråtoner til sekundær tekst: `text-gray-400`, `text-gray-600`

**Eksempel:**

```javascript
// Mørk baggrund med hvide cards
className = "bg-black"; // Page baggrund
className = "bg-white"; // Card baggrund
className = "text-black"; // Tekst på hvid baggrund
```

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

**Praktisk øvelse - oversæt app/page.module.css til Tailwind på app/page.js**:

I denne øvelse skal du konvertere hele homepage'en (`app/page.js`) fra CSS Modules til Tailwind CSS.

**Trin 1: Undersøg den eksisterende styling**

Åbn `app/page.module.css` og se hvilke klasser der skal konverteres:

```css
.page {
  min-height: 100vh;
  padding: 80px 20px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  max-width: 600px;
}

.logo {
  margin-bottom: 40px;
}

.title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  color: var(--text-primary);
}

.description {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}

.ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.primaryButton {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  background-color: var(--text-primary);
  color: var(--background);
  transition: all 0.2s;
}

.primaryButton:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.secondaryButton {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: all 0.2s;
}

.secondaryButton:hover {
  background-color: var(--foreground);
}
```

**Trin 2: Konverter CSS klasser til Tailwind utilities**

Her er mappingen for hver klasse:

| CSS Module Klasse  | Tailwind Utilities                                                                                                | Forklaring                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `.page`            | `min-h-screen pt-20 pb-10 px-5 flex items-center justify-center`                                                  | `min-h-screen` = min-height: 100vh, `pt-20` = padding-top: 80px, `pb-10` = padding-bottom: 40px, `px-5` = padding left/right: 20px |
| `.container`       | `text-center max-w-[600px]`                                                                                       | Centrerer tekst og sætter max bredde (brug arbitrary value [600px])                                                                |
| `.logo`            | `mb-10`                                                                                                           | `mb-10` = margin-bottom: 40px                                                                                                      |
| `.title`           | `text-[32px] font-semibold mb-4 tracking-tight text-[#ededed]`                                                    | Brug arbitrary values for specifikke størrelser og farver                                                                          |
| `.description`     | `text-base text-gray-400 mb-8 leading-relaxed`                                                                    | `text-base` = 16px, `leading-relaxed` = line-height: 1.6                                                                           |
| `.ctas`            | `flex gap-4 justify-center`                                                                                       | Flexbox med gap mellem elementer                                                                                                   |
| `.primaryButton`   | `px-6 py-3 rounded-lg font-medium bg-[#ededed] text-black transition-all hover:opacity-85 hover:-translate-y-0.5` | Alle button styles inkl. hover states                                                                                              |
| `.secondaryButton` | `px-6 py-3 rounded-lg font-medium border border-gray-700 transition-all hover:bg-[#1a1a1a]`                       | Border button med hover                                                                                                            |

**Trin 3: Opdater app/page.js**

Erstat CSS Module klasserne med Tailwind utilities:

**FØR (med CSS Modules):**

```jsx
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={37} priority />
        <h1 className={styles.title}>Next Post App</h1>
        <p className={styles.description}>En moderne blog platform...</p>
        <div className={styles.ctas}>
          <a href="/posts" className={styles.primaryButton}>
            Se Posts
          </a>
          <a href="/posts/create" className={styles.secondaryButton}>
            Opret Post
          </a>
        </div>
      </div>
    </div>
  );
}
```

**EFTER (med Tailwind):**

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex items-center justify-center">
      <main className="text-center max-w-[600px]">
        <h1 className="text-[32px] font-semibold mb-4 tracking-tight text-[#ededed]">Next Post App</h1>
        <p className="text-base text-gray-400 mb-8 leading-relaxed">En moderne blog platform...</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/posts"
            className="px-6 py-3 rounded-lg font-medium bg-[#ededed] text-black transition-all hover:opacity-85 hover:-translate-y-0.5">
            Se Posts
          </Link>
          <a
            href="/posts/create"
            className="px-6 py-3 rounded-lg font-medium border border-gray-700 transition-all hover:bg-[#1a1a1a]">
            Opret Post
          </a>
        </div>
      </main>
    </div>
  );
}
```

**Bemærk ændringerne:**

- ❌ Fjernet `import Image from "next/image"` og Next.js logoet (ikke nødvendigt for denne app)
- ✅ Ændret `<div>` til `<main>` for bedre semantisk HTML
- ✅ Bruger `Link` komponent i stedet for `<a>` tag for interne links

**Trin 4: Fjern CSS Module importen**

Slet linjen:

```jsx
import styles from "./page.module.css";
```

**Trin 5: Slet CSS Module filen**

Nu hvor `app/page.js` bruger Tailwind, kan du slette den gamle CSS fil:

```bash
rm app/page.module.css
```

**Vigtige læringspunkter:**

1. **Arbitrary Values**: Brug `[32px]`, `[600px]`, `[#ededed]` når Tailwind ikke har præcis den værdi
2. **Hover States**: Prefix med `hover:` - fx `hover:opacity-85`
3. **Utility First**: Hver CSS property bliver til en utility class
4. **Transitions**: `transition-all` erstatter `transition: all 0.2s`
5. **Spacing**: Tailwinds spacing scale (4 = 16px, 10 = 40px, etc.)

**Checklist:**

- [ ] Fjernet `import styles from "./page.module.css"`
- [ ] Konverteret alle `className={styles.x}` til Tailwind utilities
- [ ] Hover effects virker på knapperne
- [ ] Slettet `app/page.module.css` filen
- [ ] Layout ser identisk ud i browseren
- [ ] Ingen console errors

---

## Opgave 4.4: Migrer UserAvatar Komponenten

**Nu skal vi prøve uden alt for meget hjælp! **

- Migrer `UserAvatar` komponenten til Tailwind helt selv.
- Åben http://localhost:3000/posts så du kan se hvordan den ser ud lige nu.
- Åben så UserAvatar komponenten og begynd at migrere.

**Tilladt hjælp:**

- Opgave 4.2 (utility classes reference)
- Tailwind dokumentation: https://tailwindcss.com/docs
- VS Code IntelliSense

**IKKE tilladt:**

- At scrolle ned til "Hjælp" sektionen før du har prøvet i minimum 15 minutter

**Checklist når du er færdig:**

- [ ] Billedet er cirkulært
- [ ] Billedet fylder den rigtige størrelse (40x40px)
- [ ] Navn og titel er hvide og synlige på mørk baggrund
- [ ] CSS Module import er fjernet
- [ ] Det ser ud som før i browseren

---

<details>
<summary><strong>🆘 Hjælp (kun hvis du virkelig sidder fast efter 15+ minutter)</strong></summary>

**Først skal du se den originale CSS Module styling:**

```css
/* UserAvatar.module.css */
.avatar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatarImage {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.userInfo {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.userInfo h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.2;
}

.userInfo p {
  font-size: 12px;
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.2;
}
```

**FØR (med CSS Modules):**

```javascript
import Image from "next/image";
import styles from "./UserAvatar.module.css";

export default async function UserAvatar({ uid }) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${uid}.json`;
  const response = await fetch(url);
  const user = await response.json();

  return (
    <div className={styles.avatar}>
      <Image src={user.image} alt={user.name} width={40} height={40} className={styles.avatarImage} />
      <span className={styles.userInfo}>
        <h3>{user.name}</h3>
        <p>{user.title}</p>
      </span>
    </div>
  );
}
```

**EFTER (med Tailwind):**

```javascript
import Image from "next/image";

export default async function UserAvatar({ uid }) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${uid}.json`;
  const response = await fetch(url);
  const user = await response.json();

  return (
    <div className="flex items-center gap-3 mb-3">
      <Image
        src={user.image}
        alt={user.name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
      <span className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold m-0 text-[#ededed] leading-tight">{user.name}</h3>
        <p className="text-xs m-0 text-gray-400 leading-tight">{user.title}</p>
      </span>
    </div>
  );
}
```

**Forklaring af CSS → Tailwind mapping:**

| CSS Module     | Tailwind Classes                                     | Forklaring                                      |
| -------------- | ---------------------------------------------------- | ----------------------------------------------- |
| `.avatar`      | `flex items-center gap-3 mb-3`                       | Flexbox container med 12px gap og margin-bottom |
| `.avatarImage` | `w-10 h-10 rounded-full object-cover shrink-0`       | 40x40px cirkulært billede der ikke krymper      |
| `.userInfo`    | `flex flex-col gap-0.5`                              | Vertikal flex container med 2px gap             |
| `.userInfo h3` | `text-sm font-semibold m-0 text-white leading-tight` | 14px bold hvid tekst                            |
| `.userInfo p`  | `text-xs m-0 text-white leading-tight`               | 12px hvid tekst                                 |

**Vigtige læringspunkter:**

1. **Tailwind størrelser:** `w-10 h-10` = 40px (Tailwind bruger 4px spacing scale)
2. **Gap utilities:** `gap-3` = 12px, `gap-0.5` = 2px (mellem navn og titel)
3. **Cirkulært billede:** `rounded-full` gør billeder perfekt runde
4. **Shrink:** `shrink-0` forhindrer billedet i at krympe (erstatter `flex-shrink: 0`)
5. **Tekstfarve:** `text-[#ededed]` for lys tekst der er synlig på mørk baggrund
6. **Leading:** `leading-tight` = `line-height: 1.2`

**Trin for at færdiggøre migreringen:**

1. **Fjern CSS Module importen:**

   ```javascript
   import styles from "./UserAvatar.module.css";
   ```

2. **Slet CSS Module filen:**
   ```bash
   rm components/UserAvatar.module.css
   ```

**⚠️ Vigtig note om tekstfarver:**

Selv om du har tilføjet `text-[#ededed]` til `h3` (user.name), kan det være at teksten stadig vises mørk i browseren. Det er fordi PostCard komponenten har CSS Module styling der overskriver dette. Når du migrerer PostCard til Tailwind i næste opgave, vil den lyse tekstfarve slå igennem korrekt!

</details>

---

## Opgave 4.5: Migrer PostCard Komponenten

**Udfordring: Del komponenten op i små dele! 🧩**

PostCard er en vigtig komponent i app'en. Den viser et post med bruger info, billede og caption.

**Din strategi:**

1. **Opdel komponenten mentalt:**

   - Container (article) med baggrund, padding, border-radius
   - UserAvatar komponent (allerede migreret!)
   - Post billede
   - Caption tekst (h3)

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

- Du må se på tidligere komponenter som inspiration
- Du må bruge Tailwind docs
- Du må bruge VS Code IntelliSense

**Checklist når du er færdig:**

- [ ] Card har mørk baggrund (lysere end page baggrund)
- [ ] Card har afrundede hjørner og shadow
- [ ] Hover effekt løfter card og gør shadow større
- [ ] Billede fylder fuld bredde og har fast højde
- [ ] Caption tekst er lys og læsbar
- [ ] CSS Module import er fjernet

**Når du er færdig, sammenlign med guiden nedenfor - er din løsning bedre eller dårligere? Hvorfor?**

---

<details>
<summary><strong>💡 Hints (hvis du sidder fast - åbn ét hint ad gangen)</strong></summary>

**Hint 1: Container baggrund**

- Du skal bruge en mørk grå farve som `bg-[#2a2a2a]` - ikke hvid!
- Husk at page baggrunden er sort, så card skal være lysere for at skille sig ud

**Hint 2: Shadow på mørk baggrund**

- Standard Tailwind shadows (`shadow-sm`, `shadow-lg`) er for svage på mørk baggrund
- Du skal bruge arbitrary values: `shadow-[0_2px_8px_rgba(0,0,0,0.3)]`
- Bemærk den højere opacity (0.3) for at skyggen er synlig

**Hint 3: Hover transform**

- Brug `hover:-translate-y-1` til at løfte card
- Kombiner med `hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]` for større shadow

**Hint 4: Billede højde**

- Brug arbitrary value `h-[250px]` for præcis 250px højde
- Husk `object-cover` og `w-full`

**Hint 5: Caption tekst farve**

- Brug `text-[#ededed]` for lys, læsbar tekst på mørk baggrund
- Ikke `text-black` eller `text-gray-900`!

</details>

---

<details>
<summary><strong>📋 Guide til sammenligning (åbn EFTER du har prøvet selv)</strong></summary>

**Først skal du se den originale CSS Module styling:**

```css
/* PostCard.module.css */
.postCard {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  background-color: var(--foreground);
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.postCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.postCardImage {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

.postCard h3 {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 4px;
  line-height: 1.4;
}
```

**FØR (med CSS Modules):**

```javascript
import Image from "next/image";
import styles from "./PostCard.module.css";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  return (
    <article className={styles.postCard}>
      <UserAvatar uid={post.uid} />
      <Image src={post.image} alt={post.caption} className={styles.postCardImage} width={500} height={500} />
      <h3>{post.caption}</h3>
    </article>
  );
}
```

**EFTER (med Tailwind):**

```javascript
import Image from "next/image";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  return (
    <article className="flex flex-col gap-3 p-5 rounded-xl bg-[#2a2a2a] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
      <UserAvatar uid={post.uid} />
      <Image
        src={post.image}
        alt={post.caption}
        className="w-full h-[250px] object-cover rounded-lg"
        width={500}
        height={500}
      />
      <h3 className="text-base font-medium text-[#ededed] mt-1 leading-relaxed">{post.caption}</h3>
    </article>
  );
}
```

**Forklaring af CSS → Tailwind mapping:**

| CSS Module                  | Tailwind Classes                                            | Forklaring                                                                           |
| --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `.postCard` container       | `flex flex-col gap-3 p-5 rounded-xl`                        | Vertikal layout, 12px gap, 20px padding, 12px border-radius                          |
| `.postCard` baggrund        | `bg-[#2a2a2a]`                                              | Mørk grå baggrund der kontrasterer mod sort page baggrund                            |
| `.postCard` interaktion     | `transition-all cursor-pointer`                             | Smooth transitions og cursor pointer                                                 |
| `.postCard` shadow          | `shadow-[0_2px_8px_rgba(0,0,0,0.3)]`                        | Synlig mørk skygge (højere opacity end standard for at være synlig på mørk baggrund) |
| `.postCard:hover` transform | `hover:-translate-y-1`                                      | Løfter card 4px ved hover                                                            |
| `.postCard:hover` shadow    | `hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]`                 | Større, dybere skygge ved hover                                                      |
| `.postCardImage`            | `w-full h-[250px] object-cover rounded-lg`                  | Fuld bredde, fast højde 250px, beskærer billede, 8px border-radius                   |
| `.postCard h3`              | `text-base font-medium text-[#ededed] mt-1 leading-relaxed` | 16px, medium weight, lys tekst, lille top margin, 1.4 line-height                    |

**Vigtige læringspunkter:**

1. **Arbitrary values for farver:** `bg-[#2a2a2a]` og `text-[#ededed]` for specifikke farver
2. **Arbitrary values for shadows:** `shadow-[0_2px_8px_rgba(0,0,0,0.3)]` når standard shadows ikke passer
3. **Shadow på mørk baggrund:** Brug højere opacity (0.3-0.5) for at skygger er synlige
4. **Transform utilities:** `hover:-translate-y-1` = `transform: translateY(-4px)`
5. **Arbitrary height:** `h-[250px]` for præcis højde
6. **Kombineret hover state:** Kan kombinere multiple hover utilities på samme element

**Trin for at færdiggøre migreringen:**

1. **Fjern CSS Module importen:**

   ```javascript
   import styles from "./PostCard.module.css";
   ```

2. **Slet CSS Module filen:**
   ```bash
   rm components/PostCard.module.css
   ```

**💡 Bonus tip:** Bemærk hvordan UserAvatar's lyse tekstfarve nu er synlig fordi PostCard ikke længere har CSS Module styling der overskriver det!

</details>

---

## Opgave 4.6: Migrer FormPost Komponenten

**Forms i Tailwind:**

**Form layout (grid med 2 kolonner):**

```javascript
<form className="grid grid-cols-[1fr_2fr] gap-4 items-start max-w-[800px] my-5">
  {/* grid-cols-[1fr_2fr] = labels i venstre kolonne, inputs i højre */}
</form>
```

**Labels:**

```javascript
<label className="font-medium pt-3 text-black">Caption</label>
```

**Input fields:**

```javascript
<input
  type="text"
  className="w-full p-3 border border-gray-300 rounded-lg text-base font-[inherit] bg-white text-black transition-colors focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]"
  placeholder="Enter caption..."
/>
```

**Image preview:**

```javascript
<img src={imageUrl} alt="Preview" className="w-full h-auto rounded-lg col-start-2" />
```

**Buttons container:**

```javascript
<div className="col-start-2 flex gap-4 mt-5">
  <button
    type="submit"
    className="px-6 py-3 border-none rounded-lg text-base font-medium cursor-pointer transition-all bg-black text-white hover:opacity-85 hover:-translate-y-px">
    Save Post
  </button>
  <button
    type="button"
    className="px-6 py-3 border-none rounded-lg text-base font-medium cursor-pointer transition-all bg-gray-200 text-black hover:bg-gray-300">
    Cancel
  </button>
</div>
```

**Responsive (mobil):**

```javascript
<form className="grid grid-cols-[1fr_2fr] gap-4 items-start max-w-[800px] my-5 max-[600px]:grid-cols-1">
  {/* På mobil bliver det én kolonne */}

  <label className="font-medium pt-3 max-[600px]:pt-0 text-black">Caption</label>

  {/* Image preview og buttons skal også justeres */}
  <img className="w-full h-auto rounded-lg col-start-2 max-[600px]:col-start-1" />

  <div className="col-start-2 max-[600px]:col-start-1 flex gap-4 mt-5">{/* Buttons */}</div>
</form>
```

**Tip:** `col-start-2` placerer elementet i anden kolonne. På mobil bliver det `col-start-1`!

---

## Opgave 4.7: Migrer Sider

**Page layouts i Tailwind:**

**Posts liste side (`app/posts/page.js`):**

```javascript
<div className="min-h-screen pt-20 pb-10 bg-black">
  <div className="max-w-[1400px] mx-auto px-5">
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 py-5">
      {/* Posts grid med auto-fill */}
    </div>
  </div>
</div>
```

**Forklaring:**

- `pt-20 pb-10` = 80px padding top (plads til fixed nav), 40px bottom
- `bg-black` = mørk baggrund til page
- `grid-cols-[repeat(auto-fill,minmax(300px,1fr))]` = responsive grid der automatisk tilpasser antal kolonner

**Post detail side (`app/posts/[id]/page.js`):**

```javascript
<div className="min-h-screen pt-20 pb-10 bg-black">
  <div className="max-w-[800px] mx-auto py-10 px-5">
    <h1 className="text-[32px] font-semibold mb-6 text-[#ededed] tracking-tight">Post Details</h1>
    <div className="bg-white p-6 rounded-xl mb-6 shadow-sm">{/* Post content */}</div>

    <div className="flex gap-4 mt-5">
      <button className="px-6 py-3 border-none rounded-lg text-base font-medium cursor-pointer transition-all bg-black text-white hover:opacity-85 hover:-translate-y-px">
        Update
      </button>
      {/* Delete button */}
    </div>
  </div>
</div>
```

**Home page (`app/page.js`):**

```javascript
<div className="min-h-screen pt-20 pb-10 bg-black flex items-center justify-center">
  <div className="text-center max-w-[600px]">
    <div className="mb-10">{/* Logo */}</div>
    <h1 className="text-[32px] font-semibold mb-4 tracking-tight text-[#ededed]">Welcome</h1>
    <p className="text-base text-gray-400 mb-8 leading-relaxed">Description text</p>
    <div className="flex gap-4 justify-center">
      <button className="px-6 py-3 rounded-lg font-medium bg-white text-black transition-all hover:opacity-85 hover:-translate-y-px">
        Primary
      </button>
      <button className="px-6 py-3 rounded-lg font-medium border border-gray-700 text-[#ededed] transition-all hover:bg-gray-900">
        Secondary
      </button>
    </div>
  </div>
</div>
```

**Tip:** Alle sider bruger `pt-20` (80px) for at give plads til den fixed navigation!

---

## Opgave 4.8: Migrer DeleteButton/DeletePostButton

**Delete button (trigger):**

```javascript
<button className="px-3 py-3 bg-transparent text-red-500 border-2 border-red-500 rounded-lg text-base font-medium cursor-pointer transition-all hover:bg-red-500 hover:text-white">
  Delete
</button>
```

**Modal overlay (baggrund med fadeIn animation):**

```javascript
<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-1000 animate-[fadeIn_0.2s_ease-in-out]">
```

**Modal content box:**

```javascript
<div className="bg-white p-8 rounded-xl max-w-[450px] w-[90%] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] animate-[slideIn_0.3s_ease-out]">
  <h2 className="m-0 mb-4 text-2xl font-semibold text-black">Confirm Delete</h2>
  <p className="m-0 mb-6 text-gray-600 leading-relaxed">
    Are you sure you want to delete this post? This action cannot be undone.
  </p>

  {/* Buttons container */}
  <div className="flex gap-4 justify-end">
    <button
      onClick={onCancel}
      className="px-6 py-3 rounded-lg text-base font-medium cursor-pointer transition-all border-none bg-gray-100 text-black border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
      Cancel
    </button>
    <button
      onClick={onConfirm}
      className="px-6 py-3 rounded-lg text-base font-medium cursor-pointer transition-all border-none bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed">
      Delete
    </button>
  </div>
</div>
```

**Tips:**

- `bg-black/50` = 50% gennemsigtighed i stedet for `rgba(0,0,0,0.5)`
- `z-1000` = meget høj z-index for modal overlay
- Animations (`fadeIn`, `slideIn`) kan defineres i `globals.css` som custom keyframes

---

## Opgave 4.9: Tjek og Test Alle Komponenter

**Nu har du migreret de vigtigste komponenter. Tid til at teste!**

**Gennemgå hver komponent:**

1. **Nav** - Er navigationen fixed i toppen? Virker hover states?
2. **UserAvatar** - Er billedet cirkulært? Er tekststørrelser korrekte?
3. **PostCard** - Virker hover effect (løft og skygge)? Er spacing korrekt?
4. **FormPost** - Er grid layout korrekt på desktop? Bliver det én kolonne på mobil?
5. **DeletePostButton** - Vises modal korrekt? Virker animations?

**Test i browseren:**

- 📱 **Mobil** - Resize browser vinduet til mobil størrelse
- 💻 **Desktop** - Test på fuld skærm
- 🎨 **Styling** - Sammenlign med original design

**Almindelige problemer:**

- Forkert spacing → sammenlign med original CSS Module styling
- Missing transitions → `transition-all` mangler på hover elementer

**Når alt fungerer korrekt, fortsæt til næste opgave!**

---

## Opgave 4.10: Tilføj Base Styling og Animations til globals.css

**Nu skal vi tilføje minimal CSS tilbage til `globals.css`:**

Da vi erstattede alt indhold med kun `@import "tailwindcss";`, skal vi tilføje:

- Base styling (resets, font)
- Custom animations til modal

**Opdater `app/globals.css` til:**

```css
@import "tailwindcss";

/* Base styling */
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  background: black;
  color: #ededed;
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Custom animations for modal */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Hvad gør dette:**

- **Body baggrund:** `background: black` - mørk default baggrund
- **Body text:** `color: #ededed` - lys tekst på mørk baggrund
- **Animations:** Til modal fadeIn og slideIn effekter

**Test det virker:**

1. Tjek at baggrunden er mørk
2. Tjek at fonts ser korrekte ud
3. Animations vil virke når du senere migrerer modal komponenten

---

## Opgave 4.11: Migrer Alle Sider

**Gennemgå hver side og migrer til Tailwind:**

**`app/posts/page.js` (Posts liste):**

```javascript
export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen pt-20 pb-10 bg-black">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 py-5">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**`app/posts/[id]/page.js` (Post detail):**

```javascript
export default async function PostDetailPage({ params }) {
  const post = await getPost(params.id);

  return (
    <div className="min-h-screen pt-20 pb-10 bg-black">
      <div className="max-w-[800px] mx-auto py-10 px-5">
        <h1 className="text-[32px] font-semibold mb-6 text-[#ededed] tracking-tight">Post Details</h1>

        {/* Post content */}
        <div className="bg-white p-6 rounded-xl mb-6 shadow-sm">
          {/* UserAvatar component */}
          <UserAvatar user={post.user} />

          {/* Post image */}
          <img className="w-full h-auto object-cover rounded-lg mb-4" src={post.image} alt={post.caption} />

          {/* Caption */}
          <p className="text-base text-black leading-relaxed">{post.caption}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mt-5">
          <Link
            href={`/posts/${post.id}/update`}
            className="px-6 py-3 border-none rounded-lg text-base font-medium cursor-pointer transition-all bg-white text-black hover:opacity-85 hover:-translate-y-px">
            Update
          </Link>
          <DeletePostButton deleteAction={deletePost} />
        </div>
      </div>
    </div>
  );
}
```

**`app/posts/create/page.js` og `app/posts/[id]/update/page.js`:**

```javascript
export default function CreatePostPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-black">
      <div className="max-w-[800px] mx-auto py-10 px-5">
        <h1 className="text-[32px] font-semibold mb-6 text-[#ededed] tracking-tight">Create New Post</h1>
        <FormPost />
      </div>
    </div>
  );
}
```

**Home page (`app/page.js`):**

```javascript
export default function HomePage() {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-black flex items-center justify-center">
      <div className="text-center max-w-[600px]">
        <div className="mb-10">{/* Logo component */}</div>
        <h1 className="text-[32px] font-semibold mb-4 tracking-tight text-[#ededed]">Next.js Posts App</h1>
        <p className="text-base text-gray-400 mb-8 leading-relaxed">
          A modern post sharing application built with Next.js
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/posts"
            className="px-6 py-3 rounded-lg font-medium bg-white text-black transition-all hover:opacity-85 hover:-translate-y-px">
            View Posts
          </Link>
          <Link
            href="/posts/create"
            className="px-6 py-3 rounded-lg font-medium border border-gray-700 text-[#ededed] transition-all hover:bg-gray-900">
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Tip:** Alle sider følger samme mønster med `bg-black` for mørk baggrund og `pt-20` for navigation padding!

---

## Opgave 4.12: Slet Alle CSS Module Filer

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

## Opgave 4.13: Tilføj Forbedringer

**Nu hvor du har Tailwind, kan du nemt justere og forbedre:**

1. **Hover effects er allerede implementeret:**

   ```javascript
   // PostCard hover effect
   className = "hover:-translate-y-1 hover:shadow-lg transition-all";

   // Button hover effect
   className = "hover:opacity-85 hover:-translate-y-px";
   ```

2. **Juster spacing efter behov:**

   ```javascript
   // Prøv forskellige gap værdier
   className = "gap-3 md:gap-4 lg:gap-6";

   // Responsive padding
   className = "p-4 md:p-6 lg:p-8";
   ```

3. **Eksperimenter med farver:**

   ```javascript
   // Skift primær farve fra sort til blå
   className = "bg-blue-600 text-white hover:bg-blue-700";

   // Eller grøn
   className = "bg-green-600 text-white hover:bg-green-700";
   ```

4. **Fine-tune border radius:**

   ```javascript
   // Fra rounded-xl (12px) til rounded-2xl (16px)
   className = "rounded-2xl";

   // Eller mere kantede hjørner
   className = "rounded-md";
   ```

5. **Dark mode er allerede implementeret:**

   Alle komponenter bruger allerede `dark:` prefix for dark mode support. Test det ved at ændre systemets appearance!

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

## Opgave 4.15: Redesign Challenge (ekstra)

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
