import { signIn } from "@/auth";
import styles from "./page.module.css";

export default function SignInPage() {
  return (
    <main className={styles.authPage}>
      <div className={styles.container}>
        <h1>Sign In</h1>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/posts" });
          }}
          className={styles.form}>
          <button type="submit" className={styles.submitButton}>
            Sign in with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
