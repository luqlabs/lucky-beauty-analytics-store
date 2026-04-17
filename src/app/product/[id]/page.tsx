"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/mockData';
import { notFound } from 'next/navigation';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const resolvedParams = React.use(params);
  const product = products.find((p) => p.id === resolvedParams.id);

  const [margin, setMargin] = useState(25); // Default 25% margin
  const EXCHANGE_RATE = 15394; // Derived to roughly match their 'our_price_idr' defaults

  if (!product) {
    return notFound();
  }

  const baseCostIdr = product.price_usd * EXCHANGE_RATE;
  const calculatedPriceIdr = baseCostIdr + (baseCostIdr * (margin / 100));

  const jktMarketPrice = product.jkt_market_price_idr;
  const priceDifference = calculatedPriceIdr - jktMarketPrice;
  const isCheaper = priceDifference <= 0;

  const formatIdr = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-4/5 bg-gray-100 w-full overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.product_name}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Right: Product Info & Calculator */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">{product.brand}</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-semibold mb-6">{product.product_name}</h1>
          <p className="text-2xl font-medium mb-6">{formatIdr(calculatedPriceIdr)}</p>

          <div className="prose text-gray-600 mb-8 text-sm leading-relaxed">
            <p>Our products are sourced from the best laboratories in the world. By calculating our margins transparently, we offer premium quality without the premium markup.</p>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors mb-12"
          >
            Add to Cart
          </button>

          {/* Interactive Margin Calculator */}
          <div className="bg-gray-50 border border-gray-200 p-4 md:p-8 rounded-sm">
            <h3 className="font-playfair text-xl font-semibold mb-2">Interactive Margin Calculator</h3>
            <p className="text-xs text-gray-500 mb-6">See exactly how our transparent pricing works against the average Jakarta market price.</p>

            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span>Profit Margin: {margin}%</span>
                <span className="text-gray-500">Base Cost: {formatIdr(baseCostIdr)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Jakarta Market Average:</span>
                <span className="font-semibold line-through text-gray-400">{formatIdr(jktMarketPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium text-gray-900">Your Calculated Price:</span>
                <span className="font-semibold text-black">{formatIdr(calculatedPriceIdr)}</span>
              </div>

              <div className={`mt-4 p-4 text-sm font-medium ${isCheaper ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {isCheaper
                  ? `Our price is ${formatIdr(Math.abs(priceDifference))} cheaper than the market average.`
                  : `Even at ${margin}% margin, our price is ${formatIdr(priceDifference)} higher than the market average.`
                }
              </div>
            </div>
          </div>

          {/* Accordion Info Placeholder */}
          <div className="mt-12 space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Ingredients</h4>
              <p className="text-sm text-gray-600">Formulated with clinically proven actives. Free from parabens, sulfates, and artificial fragrances.</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2">How to Use</h4>
              <p className="text-sm text-gray-600">Apply a small amount to cleansed skin morning and night. Gently pat until fully absorbed.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
