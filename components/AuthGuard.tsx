"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const session = sessionStorage.getItem('dream_session');
    if (!session) router.push('/login');
  }, [router]);
  return <>{children}</>;
}
