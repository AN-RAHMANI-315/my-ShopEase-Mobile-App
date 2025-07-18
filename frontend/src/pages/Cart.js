import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const itemsWithProducts = items.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
    setCartItems(itemsWithProducts);
  }, [items]);

  const handleQuantityChange = (productId, newQuantity, selectedColor) => {
    updateQuantity(productId, newQuantity, selectedColor);
  };

  const handleRemoveItem = (productId, selectedColor) => {
    removeFromCart(productId, selectedColor);
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-gray-700 hover:bg-gray-100 mr-3"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Shopping Cart</h1>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center min-h-96 px-4">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-center">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-gray-700 hover:bg-gray-100 mr-3"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Shopping Cart</h1>
          </div>
          <Badge variant="secondary">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </header>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-4">
        {cartItems.map((item) => (
          <Card key={`${item.productId}-${item.selectedColor}`} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <img
                  src={item.product?.images[0]}
                  alt={item.product?.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.product?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.selectedColor && `Color: ${item.selectedColor}`}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1, item.selectedColor)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="font-semibold text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1, item.selectedColor)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.product?.price || 0} each
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.productId, item.selectedColor)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="px-4 py-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <Button
          onClick={() => navigate('/checkout')}
          className="w-full bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          Proceed to Checkout - ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default Cart;