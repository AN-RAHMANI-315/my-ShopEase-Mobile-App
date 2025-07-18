import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockApi } from '../data/mockData';
import { toast } from 'sonner';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return { ...state, items: action.payload };
    case 'ADD_TO_WISHLIST':
      return { ...state, items: action.payload };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, items: action.payload };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: []
  });

  useEffect(() => {
    // Load wishlist from localStorage on mount
    const wishlist = mockApi.getWishlist();
    dispatch({ type: 'SET_WISHLIST', payload: wishlist });
  }, []);

  const addToWishlist = (productId) => {
    const updatedWishlist = mockApi.addToWishlist(productId);
    dispatch({ type: 'ADD_TO_WISHLIST', payload: updatedWishlist });
    toast.success('Added to wishlist!');
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = mockApi.removeFromWishlist(productId);
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: updatedWishlist });
    toast.success('Removed from wishlist!');
  };

  const isInWishlist = (productId) => {
    return state.items.includes(productId);
  };

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const clearWishlist = () => {
    localStorage.removeItem('wishlist');
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const value = {
    ...state,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};