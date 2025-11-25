'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Order } from '../../lib/types';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      // Fetch user's orders
      fetch(`/api/orders?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-gray-200 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === 'paid' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total: ${order.total}</p>
                <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <div className="mt-2">
                  <h4 className="font-medium">Items:</h4>
                  <ul className="text-sm">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.product.name} x {item.quantity}
                        {item.customization && (
                          <span className="text-gray-500">
                            ({item.customization.size}, "{item.customization.lettering}")
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}