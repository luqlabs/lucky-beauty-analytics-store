"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Product } from '@/lib/mockData';

export const ProductCarousel = ({ products }: { products: Product[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const formatIdr = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="relative group">
      {products.length > 3 && (
        <>
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 shadow-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 shadow-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
      >
        {products.map((product) => (
          <Link 
            href={`/product/${product.id}`} 
            key={product.id}
            className="min-w-[280px] md:min-w-[320px] lg:min-w-[380px] shrink-0 snap-start group cursor-pointer"
          >
            <div className="relative bg-gray-100 aspect-4/5 mb-4 overflow-hidden">
              <Image 
                src={product.image_url} 
                alt={product.product_name} 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {product.category}
              </div>
            </div>
            
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">{product.brand}</span>
              <h3 className="text-lg font-medium text-gray-900 group-hover:underline underline-offset-4 decoration-1">{product.product_name}</h3>
              <p className="text-sm font-semibold mt-1">{formatIdr(product.our_price_idr)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
