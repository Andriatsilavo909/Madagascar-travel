import { prisma } from "@/lib/db/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import DeleteUserButton from "@/components/admin/DeleteUserButton"

async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  })
}

export default async function AdminUtilisateursPage() {
  const users = await getUsers()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des utilisateurs</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'inscription</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                    user.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link href={`/admin/utilisateurs/${user.id}/edit`}>
                    <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                  </Link>
                  <DeleteUserButton userId={user.id} userEmail={user.email} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}