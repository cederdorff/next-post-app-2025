# Auth.js med GitHub OAuth - Implementeringsguide

Denne guide hjælper dig med at implementere GitHub autentificering ved hjælp af Auth.js (NextAuth v5) i en Next.js applikation med Firebase Realtime Database til brugerlagring.

## Oversigt

Vi vil oprette et autentificeringssystem hvor:

- Brugere logger ind med deres GitHub konto
- Brugerdata oprettes automatisk i Firebase ved første login
- Session data hentes frisk fra Firebase ved hver request
- Al auth-relateret kode er organiseret i to simple filer

## Forudsætninger

- Next.js 15+ applikation
- Firebase Realtime Database sat op
- GitHub konto til at oprette OAuth app

## Trin 1: Installer Auth.js

```bash
npm install next-auth@beta
```

Bemærk: Vi bruger beta versionen for Next.js 15+ kompatibilitet.

## Trin 2: Opret GitHub OAuth App

1. Gå til [GitHub Developer Settings](https://github.com/settings/developers)
2. Klik "New OAuth App"
3. Udfyld:
   - **Application name**: Dit app navn
   - **Homepage URL**: `http://localhost:3000` (eller din produktions URL)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Gem **Client ID** og generer en **Client Secret**

## Trin 3: Environment Variabler

Opret eller opdater `.env.local`:

```env
# Auth.js
AUTH_SECRET="din-hemmelige-nøgle-her"
AUTH_GITHUB_ID="dit-github-client-id"
AUTH_GITHUB_SECRET="dit-github-client-secret"

# Firebase (eksisterende)
NEXT_PUBLIC_FIREBASE_DATABASE_URL="https://dit-projekt.firebaseio.com"
```

Generer `AUTH_SECRET`:

```bash
npx auth secret
```

## Trin 4: Opret Auth Konfiguration

Opret `/auth.js` i roden:

```javascript
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getUserByEmail, createUser } from "@/lib/firebase-users";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserByEmail(user.email);

      if (!existingUser) {
        await createUser({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (token.email) {
        const firebaseUser = await getUserByEmail(token.email);
        if (firebaseUser) {
          session.user = {
            uid: firebaseUser.id,
            email: firebaseUser.mail,
            name: firebaseUser.name,
            image: firebaseUser.image,
            title: firebaseUser.title
          };
        }
      }

      return session;
    }
  },
  pages: {
    signIn: "/signin"
  }
});
```

**Nøglepunkter:**

- `signIn` callback: Opretter bruger i Firebase hvis de ikke eksisterer
- `jwt` callback: Gemmer email i token til Firebase opslag
- `session` callback: Henter friske brugerdata fra Firebase ved hver request

## Trin 5: Opret Firebase Bruger Funktioner

Opret `/lib/firebase-users.js`:

```javascript
export async function getUserByEmail(email) {
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/users.json?orderBy="mail"&equalTo="${email}"`;

  const response = await fetch(url);
  const userData = await response.json();

  if (Object.keys(userData).length === 0) return null;

  const user = { id: Object.keys(userData)[0], ...Object.values(userData)[0] };
  return user;
}

export async function createUser(userData) {
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/users.json`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      mail: userData.email,
      name: userData.name || "",
      image: userData.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.id}`,
      title: userData.title || "",
      createdAt: new Date().toISOString()
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const data = await response.json();
  return data.name;
}

export async function updateUser(userId, userData) {
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/users/${userId}.json`;
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return await response.json();
}
```

## Trin 6: Opret Auth Actions

Opret `/lib/auth-actions.js`:

```javascript
"use server";

import { signOut, signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}

export async function handleSignIn() {
  await signIn("github", { redirectTo: "/posts" });
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }
  return session.user;
}
```

## Trin 7: Opret API Route

Opret `/app/api/auth/[...nextauth]/route.js`:

```javascript
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

## Trin 8: Opdater Firebase Regler

Tilføj indeksering til email opslag i Firebase Realtime Database regler:

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "users": {
      ".indexOn": ["mail"]
    },
    "posts": {
      ".indexOn": ["uid", "createdAt"]
    }
  }
}
```

## Trin 9: Opret Sign In Side

Opret `/app/signin/page.js`:

```javascript
import { handleSignIn } from "@/lib/auth-actions";
import styles from "./page.module.css";

export default function SignInPage() {
  return (
    <main className={styles.authPage}>
      <div className={styles.container}>
        <h1>Sign In</h1>
        <form action={handleSignIn} className={styles.form}>
          <button type="submit" className={styles.submitButton}>
            Sign in with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
```

Opret `/app/signin/page.module.css`:

```css
.authPage {
  min-height: 100vh;
  padding: 80px 20px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background-color: var(--foreground);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.container h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
  color: var(--text-primary);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.submitButton {
  width: 100%;
  padding: 12px 24px;
  background-color: #24292e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submitButton:hover {
  background-color: #1b1f23;
}
```

## Trin 10: Opdater Layout med Session

Opdater `/app/layout.js`:

```javascript
import { auth } from "@/auth";
import Nav from "@/components/Nav";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <Nav user={session?.user} />
        {children}
      </body>
    </html>
  );
}
```

## Trin 11: Opdater Nav Komponent

Opdater `/components/Nav.js`:

```javascript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/lib/auth-actions";
import styles from "./Nav.module.css";

export default function Nav({ user }) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.navLinks}>
        <Link href="/" className={pathname === "/" ? styles.active : ""}>
          Hjem
        </Link>
        <Link href="/posts" className={pathname === "/posts" ? styles.active : ""}>
          Indlæg
        </Link>
        {user && (
          <Link href="/posts/create" className={pathname === "/posts/create" ? styles.active : ""}>
            Nyt Indlæg
          </Link>
        )}
      </div>

      <div className={styles.authSection}>
        {user ? (
          <>
            <span className={styles.userEmail}>{user.name || user.email}</span>
            <Link href="/profile" className={styles.authButton}>
              Profil
            </Link>
            <form action={handleSignOut}>
              <button type="submit" className={styles.authButton}>
                Log Ud
              </button>
            </form>
          </>
        ) : (
          <Link href="/signin" className={styles.authButton}>
            Log Ind
          </Link>
        )}
      </div>
    </nav>
  );
}
```

## Trin 12: Beskyt Sider med requireAuth

Eksempel for `/app/posts/create/page.js`:

```javascript
import { requireAuth } from "@/lib/auth-actions";
import FormPost from "@/components/FormPost";

export default async function CreatePage() {
  const user = await requireAuth();

  async function createPost(formData) {
    "use server";

    const title = formData.get("title");
    const body = formData.get("body");
    const image = formData.get("image");

    const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/posts.json`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        image,
        uid: user.uid,
        createdAt: new Date().toISOString()
      })
    });

    redirect("/posts");
  }

  return (
    <main>
      <h1>Opret Nyt Indlæg</h1>
      <FormPost action={createPost} />
    </main>
  );
}
```

## Trin 13: Opret Profil Side

Opret `/app/profile/page.js`:

```javascript
import { requireAuth } from "@/lib/auth-actions";
import { updateUser } from "@/lib/firebase-users";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import styles from "./page.module.css";

