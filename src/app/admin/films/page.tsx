import { prisma } from '@/lib/prisma';
import { deleteFilm, addFilm } from './actions';

export default async function AdminFilmsPage() {
  const films = await prisma.film.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-4xl font-bebas text-[#e8b04b] tracking-widest uppercase">Gestion du Catalogue Films</h1>
          <span className="text-white/40 text-sm font-sans uppercase tracking-widest">{films.length} Films</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film) => (
            <div key={film.id} className="bg-[#0f0f13] border border-white/10 rounded-xl overflow-hidden group hover:border-[#e8b04b]/50 transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#e8b04b] transition">{film.titre}</h3>
                    <p className="text-white/40 text-xs uppercase tracking-widest">{film.genre} — {film.annee}</p>
                  </div>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-white/60">
                    {film.classification}
                  </span>
                </div>
                
                <p className="text-white/60 text-sm line-clamp-3 mb-6 font-light">
                  {film.synopsis || "Aucun synopsis disponible."}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div className="text-xs text-white/30">
                    Réalisé par <span className="text-white/60 font-medium">{film.realisateur}</span>
                  </div>
                  <form action={async () => {
                    'use server';
                    await deleteFilm(film.id);
                  }}>
                    <button type="submit" className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500/30 px-3 py-1 rounded text-[10px] font-bold uppercase transition shadow-sm">
                      Supprimer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Ajouter un film */}
        <div className="mt-16 bg-[#0f0f13] border border-white/10 rounded-xl p-8 max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-3xl font-bebas text-[#e8b04b] mb-8 tracking-widest uppercase text-center">Ajouter un nouveau film</h2>
          <form action={addFilm} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Titre du film</label>
              <input name="titre" required className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition placeholder:text-white/20" placeholder="Ex: Inception" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Réalisateur</label>
              <input name="realisateur" required className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition placeholder:text-white/20" placeholder="Ex: Christopher Nolan" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Année de sortie</label>
              <input name="annee" type="number" defaultValue={new Date().getFullYear()} className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Durée (minutes)</label>
              <input name="duree" type="number" defaultValue={120} className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition" />
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Genre</label>
              <input name="genre" required className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition placeholder:text-white/20" placeholder="Ex: Science-fiction" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Classification</label>
              <select name="classification" className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition cursor-pointer">
                <option value="TOUS_PUBLICS">Tous Publics</option>
                <option value="MOINS_10">-10 ans</option>
                <option value="MOINS_12">-12 ans</option>
                <option value="MOINS_16">-16 ans</option>
                <option value="MOINS_18">-18 ans</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Version</label>
              <select name="version" className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition cursor-pointer">
                <option value="VF">VF</option>
                <option value="VO">VO</option>
                <option value="VOST">VOST</option>
                <option value="VFST">VFST</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-white/60 uppercase text-[10px] tracking-widest">Synopsis</label>
              <textarea name="synopsis" rows={3} className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-[#e8b04b] outline-none transition placeholder:text-white/20" placeholder="Brève description de l'intrigue..." />
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full py-4 bg-[#e8b04b] text-black font-extrabold uppercase tracking-widest rounded hover:bg-white transition shadow-xl transform active:scale-[0.98]">
                Enregistrer le film dans le catalogue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
