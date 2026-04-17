"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPriceIdr } = useCart();

  const formatIdr = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-6xl grow">
      <h1 className="font-playfair text-4xl font-semibold mb-10">Your Bag</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 border border-gray-200">
          <p className="text-gray-500 mb-6">Your bag is currently empty.</p>
          <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="hidden md:grid grid-cols-6 gap-4 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-4">
              <div className="col-span-3">Product</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-gray-100 pb-8">
                
                <div className="col-span-3 flex gap-4">
                  <div className="relative w-24 h-32 bg-gray-100 shrink-0">
                    <Image 
                      src={item.product.image_url} 
                      alt={item.product.product_name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-1">{item.product.brand}</span>
                    <Link href={`/product/${item.product.id}`} className="font-playfair text-lg font-medium hover:underline decoration-1 underline-offset-4">
                      {item.product.product_name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">{formatIdr(item.product.our_price_idr)}</p>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs text-gray-400 hover:text-black mt-auto w-fit flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-1 flex md:justify-center">
                  <div className="flex border border-gray-200 w-fit">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-50 transition-colors"
                    >-</button>
                    <span className="px-4 py-1 text-sm border-x border-gray-200">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-50 transition-colors"
                    >+</button>
                  </div>
                </div>

                <div className="col-span-2 md:text-right font-medium">
                  {formatIdr(item.product.our_price_idr * item.quantity)}
                </div>
                
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 md:p-8 space-y-6">
              <h2 className="font-playfair text-2xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatIdr(totalPriceIdr)}</span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatIdr(totalPriceIdr)}</span>
              </div>
              
              <Link href="/checkout" className="w-full mt-6 bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout provided by Stripe.
              </p>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
