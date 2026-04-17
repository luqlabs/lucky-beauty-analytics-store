"use client";

import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { signout } from '@/app/login/actions';

export const Navbar = () => {
  const { totalItems } = useCart();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Mobile Menu & Search */}
        <div className="flex items-center gap-4 md:hidden">
          <button aria-label="Menu" className="text-gray-900 hover:text-gray-600 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <button aria-label="Search" className="text-gray-900 hover:text-gray-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Left Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm font-medium uppercase tracking-wider text-gray-900 hover:text-gray-500 transition-colors">
            Shop
          </Link>
          <Link href="/story" className="text-sm font-medium uppercase tracking-wider text-gray-900 hover:text-gray-500 transition-colors">
            Our Story
          </Link>
        </nav>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-gray-900">
            LUCKY
          </Link>
        </div>

        {/* Right Icons (Desktop & Mobile) */}
        <div className="flex items-center gap-4 md:gap-6">
          <button aria-label="Search" className="hidden md:block text-gray-900 hover:text-gray-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href={session ? "/account" : "/login"} aria-label="Account" className="text-gray-900 hover:text-gray-600 transition-colors">
            <User className="w-5 h-5" />
          </Link>
          
          {session && (
            <form action={signout}>
              <button aria-label="Sign Out" type="submit" className="flex items-center justify-center text-gray-900 hover:text-gray-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          )}

          <Link href="/cart" aria-label="Cart" className="relative text-gray-900 hover:text-gray-600 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
        </div>
        
      </div>
    </header>
  );
};
