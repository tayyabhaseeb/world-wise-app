import { Navigate, Outlet } from "react-router-dom";
import { useAuthContextValue } from "../Contexts/FakeAuthContext";
const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContextValue();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
