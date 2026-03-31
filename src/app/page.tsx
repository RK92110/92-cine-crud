import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Overlay (Remplace l'image réelle par un gradient sombre/or pour l'instant) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 via-[#0a0a0f]/80 to-[#0a0a0f] z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 z-[-1]" />
        
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-7xl md:text-9xl font-bebas text-[#e8b04b] mb-4 tracking-wider drop-shadow-2xl">
            92CINÉ
          </h1>
          <p className="text-xl md:text-3xl font-light text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Le réseau cinéma des Hauts-de-Seine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/seances" 
              className="px-8 py-4 bg-[#e8b04b] text-black font-bold uppercase tracking-wide rounded hover:bg-[#c99538] transition transform hover:scale-105"
            >
              Voir les séances
            </Link>
            <Link 
              href="/auth/signup" 
              className="px-8 py-4 bg-transparent border-2 border-[#e8b04b] text-[#e8b04b] font-bold uppercase tracking-wide rounded hover:bg-[#e8b04b]/10 transition transform hover:scale-105"
            >
              Devenir adhérent
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CHIFFRES CLÉS */}
      <section className="py-16 bg-[#0f0f13] border-y border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col">
              <span className="text-5xl font-bebas text-[#e8b04b]">8</span>
              <span className="text-sm text-white/60 uppercase tracking-widest mt-2">Cinémas Partenaires</span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl font-bebas text-[#e8b04b]">250+</span>
              <span className="text-sm text-white/60 uppercase tracking-widest mt-2">Séances / Mois</span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl font-bebas text-[#e8b04b]">12K</span>
              <span className="text-sm text-white/60 uppercase tracking-widest mt-2">Adhérents Actifs</span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl font-bebas text-[#e8b04b]">50+</span>
              <span className="text-sm text-white/60 uppercase tracking-widest mt-2">Films au Catalogue</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TYPES DE SÉANCES */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bebas text-center mb-16 tracking-widest text-white">
            NOTRE <span className="text-[#e8b04b]">PROGRAMMATION</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 rounded-xl bg-[#0f0f13] hover:border-[#e8b04b]/50 transition group">
              <h3 className="text-2xl font-bebas text-[#e8b04b] mb-4">Projections & Reprises</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Retrouvez les grands classiques du cinéma et les succès récents dans les meilleures conditions de visionnage.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-[#0f0f13] hover:border-[#e8b04b]/50 transition group">
              <h3 className="text-2xl font-bebas text-[#e8b04b] mb-4">Avant-Premières</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Découvrez les films les plus attendus avant tout le monde, souvent en présence des équipes du film.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-[#0f0f13] hover:border-[#e8b04b]/50 transition group">
              <h3 className="text-2xl font-bebas text-[#e8b04b] mb-4">Ateliers & Débats</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Prolongez l&apos;expérience avec nos ciné-débats et nos ateliers d&apos;analyse filmique animés par des passionnés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMMENT ÇA MARCHE */}
      <section className="py-24 bg-[#e8b04b] text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bebas mb-16 tracking-widest">
            COMMENT ÇA MARCHE ?
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
             <div className="max-w-xs">
                <div className="w-16 h-16 bg-black text-[#e8b04b] rounded-full flex items-center justify-center text-3xl font-bebas mx-auto mb-4">1</div>
                <h4 className="font-bold text-lg mb-2">Créer un compte</h4>
                <p className="text-black/80 text-sm">Inscrivez-vous gratuitement et déclarez votre quotient familial pour des tarifs adaptés.</p>
             </div>
             <div className="hidden md:block w-16 h-1 bg-black/20"></div>
             <div className="max-w-xs">
                <div className="w-16 h-16 bg-black text-[#e8b04b] rounded-full flex items-center justify-center text-3xl font-bebas mx-auto mb-4">2</div>
                <h4 className="font-bold text-lg mb-2">Choisir une séance</h4>
                <p className="text-black/80 text-sm">Parcourez notre catalogue et le planning de nos salles équipées.</p>
             </div>
             <div className="hidden md:block w-16 h-1 bg-black/20"></div>
             <div className="max-w-xs">
                <div className="w-16 h-16 bg-black text-[#e8b04b] rounded-full flex items-center justify-center text-3xl font-bebas mx-auto mb-4">3</div>
                <h4 className="font-bold text-lg mb-2">S&apos;inscrire &amp; Profiter</h4>
                <p className="text-black/80 text-sm">Réservez votre place et venez vivre l&apos;expérience 92Ciné.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <div className="font-bebas text-3xl text-[#e8b04b] mb-4 md:mb-0">92CINÉ</div>
          <div className="flex gap-6 mb-4 md:mb-0">
             <Link href="/seances" className="hover:text-white">Séances</Link>
             <Link href="/films" className="hover:text-white">Films</Link>
             <Link href="/salles" className="hover:text-white">Salles</Link>
             <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
          <div>© {new Date().getFullYear()} Département 92 — Hauts-de-Seine</div>
        </div>
      </footer>
    </div>
  );
}