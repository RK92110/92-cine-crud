'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createSeance(formData: FormData) {
  const filmId = parseInt(formData.get('filmId') as string);
  const salleId = parseInt(formData.get('salleId') as string);
  const date = formData.get('date') as string;
  const heure = formData.get('heure') as string;
  const duree = parseInt(formData.get('duree') as string);
  const type = formData.get('type') as any;
  const capaciteMax = parseInt(formData.get('capaciteMax') as string);
  const instructeurId = parseInt(formData.get('instructeurId') as string);

  if (!filmId || !salleId || !date || !heure || !duree || !type || !instructeurId) {
    throw new Error('Tous les champs sont obligatoires');
  }

  const dateTime = new Date(`${date}T${heure}`);

  await prisma.session.create({
    data: {
      filmId,
      salleId,
      date: dateTime,
      duree,
      type,
      capaciteMax,
      instructeurId,
      statut: 'PLANIFIEE',
    },
  });

  revalidatePath('/seances');
  revalidatePath('/instructeur/mes-seances');
}
