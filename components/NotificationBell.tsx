'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NotificationBell() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!session) return;
    const fetchNotifications = async () => {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      const unread = data.filter((n: any) => !n.isRead).length;
      setUnreadCount(unread);
    };
    fetchNotifications();
    // Optionnel : rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [session]);

  if (!session) return null;

  return (
    <Link href="/notifications" className="relative">
      <Bell className="h-5 w-5 text-gray-600 hover:text-red-600 transition" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Link>
  );
}