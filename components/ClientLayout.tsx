'use client';

import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="flex-1 bg-gray-100">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}