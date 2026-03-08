

'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '../../lib/api/clientApi';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();

      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearAuth();
      }
    };

    fetchUser();
  }, [setUser, clearAuth]);

  return children;
};
export default AuthProvider;









// const AuthProvider = ({ children }: Props) => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

//   useEffect(() => {
//     const fetchUser = async () => {
//       // Перевіряємо сесію
//       const isAuthenticated = await checkSession();
//       if (isAuthenticated) {
//         // Якщо сесія валідна — отримуємо користувача
//         const user = await getMe();
//         if (user) setUser(user);
//       } else {
//         // Якщо сесія невалідна — чистимо стан
//         clearIsAuthenticated();
//       }
//     };
//     fetchUser();
//   }, [setUser, clearIsAuthenticated]);

//   return children;
// };

// export default AuthProvider;


