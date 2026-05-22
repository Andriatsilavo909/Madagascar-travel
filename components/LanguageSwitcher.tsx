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
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <button onClick={() => changeLanguage('fr')} className="text-sm text-gray-600 hover:text-red-600">FR</button>
      <span className="text-gray-400">|</span>
      <button onClick={() => changeLanguage('en')} className="text-sm text-gray-600 hover:text-red-600">EN</button>
    </div>
  );
}