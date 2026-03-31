'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    throw new Error('Email et mot de passe requis');
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Identifiants invalides');
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return redirect('/auth/login?error=Identifiants+invalides');
    }

    const cookieStore = await cookies();
    cookieStore.set('userRole', user.role, { path: '/' });
    cookieStore.set('userId', user.id.toString(), { path: '/' });
    cookieStore.set('userName', user.name, { path: '/' });

    // Redirection selon le rôle
    if (user.role === 'ADMIN') return redirect('/admin/dashboard');
    if (user.role === 'INSTRUCTEUR_FILM') return redirect('/instructeur/mes-seances');
    if (user.role === 'ANIMATEUR_CINE') return redirect('/animateur/mes-activites');
    return redirect('/');
  } catch (error) {
    if (error instanceof Error && (error as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) throw error;
    return redirect('/auth/login?error=Erreur+de+connexion');
  }
}
