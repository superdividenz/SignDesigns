'use client';

import { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    clearCart();
    if (orderId) {
      // Mark order as paid
      fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'paid' }),
      });
    }
  }, [clearCart, orderId]);

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-8">Thank you for your purchase. Your custom sign order has been placed.</p>
        {orderId && <p className="text-sm text-gray-600 mb-4">Order ID: {orderId}</p>}
        <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}