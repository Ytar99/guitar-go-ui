import React from "react";
import { Navigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { authModel } from "../../../features/auth";
import { UserRole } from "./roles";
import { hasRole } from "./hasRole";

type ProtectedProps = {
  children: React.ReactElement;
  roles?: UserRole[];
  onlyForGuest?: boolean;
};

export const ProtectedRoute: React.FC<ProtectedProps> = ({ children, roles, onlyForGuest }) => {
  const auth = useUnit(authModel.$auth);

  const isAuthenticated = Boolean(auth?.user);

  if (onlyForGuest && isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  if (!onlyForGuest && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && auth?.user) {
    const ok = hasRole(auth.user.roles, roles);
    if (!ok) return <Navigate to="/" replace />;
  }

  return children;
};
