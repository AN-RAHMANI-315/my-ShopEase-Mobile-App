import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Package, MapPin, CreditCard, Settings, LogOut, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', path: '/orders' },
    { icon: MapPin, label: 'Addresses', path: '/addresses' },
    { icon: CreditCard, label: 'Payment Methods', path: '/payment-methods' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold">Profile</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Edit size={20} />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-white/20 text-white text-xl">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-purple-100">{user?.email}</p>
              <p className="text-purple-100 text-sm">{user?.phone}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <p className="text-sm text-gray-600">Orders</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <p className="text-sm text-gray-600">Wishlist</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <p className="text-sm text-gray-600">Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <button
                    onClick={() => navigate(item.path)}
                    className="flex items-center space-x-3 w-full text-left"
                  >
                    <Icon size={20} className="text-purple-600" />
                    <span className="font-medium text-gray-900">{item.label}</span>
                    <div className="ml-auto">
                      <ArrowLeft size={16} className="text-gray-400 rotate-180" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Options */}
        <div className="mt-6 space-y-2">
          <Card>
            <CardContent className="p-4">
              <button className="flex items-center space-x-3 w-full text-left">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">?</span>
                </div>
                <span className="font-medium text-gray-900">Help & Support</span>
              </button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <button className="flex items-center space-x-3 w-full text-left">
                <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">★</span>
                </div>
                <span className="font-medium text-gray-900">Rate Our App</span>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;