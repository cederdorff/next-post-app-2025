// Client Component - needed for usePathname hook
"use client"; // Mark as client component

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/app/auth-actions";
import styles from "./Nav.module.css";

export default function Nav({ session }) {
  // Get current pathname to highlight active link
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.navLinks}>
        <Link href="/" className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}>
          Home
        </Link>
        <Link href="/posts" className={`${styles.navLink} ${pathname === "/posts" ? styles.active : ""}`}>
          Posts
        </Link>
        {session && (
          <Link
            href="/posts/create"
            className={`${styles.navLink} ${pathname === "/posts/create" ? styles.active : ""}`}>
            New Post
          </Link>
        )}
      </div>

      <div className={styles.authSection}>
        {session ? (
          <>
            <span className={styles.userEmail}>{session.user.name || session.user.email}</span>
            <Link href="/profile" className={`${styles.authButton} ${styles.profileButton}`}>
              Profile
            </Link>
            <form action={handleSignOut}>
              <button type="submit" className={`${styles.authButton} ${styles.logOutButton}`}>
                Log Out
              </button>
            </form>
          </>
        ) : (
          <Link href="/signin" className={`${styles.authButton} ${styles.signInButton}`}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
