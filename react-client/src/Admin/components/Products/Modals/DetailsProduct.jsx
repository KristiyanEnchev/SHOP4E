import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { printDate } from '../../Helpers/FormatHelper.js';
import Loader from '../../../../components/common/Loader/Loader.jsx';
import { closeModal } from '../../../../redux/Public/modalSlice.js';
import { UserActions } from '../../Helpers/UserListConstants.js';
import {
  getProductById,
  selectProduct,
} from '../../../../redux/Public/productSlice.js';
import ModalWrapper from '../../ModalWrapper';
import Button from '../../Button';
import { useStateContext } from '../../../contexts/ContextProvider';

export const DetailsProduct = ({ objectId }) => {
  const blankPictueUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const product = useSelector(selectProduct);
  const { name, image, slug, category, loading } = product;

  useEffect(() => {
    dispatch(getProductById(objectId));
  }, [dispatch, objectId]);

  if (loading) return <Loader />;

  return (
    <ModalWrapper
      title="Product Details"
      description="Detailed information about the product"
      size="default"
      showClose={true}
    >
      <div className="bg-[#1e1e1e] rounded-lg p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-lg overflow-hidden border-4 border-gray-700">
              <img
                src={image || blankPictueUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Product ID:</span>
                <span className="text-gray-200 font-mono text-sm break-all">
                  {product._id}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Name:</span>
                <span className="text-gray-200 font-semibold">{name}</span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Category:</span>
                <span className="text-gray-200">{category}</span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Slug:</span>
                <span className="text-gray-200">{slug}</span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">In Stock:</span>
                <span className="text-gray-200 font-semibold">
                  {product.countInStock}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Created:</span>
                <span className="text-gray-200">
                  {printDate(product.createdAt)}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Modified:</span>
                <span className="text-gray-200">
                  {printDate(product.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4">
          <Button
            color="white"
            bgColor={currentColor}
            text="Close"
            borderRadius="10px"
            size="md"
            onClick={() => dispatch(closeModal({ action: UserActions.Close }))}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
