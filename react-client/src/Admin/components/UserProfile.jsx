import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import Button from './Button.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { logOut } from '../../redux/Public/AuthSlice.js';

const UserProfile = ({ user, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const { avatar, name, email } = user;
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[999]" />

      {/* Profile Card */}
      <div
        ref={profileRef}
        className="nav-item fixed right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-2xl z-[1000]"
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">
            User Profile
          </p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(100, 10, 10)"
            bgColor={currentColor}
            size="2xl"
            borderRadius="5rem"
            clas="btn-style-t"
            onClick={onClose}
          />
        </div>

        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <img
            className="rounded-full h-24 w-24 object-cover"
            src={avatar}
            alt="user-profile"
          />
          <div>
            <p className="font-semibold text-xl dark:text-gray-200">{name}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Administrator
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              {email}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
            clas="btn-nb"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
