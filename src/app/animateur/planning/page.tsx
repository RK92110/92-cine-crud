export default function PlaceholderPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-6 tracking-widest uppercase">Mon Planning (Animateur)</h1>
        <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl shadow-2xl inline-block mt-8">
           <svg className="w-16 h-16 text-[#e8b04b] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
           </svg>
           <h2 className="text-2xl font-bold text-white mb-2 uppercase">Page en construction</h2>
           <p className="text-white/60 text-sm max-w-md mx-auto">
             Votre agenda d&apos;animateur 92Ciné s&apos;affichera ici.
           </p>
           <a href="javascript:history.back()" className="mt-8 inline-block px-6 py-3 bg-[#e8b04b] text-black font-bold uppercase rounded hover:bg-[#c99538] transition">
             Retour
           </a>
        </div>
      </div>
    </div>
  );
}
