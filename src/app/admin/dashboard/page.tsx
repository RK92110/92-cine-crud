import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  const [userCount, sessionCount, filmCount, pendingQuotients] = await Promise.all([
    prisma.user.count({ where: { role: 'ADHERENT_ADULTE' } }),
    prisma.session.count({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
    }),
    prisma.film.count(),
    prisma.user.count({ where: { quotientStatut: 'PENDING' } }),
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bebas text-[#e8b04b] mb-8 border-b border-white/10 pb-4">Dashboard Administration</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#0f0f13] border border-white/10 p-6 rounded-xl">
             <div className="text-4xl font-bebas text-white mb-2">{userCount}</div>
             <div className="text-sm text-white/50 uppercase tracking-wider">Adhérents Actifs</div>
          </div>
          <div className="bg-[#0f0f13] border border-white/10 p-6 rounded-xl">
             <div className="text-4xl font-bebas text-white mb-2">{sessionCount}</div>
             <div className="text-sm text-white/50 uppercase tracking-wider">Séances / Mois</div>
          </div>
          <div className="bg-[#0f0f13] border border-white/10 p-6 rounded-xl">
             <div className="text-4xl font-bebas text-white mb-2">{filmCount}</div>
             <div className="text-sm text-white/50 uppercase tracking-wider">Films au Catalogue</div>
          </div>
          <div className="bg-[#0f0f13] border border-white/10 p-6 rounded-xl border-l-4 border-l-[#e8b04b]">
             <div className="text-4xl font-bebas text-[#e8b04b] mb-2">{pendingQuotients}</div>
             <div className="text-sm text-white/50 uppercase tracking-wider">Quotients à Valider</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Accès Rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a href="/admin/films" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition flex items-center justify-between">
            <span>Gestion des Films</span>
            <span>→</span>
          </a>
          <a href="/admin/seances" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition flex items-center justify-between">
            <span>Gestion des Séances</span>
            <span>→</span>
          </a>
          <a href="/admin/salles" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition flex items-center justify-between">
            <span>Gestion des Salles</span>
            <span>→</span>
          </a>
          <a href="/admin/utilisateurs" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition flex items-center justify-between">
            <span>Utilisateurs & Rôles</span>
            <span>→</span>
          </a>
          <a href="/admin/quotients" className="p-4 bg-[#e8b04b]/10 text-[#e8b04b] hover:bg-[#e8b04b]/20 border border-[#e8b04b]/30 rounded transition flex items-center justify-between">
            <span>Validation Quotients</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
