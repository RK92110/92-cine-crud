export default function MonEspacePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bebas text-[#e8b04b] mb-8 border-b border-white/10 pb-4">Mon Espace Adhérent</h1>
        <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl">
          <p className="text-white/70 mb-6">Bienvenue dans votre espace personnel 92Ciné. Ici, vous pouvez gérer vos inscriptions, votre profil et vos enfants.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/mon-espace/mes-inscriptions" className="block p-6 bg-white/5 border border-white/10 rounded-lg hover:border-[#e8b04b]/50 transition">
              <h3 className="text-xl font-bold text-white mb-2">Mes Inscriptions</h3>
              <p className="text-sm text-white/50">Voir et annuler mes séances réservées.</p>
            </a>
            <a href="/mon-espace/mes-enfants" className="block p-6 bg-white/5 border border-white/10 rounded-lg hover:border-[#e8b04b]/50 transition">
              <h3 className="text-xl font-bold text-white mb-2">Profils Enfants</h3>
              <p className="text-sm text-white/50">Gérer les profils de mes enfants.</p>
            </a>
            <a href="/mon-espace/quotient" className="block p-6 bg-white/5 border border-white/10 rounded-lg hover:border-[#e8b04b]/50 transition md:col-span-2">
              <h3 className="text-xl font-bold text-[#e8b04b] mb-2">Quotient Familial</h3>
              <p className="text-sm text-white/50">Soumettre ou mettre à jour mon quotient pour bénéficier de tarifs réduits.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
