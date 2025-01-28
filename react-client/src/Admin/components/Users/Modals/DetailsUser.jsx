import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../components/common/Loader/Loader.jsx';
import { findUserById } from '../../../../redux/Admin/UserSlice.js';
import { closeModal } from '../../../../redux/Public/modalSlice.js';
import { printDate } from '../../Helpers/FormatHelper.js';
import { UserActions } from '../../Helpers/UserListConstants.js';
import ModalWrapper from '../../ModalWrapper';
import Button from '../../Button';
import { useStateContext } from '../../../contexts/ContextProvider';

export const DetailsUser = ({ objectId }) => {
  const blankPictueUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const { user, loading } = useSelector((state) => state.user);
  const { name, avatar, firstName, lastName } = user;

  useEffect(() => {
    dispatch(findUserById(objectId));
  }, [dispatch, objectId]);

  if (loading) return <Loader />;

  return (
    <ModalWrapper
      title="User Details"
      description="Detailed information about the user"
      size="default"
      showClose={true}
    >
      <div className="bg-[#1e1e1e] rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700">
              <img
                src={avatar || blankPictueUrl}
                alt="user profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">User ID:</span>
                <span className="text-gray-200 font-mono text-sm ">
                  {user._id}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Full Name:</span>
                <span className="text-gray-200 font-semibold">
                  {firstName} {lastName}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Email:</span>
                <span className="text-gray-200">{user.email}</span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Username:</span>
                <span className="text-gray-200 font-semibold">{name}</span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Created:</span>
                <span className="text-gray-200">
                  {printDate(user.createdAt)}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center">
                <span className="text-gray-400 text-sm">Modified:</span>
                <span className="text-gray-200">
                  {printDate(user.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
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
