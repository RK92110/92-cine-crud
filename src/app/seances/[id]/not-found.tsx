import Link from 'next/link';

export default function SeanceNotFound() {
  return (
    <main className="min-h-[70vh] bg-[#0a0a0f] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-5xl font-bebas text-[#e8b04b] mb-4 tracking-widest uppercase">Séance introuvable</h2>
      <p className="text-white/60 mb-8 max-w-md">
        Cette séance n&apos;existe pas ou a été annulée.
      </p>
      <Link 
        href="/seances" 
        className="px-8 py-3 bg-transparent border border-[#e8b04b] text-[#e8b04b] font-bold uppercase rounded hover:bg-[#e8b04b] hover:text-black transition"
      >
        Retour aux séances
      </Link>
    </main>
  );
}
