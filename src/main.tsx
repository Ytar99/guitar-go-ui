import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./app/providers";
import { AppRouter } from "./app/router/AppRouter";
import AppLayout from "./shared/ui/AppLayout";
import "@mantine/core/styles.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);
