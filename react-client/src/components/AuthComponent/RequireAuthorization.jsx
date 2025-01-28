import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCurrentToken,
  selectIsAdmin,
} from '../../redux/Public/AuthSlice.js';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const isAdmin = useSelector(selectIsAdmin);
  const location = useLocation();

  return token && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireAuth;
