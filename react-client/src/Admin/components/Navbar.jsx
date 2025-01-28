import { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { useStateContext } from '../contexts/ContextProvider';
import { CustomTooltip } from './../../components/ui/custom-tooltip';
import UserProfile from './UserProfile';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <CustomTooltip content={title}>
    <Button
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      {dotColor && (
        <span
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
          style={{ background: dotColor }}
        />
      )}
      {icon}
    </Button>
  </CustomTooltip>
);

const Navbar = () => {
  const user = useSelector((state) => state.auth);
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setIsClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    setActiveMenu(screenSize > 900);
  }, [screenSize, setActiveMenu]);

  const handleProfileClick = () => {
    handleClick('userProfile');
  };

  const handleCloseProfile = () => {
    setIsClicked((prevState) => ({
      ...prevState,
      userProfile: false,
    }));
  };

  return (
    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
      <div className="flex justify-between p-2 md:mx-6 relative">
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu(!activeMenu)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />

        <div className="flex">
          <CustomTooltip content="Profile">
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-1 hover:bg-light-gray rounded-lg"
              onClick={handleProfileClick}
            >
              <img
                className="rounded-full w-8 h-8 object-cover"
                src={user?.avatar}
                alt="user-profile"
              />
              <span className="text-gray-400 text-14">Hi, </span>
              <span className="text-gray-400 font-bold text-14">
                {user.name}
              </span>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </Button>
          </CustomTooltip>

          {isClicked.userProfile && (
            <UserProfile user={user} onClose={handleCloseProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
