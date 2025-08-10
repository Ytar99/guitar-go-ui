import React from "react";
import { Box, Group, Button, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { useUnit } from "effector-react";
import { UserRole } from "../lib/rbac/roles";
import { authModel } from "../../features/auth/model/store";

export const NavBar: React.FC = () => {
  const auth = useUnit(authModel.$auth);
  const isAuth = Boolean(auth.user);
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        height: 60,
        padding: theme.spacing.xs,
        backgroundColor: (theme as any).colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        borderBottom: `1px solid ${
          (theme as any).colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Group justify="space-between" style={{ width: "100%" }}>
        <Group>
          <Link to="/">Home</Link>
          {isAuth && <Link to="/profile">Profile</Link>}
          {isAuth && auth.user?.roles.includes(UserRole.ADMIN) && <Link to="/admin">Admin</Link>}
        </Group>
        <Group>
          {!isAuth ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <Button variant="outline" size="xs" onClick={() => authModel.logoutFx()}>
              Logout
            </Button>
          )}
        </Group>
      </Group>
    </Box>
  );
};
