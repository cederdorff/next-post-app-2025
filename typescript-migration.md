# Modul 5: Implementer TypeScript

## Oversigt

I dette modul vil du migrere applikationen fra JavaScript til TypeScript. Du vil lære at arbejde med type safety og se hvordan TypeScript kan hjælpe med at undgå fejl.

---

## Opgave 5.1: Installer TypeScript

**Trin 1: Installation af dependencies**

```bash
npm install -D typescript @types/react @types/node
```

**Trin 2: Opret TypeScript konfiguration**

Opret `tsconfig.json` i projektets rod:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Trin 3: Start med at omdøbe en fil**

Omdøb en `.js` fil til `.tsx` for at aktivere TypeScript:

```bash
mv components/Nav.js components/Nav.tsx
```

**Trin 4: Start development server**

```bash
npm run dev
```

Next.js vil nu automatisk oprette `next-env.d.ts` med type definitions.

**Vigtigt:** `allowJs: true` i `tsconfig.json` betyder at JavaScript og TypeScript kan eksistere side om side, så du kan migrere gradvist fil for fil.

---

## Opgave 5.2: Gradvis Migration - Start med Types

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

2. **Omdøb og migrer komponenter én ad gangen:**

```bash
# Omdøb komponent filer til .tsx
mv components/UserAvatar.js components/UserAvatar.tsx
mv components/PostCard.js components/PostCard.tsx
mv components/FormPost.js components/FormPost.tsx
mv components/DeletePostButton.js components/DeletePostButton.tsx
```

**UserAvatar.tsx** - Async Server Component:

```typescript
// Async Server Component - fetches user data on the server
import Image from "next/image";
import { User } from "@/types/types";

interface UserAvatarProps {
  uid: string;
}

export default async function UserAvatar({ uid }: UserAvatarProps) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${uid}.json`;

  // Fetch user data - runs on server, not sent to client
  const response = await fetch(url);
  const user: User = await response.json();

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

**PostCard.tsx** - Server Component:

```typescript
// Server Component - no "use client" needed
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import { Post } from "@/types/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col gap-3 p-5 rounded-xl bg-[#2a2a2a] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
      {/* Async Server Component inside */}
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

**FormPost.tsx** - Client Component:

```typescript
// Client Component - needed for useState to manage image preview
"use client";

import Image from "next/image";
import { useState } from "react";
import { Post } from "@/types/types";

interface FormPostProps {
  action: (formData: FormData) => Promise<void>;
  post?: Post;
}

export default function FormPost({ action, post }: FormPostProps) {
  // Local state for image preview
  const [image, setImage] = useState(post?.image);

  return (
    <form action={action} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-start max-w-[800px] my-5">
      {/* Form fields... */}
    </form>
  );
}
```

**DeletePostButton.tsx** - Client Component:

```typescript
// Client Component - needed for useState to manage modal visibility
"use client";

import { useState } from "react";

interface DeletePostButtonProps {
  deleteAction: () => Promise<void>;
}

export default function DeletePostButton({ deleteAction }: DeletePostButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    await deleteAction();
    // Redirect happens in Server Action
  }

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        Delete post
      </button>
      {showModal && <div>{/* Modal content... */}</div>}
    </>
  );
}
```

**Vigtigt:** Bemærk forskellen mellem Server og Client Components:

- Server Components: Kan være `async` og fetche data direkte
- Client Components: Skal markeres med `"use client"` og bruger hooks som `useState`

---

## Opgave 5.3: Migrer Page Filer

Nu skal vi migrere page filerne i `app/` mappen til TypeScript.

**Trin 1: Omdøb page filer**

```bash
# Main pages
mv app/layout.js app/layout.tsx
mv app/page.js app/page.tsx

# Posts pages
mv app/posts/page.js app/posts/page.tsx
mv app/posts/create/page.js app/posts/create/page.tsx

