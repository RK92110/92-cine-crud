import { loginAction } from './actions';
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const error = (await searchParams).error;
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0a0a0f] p-4">
      <div className="w-full max-w-md bg-[#0f0f13] p-8 border border-white/10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bebas text-[#e8b04b] mb-6 text-center tracking-widest">CONNEXION</h1>
        <p className="text-white/60 text-center mb-8 text-sm">Accédez à votre espace 92Ciné pour réserver vos séances.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form action={loginAction} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-white/80">Email</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full p-3 bg-black/50 border border-white/20 rounded-md text-white focus:border-[#e8b04b] focus:outline-none transition" 
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-white/80">Mot de passe</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full p-3 bg-black/50 border border-white/20 rounded-md text-white focus:border-[#e8b04b] focus:outline-none transition" 
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="w-full mt-4 py-3 bg-[#e8b04b] text-black font-bold uppercase rounded hover:bg-[#c99538] transition">
            Se Connecter
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-white/50">
          Pas encore membre ? <a href="/auth/signup" className="text-[#e8b04b] hover:underline">Devenez Adhérent</a>
        </div>
      </div>
    </div>
  );
}
