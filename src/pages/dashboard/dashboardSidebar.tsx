import { Link, useLocation } from "react-router";
import {
  HomeIcon,
  TrophyIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Overview", to: "/dashboard", icon: HomeIcon },
  { name: "Tournaments", to: "/dashboard/tournaments", icon: TrophyIcon },
  { name: "Create Tournament", to: "/dashboard/create-tournament", icon: CalendarIcon },
  { name: "Statistics", to: "/dashboard/statistics", icon: ChartBarIcon },
];

const secondaryNavigation = [
  { name: "Settings", to: "/dashboard/settings", icon: Cog6ToothIcon },
  { name: "Logout", to: "/auth/logout", icon: ArrowRightStartOnRectangleIcon },
];

export function DashboardSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[280px] p-4">
      <div className="relative flex flex-col h-full bg-gradient-to-b from-slate-800/95 to-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-[0_0_30px_rgb(0,0,0,0.3)]">
        {/* Logo */}
        <div className="shrink-0 h-20 flex items-center px-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center transform transition-transform group-hover:scale-105 duration-200">
              <TrophyIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              WarZone Quest
            </span>
          </Link>
        </div>

        {/* Main Navigation - Scrollable if needed */}
        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.name}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${active 
                    ? 'text-white bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
              >
                <item.icon className={`w-5 h-5 transition-colors duration-200 
                  ${active ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="font-medium">{item.name}</span>
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation - Fixed at bottom */}
        <div className="shrink-0 border-t border-slate-700/50">
          <div className="px-4 py-3">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}