import { useEffect } from 'react';
import { Slot, router, usePathname } from 'expo-router';
import { getSession } from '../utils/storage';

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const user = await getSession();

      if (user && pathname.startsWith('/(auth)')) {
        router.replace(
          user.role === 'patient' ? '/patient' : '/doctor'
        );
      }
    };

    checkSession();
  }, [pathname]);

  return <Slot />;
}
