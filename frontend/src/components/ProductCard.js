import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white font-bold">
                -{discountPercentage}%
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`ml-auto bg-white/90 hover:bg-white shadow-md ${
                isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </Button>
          </div>
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>
            <Badge variant="secondary" className="ml-auto text-xs">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {product.stock} left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;