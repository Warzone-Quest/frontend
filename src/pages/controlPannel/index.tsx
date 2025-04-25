import { Navigate, Route, Routes } from 'react-router';
import AdminView from './AdminView';
import ModeratorView from './ModeratorView';
import { useState } from 'react';
import { UserRole } from './types';

export const ControlPanel = () => {
  // TODO: Replace with actual auth logic
  const [userRole] = useState<UserRole>('admin');

  // Redirect to appropriate view based on role
  const getRoleBasedView = () => {
    switch (userRole) {
      case 'admin':
        return <AdminView />;
      case 'moderator':
        return <ModeratorView />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <Routes>
      <Route index element={getRoleBasedView()} />
      <Route path="admin" element={<AdminView />} />
      <Route path="moderator" element={<ModeratorView />} />
      {/* Redirect unknown paths to the role-based view */}
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}; 