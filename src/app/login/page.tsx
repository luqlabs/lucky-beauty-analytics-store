import Link from 'next/link';
import { login } from './actions';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const resolvedParams = await searchParams;
  return (
    <div className="container mx-auto px-4 py-24 max-w-md grow flex flex-col justify-center">
      <h1 className="font-playfair text-4xl font-semibold mb-2 text-center">Welcome Back</h1>
      <p className="text-gray-500 text-sm text-center mb-10">Sign in to access your saved lists and orders.</p>

      {resolvedParams?.error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm border border-red-100 text-center">
          {resolvedParams.error}
        </div>
      )}

      <form className="space-y-6" action={login}>
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
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Sign In
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-200 pt-8">
        Don&apos;t have an account? <Link href="/register" className="text-black font-semibold hover:underline underline-offset-4">Create one</Link>
      </div>
    </div>
  );
}
