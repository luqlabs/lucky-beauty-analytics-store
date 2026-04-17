"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products } from '@/lib/mockData';
import { createClient } from '@/lib/supabase/client';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPriceIdr: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  
  const supabase = createClient();

  // Load session and sync cart
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        syncCartWithDb(session.user.id);
      } else {
        // Fallback to local storage potentially (omitted for brevity, assume empty cart for guests)
        setItems([]);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        syncCartWithDb(session.user.id);
      } else {
        setItems([]);
        setCartId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const syncCartWithDb = async (userId: string) => {
    // get user cart
    const { data: cartObj, error } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (cartObj) {
      setCartId(cartObj.id);
      // fetch items
      const { data: cartItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cartObj.id);
        
      if (cartItems) {
        const enrichedItems = cartItems.map((ci: any) => {
          const matchedProduct = products.find(p => p.id === ci.product_id);
          return matchedProduct ? { product: matchedProduct, quantity: ci.quantity } : null;
        }).filter(Boolean) as CartItem[];
        setItems(enrichedItems);
      }
    }
  };

  const addToCart = async (product: Product, quantity = 1) => {
    // Optimistic UI updates
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);

    // Sync with DB
    if (session && cartId) {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        await supabase.from('cart_items').update({ quantity: existingItem.quantity + quantity })
          .eq('cart_id', cartId)
          .eq('product_id', product.id);
      } else {
        await supabase.from('cart_items').insert({
          cart_id: cartId,
          product_id: product.id,
          quantity: quantity
        });
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    
    if (session && cartId) {
      await supabase.from('cart_items').delete()
        .eq('cart_id', cartId)
        .eq('product_id', productId);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    if (session && cartId) {
      await supabase.from('cart_items').update({ quantity })
        .eq('cart_id', cartId)
        .eq('product_id', productId);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceIdr = items.reduce(
    (sum, item) => sum + item.product.our_price_idr * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        isOpen,
        setIsOpen,
        totalItems,
        totalPriceIdr,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
