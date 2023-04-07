import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../../redux/Public/AuthSlice.js';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);

  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
