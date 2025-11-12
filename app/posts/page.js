import PostCard from "@/components/PostCard";

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
    <main className="page">
      <section className="grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
