import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ShoppingBag, Sparkles, TrendingUp, Crown } from 'lucide-react';
import { categories, products, mockApi } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    // Simulate API calls
    const loadProducts = async () => {
      const allProducts = await mockApi.getProducts();
      setFeaturedProducts(allProducts.slice(0, 4));
      setTrendingProducts(allProducts.slice(2, 6));
    };
    loadProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">AN-RAHMANI</h1>
              <p className="text-purple-100 text-sm">Discover amazing products</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell size={20} />
              </Button>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ShoppingBag size={20} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:border-white"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30"
            >
              <Search size={18} />
            </Button>
          </form>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Crown className="text-yellow-500 mr-2" size={24} />
                <Badge className="bg-yellow-100 text-yellow-800 font-bold">
                  Premium Sale
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Up to 50% Off
              </h2>
              <p className="text-gray-600 mb-4">
                Limited time offer on selected items
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                Shop Now
              </Button>
            </div>
            <div className="hidden sm:block">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
          <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sparkles className="text-purple-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TrendingUp className="text-orange-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white mx-4 rounded-2xl mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-purple-100 mb-6">
            Get notified about new products and exclusive offers
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:border-white"
            />
            <Button className="ml-3 bg-white text-purple-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
