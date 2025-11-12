import Image from "next/image";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <article className="post-card">
        <UserAvatar uid={post.uid} />
        <Image src={post.image} alt={post.caption} width={500} height={500} />
        <h3>{post.caption}</h3>
      </article>
    </Link>
  );
}
