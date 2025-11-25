'use client';

import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Sign Designs
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.name}</span>
              <Link href="/dashboard" className="text-blue-500 hover:underline">
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin/orders" className="text-red-500 hover:underline">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="text-gray-500 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="text-blue-500 hover:underline">
              Login
            </Link>
          )}
          <Link href="/cart" className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}