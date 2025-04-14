"use client"
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';
import Footer from './footer';
import NavBar from './navbar';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const user = useQuery(api.users.getUser);
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (user && isSignedIn) {
      storeUser();
    }
  }, [user, isSignedIn, storeUser]);


  return (
    <>
      <NavBar />
      <main className="bg-[#0a0a0f] min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}