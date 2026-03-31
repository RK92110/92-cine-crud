import { notFound } from 'next/navigation';

export const metadata = { title: 'Détails du Film — 92Ciné' };

export default async function FilmDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  // Mock check
  if (parseInt(id) > 1000) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0f] py-12 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-8 tracking-widest uppercase">Fiche Film</h1>
        <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-[2/3] bg-black/50 border border-white/10 rounded-lg flex items-center justify-center">
               <span className="text-white/20 font-bebas text-4xl">92CINÉ</span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-[#e8b04b]">Titre du Film #{id}</h2>
              <div className="space-y-4 text-white/70">
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Réalisateur:</span> Denis Villeneuve</p>
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Année:</span> 2024</p>
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Durée:</span> 166 min</p>
                <p><span className="font-bold text-white uppercase text-xs tracking-widest mr-2">Genre:</span> Science-fiction</p>
                <p className="mt-4 italic">&quot;Synopsis placeholder pour le film.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
