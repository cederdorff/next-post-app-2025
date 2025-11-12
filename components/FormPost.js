"use client";
import Image from "next/image";
import { useState } from "react";
export default function FormPost({ action, post }) {
  const [image, setImage] = useState(post?.image);

  return (
    <form action={action} className="form-grid">
      <label htmlFor="caption">Caption</label>
      <input
        id="caption"
        name="caption"
        type="text"
        aria-label="caption"
        placeholder="Write a caption..."
        defaultValue={post?.caption}
      />
      <label htmlFor="image">Image</label>
      <input
        type="url"
        name="image"
        id="image"
        defaultValue={post?.image}
        aria-label="image"
        placeholder="Paste an image URL"
        onChange={event => setImage(event.target.value)}
      />
      <label htmlFor="image-preview"></label>
      <Image
        id="image-preview"
        className="image-preview"
        src={
          image
            ? image
            : "https://placehold.co/600x400.webp?text=Paste+image+URL"
        }
        width={600}
        height={400}
        alt={post?.caption || "Image preview"}
      />
      <div className="btns">
        <button>{post?.caption ? "Update" : "Create"}</button>
      </div>
    </form>
  );
}
