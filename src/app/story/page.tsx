import Image from 'next/image';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <Image 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=2000&q=80" 
            alt="Our Story" 
            fill 
            className="object-cover object-center"
            priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold tracking-wider mb-6">Our Story</h1>
          <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            The genesis of radical transparency in skincare.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="space-y-16">
          
          <div className="text-center">
            <h2 className="font-playfair text-3xl font-semibold mb-6">The LUCKY Philosophy</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We started LUCKY with a simple question: Why does premium skincare cost so much? The answer, we found, had little to do with the actual ingredients or formulation, and everything to do with traditional retail markups, celebrity marketing campaigns, and expensive packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square">
              <Image 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
                alt="Philosophy"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-semibold mb-4">Science First</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our lab located in Seoul focuses exclusively on clinically-proven active ingredients. We strip away the unnecessary fillers, artificial fragrances, and controversial preservatives. What remains is purely what works.
              </p>
              <h3 className="font-playfair text-2xl font-semibold mb-4">Transparent Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe you deserve to know what you&apos;re paying for. Our interactive margin calculator on every product page breaks down the exact cost of our formulas, proving our commitment to honest pricing for the Jakarta market.
              </p>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
