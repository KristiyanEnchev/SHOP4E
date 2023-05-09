import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { Store } from 'lucide-react';
import { IoMdContacts } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { useStateContext } from '../contexts/ContextProvider';
import { CustomTooltip } from './../../components/ui/custom-tooltip';

const links = [
  {
    title: 'Pages',
    links: [
      {
        name: 'users',
        url: 'admin/users',
        icon: <IoMdContacts />,
      },
      {
        name: 'products',
        url: 'admin/products',
        icon: <AiOutlineShoppingCart />,
      },
    ],
  },
];

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div
      className={`${
        activeMenu ? 'w-72 fixed' : 'w-0'
      } sidebar dark:bg-secondary-dark-bg bg-white`}
    >
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
              <Link
                to="/admin"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <Store className="hidden md:block" />
                <span>SHOP4E</span>
              </Link>

              <CustomTooltip content="Menu">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                  <MdOutlineCancel />
                </Button>
              </CustomTooltip>
            </div>

            <div className="mt-10">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                PUBLIC
              </p>
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <span className="capitalize">BACK TO SHOP</span>
              </Link>

              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.url}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
