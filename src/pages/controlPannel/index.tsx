import { Navigate, Route, Routes } from 'react-router';
import { AdminView } from './AdminView';
import { ModeratorView } from './ModeratorView';
import { useEffect, useState } from 'react';
import { userApi, UserProfileModel } from "@/api/user.api";
import { TournamentModel } from "@/api/tournament.api";

export const ControlPanel = () => {
  const [user, setUser] = useState<UserProfileModel>();
  const [tournament, setTournament] = useState<TournamentModel>();

  // Redirect to appropriate view based on role
  const getRoleBasedView = () => {
    switch (user) {
      case 'admin':
        return <AdminView />;
      case 'moderator':
        return <ModeratorView />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userApi.fetchProfile();
      setUser(user);
    };
  }, []);

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