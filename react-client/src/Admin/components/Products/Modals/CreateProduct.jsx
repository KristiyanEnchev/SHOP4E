import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineShoppingCart, AiFillDollarCircle } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { TbShoppingCartDiscount } from 'react-icons/tb';
import { Image } from 'lucide-react';
import { closeModal } from '../../../../redux/Public/modalSlice.js';
import { createProduct } from '../../../../redux/Public/productsSlice.js';
import { UserActions } from '../../Helpers/UserListConstants.js';
import ModalWrapper from '../../ModalWrapper';
import Button from '../../Button';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const CreateProduct = () => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const [errors, setErrors] = useState({
    name: false,
    slug: false,
    image: false,
    images: false,
    category: false,
    description: false,
    price: false,
    countInStock: false,
  });
  const [values, setValues] = useState({
    name: '',
    slug: '',
    image: '',
    images: '',
    category: '',
    description: '',
    price: '',
    countInStock: '',
  });

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));

    const isFormFilled = Object.values(values).every((value) => value !== '');
    setErrors((state) => ({
      ...state,
      initialError: !isFormFilled,
    }));
  };

  const minLength = (e, bound) => {
    const value = e.target.value.trim();
    const isValid = value.length >= bound;
    setErrors((state) => ({
      ...state,
      [e.target.name]: !isValid,
    }));
  };

  const isPositive = (e) => {
    const number = Number(e.target.value);
    const isValid = number > 0;
    setErrors((state) => ({
      ...state,
      [e.target.name]: !isValid,
    }));
  };

  const isFormValid = () => {
    return Object.keys(values).every(
      (key) => values[key] !== '' && !errors[key]
    );
  };

  const submitHandler = () => {
    if (isFormValid()) {
      dispatch(createProduct(values));
      dispatch(closeModal({ action: UserActions.Close }));
    }
  };

  return (
    <ModalWrapper
      title="Create Product"
      description="Add a new product to your inventory"
      size="default"
    >
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Product Name & Price */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <div className="relative">
              <AiOutlineShoppingCart className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="name"
                name="name"
                className="pl-8"
                value={values.name}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                Product name should be at least 3 characters!
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <AiFillDollarCircle className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="price"
                name="price"
                type="number"
                className="pl-8"
                value={values.price}
                onChange={changeHandler}
                onBlur={isPositive}
              />
            </div>
            {errors.price && (
              <p className="text-sm text-red-500">
                Price must be a positive number!
              </p>
            )}
          </div>

          {/* Slug & Category */}
          <div className="space-y-2">
            <Label htmlFor="slug">Product Slug</Label>
            <div className="relative">
              <Input
                id="slug"
                name="slug"
                className="pl-8"
                value={values.slug}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 2)}
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-red-500">
                Slug must be at least 2 characters!
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <div className="relative">
              <BiCategoryAlt className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="category"
                name="category"
                className="pl-8"
                value={values.category}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.category && (
              <p className="text-sm text-red-500">
                Category must be at least 3 characters!
              </p>
            )}
          </div>

          {/* Image & Stock */}
          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <div className="relative">
              <Image className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="image"
                name="image"
                className="pl-8"
                value={values.image}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.image && (
              <p className="text-sm text-red-500">Image URL is required!</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Product Images</Label>
            <div className="relative">
              <Image className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="images"
                name="images"
                className="pl-8"
                value={values.images}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.images && (
              <p className="text-sm text-red-500">
                At least one image is required!
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="countInStock">Count In Stock</Label>
            <div className="relative">
              <TbShoppingCartDiscount className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="countInStock"
                name="countInStock"
                type="number"
                className="pl-8"
                value={values.countInStock}
                onChange={changeHandler}
                onBlur={isPositive}
              />
            </div>
            {errors.countInStock && (
              <p className="text-sm text-red-500">
                Stock must be a positive number!
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            className="min-h-[100px]"
            value={values.description}
            onChange={changeHandler}
            onBlur={(e) => minLength(e, 10)}
          />
          {errors.description && (
            <p className="text-sm text-red-500">
              Description must be at least 10 characters!
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            icon={null}
            color="rgb(153, 171, 180)"
            bgColor="transparent"
            text="Cancel"
            borderRadius="10px"
            size="md"
            onClick={() => dispatch(closeModal())}
          />
          <Button
            icon={null}
            color="white"
            bgColor={currentColor}
            text="Create Product"
            borderRadius="10px"
            size="md"
            disabled={!isFormValid()}
            onClick={submitHandler}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};
