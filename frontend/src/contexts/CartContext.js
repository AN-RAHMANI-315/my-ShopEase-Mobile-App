import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockApi } from '../data/mockData';
import { toast } from 'sonner';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'ADD_TO_CART':
      return { ...state, items: action.payload };
    case 'REMOVE_FROM_CART':
      return { ...state, items: action.payload };
    case 'UPDATE_QUANTITY':
      return { ...state, items: action.payload };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  useEffect(() => {
    // Load cart from localStorage on mount
    const cart = mockApi.getCart();
    dispatch({ type: 'SET_CART', payload: cart });
  }, []);

  const addToCart = (productId, quantity = 1, selectedColor = null) => {
    const updatedCart = mockApi.addToCart(productId, quantity, selectedColor);
    dispatch({ type: 'ADD_TO_CART', payload: updatedCart });
    toast.success('Item added to cart!');
  };

  const removeFromCart = (productId, selectedColor = null) => {
    const updatedCart = mockApi.removeFromCart(productId, selectedColor);
    dispatch({ type: 'REMOVE_FROM_CART', payload: updatedCart });
    toast.success('Item removed from cart!');
  };

  const updateQuantity = (productId, quantity, selectedColor = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    const updatedCart = mockApi.updateCartQuantity(productId, quantity, selectedColor);
    dispatch({ type: 'UPDATE_QUANTITY', payload: updatedCart });
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const product = mockApi.getProduct(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};