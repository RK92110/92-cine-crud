export default function InstructeurSeancesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bebas text-[#e8b04b] mb-8 border-b border-white/10 pb-4">Espace Instructeur Film</h1>
        <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl mb-8">
          <p className="text-white/70">Ceci est votre espace pour gérer les ateliers cinéma et les cours d&apos;analyse filmique que vous animez.</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mes Séances Assignées</h2>
          <a href="/instructeur/creer-seance" className="px-4 py-2 bg-[#e8b04b] text-black font-bold uppercase rounded hover:bg-[#c99538] transition text-sm">
            + Créer
          </a>
        </div>
        <div className="text-white/60 p-8 border border-white/10 bg-[#0f0f13] rounded-xl text-center">
            Aucune séance assignée pour le moment.
        </div>
      </div>
    </div>
  );
}
