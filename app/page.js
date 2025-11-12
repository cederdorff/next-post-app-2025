import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <main className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
        <Image src="/next.svg" alt="Next.js logo" width={180} height={37} priority style={{ marginBottom: "40px" }} />
        <h1 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "16px", letterSpacing: "-0.5px" }}>
          Next.js Post App
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "32px" }}>
          A modern post application built with Next.js 16, featuring Server Components, Server Actions, and Firebase
          integration.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link
            href="/posts"
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 500,
              backgroundColor: "var(--text-primary)",
              color: "var(--background)",
              transition: "all 0.2s"
            }}>
            View Posts
          </Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 500,
              border: "1px solid var(--border-color)",
              transition: "all 0.2s"
            }}>
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
