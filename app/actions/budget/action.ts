'use server';

import { prisma } from '@/app/lib/prisma';

export async function addBudget(
  email: string | undefined,
  name: string,
  amount: number,
  selectedEmoji: string
) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    await prisma.budget.create({
      data: { name, amount, emoji: selectedEmoji, userId: user.id },
    });
  } catch (error) {
    console.log("Il y a une erreur lors de l'ajout d'un budget", error);
    throw error;
  }
}

export async function checkAndAddUser(email: string | undefined) {
  if (!email) return;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      await prisma.user.create({ data: { email } });
      console.log("L'utilisateur a été ajouté dans la base de donnée");
    } else {
      console.log("L'utilisateur déjà présent dans la base de donnée");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur", error);
  }
}

export async function getBudgetByUser(email: string | undefined) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { budgets: { include: { transactions: true } } },
    });

    if (!user) {
      throw new Error("L'utilisateur n'éxiste pas");
    }

    return user.budgets;
  } catch (error) {
    console.log('Erreur lors de la récupération des budgets');
    throw error;
  }
}
