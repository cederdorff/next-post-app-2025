import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default async function ProfilePage() {
  const user = await requireAuth();

  return (
    <main className={styles.profilePage}>
      <div className={styles.container}>
        <h1>Profile</h1>

        <div className={styles.profileInfo}>
          {user.image && (
            <div className={styles.imagePreview}>
              <Image src={user.image} alt={user.name || "Profile"} width={100} height={100} />
            </div>
          )}

          <div className={styles.infoGroup}>
            <label>Name</label>
            <p>{user.name || "Not provided"}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>User ID</label>
            <p className={styles.userId}>{user.uid}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
