// Mock data for e-commerce app
export const categories = [
  { id: 1, name: 'Electronics', icon: '📱', color: 'bg-blue-500' },
  { id: 2, name: 'Fashion', icon: '👕', color: 'bg-pink-500' },
  { id: 3, name: 'Home & Living', icon: '🏠', color: 'bg-green-500' },
  { id: 4, name: 'Sports', icon: '⚽', color: 'bg-orange-500' },
  { id: 5, name: 'Books', icon: '📚', color: 'bg-purple-500' },
  { id: 6, name: 'Beauty', icon: '💄', color: 'bg-red-500' }
];

export const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999,
    originalPrice: 1099,
    category: 'Electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop'
    ],
    description: 'The latest iPhone with advanced camera system and A17 Pro chip for ultimate performance.',
    rating: 4.8,
    reviews: 124,
    stock: 15,
    features: ['A17 Pro Chip', '48MP Camera', '5G Ready', 'Face ID'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
  },
  {
    id: 2,
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 180,
    category: 'Sports',
    categoryId: 4,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop'
    ],
    description: 'Ultimate comfort meets bold style in this iconic sneaker with visible Air cushioning.',
    rating: 4.6,
    reviews: 89,
    stock: 8,
    features: ['Air Cushioning', 'Mesh Upper', 'Rubber Outsole', 'Lightweight'],
    colors: ['White/Black', 'Triple Black', 'Photo Blue', 'Volt']
  },
  {
    id: 3,
    name: 'MacBook Pro 14"',
    price: 1999,
    originalPrice: 2199,
    category: 'Electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1515343480029-43cdfe6cba04?w=400&h=400&fit=crop'
    ],
    description: 'Supercharged by M3 chip. Built for creative professionals and power users.',
    rating: 4.9,
    reviews: 203,
    stock: 12,
    features: ['M3 Chip', '14" Liquid Retina XDR', '16GB RAM', '512GB SSD'],
    colors: ['Space Gray', 'Silver']
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    price: 299,
    originalPrice: 349,
    category: 'Electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
    ],
    description: 'Premium sound quality with active noise cancellation and 30-hour battery life.',
    rating: 4.7,
    reviews: 156,
    stock: 25,
    features: ['Active Noise Cancellation', '30hr Battery', 'Quick Charge', 'Bluetooth 5.0'],
    colors: ['Midnight Black', 'Silver', 'Rose Gold']
  },
  {
    id: 5,
    name: 'Designer Handbag',
    price: 450,
    originalPrice: 520,
    category: 'Fashion',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'
    ],
    description: 'Luxury leather handbag with elegant design and premium craftsmanship.',
    rating: 4.5,
    reviews: 78,
    stock: 6,
    features: ['Genuine Leather', 'Multiple Compartments', 'Adjustable Strap', 'Gold Hardware'],
    colors: ['Black', 'Brown', 'Tan', 'Navy']
  },
  {
    id: 6,
    name: 'Smart Watch',
    price: 399,
    originalPrice: 449,
    category: 'Electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop'
    ],
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    rating: 4.4,
    reviews: 92,
    stock: 18,
    features: ['GPS', 'Heart Rate Monitor', 'Water Resistant', '7-day Battery'],
    colors: ['Space Gray', 'Silver', 'Gold', 'Rose Gold']
  }
];

export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    addresses: [
      {
        id: 1,
        type: 'Home',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true
      },
      {
        id: 2,
        type: 'Work',
        street: '456 Office Blvd',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'USA',
        isDefault: false
      }
    ]
  }
];

