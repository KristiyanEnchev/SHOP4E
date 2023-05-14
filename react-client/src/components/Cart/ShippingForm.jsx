import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '@/redux/Public/orderSlice';
import { clearCart } from '@/redux/Public/cartSlice';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ShippingForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: user?.email || '',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!cartItems.length) {
      navigate('/');
      toast.error('Your cart is empty');
      return;
    }

    if (user?.profile) {
      setFormData({
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        street: user.profile.address?.street || '',
        city: user.profile.address?.city || '',
        postalCode: user.profile.address?.postalCode || '',
        country: user.profile.address?.country || '',
        phone: user.profile.phone || '',
        email: user.email || '',
      });
    }
  }, [user, cartItems, navigate]);

  const validateField = (name, value) => {
    let error = '';
    const trimmedValue = value.trim();

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!trimmedValue) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (trimmedValue.length < 2) {
          error = 'Must be at least 2 characters';
        } else if (!/^[a-zA-Z\s-']+$/.test(trimmedValue)) {
          error = 'Only letters, spaces, hyphens and apostrophes allowed';
        }
        break;

      case 'street':
        if (!trimmedValue) {
          error = 'Street address is required';
        } else if (trimmedValue.length < 5) {
          error = 'Please enter a valid street address';
        }
        break;

      case 'city':
        if (!trimmedValue) {
          error = 'City is required';
        } else if (!/^[a-zA-Z\s-']+$/.test(trimmedValue)) {
          error = 'Please enter a valid city name';
        }
        break;

      case 'postalCode':
        if (!trimmedValue) {
          error = 'Postal code is required';
        } else if (!/^[0-9]{5}(-[0-9]{4})?$/.test(trimmedValue)) {
          error =
            'Please enter a valid postal code (e.g., 12345 or 12345-6789)';
        }
        break;

      case 'country':
        if (!trimmedValue) {
          error = 'Country is required';
        } else if (!/^[a-zA-Z\s-']+$/.test(trimmedValue)) {
          error = 'Please enter a valid country name';
        }
        break;

      case 'phone':
        if (!trimmedValue) {
          error = 'Phone number is required';
        } else if (
          !/^\+?[1-9]\d{1,14}$/.test(trimmedValue.replace(/[\s()-]/g, ''))
        ) {
          error = 'Please enter a valid phone number';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.amount,
        price: item.price,
        image: item.image,
      })),
      shippingAddress: formData,
      total,
    };

    const resultAction = dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(clearCart());
    }
  };

  const inputClassName = (fieldName) => `
    mt-1 block w-full px-3 py-2 border rounded-md shadow-sm
    ${
      errors[fieldName] && touched[fieldName]
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-red-500 focus:ring-red-500'
    }
  `;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClassName('firstName')}
            />
            {errors.firstName && touched.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClassName('lastName')}
            />
            {errors.lastName && touched.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClassName('street')}
          />
          {errors.street && touched.street && (
            <p className="mt-1 text-sm text-red-500">{errors.street}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClassName('city')}
            />
            {errors.city && touched.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClassName('postalCode')}
            />
            {errors.postalCode && touched.postalCode && (
              <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClassName('country')}
            />
            {errors.country && touched.country && (
              <p className="mt-1 text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClassName('phone')}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && touched.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-red-400 to-red-500 hover:opacity-90
              transition-all shadow-lg shadow-red-500/30 text-white font-semibold text-base rounded-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
