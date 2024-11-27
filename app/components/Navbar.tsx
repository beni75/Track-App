'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className="bg-base-200/30 p-4">
      <div className="flex flex-col items-center md:justify-between md:flex-row ">
        <div className="text-2xl font-bold">
          Track<span className="text-accent">Money</span>
        </div>
        {isLoaded &&
          (isSignedIn ? (
            <>
              <div className="md:flex md:gap-4 hidden">
                <Link href={''} className="btn">
                  Mes Budgets
                </Link>
                <Link href={''} className="btn">
                  Dashboard
                </Link>
                <Link href={''} className="btn">
                  Mes Transactions
                </Link>
                <UserButton />
              </div>
              <div className="md:hidden flex justify-center items-center flex-col mt-4 gap-2">
                <Link href={''} className="btn-sm">
                  Mes Budgets
                </Link>
                <Link href={''} className="btn-sm">
                  Dashboard
                </Link>
                <Link href={''} className="btn-sm">
                  Mes Transactions
                </Link>
                <div className="mt-2">
                  <UserButton />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="md:flex md:gap-4 hidden">
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
              <div className="md:hidden flex justify-center items-center flex-col mt-4 gap-2">
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
            </>
          ))}
      </div>
    </div>
  );
}
