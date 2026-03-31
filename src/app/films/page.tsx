import { prisma } from '@/lib/prisma';

export default async function FilmsCatalogPage() {
  const films = await prisma.film.findMany({
    where: { disponible: true },
    orderBy: { titre: 'asc' }
  }).catch((error) => {
    console.error("Erreur Prisma:", error);
    return [];
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-12 border-b border-white/10 pb-4">À l&apos;Affiche</h1>
        
        {films.length === 0 ? (
          <div className="text-white/60 p-8 border border-white/10 bg-[#0f0f13] rounded-xl text-center">
             Aucun film au catalogue pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
             {films.map((film) => (
                <div key={film.id} className="group cursor-pointer">
                  <div className="aspect-[2/3] bg-[#0f0f13] border border-white/10 rounded-lg overflow-hidden group-hover:border-[#e8b04b]/50 transition relative mb-3">
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-white/20 font-bebas text-xl">92CINÉ</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#e8b04b] transition line-clamp-1">{film.titre}</h3>
                  <div className="flex justify-between items-center mt-1 text-xs text-white/50">
                    <span>{film.annee} • {film.duree} min</span>
                    <span className="bg-white/10 px-1 rounded">{film.version}</span>
                  </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
