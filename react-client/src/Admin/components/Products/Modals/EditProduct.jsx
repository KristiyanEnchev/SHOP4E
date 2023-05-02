import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineShoppingCart, AiFillDollarCircle } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { TbShoppingCartDiscount } from 'react-icons/tb';
import { Image } from 'lucide-react';
import {
  countInStockValidator,
  descriptionValidator,
  priceValidator,
  productCategoryValidator,
  productImageValidator,
  productNameValidator,
  productSlugValidator,
} from '../../../../components/Authentication/Validators.js';
import Loader from '../../../../components/common/Loader/Loader.jsx';
import { closeModal } from '../../../../redux/Public/modalSlice.js';
import {
  getProductById,
  selectProduct,
  setProduct,
} from '../../../../redux/Public/productSlice.js';
import { updateProduct } from '../../../../redux/Public/productsSlice.js';
import { UserActions } from '../../Helpers/UserListConstants.js';
import ModalWrapper from '../../ModalWrapper';
import Button from '../../Button';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const EditProduct = ({ objectId }) => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const product = useSelector(selectProduct);
  const { loading } = product;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getProductById(objectId));
  }, [objectId, dispatch]);

  const changeHandler = (e) => {
    dispatch(
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      })
    );
  };

  const submitHandler = () => {
    const { countInStock, ...productData } = product;
    productData.countInStock = Number(countInStock);
    dispatch(updateProduct(productData));
    dispatch(closeModal({ action: UserActions.Close }));
  };

  const validator = (e) => {
    const validatorMap = {
      name: productNameValidator,
      image: productImageValidator,
      price: priceValidator,
      slug: productSlugValidator,
      category: productCategoryValidator,
      countInStock: countInStockValidator,
      description: descriptionValidator,
    };

    const validatorFn = validatorMap[e.target.name];
    if (validatorFn) {
      setErrors((state) => ({
        ...state,
        [e.target.name]: validatorFn(product[e.target.name]),
      }));
    }
  };

  const isFormValid = !Object.values(errors).some((x) => x);

  if (loading) return <Loader />;

  return (
    <ModalWrapper
      title="Edit Product"
      description="Modify product information"
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
                defaultValue={product.name}
                onChange={changeHandler}
                onBlur={validator}
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
                defaultValue={product.price}
                onChange={changeHandler}
                onBlur={validator}
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
                defaultValue={product.slug}
                onChange={changeHandler}
                onBlur={validator}
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-red-500">Invalid slug format!</p>
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
                defaultValue={product.category}
                onChange={changeHandler}
                onBlur={validator}
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
                defaultValue={product.image}
                onChange={changeHandler}
                onBlur={validator}
              />
            </div>
            {errors.image && (
              <p className="text-sm text-red-500">Invalid image URL!</p>
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
                defaultValue={product.countInStock}
                onChange={changeHandler}
                onBlur={validator}
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
            defaultValue={product.description}
            onChange={changeHandler}
            onBlur={validator}
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
            text="Save Changes"
            borderRadius="10px"
            size="md"
            onClick={submitHandler}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};
