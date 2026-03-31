import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simulate token/role retrieval (In real app, we check cookies/JWT)
  const roleType = request.cookies.get('userRole')?.value || null;

  const url = request.nextUrl.clone();
  
  // Routes protégées
  const ROLE_ROUTES: Record<string, string[]> = {
    '/instructeur': ['INSTRUCTEUR_FILM', 'ADMIN'],
    '/animateur': ['ANIMATEUR_CINE', 'ADMIN'],
    '/admin': ['ADMIN'],
    '/mon-espace': ['ADHERENT_ADULTE', 'ADHERENT_MINEUR', 'INSTRUCTEUR_FILM', 'ANIMATEUR_CINE', 'ADMIN'],
  };

  const path = request.nextUrl.pathname;

  for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTES)) {
    if (path.startsWith(routePrefix)) {
      if (!roleType) {
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
      }
      
      if (!allowedRoles.includes(roleType)) {
        url.pathname = '/'; // Redirection vers accueil si rôle non autorisé
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
