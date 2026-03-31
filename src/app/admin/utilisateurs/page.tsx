import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { updateUserRole, deleteUser } from './actions';

export default async function UtilisateursPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const roles: Role[] = [
    'ADHERENT_ADULTE',
    'ADHERENT_MINEUR',
    'INSTRUCTEUR_FILM',
    'ANIMATEUR_CINE',
    'ADMIN',
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-4xl font-bebas text-[#e8b04b] tracking-widest uppercase">Gestion des Utilisateurs</h1>
          <span className="text-white/40 text-sm font-sans uppercase tracking-widest">{users.length} Utilisateurs</span>
        </div>

        <div className="overflow-x-auto bg-[#0f0f13] border border-white/10 rounded-xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[#e8b04b] font-bebas tracking-wider text-lg">
                <th className="px-6 py-4">Nom</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition group">
                  <td className="px-6 py-4 font-semibold text-white/90">{user.name}</td>
                  <td className="px-6 py-4 text-white/60 font-mono text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                       {/* Better UI: Client component for the select if we want it instant. 
                           Or just a simple form with a Submit button. */}
                       <form action={async (formData: FormData) => {
                         'use server';
                         const newRole = formData.get('role') as Role;
                         await updateUserRole(user.id, newRole);
                       }} className="flex gap-2">
                         <select 
                           name="role"
                           defaultValue={user.role}
                           className="bg-black border border-white/20 text-white rounded px-2 py-1 text-xs"
                         >
                           {roles.map(r => <option key={r} value={r}>{r}</option>)}
                         </select>
                         <button type="submit" className="text-[10px] uppercase font-bold bg-[#e8b04b] text-black px-2 py-1 rounded hover:bg-white transition">OK</button>
                       </form>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <form action={async () => {
                      'use server';
                      await deleteUser(user.id);
                    }}>
                      <button type="submit" className="text-red-500 hover:text-red-400 text-sm font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition">Supprimer</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
