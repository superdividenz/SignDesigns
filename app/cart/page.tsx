'use client';

import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Cart() {
  const { cart, removeFromCart, getTotal, clearCart, loading } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      alert('Please log in to checkout.');
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) return;

    // Save order first
    const orderResponse = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id || 'guest',
        items: cart,
        total: getTotal(),
      }),
    });

    if (!orderResponse.ok) {
      alert('Failed to create order. Please try again.');
      return;
    }

    const { orderId } = await orderResponse.json();

    // Create Stripe session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart, orderId }),
    });

    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {loading ? (
        <div className="text-center py-8">
          <p>Loading your cart...</p>
        </div>
      ) : !user ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Please <a href="/auth/signin" className="underline">log in</a> to view your cart and checkout.</p>
        </div>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={`${item.product.id}-${JSON.stringify(item.customization)}`} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                {item.customization && (
                  <div className="text-sm text-gray-600">
                    <p>Size: {item.customization.size}</p>
                    <p>Lettering: {item.customization.lettering}</p>
                  </div>
                )}
                <p>${item.product.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right">
            <p className="text-xl font-bold">Total: ${getTotal()}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Checkout with Stripe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}