import { Route, Routes } from 'react-router'
import '@/App.css'
import Home from '@/pages/home'
import { Dashboard } from '@/pages/dashboard'
import TournamentListing from '@/pages/dashboard/tournamentListing'
import Overview from '@/pages/dashboard/overview'
import CreateTournament from '@/pages/dashboard/createTournament'
import Settings from '@/pages/dashboard/settings'
import Profile from '@/pages/dashboard/profile'
import { ControlPanel } from '@/pages/controlPannel'
import { SignUp } from '@/pages/auth/SignUp'
import { Login } from '@/pages/auth/Login'
import { PrivacyPolicy } from '@/pages/others/PrivacyPolicy'
import { TermsOfService } from '@/pages/others/TermsOfService'
import { CookiePolicy } from '@/pages/others/CookiePolicy'
import { Compliance } from '@/pages/others/Compliance'
import { ComingSoon } from '@/pages/others/ComingSoon'

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
        <Route path='profile' element={<Profile />} />
        <Route path='statistics' element={<ComingSoon />} />
        <Route path='leaderboards' element={<ComingSoon />} />
        <Route path='teams' element={<ComingSoon />} />
        <Route path='events' element={<ComingSoon />} />
      </Route>
      <Route path='control-panel/*' element={<ControlPanel />} />
      <Route path='privacy' element={<PrivacyPolicy />} />
      <Route path='terms' element={<TermsOfService />} />
      <Route path='cookies' element={<CookiePolicy />} />
      <Route path='compliance' element={<Compliance />} />
      <Route path='coming-soon' element={<ComingSoon />} />
    </Routes>
  );
};

export default App;
