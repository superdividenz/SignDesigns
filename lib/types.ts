export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customizable: boolean;
  sizes?: string[];
}

export interface Customization {
  size: string;
  lettering: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: Customization;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped';
  createdAt: string;
  stripeSessionId?: string;
}