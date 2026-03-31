import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { createSeance } from './actions';

export default async function CreerSeancePage() {
  const films = await prisma.film.findMany({ where: { disponible: true }, orderBy: { titre: 'asc' } });
  const salles = await prisma.salle.findMany({ where: { disponible: true }, orderBy: { name: 'asc' } });
  const cookieStore = await cookies();
  const userId = parseInt(cookieStore.get('userId')?.value || '0');

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bebas text-[#e8b04b] mb-8 border-b border-white/10 pb-4 text-center">Créer une Séance</h1>
        <form action={createSeance} className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl shadow-2xl flex flex-col gap-6">
          <input type="hidden" name="instructeurId" value={userId} />
          <div>
            <label className="block text-white/60 mb-2 font-bold">Film</label>
            <select name="filmId" required className="w-full p-3 rounded bg-black/50 border border-white/10 text-white">
              <option value="">Sélectionner un film</option>
              {films.map(film => (
                <option key={film.id} value={film.id}>{film.titre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white/60 mb-2 font-bold">Salle</label>
            <select name="salleId" required className="w-full p-3 rounded bg-black/50 border border-white/10 text-white">
              <option value="">Sélectionner une salle</option>
              {salles.map(salle => (
                <option key={salle.id} value={salle.id}>{salle.name} ({salle.cinema})</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white/60 mb-2 font-bold">Date</label>
              <input type="date" name="date" required className="w-full p-3 rounded bg-black/50 border border-white/10 text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-white/60 mb-2 font-bold">Heure</label>
              <input type="time" name="heure" required className="w-full p-3 rounded bg-black/50 border border-white/10 text-white" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white/60 mb-2 font-bold">Durée (min)</label>
              <input type="number" name="duree" min="1" required className="w-full p-3 rounded bg-black/50 border border-white/10 text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-white/60 mb-2 font-bold">Capacité max</label>
              <input type="number" name="capaciteMax" min="1" required className="w-full p-3 rounded bg-black/50 border border-white/10 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-white/60 mb-2 font-bold">Type de séance</label>
            <select name="type" required className="w-full p-3 rounded bg-black/50 border border-white/10 text-white">
              <option value="PROJECTION">Projection</option>
              <option value="AVANT_PREMIERE">Avant-première</option>
              <option value="REPRISE">Reprise</option>
              <option value="ATELIER_CINEMA">Atelier cinéma</option>
              <option value="CINE_DEBAT">Ciné-débat</option>
            </select>
          </div>
          <div>
            <label className="block text-white/60 mb-2 font-bold">Description (optionnel)</label>
            <textarea name="description" rows={3} className="w-full p-3 rounded bg-black/50 border border-white/10 text-white" placeholder="Description, intervenants, etc." />
          </div>
          <button type="submit" className="w-full py-4 bg-[#e8b04b] text-black font-extrabold uppercase tracking-widest rounded hover:bg-white transition shadow-xl transform active:scale-[0.98]">
            Créer la séance
          </button>
        </form>
      </div>
    </div>
  );
}
