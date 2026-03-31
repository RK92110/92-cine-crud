'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function cancelInscription(inscriptionId: number) {
  if (!inscriptionId) {
    throw new Error('ID d&apos;inscription manquant');
  }

  await prisma.inscription.delete({
    where: { id: inscriptionId },
  });

  revalidatePath('/mon-espace/mes-inscriptions');
}