import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import { UserRole } from "../../shared/lib/rbac/roles";
import { ProtectedRoute } from "../../shared/lib/rbac/ProtectedRoute";

const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage"));
const AdminPage = lazy(() => import("../../pages/AdminPage"));
const HomePage = lazy(() => import("../../pages/HomePage"));

export const AppRouter: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/login"
        element={
          <ProtectedRoute onlyForGuest>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute onlyForGuest>
            <RegistrationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute roles={[UserRole.USER, UserRole.ADMIN]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={[UserRole.ADMIN]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);
