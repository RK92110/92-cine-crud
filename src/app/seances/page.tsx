import { prisma } from '@/lib/prisma';

export default async function SeancesPage() {
  const sessions = await prisma.session.findMany({
    where: { statut: 'PLANIFIEE' },
    include: {
      film: true,
      salle: true,
    },
    orderBy: { date: 'asc' }
  }).catch((error) => {
    console.error("Erreur Prisma:", error);
    return [];
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-12 border-b border-white/10 pb-4">Toutes les Séances</h1>
        
        {sessions.length === 0 ? (
          <div className="text-white/60 p-8 border border-white/10 bg-[#0f0f13] rounded-xl text-center">
             Aucune séance planifiée pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {sessions.map((session) => (
                <div key={session.id} className="bg-[#0f0f13] border border-white/10 rounded-xl overflow-hidden group hover:border-[#e8b04b]/50 transition">
                  <div className="h-48 bg-black/50 relative overflow-hidden flex items-center justify-center">
                    {/* Placeholder d'image si pas d'affiche */}
                    <span className="text-white/20 font-bebas text-4xl">92CINÉ</span>
                    <div className="absolute top-4 right-4 bg-[#e8b04b] text-black text-xs font-bold px-3 py-1 rounded">
                       {session.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{session.film?.titre || session.titre || 'Séance'}</h3>
                    <p className="text-sm text-white/50 mb-4">{new Date(session.date).toLocaleString('fr-FR')} • {session.salle?.cinema || 'Salle non assignée'}</p>
                    <a href={`/seances/${session.id}`} className="block text-center w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded transition">
                      Détails de la séance
                    </a>
                  </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
