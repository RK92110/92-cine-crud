'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function bookSessionAction(sessionId: number, userId: number) {
  if (!sessionId || !userId) {
    throw new Error('ID de séance ou d&apos;utilisateur manquant');
  }

  // Vérifier si la séance existe et a de la place
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { _count: { select: { inscriptions: true } } }
  });

  if (!session) {
    throw new Error('Séance introuvable');
  }

  if (session.capaciteMax && session._count.inscriptions >= session.capaciteMax) {
    throw new Error('Cette séance est complète');
  }

  // Vérifier si l'utilisateur est déjà inscrit
  const existingInscription = await prisma.inscription.findUnique({
    where: {
      userId_sessionId: {
        userId,
        sessionId,
      }
    }
  });

  if (existingInscription) {
    throw new Error('Vous êtes déjà inscrit à cette séance');
  }

  // Créer l'inscription
  await prisma.inscription.create({
    data: {
      userId,
      sessionId,
    }
  });

  revalidatePath(`/seances/${sessionId}`);
}