export const orders = [
  {
    id: 'ORD-2024-001',
    userId: 1,
    status: 'delivered',
    total: 1299,
    items: [
      { productId: 1, quantity: 1, price: 999 },
      { productId: 4, quantity: 1, price: 299 }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    orderDate: '2024-01-15T10:30:00Z',
    deliveryDate: '2024-01-18T14:20:00Z',
    tracking: {
      number: 'TRK123456789',
      updates: [
        { date: '2024-01-15T10:30:00Z', status: 'Order Placed', location: 'Online' },
        { date: '2024-01-15T15:45:00Z', status: 'Processing', location: 'Warehouse' },
        { date: '2024-01-16T08:20:00Z', status: 'Shipped', location: 'Distribution Center' },
        { date: '2024-01-17T12:15:00Z', status: 'In Transit', location: 'Local Facility' },
        { date: '2024-01-18T14:20:00Z', status: 'Delivered', location: 'Front Door' }
      ]
    }
  },
  {
    id: 'ORD-2024-002',
    userId: 1,
    status: 'shipped',
    total: 150,
    items: [
      { productId: 2, quantity: 1, price: 150 }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    orderDate: '2024-01-20T09:15:00Z',
    estimatedDelivery: '2024-01-23T16:00:00Z',
    tracking: {
      number: 'TRK987654321',
      updates: [
        { date: '2024-01-20T09:15:00Z', status: 'Order Placed', location: 'Online' },
        { date: '2024-01-20T14:30:00Z', status: 'Processing', location: 'Warehouse' },
        { date: '2024-01-21T11:45:00Z', status: 'Shipped', location: 'Distribution Center' }
      ]
    }
  }
];

export const cart = [
  { productId: 3, quantity: 1, selectedColor: 'Space Gray' },
  { productId: 6, quantity: 2, selectedColor: 'Silver' }
];

export const wishlist = [2, 5];

export const reviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    rating: 5,
    comment: 'Amazing phone! The camera quality is incredible and the performance is top-notch.',
    date: '2024-01-10T12:00:00Z',
    helpful: 15,
    verified: true
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    rating: 4,
    comment: 'Great device overall, battery life could be better but the features make up for it.',
    date: '2024-01-08T14:30:00Z',
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    productId: 2,
    userId: 3,
    rating: 5,
    comment: 'Super comfortable shoes! Perfect for running and daily wear.',
    date: '2024-01-05T16:45:00Z',
    helpful: 12,
    verified: true
  }
];

// Mock API functions for local storage
export const mockApi = {
  // Authentication
  login: (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'john@example.com' && password === 'password') {
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user));
          resolve({ success: true, user });
        } else {
          resolve({ success: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  },

  register: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          addresses: []
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve({ success: true, user: newUser });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  },

  // Products
  getProducts: (category = null, search = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = products;
        if (category) {
          filteredProducts = products.filter(p => p.categoryId === category);
        }
        if (search) {
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
          );
        }
        resolve(filteredProducts);
      }, 500);
    });
  },

  getProduct: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find(p => p.id === parseInt(id));
        resolve(product);
      }, 300);
    });
  },

  // Cart
  getCart: () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  },

  addToCart: (productId, quantity = 1, selectedColor = null) => {
    const cart = mockApi.getCart();
    const existingItem = cart.find(item => item.productId === productId && item.selectedColor === selectedColor);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity, selectedColor });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },

  removeFromCart: (productId, selectedColor = null) => {
    let cart = mockApi.getCart();
    cart = cart.filter(item => !(item.productId === productId && item.selectedColor === selectedColor));
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },

  updateCartQuantity: (productId, quantity, selectedColor = null) => {
    const cart = mockApi.getCart();
    const item = cart.find(item => item.productId === productId && item.selectedColor === selectedColor);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
  },

  // Wishlist
  getWishlist: () => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  },

  addToWishlist: (productId) => {
    const wishlist = mockApi.getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    return wishlist;
  },

  removeFromWishlist: (productId) => {
    let wishlist = mockApi.getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    return wishlist;
  },

  // Orders
  getOrders: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(orders);
      }, 500);
    });
  },

  createOrder: (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: `ORD-${Date.now()}`,
          ...orderData,
          orderDate: new Date().toISOString(),
          status: 'processing',
          tracking: {
            number: `TRK${Date.now()}`,
            updates: [
              { date: new Date().toISOString(), status: 'Order Placed', location: 'Online' }
            ]
          }
        };
        resolve(newOrder);
      }, 1000);
    });
  }
};