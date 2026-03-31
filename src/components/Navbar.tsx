'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Role } from '@/types';

// Composant Navbar
export default function Navbar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<Role | string | null>(null);

  useEffect(() => {
    // Lecture du cookie côté client
    const cookies = document.cookie.split(';');
    const roleCookie = cookies.find(c => c.trim().startsWith('userRole='));
    if (roleCookie) {
      setUserRole(roleCookie.split('=')[1]);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUserRole(null);
    window.location.href = '/';
  };

  const isActive = (path: string) => pathname?.startsWith(path) ? 'text-[#e8b04b] border-b-2 border-[#e8b04b]' : 'text-white/70 hover:text-[#e8b04b] transition';

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-bebas text-[#e8b04b] text-3xl tracking-widest hover:text-white transition">
        92CINÉ
      </Link>
      
      <div className="hidden md:flex gap-6 items-center text-sm uppercase font-semibold">
        {/* Liens Visiteur et globaux */}
        <Link href="/seances" className={isActive('/seances')}>Séances</Link>
        <Link href="/films" className={isActive('/films')}>Films</Link>
        <Link href="/salles" className={isActive('/salles')}>Salles</Link>
        
        {/* Adhérent (Adult & Mineur) */}
        {(userRole === 'ADHERENT_ADULTE' || userRole === 'ADHERENT_MINEUR') && (
          <>
            <Link href="/mon-espace/mes-inscriptions" className={isActive('/mon-espace/mes-inscriptions')}>Mes séances</Link>
            <Link href="/mon-espace" className={isActive('/mon-espace')}>Mon espace</Link>
          </>
        )}

        {/* Instructeur Film */}
        {userRole === 'INSTRUCTEUR_FILM' && (
          <>
            <Link href="/instructeur/mes-seances" className={isActive('/instructeur/mes-seances')}>Mes séances</Link>
            <Link href="/instructeur/creer-seance" className={isActive('/instructeur/creer-seance')}>Créer une séance</Link>
            <Link href="/instructeur/planning" className={isActive('/instructeur/planning')}>Planning</Link>
          </>
        )}

        {/* Animateur Ciné */}
        {userRole === 'ANIMATEUR_CINE' && (
          <>
             <Link href="/animateur/mes-activites" className={isActive('/animateur/mes-activites')}>Mes activités</Link>
             <Link href="/animateur/planning" className={isActive('/animateur/planning')}>Mon planning</Link>
          </>
        )}

        {/* Admin */}
        {userRole === 'ADMIN' && (
          <>
            <Link href="/admin/dashboard" className={isActive('/admin/dashboard')}>Dashboard</Link>
            <Link href="/admin/films" className={isActive('/admin/films')}>Films Backoffice</Link>
            <Link href="/admin/utilisateurs" className={isActive('/admin/utilisateurs')}>Utilisateurs</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {userRole ? (
           <div className="flex items-center gap-3">
             <span className="px-3 py-1 bg-white/10 text-[#e8b04b] border border-[#e8b04b]/30 rounded-full text-xs font-bold font-sans">
               {userRole}
             </span>
             <button onClick={handleLogout} className="text-sm text-white/50 hover:text-white">Déconnexion</button>
           </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/auth/login" className="text-white hover:text-[#e8b04b] text-sm font-semibold transition">Connexion</Link>
            <Link href="/auth/signup" className="bg-[#e8b04b] text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-[#c99538] transition">S&apos;inscrire</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
