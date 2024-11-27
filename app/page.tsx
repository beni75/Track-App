import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center flex-col py-10 w-full">
        <div>
          <div className="flex flex-col gap-6 p-4 ">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Prenez le contrôle <br /> de vos finances
            </h1>
            <p className="p text-gray-800 text-center ">
              Suivez vos budgets et vos dépenses en toute simplicité avec notre
              application intuitive !
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Link
                href={'/sign-in'}
                className="btn btn-sm md:btn-md btn-outline btn-accent"
              >
                Se connecter
              </Link>
              <Link
                href={'/sign-up'}
                className="btn btn-sm md:btn-md btn-accent"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
