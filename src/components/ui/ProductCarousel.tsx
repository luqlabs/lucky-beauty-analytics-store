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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-8">
      {products.map((product) => (
        <Link 
          href={`/product/${product.id}`} 
          key={product.id}
          className="group cursor-pointer"
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
  );
};
