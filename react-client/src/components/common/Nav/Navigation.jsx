import { useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AiOutlineShopping } from 'react-icons/ai';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { calculateTotals } from '../../../redux/Public/cartSlice';
import { openModal } from '../../../redux/Public/modalSlice';
import { logOut } from '../../../redux/Public/AuthSlice.js';
import { UserActions } from '../../../Admin/components/Helpers/UserListConstants';

// eslint-disable-next-line react/display-name
const NavigationLink = forwardRef(({ to, children, className = '' }, ref) => (
  <Link
    ref={ref}
    to={to}
    className={`text-white hover:text-gray-200 transition-colors ${className}`}
  >
    {children}
  </Link>
));

// eslint-disable-next-line react/display-name
const DropdownLink = forwardRef(({ to, children }, ref) => (
  <Link
    ref={ref}
    to={to}
    className="w-full text-gray-700 hover:text-primary hover:bg-gray-100 px-3 py-2 text-sm"
  >
    {children}
  </Link>
));

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { avatar, isAdmin, token } = useSelector((state) => state.auth);
  const { amount, cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleCartClick = () => {
    dispatch(openModal({ action: UserActions.OpenCart }));
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <NavigationLink
              to="/"
              className="flex items-center gap-2 font-bold"
            >
              <Store className="hidden h-6 w-6 md:block" />
              <span className="text-xl">SHOP4E</span>
            </NavigationLink>
            {isAdmin && <NavigationLink to="/admin">ADMIN</NavigationLink>}
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <NavigationLink to="/products">PRODUCTS</NavigationLink>
              {!token && (
                <>
                  <NavigationLink to="/login">LOGIN</NavigationLink>
                  <NavigationLink to="/register">REGISTER</NavigationLink>
                </>
              )}
            </nav>

            <button
              onClick={handleCartClick}
              className="relative rounded-full p-2 text-white hover:bg-white/10 transition-colors"
              aria-label="Shopping cart"
            >
              <AiOutlineShopping className="h-6 w-6" />
              {amount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium">
                  {amount}
                </span>
              )}
            </button>

            {token && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar>
                      <AvatarImage
                        src={avatar || '/default-avatar.png'}
                        alt="User avatar"
                      />
                      <AvatarFallback>{avatar ? 'User' : '👤'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col py-2">
                  <DropdownMenuItem asChild>
                    <DropdownLink to="/profile">Profile</DropdownLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DropdownLink to="/orders">Orders</DropdownLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <div onClick={handleLogout}>
                      <DropdownLink>Logout</DropdownLink>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Mobile menu">
                    <Menu className="h-6 w-6 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  {!token && (
                    <>
                      <DropdownMenuItem asChild>
                        <DropdownLink to="/login">LOGIN</DropdownLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DropdownLink to="/register">REGISTER</DropdownLink>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
