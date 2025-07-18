import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import MobileNavigation from "./components/MobileNavigation";
import LoadingSpinner from "./components/LoadingSpinner";

// Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import CategoryProducts from "./pages/CategoryProducts";
import Search from "./pages/Search";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/category/:categoryId" element={<CategoryProducts />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />
                  <Route path="/order/:orderId" element={
                    <ProtectedRoute>
                      <OrderTracking />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <MobileNavigation />
              </div>
              <Toaster />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;