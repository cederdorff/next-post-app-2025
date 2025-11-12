import PostCard from "@/components/PostCard";
import styles from "./page.module.css";

export default async function Home() {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts.json`; // Get Firebase Realtime Database URL
  const response = await fetch(url); // Fetch data from Firebase Realtime Database
  const dataObject = await response.json(); // Convert response to JSON object

  const posts = Object.keys(dataObject).map(key => ({
    id: key,
    ...dataObject[key]
  })); // Convert object to array
  console.log(posts);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.grid}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
