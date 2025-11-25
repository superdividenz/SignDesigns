'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Order } from '../../../lib/types';

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetch('/api/orders')
        .then(res => res.json())
        .then(setOrders);
    }
  }, [user]);

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    // Refresh orders
    const updatedOrders = await fetch('/api/orders').then(res => res.json());
    setOrders(updatedOrders);
  };

  if (!user || user.role !== 'admin') {
    return <div className="container mx-auto px-4 py-8">Access denied. Admin only.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin - Order Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-gray-200 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Order #{order.id}</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600">User ID: {order.userId}</p>
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