"use client";

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <h2 className="font-playfair text-2xl font-bold tracking-widest text-gray-900 mb-4">LUCKY</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              The Science of Pure Skin. Premium formulation meets transparent pricing. Curated exclusively for the Jakarta market.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/shop/skincare" className="text-sm text-gray-600 hover:text-black transition-colors">Skincare</Link></li>
              <li><Link href="/shop/makeup" className="text-sm text-gray-600 hover:text-black transition-colors">Makeup</Link></li>
              <li><Link href="/shop/best-sellers" className="text-sm text-gray-600 hover:text-black transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop/new" className="text-sm text-gray-600 hover:text-black transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">About</h3>
            <ul className="space-y-3">
              <li><Link href="/story" className="text-sm text-gray-600 hover:text-black transition-colors">Our Story</Link></li>
              <li><a href="#" onClick={() => alert('Page content coming soon!')} className="text-sm text-gray-600 hover:text-black transition-colors">Ingredients Glossary</a></li>
              <li><a href="#" onClick={() => alert('Page content coming soon!')} className="text-sm text-gray-600 hover:text-black transition-colors">Sustainability</a></li>
              <li><a href="#" onClick={() => alert('Page content coming soon!')} className="text-sm text-gray-600 hover:text-black transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-black text-white px-6 py-2 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LUCKY SKincare. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
