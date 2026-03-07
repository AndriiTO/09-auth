'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '../../../lib/api/clientApi';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const authStore = useAuthStore();
  const [error, setError] = useState('');

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    try {
      
      const user = await login({ email, password });

       authStore.setUser(user);

      router.push('/profile');
    } catch (err) {
      console.error(err);
      setError('Невірний email або пароль');
    }
  };
  
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign In</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"   
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"  
          placeholder="Password"
          required
        />
        {error && <p className={css.error}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}





// 'use client';

// import Link from "next/link";
// import css from "./ProfilePage.module.css";
// import { useAuthStore } from "@/lib/store/authStore";
// import Image from "next/image";

// export default function ProfilePage() {
//   const { user } = useAuthStore();

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <Link href="/profile/edit" className={css.editProfileButton}>Edit Profile</Link>
//         </div>
//         <div className={css.avatarWrapper}>
//           <Image src={user?.avatar || "/avatar.png"} alt="User Avatar" width={120} height={120} className={css.avatar} />
//         </div>
//         <div className={css.profileInfo}>
//           <p>Username: {user?.username}</p>
//           <p>Email: {user?.email}</p>
//         </div>
//       </div>
//     </main>
//   );
// }