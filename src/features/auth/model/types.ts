import { UserRole } from '../../../shared/lib/rbac/roles';

export type User = {
  id: string;
  email: string;
  name?: string;
  roles: UserRole[];
};

export type AuthState = {
  user: User | null;
  loading: boolean;
};