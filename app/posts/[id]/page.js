import PostCard from "@/components/PostCard";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts/${id}.json`;
  const response = await fetch(url);
  const post = await response.json();

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
        <div className={styles.btns}>
          <form action={deletePost}>
            <button className={styles.btnDelete}>Delete post</button>
          </form>
          <Link href={`/posts/${id}/update`}>
            <button className={styles.btnUpdate}>Update post</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
