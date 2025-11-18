import PostCard from "@/components/PostCard";
import DeletePostButton from "@/components/DeletePostButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import { getServerUser, requireAuth } from "@/lib/auth";

export default async function PostPage({ params }) {
  await requireAuth().catch(() => redirect("/signin")); // ← Beskyt med auth

  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/posts/${id}.json`;
  const response = await fetch(url);
  const post = await response.json();

  // Get current user on server
  const user = await getServerUser();
  const isOwner = user && user.uid === post.uid;

  // Server Action to handle post deletion
  async function deletePost() {
    "use server"; // Mark as server action - runs on server only
    const response = await fetch(url, {
      method: "DELETE"
    });
    if (response.ok) {
      redirect("/posts");
    }
  }

  return (
    <main className={styles.postPage}>
      <div className={styles.container}>
        <h1>{post.caption}</h1>
        <div className={styles.postCard}>
          <PostCard post={post} />
        </div>
        {isOwner && (
          <div className={styles.btns}>
            <DeletePostButton deleteAction={deletePost} />
            <Link href={`/posts/${id}/update`}>
              <button className={styles.btnUpdate}>Update post</button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