# Dynamic routes (brug escaped brackets i zsh)
mv app/posts/\[id\]/page.js app/posts/\[id\]/page.tsx
mv app/posts/\[id\]/update/page.js app/posts/\[id\]/update/page.tsx
```

**Trin 2: Tilføj types til layout.tsx**

```typescript
import "./globals.css";
import Nav from "@/components/Nav";
import { Metadata } from "next";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Next.js Post App",
  description: "A modern post application built with Next.js 16"
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// Root Layout - wraps all pages
export default function RootLayout({ children }: RootLayoutProps) {
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

**Trin 3: Tilføj types til posts/page.tsx**

```typescript
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { Post } from "@/types/types";

// Server Component
export default async function Home() {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts.json`;
  const response = await fetch(url);
  const dataObject = await response.json();

  // Convert Firebase object to array of posts
  const posts: Post[] = Object.keys(dataObject).map(key => ({
    id: key,
    ...dataObject[key]
  }));

  return (
    <main className="min-h-screen pt-20 pb-10 px-5">
      <div className="max-w-[1400px] mx-auto px-5">
        <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 py-5">
          {posts.map(post => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <PostCard post={post} />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
```

**Trin 4: Tilføj types til posts/create/page.tsx**

```typescript
import { redirect } from "next/navigation";
import FormPost from "@/components/FormPost";

export default function CreatePage() {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts.json`;

  // Server Action to handle post creation
  async function createPost(formData: FormData) {
    "use server";
    const caption = formData.get("caption") as string;
    const image = formData.get("image") as string;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        caption,
        image,
        uid: "OPPe5jue2Ghxx3mtnxevB5FwCYe2",
        createdAt: new Date().toISOString()
      })
    });

    if (response.ok) {
      redirect("/posts");
    }
  }

  return (
    <section className="min-h-screen pt-20 pb-10 px-5">
      <div className="max-w-[900px] mx-auto py-10 px-5">
        <h1 className="text-[32px] font-semibold mb-6 text-[#ededed] tracking-tight">Create New Post</h1>
        <FormPost action={createPost} />
      </div>
    </section>
  );
}
```

**Trin 5: Tilføj types til posts/[id]/page.tsx**

```typescript
import PostCard from "@/components/PostCard";
import DeletePostButton from "@/components/DeletePostButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Post } from "@/types/types";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts/${id}.json`;
  const response = await fetch(url);
  const post: Post = await response.json();

  // Server Action to handle post deletion
  async function deletePost() {
    "use server";
    const response = await fetch(url, {
      method: "DELETE"
    });
    if (response.ok) {
      redirect("/posts");
    }
  }

  return (
    <main className="min-h-screen pt-20 pb-10 px-5">
      <div className="max-w-[800px] mx-auto py-10 px-5">
        <h1 className="text-[32px] font-semibold mb-6 text-[#ededed] tracking-tight">{post.caption}</h1>
        <div className="bg-[#2a2a2a] p-6 rounded-xl mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          <PostCard post={post} />
        </div>
        <div className="flex gap-4 mt-5">
          <DeletePostButton deleteAction={deletePost} />
          <Link href={`/posts/${id}/update`}>
            <button className="px-6 py-3 border-none rounded-lg text-base font-medium cursor-pointer transition-all bg-[#ededed] text-black hover:opacity-85 hover:-translate-y-px">
              Update post
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
```

**Trin 6: Tilføj types til posts/[id]/update/page.tsx**

```typescript
import FormPost from "@/components/FormPost";
import { redirect } from "next/navigation";
import { Post } from "@/types/types";

interface UpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts/${id}.json`;
  const response = await fetch(url);
  const post: Post = await response.json();

  // Server Action to handle post update
  async function updatePost(formData: FormData) {
    "use server";
    const caption = formData.get("caption") as string;
    const image = formData.get("image") as string;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ caption, image })
    });

    if (response.ok) {
      redirect(`/posts/${id}`);
    }
  }

  return (
    <section className="min-h-screen pt-20 pb-10 px-5">
      <div className="max-w-[900px] mx-auto py-10 px-5">
        <h1 className="text-[32px] font-semibold mb-6 text-[#ededed] tracking-tight">Update Post</h1>
        <FormPost action={updatePost} post={post} />
      </div>
    </section>
  );
}
```

**Vigtige TypeScript koncepter brugt:**

1. **Metadata type:** `export const metadata: Metadata` - Next.js built-in type
2. **React.ReactNode:** Type for children prop
3. **Promise params:** `params: Promise<{ id: string }>` - Next.js 15+ kræver await på params
4. **Server Actions:** `async function(formData: FormData)`
5. **Type assertions:** `as string` når vi henter fra FormData
6. **Array typing:** `posts: Post[]` for eksplicit array type

---

## Opgave 5.4: Test og Verificer

**Kør development server:**

```bash
npm run dev
```

**Tjek for TypeScript fejl:**

```bash
npx tsc --noEmit
```

**Hvad du skal verificere:**

1. ✅ Ingen TypeScript kompileringsfejl
2. ✅ Alle komponenter har typed props
3. ✅ Server Actions har typed parametre (FormData) og return type (Promise<void>)
4. ✅ Fetch responses er typed (Post, User)
5. ✅ Dynamic routes har typed params (Promise<{ id: string }>)

**TypeScript fordele du nu har:**

- **Type safety:** Fanger fejl ved compile-time i stedet for runtime
- **IntelliSense:** Bedre autocomplete i VS Code
- **Refactoring:** Trygt at omdøbe properties - TypeScript finder alle steder
- **Dokumentation:** Types fungerer som levende dokumentation
- **Mindre bugs:** Fanger null/undefined fejl før de når produktion

---

## Opgave 5.5: Best Practices

**TypeScript conventions vi har brugt:**

1. **Interface for objekter:**

```typescript
interface Post {
  id: string;
  caption: string;
  // ...
}
```

2. **Props interfaces:**

```typescript
interface PostCardProps {
  post: Post;
}
```

3. **Server Actions pattern:**

```typescript
async function actionName(formData: FormData) {
  "use server";
  const field = formData.get("field") as string;
  // ...
}
```

4. **Type assertions ved FormData:**

```typescript
const caption = formData.get("caption") as string;
```

5. **Simple types frem for komplekse:**

```typescript
// ✅ Godt - simpelt og læseligt
const posts: Post[] = Object.keys(dataObject).map(...)

// ❌ Undgå - for komplekst
const dataObject: Record<string, Omit<Post, "id">> = ...
```

---

## Opsummering

**Du har nu migreret hele applikationen til TypeScript!**

✅ **Installeret:** TypeScript + type definitions  
✅ **Konfigureret:** tsconfig.json + next-env.d.ts  
✅ **Types oprettet:** Post og User interfaces  
✅ **Komponenter:** Alle .js filer -> .tsx med typed props  
✅ **Pages:** Alle routes typed inkl. dynamic routes  
✅ **Server Actions:** FormData og Promise<void> types

**Næste skridt:** Fortsæt med at bruge TypeScript i nye features og nyd fordelene! 🎉

revalidatePath("/posts");
redirect("/posts");
}

export async function updatePost(id: string, formData: FormData) {
const caption = formData.get("caption") as string;
const image = formData.get("image") as string;

const updates = {
caption,
image
};

await fetch(`${process.env.FIREBASE_URL}/posts/${id}.json`, {
method: "PATCH",
body: JSON.stringify(updates)
});

revalidatePath("/posts");
redirect(`/posts/${id}`);
}

export async function deletePost(id: string) {
await fetch(`${process.env.FIREBASE_URL}/posts/${id}.json`, {
method: "DELETE"
});

revalidatePath("/posts");
redirect("/posts");
}

````

---

## Opgave 5.4: Type Page Components

**Server Components (Pages):**

```typescript
import { Post, User } from "@/types/types";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  const user = await getUser(post.uid);

  return <main className="max-w-3xl mx-auto px-4 py-8">{/* ... */}</main>;
}
````

**Search Params:**

```typescript
interface PostsPageProps {
  searchParams: {
    filter?: string;
    sort?: "newest" | "oldest";
  };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const posts = await getPosts();

  // Filter and sort based on searchParams
  let filteredPosts = posts;

  if (searchParams.filter) {
    filteredPosts = posts.filter(post => post.caption.toLowerCase().includes(searchParams.filter!.toLowerCase()));
  }

  if (searchParams.sort === "oldest") {
    filteredPosts.sort((a, b) => a.createdAt - b.createdAt);
  } else {
    filteredPosts.sort((a, b) => b.createdAt - a.createdAt);
  }

  return <main className="max-w-6xl mx-auto px-4 py-8">{/* ... */}</main>;
}
```

---

## Opgave 5.5: Eksempler på TypeScript Fordele

**Find og dokumentér eksempler hvor TypeScript hjælper:**

1. **Prop validation:**

   - Hvad sker der hvis du sender forkert prop type?
   - Skab bevidst en fejl og se TypeScript fejlen

   Eksempel:

   ```typescript
   // ❌ Dette vil give en TypeScript fejl:
   <PostCard post={user} user={post} />

   // ✅ Korrekt:
   <PostCard post={post} user={user} />
   ```

2. **API responses:**

   - Type Firebase responses
   - Hvad hvis Firebase returnerer noget uventet?

   ```typescript
   async function getPosts(): Promise<Post[]> {
     const response = await fetch(`${process.env.FIREBASE_URL}/posts.json`);
     const data = await response.json();

     // TypeScript tvinger dig til at håndtere null/undefined
     if (!data) {
       return [];
     }

     const posts: Post[] = Object.keys(data).map(key => ({
       id: key,
       ...data[key]
     }));

     return posts;
   }
   ```

3. **Server Actions:**

   - Type FormData ekstraktion
   - Hvad kunne gå galt uden types?

   ```typescript
   // Med TypeScript får du autocomplete og type checking:
   const caption = formData.get("caption") as string;

   // TypeScript advarer hvis du glemmer null check:
   if (!caption) {
     throw new Error("Caption is required");
   }
   ```

**Opret `TYPESCRIPT_EXAMPLES.md` med:**

- 3 eksempler hvor TypeScript fangede en fejl
- 3 eksempler hvor TypeScript gjorde koden mere læsbar
- Screenshots af TypeScript intellisense i VS Code

---

## Opgave 5.6: Forbedr med Strenge Types

**Gør types mere præcise:**

1. **Brug literal types:**

```typescript
export type PostStatus = "draft" | "published" | "archived";
export type UserRole = "admin" | "user" | "moderator";

export interface Post {
  id: string;
  caption: string;
  image: string;
  uid: string;
  createdAt: number;
  status?: PostStatus;
}

export interface User {
  id: string;
  name: string;
  title: string;
  image: string;
  role?: UserRole;
}
```

2. **Brug Generics:**

```typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();
  return data as T;
}

// Brug:
const posts = await fetchData<Post[]>(`${process.env.FIREBASE_URL}/posts.json`);
const user = await fetchData<User>(`${process.env.FIREBASE_URL}/users/${uid}.json`);
```

3. **Brug Utility Types:**

```typescript
// Partial - gør alle properties optional
type PartialPost = Partial<Post>;

// Anvendelse i update funktioner:
async function updatePost(id: string, updates: Partial<Post>) {
  await fetch(`${process.env.FIREBASE_URL}/posts/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(updates)
  });
}

// Omit - fjern specific properties
type PostWithoutId = Omit<Post, "id">;
type PostCreateData = Omit<Post, "id" | "createdAt">;

// Pick - vælg specific properties
type PostPreview = Pick<Post, "id" | "caption" | "image">;

// Required - gør alle properties required
type CompletePost = Required<Post>;
```

4. **Custom Type Guards:**

```typescript
function isPost(obj: any): obj is Post {
  return (
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.caption === "string" &&
    typeof obj.image === "string" &&
    typeof obj.uid === "string" &&
    typeof obj.createdAt === "number"
  );
}

function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.title === "string" &&
    typeof obj.image === "string"
  );
}

// Brug:
const data = await response.json();
if (isPost(data)) {
  // TypeScript ved nu at data er en Post
  console.log(data.caption);
}
```

---

## Opgave 5.7: Type Component Props Pattern

**Best practices for component props:**

```typescript
// Base props
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Extend base props
interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export function Button({ children, onClick, variant = "primary", disabled = false, className = "" }: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-200 hover:bg-gray-300",
    danger: "bg-red-600 hover:bg-red-700"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
}
```

---

## Reflektion

- Hvilke fejl fangede TypeScript under migrationen?
- Hvordan har TypeScript ændret din udviklererfaring?
- Hvor tilføjede TypeScript mest værdi? (Components? Server Actions? API calls?)
- Hvad er udfordringerne ved TypeScript?
- Ville du bruge TypeScript i alle fremtidige projekter? Hvorfor/hvorfor ikke?
