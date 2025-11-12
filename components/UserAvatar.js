import Image from "next/image";

export default async function UserAvatar({ uid }) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${uid}.json`;

  const response = await fetch(url);
  const user = await response.json();

  return (
    <div className="avatar">
      <Image src={user.image} alt={user.name} width={75} height={75} />
      <span>
        <h3>{user.name}</h3>
        <p>{user.title}</p>
      </span>
    </div>
  );
}
