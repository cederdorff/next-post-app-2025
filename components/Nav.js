"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link href="/posts" className={pathname === "/posts" ? "active" : ""}>
        Posts
      </Link>
      <Link href="/create" className={pathname === "/create" ? "active" : ""}>
        New Post
      </Link>
    </nav>
  );
}
