// 'use client';

import Link from "next/link";
import Image from "next/image";
import css from "./ProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { getServerMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";

// export default function ProfilePage() {
//   const { user } = useAuthStore();
export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: `Profile: ${user.username}`,
    description: `Profile page for ${user.username}`,
  };
}

export default async function ProfilePage() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}




// import css from "./ProfilePage.module.css";
// import Image from "next/image";

// export default async function Profile() {
//     return(
//     <main className={css.mainContent}>
//   <div className={css.profileCard}>
//       <div className={css.header}>
// 	     <h1 className={css.formTitle}>Profile Page</h1>
// 	     <a href="" className={css.editProfileButton}>
// 	       Edit Profile
// 	     </a>
// 	   </div>
//      <div className={css.avatarWrapper}>
//       <Image
//         src="Avatar"
//         alt="User Avatar"
//         width={120}
//         height={120}
//         className={css.avatar}
//       />
//     </div>
//     <div className={css.profileInfo}>
//       <p>
//         Username: your_username
//       </p>
//       <p>
//         Email: your_email@example.com
//       </p>
//     </div>
//   </div>
  
// </main>
//     );
// }
