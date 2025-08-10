import React from "react";
import { Box } from "@mantine/core";
import LoginForm from "../features/auth/ui/LoginForm";

const LoginPage: React.FC = () => (
  <Box style={{ maxWidth: 420, marginInline: "auto", padding: 24 }}>
    <h2>Login</h2>
    <LoginForm />
  </Box>
);

export default LoginPage;
