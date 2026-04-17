import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatIdr } from '../../lib/utils'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch profile. Supabase auto-created this.
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-5xl grow">
      <div className="mb-12">
        <h1 className="font-playfair text-4xl font-semibold mb-2">My Account</h1>
        <p className="text-gray-600">Welcome back, {profile?.full_name || user.email}</p>
      </div>

      <h2 className="text-xl font-bold uppercase tracking-wider mb-6 border-b border-gray-200 pb-2">Order History</h2>
      
      {(!orders || orders.length === 0) ? (
        <div className="text-center py-16 bg-gray-50 border border-gray-200">
          <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/shop" className="inline-flex items-center justify-center px-6 py-2 bg-black text-white text-xs font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-medium capitalize">{order.status}</p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total</p>
                  <p className="text-sm font-medium">{formatIdr(order.total_idr)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2">Items</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {order.order_items?.map((item: any) => (
                    <li key={item.id}>
                      {item.quantity}x {item.product_id} — {formatIdr(item.price_at_purchase_idr)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
