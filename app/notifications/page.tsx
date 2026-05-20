'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    const fetchAndMark = async () => {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data);
      // Marquer toutes comme lues
      const unreadIds = data.filter((n: any) => !n.isRead).map((n: any) => n.id);
      if (unreadIds.length) {
        await fetch('/api/notifications', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: unreadIds })
        });
        // Mettre à jour le badge (optionnel, le header se rafraîchira au prochain useEffect)
      }
    };
    fetchAndMark();
  }, [session, router]);

  if (!session) return null;

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif: any) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg border ${!notif.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
            >
              <h3 className="font-semibold">{notif.title}</h3>
              <p className="text-gray-600">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(notif.createdAt).toLocaleString('fr-FR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}