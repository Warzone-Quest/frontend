import { Route, Routes } from 'react-router'
import '@/App.css'
import Home from '@/pages/home'
import { Dashboard } from '@/pages/dashboard'
import TournamentListing from '@/pages/dashboard/tournamentListing'
import Overview from '@/pages/dashboard/overview'
import CreateTournament from '@/pages/dashboard/createTournament'
import Settings from '@/pages/dashboard/settings'
import Statistics from '@/pages/dashboard/statistics'
import { ControlPanel } from '@/pages/controlPannel'
import { SignUp } from '@/pages/auth/SignUp'
import { Login } from '@/pages/auth/Login'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='auth'>
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='dashboard' element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path='tournaments' element={<TournamentListing />} />
        <Route path='create-tournament' element={<CreateTournament />} />
        <Route path='settings' element={<Settings />} />
        <Route path='statistics' element={<Statistics />} />
      </Route>
      <Route path='control-panel/*' element={<ControlPanel />} />
    </Routes>
  );
};

export default App;
