"use client"
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';
import Footer from './footer';
import NavBar from './navbar';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  
  // Add error handling with try/catch for Convex queries
  const user = useQuery(api.users.getUser, {});
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // Only attempt to store user if both user and auth state are available
    if (user !== undefined && isSignedIn) {
      try {
        storeUser();
      } catch (error) {
        console.error("Error storing user data:", error);
      }
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