'use server';

import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateUserRole(userId: number, newRole: Role) {
  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });
  revalidatePath('/admin/utilisateurs');
}

export async function deleteUser(userId: number) {
  // On ne peut pas supprimer l'admin principal ou soi-même facilement sans auth session
  // Mais ici on implémente la logique de base
  await prisma.user.delete({
    where: { id: userId },
  });
  revalidatePath('/admin/utilisateurs');
}
