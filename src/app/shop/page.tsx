"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/mockData';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const formatIdr = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="font-playfair text-5xl font-semibold mb-4">All Products</h1>
        <p className="text-gray-600">Discover our complete collection of scientifically proven skincare.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Filters sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Category</h3>
            <ul className="space-y-3">
              {['All', 'Best Selling', 'Trending', 'New'].map(cat => (
                <li key={cat}>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="accent-black" 
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    /> 
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id}
              className="group cursor-pointer block"
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
              
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">{product.brand}</span>
                <h3 className="text-lg font-medium text-gray-900 group-hover:underline underline-offset-4 decoration-1">{product.product_name}</h3>
                <p className="text-sm font-semibold mt-1">{formatIdr(product.our_price_idr)}</p>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
