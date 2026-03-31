import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-[#0a0a0f] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl font-bebas text-[#e8b04b] mb-4">404</h1>
      <h2 className="text-4xl font-bebas text-white mb-6 tracking-widest uppercase">Page introuvable</h2>
      <p className="text-white/60 mb-8 max-w-md">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link 
        href="/" 
        className="px-8 py-3 bg-[#e8b04b] text-black font-bold uppercase rounded hover:bg-[#c99538] transition"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
