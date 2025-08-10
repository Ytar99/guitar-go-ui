import React from "react";
import { Provider as EffectorReactProvider } from "effector-react";
import { fork } from "effector";

const scope = fork();

export const EffectorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <EffectorReactProvider value={scope}>{children}</EffectorReactProvider>
);
