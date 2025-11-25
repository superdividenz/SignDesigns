'use client';

import { notFound } from 'next/navigation';
import { products } from '../../../lib/products';
import { useCart } from '../../../contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [lettering, setLettering] = useState('');

  const handleAddToCart = () => {
    if (product.customizable && (!selectedSize || !lettering)) {
      alert('Please select a size and enter lettering.');
      return;
    }
    addToCart(product, product.customizable ? { size: selectedSize, lettering } : undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Products</Link>
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={400}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-bold mb-6">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}