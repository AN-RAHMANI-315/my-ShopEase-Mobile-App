import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { products, mockApi } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: user?.phone || '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveInfo: false
  });

  useEffect(() => {
    const itemsWithProducts = items.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
    setCartItems(itemsWithProducts);
  }, [items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      saveInfo: checked
    }));
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const orderData = {
        userId: user?.id,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product?.price || 0
        })),
        total: total,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      const order = await mockApi.createOrder(orderData);
      clearCart();
      
      toast.success('Order placed successfully!');
      navigate(`/order/${order.id}`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/')}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
            className="text-gray-700 hover:bg-gray-100 mr-3"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Check className="mr-2" size={20} />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.selectedColor}`} className="flex items-center space-x-3">
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{item.product?.name}</h4>
                    <p className="text-xs text-gray-600">
                      {item.selectedColor && `Color: ${item.selectedColor}`} | Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" size={20} />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2" size={20} />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {formData.paymentMethod === 'paypal' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  You will be redirected to PayPal to complete your payment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveInfo"
                checked={formData.saveInfo}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="saveInfo" className="text-sm">
                Save this information for next time
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;