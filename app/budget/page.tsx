'use client';

import { startTransition, useEffect, useState, useTransition } from 'react';
import { useUser } from '@clerk/nextjs';
import EmojiPicker from 'emoji-picker-react';
import {
  addBudget,
  checkAndAddUser,
  getBudgetByUser,
} from '../actions/budget/action';
import Notification from '../components/Notification';
import { Budget } from '@/types';
import Link from 'next/link';
import BudgetItem from '../components/BudgetItem';
import { Landmark } from 'lucide-react';

export default function PageTest() {
  const { user } = useUser();
  const [budgetName, setBudgetName] = useState<string>('');
  const [budgetAmount, setBudgetAmount] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [messageNotification, setMessageNotification] = useState<string>('');
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [error, setError] = useState<string | null>('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const emailUser = user?.primaryEmailAddress?.emailAddress;
    if (emailUser) {
      checkAndAddUser(emailUser);
    }
  }, []);

  useEffect(() => {
    const fetchBudgets = async () => {
      startTransition(async () => {
        try {
          const data = await getBudgetByUser(
            'coonetbenjamin@gmail.com' as string
          );

          setBudgets(data);
        } catch (error: any) {
          console.log("Je suis dans l'erreur");
          setError(error.message);
        }
      });
    };

    fetchBudgets();
  }, []);

  const closeNotification = () => {
    setMessageNotification('');
  };

  const fetchBudgets = async () => {
    try {
      const data = await getBudgetByUser('coonetbenjamin@gmail.com' as string);
      setBudgets(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEmojiSelect = (emojiObject: { emoji: string }) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleAddBudget = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const amount = parseFloat(budgetAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Le montant ne peut pas être négatif où égal à zéro');
      }

      await addBudget(
        'coonetbenjamin@gmail.com' as string,
        budgetName,
        amount,
        selectedEmoji
      );

      const modal = document.getElementById('my_modal_1') as HTMLDialogElement;

      if (modal) {
        modal.close();
      }
      setMessageNotification('Budget créé avec succès !');
      setBudgetAmount('');
      setBudgetName('');
      setSelectedEmoji('');
      setShowEmojiPicker(false);
      fetchBudgets();
    } catch (error) {
      setMessageNotification('Problème lors de la création du budget');
    }
  };

  return (
    <div className="w-full h-screen">
      {isPending ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        <div>
          {messageNotification && (
            <Notification
              message={messageNotification}
              onclose={closeNotification}
            />
          )}
          <button
            className="btn"
            onClick={() =>
              (
                document.getElementById('my_modal_1') as HTMLDialogElement
              ).showModal()
            }
          >
            Nouveau Budget
            <Landmark className="w-4" />
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl">Création d'un budget !</h3>
              <p className="pt-2 pb-8">
                Permet de controler ces dépenses rapidement
              </p>
              <form className="w-full flex flex-col gap-4">
                <input
                  className="input input-bordered w-full "
                  type="text"
                  value={budgetName}
                  placeholder="Nom du budget"
                  onChange={(e) => setBudgetName(e.target.value)}
                  required
                />
                <input
                  className="input input-bordered w-full "
                  type="number"
                  value={budgetAmount}
                  placeholder="Montant"
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  {selectedEmoji || 'Sélectionnez un emoji 🫵'}
                </button>

                {showEmojiPicker && (
                  <div className="flex justify-center items-center w-full">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}

                <button onClick={handleAddBudget} className="btn btn-accent">
                  Ajouter le budget
                </button>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Fermer</button>
                </form>
              </div>
            </div>
          </dialog>
          <div className="grid md:grid-cols-3 gap-4 max-w-[1240px] mx-auto">
            {budgets.map((budget) => (
              <Link key={budget.id} href={''}>
                <BudgetItem budget={budget} enableHover={1} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