export default async function ProfilePage() {
  const user = await requireAuth();

  async function updateProfile(formData) {
    "use server";

    const name = formData.get("name");
    const title = formData.get("title");
    const image = formData.get("image");

    await updateUser(user.uid, {
      name: name.trim(),
      title: title.trim(),
      image: image.trim() || user.image
    });

    revalidatePath("/");
  }

  return (
    <main className={styles.profilePage}>
      <div className={styles.container}>
        <h1>Rediger Profil</h1>

        <form action={updateProfile} className={styles.form}>
          {user.image && (
            <div className={styles.imagePreview}>
              <Image src={user.image} alt={user.name || "Profil"} width={100} height={100} />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="name">Navn</label>
            <input type="text" id="name" name="name" defaultValue={user.name || ""} required placeholder="Dit navn" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">Titel</label>
            <input type="text" id="title" name="title" defaultValue={user.title || ""} placeholder="Din titel" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Billede URL</label>
            <input
              type="url"
              id="image"
              name="image"
              defaultValue={user.image || ""}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.infoGroup}>
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <button type="submit" className={styles.submitButton}>
            Gem Ændringer
          </button>
        </form>
      </div>
    </main>
  );
}
```

## Test Implementeringen

1. **Start din dev server**: `npm run dev`
2. **Test log ind**: Gå til `/signin` og klik "Log ind med GitHub"
3. **Verificer bruger oprettelse**: Tjek Firebase for at se om brugeren blev oprettet
4. **Test profil**: Gå til `/profile` og opdater dine informationer
5. **Verificer opdateringer**: Ændringer skulle vises med det samme i Nav
6. **Test beskyttede routes**: Prøv at tilgå `/posts/create` mens du er logget ud

## Fil Struktur

```
your-app/
├── auth.js                      # Auth.js configuration
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.js     # Auth API routes
│   ├── signin/
│   │   ├── page.js              # Sign in page
│   │   └── page.module.css
│   ├── profile/
│   │   ├── page.js              # Profile edit page
│   │   └── page.module.css
│   └── layout.js                # Root layout with session
├── lib/
│   ├── auth-actions.js          # Auth Server Actions
│   └── firebase-users.js        # Firebase user functions
└── components/
    └── Nav.js                   # Navigation with auth state
```

## Key Concepts

### Why Two Auth Files?

- **`/auth.js`**: NextAuth configuration (providers, callbacks)
- **`/lib/auth-actions.js`**: Helper functions for use in your app

This separation keeps configuration separate from application logic.

### Session Management

The session callback fetches fresh data from Firebase on **every request**. This means:

- ✅ Profile updates appear immediately
- ✅ Always shows current user data
- ⚠️ More database queries (but Firebase is fast!)

### Server Actions

All auth actions use `"use server"` directive:

- `handleSignIn()` - Triggers GitHub OAuth flow
- `handleSignOut()` - Signs user out and redirects
- `requireAuth()` - Protects pages, redirects if not authenticated

## Common Issues

### "Module not found: @/auth"

Make sure `auth.js` is in the root directory, not in `/lib` or `/app`.

### "Can't define inline Server Actions in Client Components"

All Server Actions must be in files with `"use server"` at the top or in separate Server Component files.

### Session data not updating after profile edit

Make sure you're calling `revalidatePath("/")` in your update function to refresh the layout.

### GitHub OAuth callback error

Verify your callback URL in GitHub OAuth settings matches exactly:
`http://localhost:3000/api/auth/callback/github`

## Next Steps

- Add more OAuth providers (Google, Facebook, etc.)
- Implement role-based access control
- Add email verification
- Create admin dashboard
- Add two-factor authentication

## Resources

- [Auth.js Documentation](https://authjs.dev)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
