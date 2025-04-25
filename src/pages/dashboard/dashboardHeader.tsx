import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

export function DashboardHeader() {
  return (
    <header className="fixed top-4 left-[calc(280px+1rem)] right-4 h-16 z-10">
      <div className="h-full bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-700/50">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-semibold text-white">Tournaments</h1>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tournaments..."
              className="w-72 pl-10 pr-4 py-2 bg-slate-700/50 backdrop-blur border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-400"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors">
              <Cog6ToothIcon className="w-6 h-6" />
            </button>
            <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors relative">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-800"></span>
            </button>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 