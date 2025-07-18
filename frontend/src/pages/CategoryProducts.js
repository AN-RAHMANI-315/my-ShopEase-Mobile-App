import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { mockApi, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      setLoading(true);
      try {
        const categoryData = categories.find(c => c.id === parseInt(categoryId));
        setCategory(categoryData);
        
        const categoryProducts = await mockApi.getProducts(parseInt(categoryId));
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error loading category products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
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
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                <span className="text-lg">{category.icon}</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">{category.name}</h1>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>
      </header>

      {/* Results Header */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {category.name} Products
          </h2>
          <Badge variant="secondary">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-4">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-24 h-24 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-4xl">{category.icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              We don't have any products in this category yet.
            </p>
            <Button onClick={() => navigate('/')}>
              Browse All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;