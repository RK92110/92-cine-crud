'use server';

import { prisma } from '@/lib/prisma';
import { StatutQuotient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateQuotientStatus(userId: number, status: StatutQuotient) {
  await prisma.user.update({
    where: { id: userId },
    data: { quotientStatut: status },
  });
  revalidatePath('/admin/quotients');
  revalidatePath('/admin/dashboard');
}
