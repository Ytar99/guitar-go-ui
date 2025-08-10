import React, { ReactNode } from "react";
import { AppShell, Container } from "@mantine/core";
import { NavBar } from "./NavBar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: false },
      }}
      header={{
        height: 60,
      }}
    >
      <Container size="md">
        <NavBar />
        {children}
      </Container>
    </AppShell>
  );
};

export default AppLayout;
