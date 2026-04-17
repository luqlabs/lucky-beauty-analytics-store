import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/mockData';
import { ProductCarousel } from '@/components/ui/ProductCarousel';

export default function Home() {
  const trendingProducts = products.filter(p => p.category === 'Trending');
  const newProducts = products.filter(p => p.category === 'New');
  const bestSellingProducts = products.filter(p => p.category === 'Best Selling');

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=2000&q=80" 
            alt="Premium Skincare" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold tracking-wider mb-6 leading-tight">
            The Science of Pure Skin
          </h1>
          <p className="text-sm md:text-lg text-white/90 font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium formulation meets transparent pricing. Curated exclusively for the Jakarta market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              href="/story" 
              className="px-8 py-4 border border-white text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-6">Minimalist Approach</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We believe in radical transparency. By bypassing traditional retail markups and avoiding expensive marketing campaigns, we bring clinically-proven skincare directly to you at honest prices. 
          </p>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-playfair text-3xl font-semibold">Trending Now</h2>
            <Link href="/shop/trending" className="text-sm uppercase tracking-wider border-b border-black pb-1 hover:text-gray-500 transition-colors">
              View All
            </Link>
          </div>
          <ProductCarousel products={trendingProducts} />
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative w-full h-[60vh] flex items-center justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=2000&q=80" 
            alt="Routine" 
            fill 
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 lg:p-24 bg-white/90 backdrop-blur-sm mr-0 md:mr-10 h-full flex flex-col justify-center">
          <h2 className="font-playfair text-4xl mb-4 font-semibold">The Core Routine</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Everything your skin needs, nothing it doesn&apos;t. Discover our curated 3-step bundle designed to cleanse, treat, and hydrate.
          </p>
          <Link href="/shop/bundles" className="inline-block px-8 py-3 bg-black text-white text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors w-fit">
            Shop The Set
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-semibold mb-4">Best Sellers</h2>
            <p className="text-gray-600 text-sm">Our most loved formulations, backed by science.</p>
          </div>
          <ProductCarousel products={bestSellingProducts} />
        </div>
      </section>

    </div>
  );
}
