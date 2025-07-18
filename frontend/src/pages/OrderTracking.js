import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { orders } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
    setLoading(false);
  }, [orderId]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'processing':
        return <Clock size={16} className="text-yellow-500" />;
      case 'shipped':
        return <Truck size={16} className="text-blue-500" />;
      case 'in transit':
        return <Truck size={16} className="text-blue-500" />;
      case 'delivered':
        return <Package size={16} className="text-green-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <Button onClick={() => navigate('/orders')}>Go Back to Orders</Button>
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
              onClick={() => navigate('/orders')}
              className="text-gray-700 hover:bg-gray-100 mr-3"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Order Details</h1>
              <p className="text-sm text-gray-600">#{order.id}</p>
            </div>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </header>

      {/* Order Summary */}
      <div className="px-4 py-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">{order.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-lg">${order.total}</span>
              </div>
              {order.tracking && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tracking Number:</span>
                  <span className="font-medium">{order.tracking.number}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
            <div className="text-gray-700">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Tracking */}
        {order.tracking && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Order Tracking</h3>
              <div className="space-y-4">
                {order.tracking.updates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(update.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{update.status}</p>
                        <span className="text-sm text-gray-500">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{update.location}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(update.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estimated Delivery */}
        {order.status === 'shipped' && order.estimatedDelivery && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Truck className="text-blue-600 mr-3" size={24} />
                  <div>
                    <p className="font-semibold text-blue-800">On the way!</p>
                    <p className="text-sm text-blue-600">
                      Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivered */}
        {order.status === 'delivered' && order.deliveryDate && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3" size={24} />
                  <div>
                    <p className="font-semibold text-green-800">Delivered!</p>
                    <p className="text-sm text-green-600">
                      Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/orders')}
          >
            View All Orders
          </Button>
          {order.status === 'delivered' && (
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Reorder Items
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;