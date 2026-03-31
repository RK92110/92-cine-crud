import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { cancelInscription } from './actions';

export default async function MesInscriptionsPage() {
  const cookieStore = await cookies();
  const userId = parseInt(cookieStore.get('userId')?.value || '0');

  if (!userId) {
    notFound();
  }

  const inscriptions = await prisma.inscription.findMany({
    where: { userId },
    include: {
      session: {
        include: {
          film: true,
          salle: true,
        }
      }
    },
    orderBy: { session: { date: 'asc' } }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-12 border-b border-white/10 pb-4">Mes Inscriptions</h1>

        {inscriptions.length === 0 ? (
          <div className="text-white/60 p-8 border border-white/10 bg-[#0f0f13] rounded-xl text-center">
            Vous n&apos;êtes inscrit à aucune séance pour le moment.
            <br />
            <a href="/seances" className="text-[#e8b04b] hover:underline mt-4 inline-block">Voir les séances disponibles</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inscriptions.map((inscription) => (
              <div key={inscription.id} className="bg-[#0f0f13] border border-white/10 rounded-xl overflow-hidden group hover:border-[#e8b04b]/50 transition">
                <div className="h-32 bg-black/50 relative overflow-hidden flex items-center justify-center">
                  <span className="text-white/20 font-bebas text-2xl">92CINÉ</span>
                  <div className="absolute top-2 right-2 bg-[#e8b04b] text-black text-xs font-bold px-2 py-1 rounded">
                    {inscription.session.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{inscription.session.film?.titre || 'Séance'}</h3>
                  <p className="text-sm text-white/50 mb-2">{new Date(inscription.session.date).toLocaleString('fr-FR')}</p>
                  <p className="text-sm text-white/50 mb-4">{inscription.session.salle?.cinema || 'Salle non assignée'}</p>
                  <form action={async () => {
                    'use server';
                    await cancelInscription(inscription.id);
                  }}>
                    <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm font-bold uppercase">
                      Annuler l&apos;inscription
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
