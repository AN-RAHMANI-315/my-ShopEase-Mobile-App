import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { mockApi } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const productData = await mockApi.getProduct(id);
      setProduct(productData);
      if (productData?.colors?.length > 0) {
        setSelectedColor(productData.colors[0]);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity, selectedColor);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product.id, quantity, selectedColor);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="font-semibold text-gray-900 truncate mx-4">
            {product.name}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleWishlist(product.id)}
            className={`${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-700'} hover:bg-gray-100`}
          >
            <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </header>

      {/* Product Images */}
      <section className="bg-white">
        <div className="relative">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-white font-bold">
              -{discountPercentage}%
            </Badge>
          )}
        </div>
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index ? 'border-purple-600' : 'border-gray-200'
              }`}
            >
              <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Product Info */}
      <section className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">{product.category}</Badge>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-xl text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedColor === color
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-l-lg"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-200 bg-gray-50 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-r-lg"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">{product.stock} available</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {product.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="justify-center py-2">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Service Info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Truck className="text-purple-600 mx-auto mb-2" size={24} />
            <p className="text-sm text-gray-600">Free Shipping</p>
          </div>
          <div className="text-center">
            <Shield className="text-purple-600 mx-auto mb-2" size={24} />
            <p className="text-sm text-gray-600">2 Year Warranty</p>
          </div>
          <div className="text-center">
            <RotateCcw className="text-purple-600 mx-auto mb-2" size={24} />
            <p className="text-sm text-gray-600">30 Days Return</p>
          </div>
        </div>
      </section>

      {/* Reviews Tab */}
      <section className="bg-white mt-2">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Customer Reviews</h3>
                <Button variant="outline" size="sm">Write Review</Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-purple-600">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Anonymous User</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={14}
                                  className="text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-600">
                        Great product! Exceeded my expectations. Would definitely recommend.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="p-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Product Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">PRD-{product.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{product.rating}/5</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex space-x-3">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;