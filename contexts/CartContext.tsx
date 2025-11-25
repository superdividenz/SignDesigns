'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Customization } from '../lib/types';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, customization?: Customization) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from Supabase when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const { data: cartData, error } = await supabase
            .from('carts')
            .select('items')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error loading cart:', error);
          } else if (cartData) {
            setCart(cartData.items || []);
          } else {
            // Create empty cart for new user
            setCart([]);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        setCart([]);
      }
      setLoading(false);
    };

    loadCart();
  }, [user]);

  // Save cart to Supabase whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user && !loading) {
        try {
          const { error } = await supabase
            .from('carts')
            .upsert({
              user_id: user.id,
              items: cart,
              updated_at: new Date().toISOString(),
            });

          if (error) {
            console.error('Error saving cart:', error);
          }
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };

    saveCart();
  }, [cart, user, loading]);

  const addToCart = (product: Product, customization?: Customization) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && JSON.stringify(item.customization) === JSON.stringify(customization));
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && JSON.stringify(item.customization) === JSON.stringify(customization)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, customization }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal, loading }}>
      {children}
    </CartContext.Provider>
  );
};