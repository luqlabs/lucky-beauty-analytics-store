'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { formatIdr } from '../../lib/utils';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPriceIdr } = useCart();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        // Redir to login if attempting checkout anonymously
        router.push('/login?error=Please login before checking out.');
      }
    });
  }, [router]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOrdered(true);
    } catch (err: any) {
      console.error(err);
      alert('Failed to place order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center grow">
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h1 className="font-playfair text-4xl font-semibold mb-2">Order Confirmed</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">✨ Order Simulation Complete. Ready for Shopify Gateway Integration.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-4xl grow">
      <h1 className="font-playfair text-4xl font-semibold mb-10">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">Shipping Details</h2>
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">Full Address</label>
                <textarea 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors min-h-[120px]"
                  placeholder="Enter your complete shipping address..."
                />
              </div>
            </form>
          </div>

          <div className="bg-gray-50 p-6 md:p-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">Order Summary</h2>
            
            <ul className="mb-6 space-y-4">
              {items.map(item => (
                <li key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.product.product_name}</span>
                  <span className="font-medium">{formatIdr(item.product.our_price_idr * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold mb-8">
              <span>Total</span>
              <span>{formatIdr(totalPriceIdr)}</span>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
