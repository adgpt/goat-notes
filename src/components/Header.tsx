import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { shadow } from '@/styles/utils';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/DarkModeToggle';
import LogOutButton from '@/components/LogOutButton';
import { getUser } from '@/auth/server';
import { SidebarTrigger } from './ui/sidebar';

async function Header() {
  const user = await getUser() // Simulate a logged-in user for testing

  return (
    <header
      className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >

      <SidebarTrigger className='absolute left-1 top-1'/>


      <Link href="/" className="flex items-end gap-2">
        <Image src="/goatNotesLogo.png" alt="Logo" width={50} height={50} />
        <h1 className="flex flex-col pb-1 text-xl font-semibold leading-6">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;