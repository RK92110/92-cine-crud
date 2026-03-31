'use server';

import { prisma } from '@/lib/prisma';
import { ClassificationFilm, VersionFilm } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function addFilm(formData: FormData) {
  const titre = formData.get('titre') as string;
  const realisateur = formData.get('realisateur') as string;
  const annee = parseInt(formData.get('annee') as string) || new Date().getFullYear();
  const duree = parseInt(formData.get('duree') as string) || 120;
  const genre = formData.get('genre') as string;
  const classification = (formData.get('classification') as ClassificationFilm) || ClassificationFilm.TOUS_PUBLICS;
  const version = (formData.get('version') as VersionFilm) || VersionFilm.VF;
  const synopsis = formData.get('synopsis') as string;

  if (!titre || !realisateur || !genre) {
    throw new Error('Les champs Titre, Réalisateur et Genre sont obligatoires.');
  }

  await prisma.film.create({
    data: {
      titre,
      realisateur,
      annee,
      duree,
      genre,
      classification,
      version,
      synopsis,
    },
  });

  revalidatePath('/admin/films');
  revalidatePath('/films');
}

export async function deleteFilm(filmId: number) {
  // Supprimer d'abord les séances liées pour éviter les erreurs de foreign key
  await prisma.session.deleteMany({
    where: { filmId },
  });

  await prisma.film.delete({
    where: { id: filmId },
  });
  revalidatePath('/admin/films');
  revalidatePath('/films');
}
