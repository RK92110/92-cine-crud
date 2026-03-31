export default function PlaceholderPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-6 tracking-widest uppercase">Mes Enfants</h1>
        <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl shadow-2xl inline-block mt-8">
           <svg className="w-16 h-16 text-[#e8b04b] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
           </svg>
           <h2 className="text-2xl font-bold text-white mb-2 uppercase">Page en construction</h2>
           <p className="text-white/60 text-sm max-w-md mx-auto">
             Gérez ici les profils enfants rattachés à votre compte pour les inscriptions groupées.
           </p>
           <a href="javascript:history.back()" className="mt-8 inline-block px-6 py-3 bg-[#e8b04b] text-black font-bold uppercase rounded hover:bg-[#c99538] transition">
             Retour
           </a>
        </div>
      </div>
    </div>
  );
}
