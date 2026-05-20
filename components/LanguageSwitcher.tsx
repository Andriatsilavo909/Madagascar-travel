'use client';

import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    router.refresh();
  };

  return (
    <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
      <Globe className="h-3.5 w-3.5 text-gray-600" />
      <button onClick={() => changeLanguage('fr')} className="text-sm font-medium text-gray-600 hover:text-red-600">FR</button>
      <span className="text-gray-400">|</span>
      <button onClick={() => changeLanguage('en')} className="text-sm font-medium text-gray-600 hover:text-red-600">EN</button>
    </div>
  );
}