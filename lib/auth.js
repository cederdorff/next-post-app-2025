import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getServerUser() {
  const session = await auth();
  return session?.user || null;
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }
  return {
    uid: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image
  };
}
