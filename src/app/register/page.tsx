import Link from 'next/link';
import { signup } from './actions';

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const resolvedParams = await searchParams;
  return (
    <div className="container mx-auto px-4 py-24 max-w-md grow flex flex-col justify-center">
      <h1 className="font-playfair text-4xl font-semibold mb-2 text-center">Create Account</h1>
      <p className="text-gray-500 text-sm text-center mb-10">Join LUCKY for exclusive perks and seamless checkout.</p>

      {resolvedParams?.error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm border border-red-100 text-center">
          {resolvedParams.error}
        </div>
      )}

      <form className="space-y-6" action={signup}>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            required 
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Email</label>
          <input 
            type="email" 
            name="email"
            required 
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Password</label>
          <input 
            type="password" 
            name="password"
            required 
            minLength={6}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Register
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-200 pt-8">
        Already have an account? <Link href="/login" className="text-black font-semibold hover:underline underline-offset-4">Log in</Link>
      </div>
    </div>
  );
}
