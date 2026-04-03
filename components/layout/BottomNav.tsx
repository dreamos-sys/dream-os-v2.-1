'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'user', label: 'Profile', href: '/profile' },
    { icon: 'qrcode', label: 'QR', href: '/qr' },
    { icon: 'info-circle', label: 'About', href: '/about' },
    { icon: 'cog', label: 'Settings', href: '/settings' },
    { icon: 'sign-out-alt', label: 'Exit', href: '#' },
  ];

  const handleExit = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur bg-slate-900/80 border-t border-emerald-500/20">
      <div className="flex justify-around items-center px-4 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href === '#' ? '#' : item.href}
              onClick={item.label === 'Exit' ? handleExit : undefined}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-emerald-400 translate-y-[-4px]'
                  : 'text-slate-400 hover:text-emerald-300 hover:translate-y-[-2px]'
              }`}
            >
              <i className={`fas fa-${item.icon} text-xl`}></i>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
