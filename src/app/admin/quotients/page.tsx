import { prisma } from '@/lib/prisma';
import { updateQuotientStatus } from './actions';

export default async function AdminQuotientsPage() {
  const pendingUsers = await prisma.user.findMany({
    where: { quotientStatut: 'PENDING' },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-bebas text-[#e8b04b] tracking-wider uppercase">Validation des Quotients</h1>
          <p className="text-white/40 text-sm font-sans mt-2">Vérifiez les justificatifs et validez le statut des adhérents pour appliquer les tarifs réduits.</p>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="bg-[#0f0f13] border border-white/10 p-12 rounded-xl text-center">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Aucune demande en attente</h3>
            <p className="text-white/40 font-light">Tous les quotients ont été traités pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingUsers.map((user) => (
              <div key={user.id} className="bg-[#0f0f13] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-[#e8b04b]/30 transition">
                <div className="flex-1">
                   <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                   <p className="text-white/40 text-sm font-mono">{user.email}</p>
                   {user.quotientFamilial && (
                     <div className="mt-2 inline-block px-3 py-1 bg-[#e8b04b]/10 text-[#e8b04b] border border-[#e8b04b]/20 rounded-full text-xs font-bold">
                       Quotient déclaré : {user.quotientFamilial}€
                     </div>
                   )}
                </div>

                <div className="flex gap-3">
                  <form action={async () => {
                    'use server';
                    await updateQuotientStatus(user.id, 'VALIDATED');
                  }}>
                    <button type="submit" className="px-6 py-2 bg-green-600/20 text-green-500 border border-green-600/30 rounded hover:bg-green-600 hover:text-white transition font-bold uppercase text-xs tracking-widest">
                      Valider
                    </button>
                  </form>
                  <form action={async () => {
                    'use server';
                    await updateQuotientStatus(user.id, 'REFUSED');
                  }}>
                    <button type="submit" className="px-6 py-2 bg-red-600/20 text-red-500 border border-red-600/30 rounded hover:bg-red-600 hover:text-white transition font-bold uppercase text-xs tracking-widest">
                       Refuser
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
