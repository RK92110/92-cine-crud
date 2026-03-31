import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { bookSessionAction } from './actions';

export const metadata = { title: 'Détails de la séance — 92Ciné' };

export default async function SeanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const idStr = (await params).id;
  const id = parseInt(idStr);

  const cookieStore = await cookies();
  const userId = parseInt(cookieStore.get('userId')?.value || '0');

  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      film: true,
      salle: true,
      inscriptions: {
        where: { userId },
        select: { id: true }
      }
    }
  });

  if (!session) notFound();

  const isInscrit = session.inscriptions.length > 0;

  if (!userId) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] py-12 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bebas text-[#e8b04b] mb-8 tracking-widest uppercase">Détails de la séance</h1>
          <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl shadow-2xl text-center">
            <p className="text-white/60">Vous devez être connecté pour réserver une place.</p>
            <a href="/auth/login" className="mt-4 inline-block px-6 py-2 bg-[#e8b04b] text-black font-bold rounded">Se connecter</a>
          </div>
        </div>
      </main>
    );
  }

  const bookWithIds = bookSessionAction.bind(null, id, userId);

  return (
    <main className="min-h-screen bg-[#0a0a0f] py-12 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-8 tracking-widest uppercase">Détails de la séance</h1>
        <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-[2/3] bg-black/50 border border-white/10 rounded-lg flex items-center justify-center">
               <span className="text-white/20 font-bebas text-4xl">92CINÉ</span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-[#e8b04b]">{session.film.titre}</h2>
              <div className="space-y-4 text-white/70">
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Film:</span> {session.film.titre}</p>
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Cinéma:</span> {session.salle?.cinema || 'N/A'}</p>
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Date:</span> {new Date(session.date).toLocaleString('fr-FR')}</p>
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Type:</span> {session.type}</p>
              </div>
              {isInscrit ? (
                <div className="mt-8 px-10 py-4 bg-green-600 text-white font-bold uppercase rounded w-full md:w-auto text-center">
                  Vous êtes déjà inscrit
                </div>
              ) : (
                <form action={bookWithIds}>
                  <button type="submit" className="mt-8 px-10 py-4 bg-[#e8b04b] text-black font-bold uppercase rounded hover:bg-[#c99538] transition w-full md:w-auto">
                    Réserver ma place
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
