import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vinyl Corrugated Sign',
    description: 'Custom vinyl corrugated sign with your choice of size and lettering.',
    price: 25,
    image: 'https://via.placeholder.com/300x200?text=Vinyl+Sign',
    customizable: true,
    sizes: ['12x18 inches', '18x24 inches', '24x36 inches', '36x48 inches'],
  },
  {
    id: '2',
    name: 'Corrugated Plastic Sign',
    description: 'Durable corrugated plastic sign with custom engraving.',
    price: 35,
    image: 'https://via.placeholder.com/300x200?text=Plastic+Sign',
    customizable: true,
    sizes: ['12x18 inches', '18x24 inches', '24x36 inches'],
  },
  {
    id: '3',
    name: 'Magnetic Vinyl Sign',
    description: 'Magnetic vinyl sign for vehicles.',
    price: 40,
    image: 'https://via.placeholder.com/300x200?text=Magnetic+Sign',
    customizable: true,
    sizes: ['12x18 inches', '18x24 inches'],
  },
  {
    id: '4',
    name: 'PVC Foam Board Sign',
    description: 'Lightweight PVC foam board for indoor signs.',
    price: 60,
    image: 'https://via.placeholder.com/300x200?text=PVC+Foam+Board',
    customizable: true,
    sizes: ['12x18 inches', '18x24 inches', '24x36 inches', '36x48 inches'],
  },
];