import React from "react";
import { MantineProvider } from "@mantine/core";
import { EffectorProvider } from "./EffectorProvider";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <EffectorProvider>
    <MantineProvider
      theme={{
        fontFamily: 'Inter, system-ui, -apple-system, Roboto, "Helvetica Neue", Arial',
        primaryColor: "blue",
      }}
    >
      {children}
    </MantineProvider>
  </EffectorProvider>
);
