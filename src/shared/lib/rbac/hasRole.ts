import { UserRole } from "./roles";

export const hasRole = (userRoles: UserRole[] | UserRole | string[] | string, allowed: UserRole[]) => {
  const u = Array.isArray(userRoles) ? userRoles : [userRoles];
  return allowed.some((r) => u.includes(r));
};
