import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoutes = ({ isAuthenticated }) => {
  // const location = useLocation();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     toast.error("Please log in to access that page.", {
  //       toastId: "auth-required", // Prevents duplicates
  //     });
  //   }
  // }, [isAuthenticated]);

  // return isAuthenticated ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" replace state={{ from: location }} />
  // );

  return <Outlet />;
};

export default ProtectedRoutes;
