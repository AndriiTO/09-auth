'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import css from "./ProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const data = await getMe();
        setUser(data);
        setUsername(data.username);
      } else {
        setUsername(user.username);
      }
    };
    fetchUser();
  }, [user, setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await updateMe({ username });
    setUser(updated);
    router.push("/profile");
  };

  const handleCancel = () => router.push("/profile");

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image src={user?.avatar || "/avatar.png"} alt="User Avatar" width={120} height={120} className={css.avatar} />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" className={css.input} />
          </div>
          <p>Email: {user?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}