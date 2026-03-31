import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 12;

  // Salles
  const salle1 = await prisma.salle.upsert({
    where: { id: 1 },
    update: {},
    create: { 
      id: 1,
      name: 'Salle Lumière', 
      cinema: 'Ciné 92 Nanterre', 
      capacity: 200, 
      type: 'Standard', 
      disponible: true 
    }
  });

  // Films
  const film1 = await prisma.film.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titre: 'Dune: Deuxième Partie', 
      realisateur: 'Denis Villeneuve', 
      annee: 2024,
      duree: 166, 
      genre: 'Science-fiction', 
      classification: 'TOUS_PUBLICS',
      version: 'VF', 
      synopsis: "Paul Atreides s'unit aux Fremen.", 
      disponible: true
    }
  });

  const film2 = await prisma.film.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      titre: 'Iron Man 3',
      realisateur: 'Shane Black',
      annee: 2013,
      duree: 130,
      genre: 'Action',
      classification: 'TOUS_PUBLICS',
      version: 'VF',
      synopsis: "Tony Stark doit faire face aux conséquences de ses actions.",
      disponible: true
    }
  });

  // Test Users
  const users = [
    { email: 'admin@92cine.fr', name: 'Administrateur 92Ciné', role: 'ADMIN', password: 'admin123' },
    { email: 'instructeur@92cine.fr', name: 'Instructeur 92Ciné', role: 'INSTRUCTEUR_FILM', password: 'instru123' },
    { email: 'animateur@92cine.fr', name: 'Animateur 92Ciné', role: 'ANIMATEUR_CINE', password: 'anim123' },
    { email: 'adherent@mail.com', name: 'Adhérent Adulte', role: 'ADHERENT_ADULTE', password: 'user123' },
    { email: 'mineur@mail.com', name: 'Adhérent Mineur', role: 'ADHERENT_MINEUR', password: 'user123' },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, saltRounds);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { passwordHash: hashedPassword },
      create: {
        email: u.email,
        name: u.name,
        role: u.role as any,
        passwordHash: hashedPassword,
        quotientStatut: 'VALIDATED'
      }
    });
  }

  // Session
  await prisma.session.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      type: 'PROJECTION',
      filmId: film1.id,
      salleId: salle1.id,
      date: new Date('2025-04-15T20:00:00'),
      duree: 166,
      capaciteMax: 180,
      statut: 'PLANIFIEE'
    }
  });

  await prisma.session.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      type: 'PROJECTION',
      filmId: film2.id,
      salleId: salle1.id,
      date: new Date('2025-04-16T18:00:00'),
      duree: 130,
      capaciteMax: 180,
      statut: 'PLANIFIEE'
    }
  });

  console.log('✅ Seed terminé avec succès (mots de passe hachés)');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
